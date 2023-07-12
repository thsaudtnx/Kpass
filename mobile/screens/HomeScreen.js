import React, { useEffect } from "react";
import PALETTE from "../styles/PALETTE";
import { View } from "react-native";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import ItemList from "../components/ItemList";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTintColor : PALETTE.WHITE, 
      headerStyle: {backgroundColor: PALETTE.PURPLE,},
    });
  }, [navigation]);

  return (
    <View style={{backgroundColor : PALETTE.BACKGROUND, flex : 1}}>
      <SearchBar />
      <Filter/>
      <ItemList/>
    </View>
  );
};

export default HomeScreen;