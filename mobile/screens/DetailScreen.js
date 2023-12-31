import React, { useEffect } from "react";
import { View, Text, Image, Linking, ScrollView } from "react-native";
import PALETTE from "../styles/PALETTE";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { getField } from "../api/field";

export default function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {data, isLoading} = useQuery('field', getField);

  useEffect(() => {
    navigation.setOptions({headerTitle : route.params.name});
  }, [navigation]);

  return (
    <ScrollView style={{backgroundColor : PALETTE.BACKGROUND}}>
      <View style={{
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 20,
        paddingTop : 20,
        paddingBottom : 10,}}>
        <Image 
          source={route.params.item.logo ? {uri :route.params.item.logo} : require('../assets/kpass-app-button(no-bg).png')} 
          resizeMode='contain'
          style={{
            width : 70,
            height : 70,
            marginBottom : 5,
            marginRight : 20,
          }}
        />
        <View>
          <Text style={{fontSize : 16, fontWeight : 'bold', marginBottom : 5}}>{route.params.item.name}</Text> 
          <Text>{data?.find(field => field.id===route.params.item.field_id)?.english}</Text>
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
          <Icon name="call" size={20} style={{marginRight : 20, color : PALETTE.WHATSAPP_GREEN}}/>
          <TouchableWithoutFeedback onPress={()=>Linking.openURL(`tel:${route.params.item.phone}`)}>
            <Text style={{fontSize : 14,}}>{route.params.item.phone}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={{
          flexDirection : 'row', 
          alignItems : 'center',
          marginBottom : 20,}}>
          <Icon name="location-sharp" size={20} style={{marginRight : 20, color : PALETTE.LOCATION_RED}}/>
          <Text style={{fontSize : 14, flex : 1, flexWrap : 'wrap'}}>{route.params.item.address}</Text>
        </View>
        <View style={{
          flexDirection : 'row', 
          alignItems : 'center',
          marginBottom : 20,}}>
          <MaterialIcon name="add-location-alt" size={20} style={{marginRight : 20, color : PALETTE.GRAY}} />
          <Text style={{fontSize : 14, flex : 1, flexWrap : 'wrap'}}>{route.params.item.addressdetail}</Text>
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
            latitudeDelta : 0.1,
            longitudeDelta : 0.1, //나의 위치와 업체의 위치를 한눈에 들어오게 하는 델타 값구하기
          }}
        >
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