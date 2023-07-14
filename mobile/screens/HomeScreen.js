import React, { useEffect } from "react";
import PALETTE from "../styles/PALETTE";
import { View } from "react-native";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import ItemList from "../components/ItemList";
import { useNavigation } from "@react-navigation/native";
import { MenuProvider } from 'react-native-popup-menu';
import Sort from "../components/Sort";

const HomeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTintColor : PALETTE.WHITE, 
      headerStyle: {backgroundColor: PALETTE.PURPLE,},
    });
  }, [navigation]);

  return (
    <MenuProvider>
      <View style={{backgroundColor : PALETTE.BACKGROUND, flex : 1,}}>
        <View 
          style={{
            display : 'flex', 
            flexDirection : 'row',
            alignItems : 'center',
            position : 'relative',
          }}
        >
          <SearchBar />
          <Filter/>
          <Sort />
        </View>
        <ItemList/>
      </View>
    </MenuProvider>
  );
};

export default HomeScreen;