import { StatusBar } from 'expo-status-bar';
import home from './assets/screen/home';
import {Image, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import productDetail from './assets/screen/productDetail';
import checkMember from './assets/screen/checkMember';
import sellHT from './assets/screen/sellHT';
import Sell from './assets/screen/Sell';
const Stack = createNativeStackNavigator();
import {RiceName} from './assets/components/RiceName';
export default function App() {
  useEffect(() => {
  fetch('https://pare.wonyus.com/api/product') 
    .then((res) => res.json())
    .then((data) => {
      console.log('Users:', data);
    })
    .catch((err) => {
      console.error('Error:', err);
    });
}, []);

useEffect(() => {
  fetch(`https://pare.wonyus.com/api/productT/${2}/types`) 
    .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
    .then((data) => {
      console.log('Users:', data);
    })
    .catch((err) => {
      console.error('Error:', err);
    });
}, []);

  return (
   
    <NavigationContainer>
      
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
        
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="cMember" component={checkMember}/>
        <Stack.Screen name="sell" component={Sell}/>
        <Stack.Screen name="sellht" component={sellHT}/>
        <Stack.Screen name="Product" component={productDetail} />
         <Stack.Screen name="RiceName" component={RiceName} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
});
