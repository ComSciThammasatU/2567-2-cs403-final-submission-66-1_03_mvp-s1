import React, { useState, useCallback, useEffect, memo } from 'react';
import { TextInput, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'; 


const UNIT_CONVERSIONS = {
  "กิโลกรัม": 1,
  "ถัง": 15,
  "ท่อน": 45,
};

export const Unit = memo(({ value, onValueChange, amount }) => {
  const [loading, setLoading] = useState(false); 
  const [remoteDataSet, setRemoteDataSet] = useState(null); 
  const [selectedUnitItem, setSelectedUnitItem] = useState(null); 
  const dropdownRef = React.useRef(null); 

  
  useEffect(() => {
    const units = Object.keys(UNIT_CONVERSIONS).map((unitName, index) => ({
      id: unitName, 
      title: unitName, 
      conversionFactor: UNIT_CONVERSIONS[unitName], 
    }));
    setRemoteDataSet(units);
  }, []); 

  
  useEffect(() => {
    const parsedAmount = parseFloat(amount);
    
    if (selectedUnitItem && !isNaN(parsedAmount) && parsedAmount > 0) {
      const convertedKg = parsedAmount * selectedUnitItem.conversionFactor;
      onValueChange(String(convertedKg)); 
    } else {
      onValueChange(''); 
    }
  }, [selectedUnitItem, amount, onValueChange]); 

  // AutocompleteDropdown
  const handleSelectItem = useCallback((item) => {
    setSelectedUnitItem(item); 
    
}, []);
  
 

  return (
    <AutocompleteDropdown
      ref={dropdownRef} 
      dataSet={remoteDataSet}
      closeOnBlur={true} 
      useFilter={true} 
      clearOnFocus={false}
      textInputProps={{
        placeholder: "เลือกหน่วย",
        value: selectedUnitItem ? selectedUnitItem.title : '', 
        editable: true, 
      }}
      onSelectItem={handleSelectItem} 
      loading={loading} 
      onChangeText={(text) => {
       
      }}
      suggestionsListTextStyle={{
        color: '#8f3c96',
      }}
      EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>ไม่พบหน่วย</Text>}
    />
  );

});

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});