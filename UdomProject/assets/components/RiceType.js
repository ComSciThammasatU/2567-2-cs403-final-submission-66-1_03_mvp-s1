import React, { memo,useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'


export const RiceType = memo(({ onSelectRiceType }) => {
  const [loading, setLoading] = useState(false)
  const [remoteDataSet, setRemoteDataSet] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  
  const getSuggestions = useCallback(async q => {
    const filterToken = q.trim();
    console.log('getSuggestions', filterToken)
    if (typeof q !== 'string' || q.length < 3) {
      setRemoteDataSet(null)
      return
    }
    setLoading(true)
   
    const response = await fetch(`https://pare.wonyus.com/api/tname`)
    
    const items = await response.json()

    const suggestions = items

      .map((item) => ({
        id: String(item.PDtype_ID),
        title: item.ProducttypeName,
        
      }))

    setRemoteDataSet(suggestions)
    console.log(suggestions)
    setLoading(false)
  }, [])

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
        onSelectItem={(item) => {
          setSelectedItem(item);
          if (item) {
           
            onSelectRiceType(item.id);
            console.log('RiceType selected ID:', item.id);
          } else {
            
            onSelectRiceType(null);
          }
        }}
        loading={loading}
        onChangeText={getSuggestions}
        suggestionsListTextStyle={{
          color: '#8f3c96',
        }}
        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>}
      />
    
    </>
  )
})
