import React from "react";
import {View, TouchableOpacity, Image, Text, Dimensions} from 'react-native';
import PALETTE from "../styles/PALETTE";
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";
import { useNavigation } from "@react-navigation/native";


export default function Item({item}){
  const navigation = useNavigation();
  const {locationQuery, fieldQuery} = useContext(LogContext);
  const deviceWidth = Dimensions.get('window').width;

  return (
    <TouchableOpacity 
      onPress={() => navigation.push('Detail', {item, position : locationQuery.data})}
      style={{
        padding : 5,
        backgroundColor : PALETTE.WHITE,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderRadius : 10,}}>
        <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center', padding : 10}}>
          <Image 
            source={item.logo ? {uri : item.logo} : require('../assets/kpass-app-button(no-bg).png')} 
            resizeMode='contain'
            style={{
              width : 60,
              height : 60,
              marginRight : 15}}/>
          <View>
            <Text style={{ 
              fontSize : 14, 
              fontWeight : 'bold',
              width : deviceWidth / 3,
              }} numberOfLines={1}>{item.name}</Text>
            <Text style={{fontSize : 12}}>{fieldQuery.data?.find(field => field.id===item.field_id)?.english}</Text>
          </View>
        </View>
        <View 
          style={{
            flexDirection : 'column', 
            justifyContent : 'space-around',
            paddingHorizontal : 15,
            paddingVertical : 5, 
          }}>
          <View style={{flexDirection : 'row', alignItems : 'center', marginBottom : 10}}>
            <Image 
              source={require('../assets/icon_k_pass.png')} 
              resizeMode='contain'
              style={{
                width : 25,
                height : 25,}}/>
            <Text style={{
              fontWeight : 'bold',
              fontSize : 13,
              marginLeft : 10,}}>
              {item.kpass}%
            </Text>
          </View>
          
          <View style={{flexDirection : 'row', alignItems : 'center'}}>
            <Image 
              source={require('../assets/icon_travel.png')} 
              resizeMode='contain'
              style={{
                width : 25,
                height : 25,}}/>
            <Text style={{
              fontWeight : 'bold',
              fontSize : 13,
              marginLeft : 10,
            }}>{item.travelwallet}%</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
};