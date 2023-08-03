import React from "react";
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import Item from "./Item";
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";
import { Loading } from "./Loading";

export default function ItemList(){
  const {showData, fieldQuery, businessQuery, locationQuery} = useContext(LogContext);
  
  return (
    <View style={{
      paddingHorizontal : 10,
      paddingVertical : 5,
      width : '100%',
      height : '100%'}}>
      {(fieldQuery.isLoading || businessQuery.isLoading || locationQuery.isLoading) ? <Loading /> :
      <FlatList
        keyExtractor={item => item.id}
        data={showData}
        ListFooterComponent={
          <View style={{
            paddingBottom : 80,
            display : 'flex', 
            flexDirection : 'row', 
            justifyContent : 'center'
          }}/>
        }
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Item item={item}/>}
      />}
    </View>
  );
};