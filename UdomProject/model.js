const addCustumer = async (Custumer) => {
    try {
        const pool = await poolPromise
        const request = pool.request()
        request.input('name', sql.VarChar, Custumer.name)
        request.input('number', sql.VarChar, Custumer.number)
        request.input('address', sql.VarChar, Custumer.address)
        await request.query('INSERT INTO users (name, number, address) VALUES (@name, @email, @password)')
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
const editCustumer = async (Custumer) => {
    try {
        const pool = await poolPromise
        const request = pool.request()
        request.input('name', sql.VarChar, Custumer.name)
        request.input('number', sql.VarChar, Custumer.number)
        request.input('address', sql.VarChar, Custumer.address)
        await request.query('INSERT INTO users (name, number, address) VALUES (@name, @email, @password)')
        return true
    } catch (err) {
        console.log (err)
        return false
    }
}
const addProduct = async (Custumer) => {
    try {
        const pool = await poolPromise
        const request = pool.request()
        request.input('name', sql.VarChar, Custumer.name)
        request.input('number', sql.VarChar, Custumer.number)
        request.input('address', sql.VarChar, Custumer.address)
        await request.query('INSERT INTO users (name, number, address) VALUES (@name, @email, @password)')
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
const editProduct = async (Custumer) => {
    try {
        const pool = await poolPromise
        const request = pool.request()
        request.input('name', sql.VarChar, Custumer.name)
        request.input('number', sql.VarChar, Custumer.number)
        request.input('address', sql.VarChar, Custumer.address)
        await request.query('INSERT INTO users (name, number, address) VALUES (@name, @email, @password)')
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
const editCustumer1 = async (Custumer) => {
    try {
        const pool = await poolPromise
        const request = pool.request()
        request.input('name', sql.VarChar, Custumer.name)
        request.input('number', sql.VarChar, Custumer.number)
        request.input('address', sql.VarChar, Custumer.address)
        await request.query('INSERT INTO users (name, number, address) VALUES (@name, @email, @password)')
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
