import { StatusBar } from 'expo-status-bar';
import DatetimePicker from '@react-native-community/datetimepicker';
import { useState,useEffect } from 'react';
import {Image, StyleSheet} from 'react-native';

import {Pressable,Button,  Text, View } from 'react-native';

const timea = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [date, setDate] = useState(new Date().toLocaleDateString());
    useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
    return <Text style={styles.date}>{date},{time}</Text>;
        
        };

const styles = StyleSheet.create({
    date: {
    marginHorizontal: 16,
	  alignItems: 'center',
	  flexDirection: 'row',
    fontSize: 24,
    justifyContent: 'flex-end',
    fontWeight: 'bold',
    
    }
});
  export default timea;