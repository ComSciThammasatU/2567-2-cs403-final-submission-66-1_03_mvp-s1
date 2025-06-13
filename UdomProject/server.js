const { Connection } = require('tedious');
const express = require('express');
const sql = require('mssql');
const fs = require('fs');
const app = express();

app.use(express.json());

const config = {
  server: "DESKTOP-CQIAGO2",
  authentication: {
    type: 'default',
    options: {
      userName: "udomchok",
      password: "12345"
    }
  },
  options: {
    
    encrypt: true,
    trustServerCertificate: true, 
    database: "udomchok",
    port: 1433,
    enableArithAbort: true
  }
};
app.get('/api/product', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Product');
    res.json(result.recordset);
  } catch (err) {
    console.error(' SQL Error:', err);
    res.status(500).send('Database error');
  } finally {
    await sql.close();
  }
});
app.get('/api/productT/:pdtypeid/types', async (req, res) => {
  try {
    const { pdtypeid } = req.params;
    const pool = await sql.connect(config);
    const request = pool.request();
    request.input('pdtypeid', sql.Int, pdtypeid);
    const result = await request.query(`
      SELECT Product.*
      FROM Product
      INNER JOIN ProductType 
      ON Product.PDtype_ID = ProductType.PDtype_ID
      WHERE Product.PDtype_ID = @pdtypeid
    `);
    
    res.json(result.recordset);
  } catch (err) {
    console.error(' SQL Error:', err);
    res.status(500).send('Database error');
  } finally {
    await sql.close();
  }
});
app.get('/api/productid/:pdid/amount', async (req, res) => {
  try {
    const { pdid } = req.params;
    const pool = await sql.connect(config);
    const request = pool.request();
    request.input('pdid', sql.Int, pdid);
    const result = await request.query(`
      SELECT Amount
      FROM Product
      WHERE Product_ID = @pdid
    `);
    
    res.json(result.recordset);
  } catch (err) {
    console.error(' SQL Error:', err);
    res.status(500).send('Database error');
  } finally {
    await sql.close();
  }
});
app.get('/api/tname', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM ProductType');
    res.json(result.recordset);
  } catch (err) {
    console.error(' SQL Error:', err);
    res.status(500).send('Database error');
  } finally {
    await sql.close();
  }
});

app.get('/api/product/price', async (req, res) => {
  const { pdtypeid, productid } = req.query;
  
  try {
    await sql.connect(config);
    const request = new sql.Request();

    if (!pdtypeid || isNaN(Number(pdtypeid)) || !productid || isNaN(Number(productid))) {
    return res.status(400).json({ error: 'Invalid pdtypeid or productid' });
  }
    request.input('pdtypeid', sql.Int,  Number(pdtypeid));
    request.input('productid', sql.Int, Number(productid));

    const result = await request.query(`
      SELECT Price
      FROM Product
      WHERE Product_ID = @productid AND PDtype_ID = @pdtypeid
    `);
        console.log('Backend (server.js): Raw SQL Query Result recordset:', result.recordset); 
        console.log('Backend (server.js): recordset length:', result.recordset.length);
    if (result.recordset.length > 0) {
      res.json({ price: result.recordset[0].Price });
    } else {
      res.status(404).json({ message: 'Product price not found for the given IDs.' });
    }

  } catch (err) {
    console.error('SQL Error:', err);
    res.status(500).json({ error: 'Database error' });
  } finally {
    await sql.close();
  }
});


app.post('/api/products/batch', async (req, res) => {
  console.log('Backend: Raw req.body received:', req.body);
   try {
    const pool = await sql.connect(config);
 
    
  const itemsToInsert = req.body; 
    console.log('Backend: Processed itemsToInsert:', itemsToInsert);
  if (!Array.isArray(itemsToInsert) || itemsToInsert.length === 0) {
      return res.status(400).json({ message: 'ไม่มีข้อมูลสำหรับบันทึก' }); 
    }

    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      const orderRequest = new sql.Request(transaction);
      const orderResult = await orderRequest.query(`
        INSERT INTO Orders (Customer_ID, Order_date)
        VALUES (1, GETDATE());;
        SELECT SCOPE_IDENTITY() AS Order_ID;
      `);
      const newOrderId = orderResult.recordset[0].Order_ID;
      console.log('Generated new Order_ID:', newOrderId);

      for (const item of itemsToInsert) {
        if (typeof item.ProductID !== 'number' && typeof item.ProductID !== 'string') {
            await transaction.rollback();
            return res.status(400).json({ message: 'ข้อมูล Product_ID ไม่ถูกต้อง' });
        }
        const Product_ID = parseInt(item.ProductID);
        if (isNaN(Product_ID)) {
            await transaction.rollback();
            return res.status(400).json({ message: 'ข้อมูล Product_ID ไม่ใช่ตัวเลข' });
        }

        if (typeof item.Amount !== 'number') {
            await transaction.rollback();
            return res.status(400).json({ message: 'ข้อมูล Order_amount ไม่ถูกต้อง' });
        }
        const Order_amount = item.Amount;

        if (typeof item.Price !== 'number') {
            await transaction.rollback();
            return res.status(400).json({ message: 'ข้อมูล Order_price ไม่ถูกต้อง' });
        }
        const Order_price = item.Price;

        const request = new sql.Request(transaction); 

        await request
          .input('Order_ID', sql.Int, newOrderId)
          .input('Product_ID', sql.Int, Product_ID)
          .input('Order_amount', sql.Decimal(10, 2), Order_amount)
          .input('Order_price', sql.Decimal(18, 2), Order_price)
          .query(`
            INSERT INTO Orders_detail (Product_ID, Order_ID, Order_amount, Order_price)
            VALUES (@Product_ID, @Order_ID, @Order_amount, @Order_price)
          `);

      }

      await transaction.commit();
      res.status(200).json({ message: 'บันทึกข้อมูลสำเร็จ', insertedCount: itemsToInsert.length, orderId: newOrderId });
    } catch (transactionError) {
      await transaction.rollback();
      console.error('Transaction failed, rolling back:', transactionError);
      res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล', error: transactionError.message });
    }

  } catch (err) {
    console.error('เกิดข้อผิดพลาดในInsert:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
});



const PORT = 3000;
app.listen(PORT, () => console.log(`Server running  http://localhost:${PORT}`));