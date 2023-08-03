import React, { useState } from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView, ActivityIndicator} from "react-native";
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

export default function Filter() {
  const {fieldId, setFieldId, fieldQuery} = useContext(LogContext);

  return (
    <View>
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
          <MaterialCommunityIcons name="filter" size={25} style={{color : PALETTE.BLACK}}/>
        </MenuTrigger>
        <MenuOptions style={{
          paddingBottom : 10,
          backgroundColor : PALETTE.BACKGROUND,}}>
          {fieldQuery.data && <ScrollView>
            {[{id : 0, english : 'All', korean : '모두'}, ...fieldQuery.data]?.map(item => (
              <MenuOption 
                key={item.id} 
                onSelect={() => setFieldId(item.id)} 
                text={(fieldId===item.id ? '\u2713  ' : '') + item.english}
                disabled={fieldId===item.id}
                style={{padding : 10}} />
            ))}
          </ScrollView>}
        </MenuOptions>
      </Menu>
    </View>
  );
};