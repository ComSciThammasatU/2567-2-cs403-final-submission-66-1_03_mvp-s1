import { StatusBar } from 'expo-status-bar';
import React, { memo, useState,useCallback ,useEffect} from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  KeyboardAvoidingView,
  Button,
  Alert,
  TextInput
} from 'react-native'
import Header from './Header';
import ShowTime from './showTime';
import {RiceType} from '../components/RiceType';
import {RiceName} from '../components/RiceName';
import {RiceN } from '../components/RiceN';
import { Unit } from '../components/Unit';
import { Amount } from '../components/Amount';
import {Price } from '../components/Price';
import {Sname} from '../components/Sname';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
export default function sell() {

  const Separator = () => <View style={styles.separator} />;

   const [selectedRiceTypeId, setSelectedRiceTypeId] = useState(null);
  const [selectedRiceNameItem, setSelectedRiceNameItem] = useState(null); // เก็บ item ทั้งหมดจาก RiceName
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [addedItems, setAddedItems] = useState([]);

  


    const handleAddItemToList = useCallback(() => {
    
    if (!selectedRiceTypeId || !selectedRiceNameItem || !selectedAmount || !selectedUnit || !selectedPrice) {
      Alert.alert("ข้อมูลไม่ครบถ้วน", "กรุณาเลือกประเภทข้าว, ชื่อข้าว, จำนวน, หน่วย และราคาให้ครบถ้วน");
      return;
    }
    const totalKilograms = parseFloat(selectedUnit); // เป็นกิโลกรัม
    const pricePerKilogram = parseFloat(selectedPrice); // ราคาต่อกิโลกรัม
    const calculatedTotalPrice = totalKilograms * pricePerKilogram; 
     
   const newItem = {
      riceTypeId: selectedRiceTypeId,
      riceNameId: selectedRiceNameItem.Product_ID,
      riceNameTitle: selectedRiceNameItem.Product_NAME,
      originalAmount: parseFloat(selectedAmount), // จำนวนเดิมที่ผู้ใช้ป้อน
      convertedUnitKg: totalKilograms, // ปริมาณที่แปลงเป็นกิโลกรัมแล้ว
      pricePerKg: pricePerKilogram, // ราคาต่อกิโลกรัม
      totalPrice: calculatedTotalPrice, // ราคารวมของรายการ
     
    };

  
    setAddedItems(prevItems => [...prevItems, newItem]);

    
    setSelectedRiceNameItem(null); 
    setSelectedAmount('');
    setSelectedUnit('');
    setSelectedPrice('');

    Alert.alert("เพิ่มสินค้าแล้ว", `${newItem.riceNameTitle} จำนวน ${newItem.originalAmount} (คิดเป็น ${newItem.convertedUnitKg} กก.) รวม ${newItem.totalPrice} บาท`);
  }, [selectedRiceTypeId, selectedRiceNameItem, selectedAmount, selectedUnit, selectedPrice]);
  // ชำระเงิน
  const handleSubmitAllItems = useCallback(async () => {
    if (addedItems.length === 0) {
      Alert.alert("ไม่มีสินค้า", "กรุณาเพิ่มสินค้าลงในรายการก่อนทำการบันทึก");
      return;
    }
    const dataToSend = addedItems.map(item => ({
      ProductID: item.riceNameId,
      Amount: item.convertedUnitKg,
      Unit: 'กิโลกรัม',
      Price: item.totalPrice,
      
    }));
    console.log('Frontend: Data being sent to backend:', dataToSend);
    console.log('Frontend: JSON stringified data:', JSON.stringify(dataToSend));
    
    try {
      const response = await fetch('https://pare.wonyus.com/api/products/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
        
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();
      Alert.alert("บันทึกสำเร็จ", "ข้อมูลสินค้าทั้งหมดถูกบันทึกเรียบร้อยแล้ว");
      console.log('Batch insert result:', result);
      setAddedItems([]); // เคลียร์รายการหลังจากบันทึกสำเร็จ
    } catch (error) {
      console.error('Error submitting items:', error);
      Alert.alert("บันทึกไม่สำเร็จ", `เกิดข้อผิดพลาดในการบันทึก: ${error.message}`);
    }
  }, [addedItems]);
    return (
      <AutocompleteDropdownContextProvider>
      <View style={styles.container}>
        <Header 
        headerBg={"#A52A2A"}
        iconColor = {"white"}
        homes 
        title={"ร้านอุดมโชคค้าข้าว"}
        optionalBtn="bell"
        optionalFunc={() => console.log('optional')}/>
        <ShowTime/>
          <View style={styles.container1}>
           <Text style={styles.title}>เลือกประเภทข้าว</Text>
         <View style={[styles.section, Platform.select({ 
          ios: { zIndex: 100 } ,
          android: { zIndex: 100 }
          })]}>
            
              <RiceType onSelectRiceType={setSelectedRiceTypeId} />

            </View>
            <Text style={styles.title}>ชื่อข้าว</Text>
         <View style={[styles.section, Platform.select({ 
          ios: { zIndex: 100 } ,
          android: { zIndex: 100 }
          })]}>
            
              <RiceName pdtypeid={selectedRiceTypeId}
                        onSelectRiceName={setSelectedRiceNameItem}
              />
    
            </View>
             <Text style={styles.title}>ราคา</Text>
         <View style={[styles.section, Platform.select({ 
          ios: { zIndex: 100 } ,
          android: { zIndex: 100 }
          })]}>
            
              <Price
                pdtypeid={selectedRiceTypeId} 
                pdid={selectedRiceNameItem?.Product_ID} 
                onPriceChange={setSelectedPrice} 
              />

            </View>
            <View style={styles.container2}>
              <Text style={styles.title}>จำนวน</Text>
               <View style={[styles.section, Platform.select({ 
                  ios: { zIndex: 100 } ,
                  android: { zIndex: 100 }
                  })]}>
            
              <Amount onValueChange={setSelectedAmount} value={selectedAmount} />
    
                </View>
            <Text style={styles.title}>หน่วย</Text>
         <View style={[styles.section, Platform.select({ 
          ios: { zIndex: 100 } ,
          android: { zIndex: 100 }
          })]}>
            
              <Unit onValueChange={setSelectedUnit} value={selectedUnit} amount={selectedAmount} />
    
            </View>
            
            </View>

            <Text>จำนวนคงเหลือ</Text>
              <Sname pdid={selectedRiceNameItem?.Product_ID} />
            <Button color = "#A52A2A" title = "เพิ่มสินค้า" onPress={handleAddItemToList} />
            {addedItems.length > 0 && (
              <View style={styles.addedItemsContainer}>
                <Text style={styles.addedItemsTitle}>รายการสินค้าที่รอการบันทึก:</Text>
                {addedItems.map((item, index) => (
                  <Text key={index} style={styles.addedItemText}>
                    {index + 1}. {item.riceNameTitle} ({item.originalAmount} คือ {item.convertedUnitKg} กก.) - {item.pricePerKg.toFixed(2)} บาท/กก. - รวม {item.totalPrice.toFixed(2)} บาท )
                  </Text>
                ))}
                {/* --- ปุ่ม "ชำระเงิน" --- */}
                 <Separator />
          <Button color = "#A52A2A" title = "ชำระเงิน" onPress={handleSubmitAllItems} />
              </View>
            )}
            
        </View>
          
         </View>
        
    </AutocompleteDropdownContextProvider>
      
    );
  }
  
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    
      
    },
    container1: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      justifyContent: 'space-between',
      
    },
     container2: {
      
      flexDirection :'row',
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      
    },
    section: {
    marginBottom: 40,
  },
   addedItemsContainer: {
    marginTop: 20,
     flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  addedItemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addedItemText: {
    fontSize: 14,
    marginBottom: 5,
  },
   separator: {
    marginVertical: 8,
    
  },
});
  