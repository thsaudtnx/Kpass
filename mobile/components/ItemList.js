import React from "react";
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import Item from "./Item";
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";

export default function ItemList(){
  const {showData} = useContext(LogContext);
  return (
    <View style={{
      width : '100%',
      height : '83%',
      padding : 10,}}>
      <FlatList
        keyExtractor={item => item.id}
        data={showData}
        ListFooterComponent={
          <View style={{padding : 20}}>
            <Text>더 이상 데이터가 없습니다.</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        renderItem={({item}) => <Item item={item}/>}
      />
    </View>
  );
};