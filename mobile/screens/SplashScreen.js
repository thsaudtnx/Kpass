import React, { useEffect, useContext } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { LogContext } from "../contexts/LogContext";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

export default function SplashScreen(){
  const {loadingGetData, loadingGetLocation} = useContext(LogContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (!loadingGetData && !loadingGetLocation) navigation.navigate('RootDrawer');
  }, [loadingGetData, loadingGetLocation]);
  return(
    <SafeAreaView>
      <View style={{
        position : 'relative', 
        display : 'flex', 
        flexDirection : 'column',
        height : '100%',
        width : '100%',}}>
        <View style={{
          marginTop : 200,
          width : '100%', 
          height : '40%',
          display : 'flex',
          flexDirection : 'row',
          justifyContent : 'center'}}>
          <Text style={{fontSize : 20, fontWeight : 'bold'}}>Welcome to Kpass & TravelWallet!</Text>
        </View>
        <ActivityIndicator 
          size="large" 
          style={{
            position : 'absolute', 
            bottom : '30%', 
            left : '45%'
          }}
        />
      </View>
    </SafeAreaView>
  );
};