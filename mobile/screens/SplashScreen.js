import React, { useEffect, useContext } from "react";
import { ActivityIndicator, View, Text, ImageBackground, Image } from "react-native";
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
        source={require('../assets/splash.png')} 
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
            marginTop : 200,
            width : '100%', 
            height : '40%',
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'center'}}>
            <Text style={{
              fontSize : 20, 
              fontWeight : 'bold',
              color : PALETTE.WHITE,
              padding : 30,}}>
              Welcome to Kpass & TravelWallet!
            </Text>
          </View>
          <View style={{display : 'flex', flexDirection : 'row', justifyContent : 'center', marginBottom : 20}}>
            <ActivityIndicator 
              size="large" 
              color={PALETTE.WHITE}
            />
          </View>
          <View style={{display : 'flex', flexDirection : 'row', justifyContent : 'center'}}>
            <Image 
              source={require('../assets/oxpay-logo-white.png')} 
              resizeMode='contain'
              style={{
                width : 100,
                height : 50,
              }}
            />
          </View>
        </View>
      </ImageBackground>
  );
};