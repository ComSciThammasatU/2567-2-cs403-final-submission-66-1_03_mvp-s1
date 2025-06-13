import React, { memo,useCallback,useEffect, useState } from 'react'
import { TextInput, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export const Price = ({ pdtypeid, pdid, onPriceChange}) => {
  
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

console.log(`Fetching price for pdtypeid: ${pdtypeid}, pdid: ${pdid}`);
  
 // useEffect เพื่อดึงราคาเริ่มต้นจาก Database
  useEffect(() => {
    // จะดึงราคาเฉพาะเมื่อมี pdtypeid และ pdid ถูกเลือกแล้ว
    if (!pdtypeid || !pdid) {
      setPrice(''); // ล้างค่าราคาถ้าไม่มีสินค้าที่เลือก
      setError(null);
      onPriceChange(''); // ส่งค่าว่างเปล่ากลับไปยังคอมโพเนนต์แม่
      return;
    }

    const fetchPrice = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching price for pdtypeid: ${pdtypeid}, pdid: ${pdid}`);
        const response = await fetch(`https://pare.wonyus.com/api/product/price?pdtypeid=${pdtypeid}&productid=${pdid}`);
        

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
        }
        const data = await response.json();
        console.log("fetch pricepp:", data)
        
        if (data && typeof data.price === 'number') {
          const fetchedPrice = String(data.price); 
          setPrice(fetchedPrice);
          console.log("fetch pricepp:", data.price);
          onPriceChange(fetchedPrice); 
        } else {
          
          console.warn('API response for price was not as expected:', data);
          setPrice(''); 
          onPriceChange('');
          setError("ไม่พบราคาสำหรับสินค้านี้");
        }
      } catch (e) {
        console.error("Failed to fetch price:", e);
        setError(`ไม่สามารถดึงราคาได้: ${e.message}`); 
        setPrice('');
        onPriceChange('');
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [pdtypeid, pdid, onPriceChange]); 

  
  const handleChangeText = useCallback((text) => {
    
    const numericText = text.replace(/[^0-9.]/g, ''); 
    if (numericText.split('.').length > 2) {
      return; 
    }
    setPrice(numericText); // อัปเดต state ภายใน
    onPriceChange(numericText); // ส่งค่าที่ผู้ใช้พิมพ์ไปยังคอมโพเนนต์แม่
  }, [onPriceChange]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#A52A2A" />
        <Text style={styles.loadingText}>กำลังดึงราคา...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <TextInput
      style={styles.input}
      placeholder="ราคาขาย"
      keyboardType="numeric" 
      value={price}
      onChangeText={handleChangeText}
      editable={!loading && !error} 
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor:'#e5ecf2',
    shadowColor: '#00000099',
    paddingHorizontal: 13,
    
    borderRadius: 5,
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: '#A52A2A',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    height: 40,
    alignSelf: 'flex-start', // ทำให้ข้อความอยู่ด้านซ้าย
    paddingTop: 10,
  },
});