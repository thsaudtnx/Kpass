import React, { useEffect } from "react";
import { View, Text, Image, Linking } from "react-native";
import PALETTE from "../styles/PALETTE";
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";

export default function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {server} = useContext(LogContext);

  useEffect(() => {
    navigation.setOptions({headerTitle : route.params.name});
  }, [navigation]);

  return (
    <View style={{backgroundColor : PALETTE.BACKGROUND}}>
      <View style={{
        flexDirection : 'row',
        alignItems : 'center',
        padding : 20,}}>
        <Image 
          source={route.params.item.logo && {uri : server + route.params.item.logo.split('5000')[1]}} 
          resizeMode='contain'
          style={{
            width : 100,
            height : 100,
            marginBottom : 5,
            marginRight : 20,
          }}
        />
        <Text style={{fontSize : 16, fontWeight : 'bold'}}>{route.params.item.name}</Text> 
      </View>

      <View style={{
        padding : 20,
        marginLeft : 10,
        marginRight : 10,
        marginBottom : 30,
        borderRadius : 10,
        backgroundColor : PALETTE.LIGHT_PURPLE,}}>
        <View style={{
          flexDirection : 'row', 
          alignItems : 'center',
          marginBottom : 20,}}
          onPress={()=>Linking.openURL(`tel:${route.params.item.phone}`)}>
          <Icon name="call" size={25} style={{marginRight : 20, color : PALETTE.WHATSAPP_GREEN}}/>
          <Text style={{fontSize : 15,}}>{route.params.item.phone}</Text>
        </View>
        <View style={{
          flexDirection : 'row', 
          alignItems : 'center',
          marginBottom : 20,}}
          onPress={() => Clipboard.setString(route.params.item.address)}>
          <Icon name="location-sharp" size={25} style={{marginRight : 20, color : PALETTE.LOCATION_RED}}/>
          <Text style={{fontSize : 15,}}>{route.params.item.address}</Text>
        </View>
        <View style={{flexDirection : 'row', alignItems : 'center', marginBottom : 20}}>
          <Text style={{
            fontWeight : 'bold',
            color : PALETTE.WHITE,
            backgroundColor : PALETTE.RED,
            borderRadius : 10,
            paddingTop : 2,
            paddingBottom : 2,
            paddingLeft : 10,
            paddingRight : 10,}}>
            KPASS
          </Text>
          <Text style={{
            fontWeight : 'bold',
            color : PALETTE.WHITE,
            marginLeft : 10,
          }}>{route.params.item.kpass}%</Text>
        </View>
        
        <View style={{flexDirection : 'row', alignItems : 'center'}}>
          <Text style={{
            fontWeight : 'bold',
            color : PALETTE.WHITE,
            backgroundColor : PALETTE.BLUE,
            borderRadius : 10,
            paddingTop : 2,
            paddingBottom : 2,
            paddingLeft : 10,
            paddingRight : 10,}}>
            TRAVELWALLET
          </Text>
          <Text style={{
            fontWeight : 'bold',
            color : PALETTE.WHITE,
            marginLeft : 10,
          }}>{route.params.item.travelwallet}%</Text>
        </View>
      </View>

      <View>
        <MapView
          style={{height : 350, width : '90%', marginLeft : '5%'}}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          initialRegion={{
            ...route.params.position,
            latitudeDelta : 0.5,
            longitudeDelta : 0.5, //나의 위치와 업체의 위치를 한눈에 들어오게 하는 델타 값구하기
          }}>
          <Marker
            coordinate={{latitude: route.params.item.latitude, longitude: route.params.item.longitude}}
            title={route.params.item.name}
            description={route.params.item.address.split(',')[0]}
          />
        </ MapView>
      </View>
    </View>
  );
};