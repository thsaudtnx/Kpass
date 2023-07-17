import React from "react";
import {View, TouchableOpacity, Image, Text} from 'react-native';
import PALETTE from "../styles/PALETTE";
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";
import { useNavigation } from "@react-navigation/native";

export default function Item({item}){
  const navigation = useNavigation();
  const {position, server} = useContext(LogContext);
  return (
    <TouchableOpacity 
      onPress={() => navigation.push('Detail', {item, position})}
      style={{
        padding : 10,
        backgroundColor : PALETTE.WHITE,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderRadius : 10,}}>
        <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center', padding : 10}}>
          <Image 
            source={item.logo && {uri : server + item.logo.split('5000')[1]}} 
            resizeMode='contain'
            style={{
              width : 70,
              height : 70,
              marginRight : 15}}/>
          <View>
            <Text style={{marginBottom : 5, fontSize : 17, fontWeight : 'bold'}}>{item.name}</Text>
            <Text style={{fontSize : 12}}>{item.address?.split(',')[0]}</Text>
          </View>
        </View>
        <View 
          style={{
            flexDirection : 'column', 
            justifyContent : 'space-around', 
            padding : 10,
          }}>
          <View style={{flexDirection : 'row', alignItems : 'center', marginBottom : 10}}>
            <Image 
              source={require('../assets/icon_k_pass.png')} 
              resizeMode='contain'
              style={{
                width : 30,
                height : 30,}}/>
            <Text style={{
              fontWeight : 'bold',
              fontSize : 14,
              marginLeft : 10,}}>
              {item.kpass}%
            </Text>
          </View>
          
          <View style={{flexDirection : 'row', alignItems : 'center'}}>
            <Image 
              source={require('../assets/icon_travel.png')} 
              resizeMode='contain'
              style={{
                width : 30,
                height : 30,}}/>
            <Text style={{
              fontWeight : 'bold',
              fontSize : 14,
              marginLeft : 10,
            }}>{item.travelwallet}%</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
};