import React, { useEffect, useContext } from "react";
import { ActivityIndicator, View, Text, ImageBackground } from "react-native";
import { LogContext } from "../contexts/LogContext";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import PALETTE from "../styles/PALETTE";

export default function SplashScreen(){
  const {loadingGetData, loadingGetLocation} = useContext(LogContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (!loadingGetData && !loadingGetLocation) navigation.navigate('RootDrawer');
  }, [loadingGetData, loadingGetLocation]);
  return(
      <ImageBackground 
        source={require('../assets/oxpay-background.jpg')} 
        resizeMode="cover" 
        style={{
          width : '100%',
          height : '100%',
        }}
      >
        <View style={{
          position : 'relative', 
          display : 'flex', 
          flexDirection : 'column',
          height : '100%',
          width : '100%',}}>
          <View style={{
            marginTop : 350,
            width : '100%', 
            height : '40%',
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'center'}}>
            <Text style={{
              fontSize : 20, 
              fontWeight : 'bold',
              color : PALETTE.WHITE}}>
              Welcome to Kpass & TravelWallet!
            </Text>
          </View>
          <ActivityIndicator 
            size="large" 
            color={PALETTE.WHITE}
            style={{
              position : 'absolute',
              bottom : '50%', 
              left : '45%'
            }}
          />
        </View>
      </ImageBackground>
  );
};