import { StatusBar } from 'expo-status-bar';
import Header from './Header';
import { useState,useEffect } from 'react';
import {TouchableOpacity,Image, StyleSheet} from 'react-native';
import ShowTime from './showTime';
import {Pressable,Button,  Text, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';



export default function checkMember({navigation}) {

    return (
      <View style={styles.container}>
        <Header 
        headerBg={"#A52A2A"}
        iconColor = {"white"}
        homes 
        title={"ร้านอุดมโชคค้าข้าว"}
        optionalBtn="bell"
        optionalFunc={() => console.log('optional')}/>
        <ShowTime/>
      <View style={styles.wrapper}>
        <View style={styles.Tablea}>
            
          <View style={styles.Tableb}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Product')}>
          <Feather name="home" size={60} color="black" style={styles.icon} />
          <Text style={styles.text}>หน้าร้าน</Text>
        </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('sell')}>
          <Feather name="phone" size={60} color="black" style={styles.icon} />
          <Text style={styles.text}>โทรศัพท์</Text>
        </TouchableOpacity>
        
          </View>
           
           
          
      
        
      </View>

      </View>

        
               
        
      </View>
      
      
    );
  }
 
  
  
  
  const styles = StyleSheet.create({
    container: {
    
		  alignItems: 'center',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
      
    },
    wrapper:{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    },
    Tablea:{
      magin: 15
    },
    Tableb:{
      flexDirection :'row',
      padding: 15,
      
    },
    button:{
      height: 100,
      width: 200,
      margin: 10,
      alignItems : 'center',
      elevation: 8,
      backgroundColor : '#DCDCDC',
    },
     button1:{
      height: 100,
      width: 400,
      alignItems : 'center',
      elevation: 8,
      backgroundColor : '#DCDCDC',
    },
    
   
  });
  