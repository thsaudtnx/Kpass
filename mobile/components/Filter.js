import React, { useState } from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView} from "react-native";
import PALETTE from "../styles/PALETTE";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { renderers } from 'react-native-popup-menu';
const { SlideInMenu } = renderers;

const options = [
  {label: 'ALL', value: 'ALL',},
  {label: 'RESTAURANT', value: 'RESTURANT'},
  {label: 'CAFE/BAKERY', value: 'CAFE/BAKERY'},
  {label: 'MART/TRANSPORT', value: 'MART/TRANSPORT'},
  {label: 'EDUCATION/CONSULTING', value: 'EDUCATION/CONSULTING'},
  {label: 'HEALTH/HOSPITAL', value: 'HEALTH/HOSPITAL'},
  {label: 'TRAVEL/FACILITY', value: 'TRAVEL/FACILITY'},
  {label: 'HAIR SALON', value: 'HAIR SALON'},
  {label: 'FITNESS', value: 'FITNESS'},
  {label: 'FASHION/SPORT', value: 'FASHION/SPORT'},
  {label: 'ETC', value: 'ETC', },
];

export default function Filter() {
  const {field, setField} = useContext(LogContext);

  return (
    <View style={{}}>
      <Menu name="filter" renderer={SlideInMenu}>
        <MenuTrigger 
          customStyles={{
            TriggerTouchableComponent: TouchableOpacity,
          }}
          style={{
            display : 'flex', 
            flexDirection : 'row', 
            alignItems : 'center', 
            padding : 10
          }}
        >
          <MaterialCommunityIcons name="filter" size={25} style={{color : PALETTE.BLACK, marginRight : 5}}/>
        </MenuTrigger>
        <MenuOptions style={{
          paddingBottom : 10,
          backgroundColor : PALETTE.BACKGROUND,
        }}>
          <ScrollView>
            {options.map(o => (
              <MenuOption 
                key={o.label} 
                onSelect={() => setField(o.value)} 
                text={(field===o.value ? '\u2713  ' : '') + o.label}
                disabled={field===o.value}
                style={{padding : 15}} />
            ))}
          </ScrollView>
        </MenuOptions>
      </Menu>
    </View>
  );
};