import React, { memo, useState,useCallback ,useEffect} from 'react'
import { Text, View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export const RiceName = ({ pdtypeid , onSelectRiceName }) => {
  
  const [loading, setLoading] = useState(false)
  const [remoteDataSet, setRemoteDataSet] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const getSuggestions = useCallback(async q => {
    try{
    console.log('workg')
    const filterToken = q.trim();
    console.log('getSuggestions', filterToken)
    if (typeof q !== 'string' || q.length < 3) {
      setRemoteDataSet(null)
      return
    }
    setLoading(true)
   console.log('fwork')
    const response = await fetch(`https://pare.wonyus.com/api/productT/${pdtypeid}/types`)
    const items = await response.json()
    console.log('RiceName: Raw API Response (items):', items);
    const suggestions = items
    
      .map(item => ({
        id: String(item.Product_ID),
        Product_ID: item.Product_ID,
        
        title: item.Product_NAME,
        Product_NAME: item.Product_NAME,
      }))

    setRemoteDataSet(suggestions)
    console.log(suggestions)
    
    }catch(error) {
    console.error('Fetch error:', error);
    setRemoteDataSet(null);
  } finally {
    setLoading(false);
  }
  }, [pdtypeid]);

  useEffect(() => {
    getSuggestions('');
  }, [pdtypeid, getSuggestions]); // เพิ่ม getSuggestionsใน dependencies

  //ดูค่า selectedItem เมื่อมีการเลือก
  useEffect(() => {
    if (selectedItem) {
      console.log('RiceName: Selected Item:', selectedItem);
    }
  }, [selectedItem]);

  const handleSelectItem = useCallback((item) => {
    setSelectedItem(item); //ตั้งค่า selectedItem ใน RiceName
     if (onSelectRiceName) {
     onSelectRiceName(item); 
 } 
}, [onSelectRiceName]);
  return (
    <>
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={false}
        textInputProps={{
          placeholder: 'Start typing est...',
        }}
        onSelectItem={handleSelectItem}
        loading={loading}
        onChangeText={getSuggestions}
        suggestionsListTextStyle={{
          color: '#8f3c96',
        }}
        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>}
      />
    
    </>
  )
}