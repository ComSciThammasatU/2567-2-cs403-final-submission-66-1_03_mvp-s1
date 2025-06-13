import React, { memo, useState } from 'react'
import { Text, View , TextInput, StyleSheet } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export const Amount = ({ value, onValueChange }) => {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    
      <TextInput
      style={styles.input}
      placeholder="จำนวน"
      keyboardType="numeric" 
      value={String(value)} 
      onChangeText={onValueChange} 
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
});
