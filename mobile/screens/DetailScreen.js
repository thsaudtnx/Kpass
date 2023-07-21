import React, { useEffect } from "react";
import { View, Text, Image, Linking, ScrollView } from "react-native";
import PALETTE from "../styles/PALETTE";
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import server from "../lib/server";

export default function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    navigation.setOptions({headerTitle : route.params.name});
  }, [navigation]);

  return (
    <ScrollView style={{backgroundColor : PALETTE.BACKGROUND}}>
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
        <View>
          <Text style={{fontSize : 16, fontWeight : 'bold', marginBottom : 5}}>{route.params.item.name}</Text> 
          <Text>{route.params.item.type}</Text>
        </View>
      </View>

      <View style={{
        padding : 20,
        marginLeft : 10,
        marginRight : 10,
        marginBottom : 30,
        borderRadius : 10,
        backgroundColor : PALETTE.WHITE,}}>
        <View style={{
          flexDirection : 'row', 
          alignItems : 'center',
          marginBottom : 20,}}>
          <Icon name="call" size={25} style={{marginRight : 20, color : PALETTE.WHATSAPP_GREEN}}/>
          <TouchableWithoutFeedback onPress={()=>Linking.openURL(`tel:${route.params.item.phone}`)}>
            <Text style={{fontSize : 15,}}>{route.params.item.phone}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={{
          flexDirection : 'row', 
          alignItems : 'center',
          marginBottom : 20,}}>
          <Icon name="location-sharp" size={25} style={{marginRight : 20, color : PALETTE.LOCATION_RED}}/>
          <Text style={{fontSize : 15, flex : 1, flexWrap : 'wrap'}}>{route.params.item.address}</Text>
        </View>

        <View style={{flexDirection : 'row', alignItems : 'center', marginBottom : 10}}>
          <Image 
            source={require('../assets/icon_k_pass.png')} 
            resizeMode='contain'
            style={{
              width : 30,
              height : 30,
            }}
          />
          <Text style={{
            fontSize : 14,
            marginLeft : 20,}}>
            {route.params.item.kpass}%
          </Text>
        </View>
        
        <View style={{flexDirection : 'row', alignItems : 'center'}}>
          <Image 
            source={require('../assets/icon_travel.png')} 
            resizeMode='contain'
            style={{
              width : 30,
              height : 30,}}/>
          <Text style={{
            fontSize : 14,
            marginLeft : 20,
          }}>{route.params.item.travelwallet}%</Text>
        </View>
      </View>

      <View style={{marginBottom : 40}}>
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
            latitude : parseFloat(route.params.position.latitude),
            longitude : parseFloat(route.params.position.longitude),
            latitudeDelta : 0.5,
            longitudeDelta : 0.5, //나의 위치와 업체의 위치를 한눈에 들어오게 하는 델타 값구하기
          }}>
          <Marker
            coordinate={{latitude: parseFloat(route.params.item.latitude), longitude: parseFloat(route.params.item.longitude)}}
            title={route.params.item.name}
            description={route.params.item.address.split(',')[0]}
          />
        </ MapView>
      </View>
    </ScrollView>
  );
};