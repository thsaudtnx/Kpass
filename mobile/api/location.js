import client from "./client";
import * as Location from "expo-location";

export async function getLocation() {
  const foregroundPermission = await Location.requestForegroundPermissionsAsync();
  if (foregroundPermission){
    const {coords: { latitude, longitude }} = await Location.getCurrentPositionAsync();
    console.log('latitude : ', latitude,'longitude : ', longitude);
    return {latitude : latitude, longitude : longitude};
  } else {
    Alert.alert('위치 정보를 가져올 수 없습니다.');
  }
}