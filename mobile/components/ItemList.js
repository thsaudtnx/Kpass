import React from "react";
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import Item from "./Item";
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";

export default function ItemList(){
  const {showData, fieldQuery, businessQuery, locationQuery} = useContext(LogContext);
  
  return (
    <View style={{
      width : '100%',
      height : '90%',
      paddingHorizontal : 10,
      paddingVertical : 5,}}>
      {(fieldQuery.isLoading || businessQuery.isLoading || locationQuery.isLoading) ? <ActivityIndicator /> :
      <FlatList
        keyExtractor={item => item.id}
        data={showData}
        ListFooterComponent={
          <View style={{padding : 20}}>
            <Text>NO MORE DATA</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        renderItem={({item}) => <Item item={item}/>}
      />}
    </View>
  );
};