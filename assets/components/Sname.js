import React, { memo,useCallback,useEffect, useState } from 'react'
import { TextInput, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export const Sname =({pdid}) =>{
        const [price, setPrice] = useState('');
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState(null);

        useEffect(() => {
            if (!pdid) {
      setPrice(''); 
      setError(null);
      
      return;
    }
       const fetchPrice = async () => {
            setLoading(true);
            setError(null);
            try {
              console.log(`Fetching price for  pdid: ${pdid}`);
              const response = await fetch(`https://pare.wonyus.com/api/productid/${pdid}/amount`);
              
      
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
              }
              const data = await response.json();
      
              
              
                const fetchedPrice = data[0].Amount; 
                setPrice(fetchedPrice);
                  console.log("fetch price:", fetchedPrice);
              
            } catch (e) {
              console.error("Failed to fetch price:", e);
              setError(`ไม่สามารถดึงราคาได้: ${e.message}`); 
              setPrice('');
              
            } finally {
              setLoading(false);
            }
          };
      
          fetchPrice();
        }, [pdid]); 
      
        
       
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
          <Text fontSize = "100" >{price}</Text>
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
          alignSelf: 'flex-start',
          paddingTop: 10,
        },
      });