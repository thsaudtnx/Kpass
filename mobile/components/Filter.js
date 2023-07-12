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
    {label: 'ALL', value: 'ALL',},
    {label: 'RESTURANT', value: 'RESTURANT'},
    {label: 'CAFE/BAKERY', value: 'CAFE/BAKERY'},
    {label: 'MART/TRANSPORT', value: 'MART/TRANSPORT'},
    {label: 'EDUCATION/CONSULTING', value: 'EDUCATION/CONSULTING'},
    {label: 'HEALTH/HOSPITAL', value: 'HEALTH/HOSPITAL'},
    {label: 'TRAVEL/FACILITY', value: 'TRAVEL/FACILITY'},
    {label: 'HAIR SALON', value: 'HAIR SALON'},
    {label: 'FITNESS', value: 'FITNESS'},
    {label: 'FASHION/SPORT', value: 'FASHION/SPORT'},
    {label: 'ETC', value: 'ETC', },
  ]);
  const [openSort, setOpenSort] = useState(false);
  const [itemsSort, setItemsSort] = useState(
    locationPermission ? [
      {label : 'ALL', value : 'ALL'},
      {label : 'DISTANCE', value : 'DISTANCE'},
      {label : 'KPASS', value : 'KPASS'},
      {label : 'TRAVELWALLET', value : 'TRAVELWALLET'},
    ] : [
      {label : 'ALL', value : 'ALL'},
      {label : 'KPASS', value : 'KPASS'},
      {label : 'TRAVELWALLET', value : 'TRAVELWALLET'},
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