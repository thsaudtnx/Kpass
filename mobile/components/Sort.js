import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
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

export default function Sort() {
  const {sortBy, setSortBy, locationPermission} = useContext(LogContext);

  const options = locationPermission ? [
    {label: 'ALL', value: 'ALL',},
    {label: 'DISTANCE', value: 'DISTANCE'},
    {label: 'KPASS', value: 'KPASS'},
    {label: 'TRAVELWALLET', value: 'TRAVELWALLET'},
  ] : [
    {label: 'ALL', value: 'ALL',},
    {label: 'KPASS', value: 'KPASS'},
    {label: 'TRAVELWALLET', value: 'TRAVELWALLET'},
  ];

  return (
    <View style={{}}>
      <Menu name="sortBy" renderer={SlideInMenu}>
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
          <MaterialCommunityIcons name="sort" size={25} style={{color : PALETTE.BLACK}}/>
        </MenuTrigger>
        <MenuOptions style={{
          paddingBottom : 10,
          backgroundColor : PALETTE.BACKGROUND
        }}>
          {options.map(o => (
            <MenuOption 
              key={o.label}
              onSelect={() => setSortBy(o.value)} 
              disabled={sortBy===o.value} 
              text={(sortBy===o.value ? '\u2713  ' : '') + o.label}
              style={{padding : 20}}
            />
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );
};