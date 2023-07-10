import React, { useState } from "react";
import { View, Text, TouchableOpacity, } from "react-native";
import PALETTE from "../styles/PALETTE";
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";

export default function Filter() {
  const {sortBy, setSortBy, field, setField, locationPermission} = useContext(LogContext);
  const [openField, setOpenField] = useState(false);
  const [itemsField, setItemsField] = useState([
    {label: '전체', value: '전체',},
    {label: '요식업', value: '요식업'},
    {label: '식품/유통', value: '식품/유통'},
    {label: '미용', value: '미용'},
    {label: '공공기관', value: '공공기관'},
    {label: '기타', value: '기타', },
  ]);
  const [openSort, setOpenSort] = useState(false);
  const [itemsSort, setItemsSort] = useState(
    locationPermission ? [
      {label : '전체', value : '전체'},
      {label : '거리 순', value : '거리 순'},
      {label : 'KPASS 순', value : 'kpass 순'},
      {label : 'TRAVELWALLET 순', value : 'travelwallet 순'},
    ] : [
      {label : '전체', value : '전체'},
      {label : 'KPASS 순', value : 'kpass 순'},
      {label : 'TRAVELWALLET 순', value : 'travelwallet 순'},
    ]
  );

  return (
    <View style={{
      display : 'flex', 
      flexDirection : 'row', 
      alignItems : 'center', 
      justifyContent : 'space-between', 
      width : '95%', 
      padding : 10, 
      zIndex : 1}}>
      <View style={{
        display : 'flex', 
        flexDirection : 'row', 
        alignItems : 'center', 
        width : 120}}>
        <DropDownPicker
          style={{borderWidth : 0}}
          open={openField}
          value={field}
          items={itemsField}
          setOpen={setOpenField}
          setValue={setField}
          setItems={setItemsField}
          closeAfterSelecting={true}
          dropDownContainerStyle={{
            borderWidth : 0,
          }}
          renderListItem={({label, value}) => 
            <TouchableOpacity 
              style={{padding : 15,}} 
              onPress={() => {
                setField(value); 
                setOpenField(false);
              }}>
              <Text>{label}</Text>
            </TouchableOpacity>
          }
        />
      </View>

      <View style={{
        display : 'flex', 
        flexDirection : 'row', 
        alignItems : 'center', 
        width : 155}}>
        <MaterialCommunityIcons name="sort" size={25} style={{color : PALETTE.BLACK}}/>
        <DropDownPicker
          style={{
            borderWidth : 0,
            backgroundColor : PALETTE.BACKGROUND, 
            fontSize : 14, 
            fontWeight : 'bold'}}
          open={openSort}
          value={sortBy}
          items={itemsSort}
          setOpen={setOpenSort}
          setValue={setSortBy}
          setItems={setItemsSort}
          showArrowIcon={false}
          closeAfterSelecting={true}
          dropDownContainerStyle={{
            borderWidth : 0,
          }}
          renderListItem={({label, value}) => 
            <TouchableOpacity 
              style={{padding : 15,}} 
              onPress={() => {
                setSortBy(value); 
                setOpenSort(false);
              }}>
              <Text>{label}</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
};