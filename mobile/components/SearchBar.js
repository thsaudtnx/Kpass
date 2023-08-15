import React, { useState } from "react";
import { View, Keyboard, Dimensions, TextInput } from "react-native";
import PALETTE from "../styles/PALETTE";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function SearchBar() {
  const {setInputText} = useContext(LogContext);
  const deviceWidth = Dimensions.get('window').width;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{padding : 10, position : 'relative'}}>
        <Ionicons 
          name="search" 
          size={20} 
          style={{
            position : 'absolute', 
            marginLeft : 20, 
            marginTop : 20,
            zIndex : 1,
            color : PALETTE.GRAY
          }} 
        />
        <TextInput style={{
          width : deviceWidth / 1.5,
          minWidth : 200,
          maxWidth : 500,
          borderWidth : 1,
          borderColor : PALETTE.BORDER,
          borderRadius : 10,
          paddingLeft : 40,
          paddingTop : 10,
          paddingBottom : 10,
          paddingRight : 10,
          backgroundColor : PALETTE.WHITE,
          color : PALETTE.BLACK}}
          onChangeText={text => setInputText(text)}
          placeholder="SEARCH BY NAME"
        />
      </View>
    </TouchableWithoutFeedback>
    
  );
};
