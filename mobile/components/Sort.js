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
  const {sortBy, setSortBy, locationQuery} = useContext(LogContext);

  const options = locationQuery.data ? [
    {id: 0, name: 'All',},
    {id: 1, name: 'Distance'},
    {id: 2, name: 'Kpass'},
    {id: 3, name: 'Travelwallet'},
  ] : [
    {id: 0, name: 'All',},
    {id: 2, name: 'Kpass'},
    {id: 3, name: 'Travelwallet'},
  ];

  return (
    <View>
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
          <MaterialCommunityIcons name="sort" size={20} style={{color : PALETTE.BLACK}}/>
        </MenuTrigger>
        <MenuOptions style={{
          paddingBottom : 10,
          backgroundColor : PALETTE.BACKGROUND
        }}>
          {options.map(o => (
            <MenuOption 
              key={o.id}
              onSelect={() => setSortBy(o.id)} 
              disabled={sortBy===o.id} 
              text={(sortBy===o.id ? '\u2713  ' : '') + o.name}
              style={{padding : 10}}
            />
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );
};