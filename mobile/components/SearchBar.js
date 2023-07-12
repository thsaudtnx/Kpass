import React, { useState } from "react";
import { View, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import PALETTE from "../styles/PALETTE";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function SearchBar() {
  const {setInputText} = useContext(LogContext);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{padding : 10, position : 'relative'}}>
        <Ionicons 
          name="search" 
          size={25} 
          style={{
            position : 'absolute', 
            left : 20, 
            top : 22, 
            zIndex : 1,
            color : PALETTE.GRAY
          }} 
        />
        <TextInput style={{
          borderWidth : 1,
          borderColor : PALETTE.BORDER,
          borderRadius : 10,
          paddingLeft : 40,
          paddingTop : 15,
          paddingBottom : 15,
          backgroundColor : PALETTE.WHITE,
          width : '100%',
          color : PALETTE.BLACK}}
          onChangeText={text => setInputText(text)}
          placeholder="SEARCH BY NAME"
        />
      </View>
    </TouchableWithoutFeedback>
    
  );
};
