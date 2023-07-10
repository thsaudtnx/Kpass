import React from "react";
import { createContext, useState } from "react";
import axios from 'axios';
import logsStorage from "../storages/logsStorage";
import { useEffect } from "react";
import * as Location from "expo-location";

export const LogContext = createContext();
const server = 'http://192.168.0.126:5000'; //이 값은 맨날 바뀌니깐 확인 필요

export function LogContextProvider({children}){
  const [position, setPosition] = useState({latitude : null, longitude : null,});
  const [locationPermission, setLocationPermission] = useState(true);
  const [inputText, setInputText] = useState('');
  const [field, setField] = useState('전체');
  const [sortBy, setSortBy] = useState('전체');
  const [data, setData] = useState();
  const [showData, setShowData] = useState();
  const [loadingGetData, setLoadingGetData] = useState(true);
  const [loadingGetLocation, setLoadingGetLocation] = useState(true);


  useEffect(() => {
    (async () => {
      const updatedAt = await logsStorage.getUpdatedAt();
      if (updatedAt) {
        console.log(`The device is last updated at ${updatedAt}`);
        const serverData = await axios.get(`${server}/mobile`, {
          params : {
            updatedAt : updatedAt
          }
        });
        const storageData = await logsStorage.getData();
        console.log('업데이트된 서버 데이터 : ', serverData.data);
        console.log('로컬 데이터 : ', storageData);
        setData(storageData);
        if (serverData.data){
          for (let servd in serverData.data){
            const found = storageData.find(stord => servd.id===stord.id);
            if (found){
              if (servd.deletedAt!==null) setData(data.filter(d => d.id!==found.id));
              else setData(data.map(d => d.id===servd.id ? servd : d));
            } else setData(data.concat(found));
          }
          logsStorage.setData(data);
          logsStorage.setUpdatedAt(new Date());
        } else {}
      } else {
        console.log(`The device is new`);
        const serverData = await axios.get(`${server}/mobile`);
        console.log('서버 데이터 : ', serverData.data);
        setData(serverData);
        logsStorage.setData(serverData);
        logsStorage.setUpdatedAt();
      }
      setLoadingGetData(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const foregroundPermission = await Location.requestForegroundPermissionsAsync();
        if (foregroundPermission){
          setLocationPermission(true);
          const {coords: { latitude, longitude }} = await Location.getCurrentPositionAsync();
          setPosition({...position, latitude : latitude, longitude : longitude});
          console.log('latitude : ', latitude,'longitude : ', longitude);
        } else {
          setLocationPermission(false);
          Alert.alert('위치 정보를 가져올 수 없습니다.');
        }
        setLoadingGetLocation(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    setShowData(
      data?.filter(d => d.name.includes(inputText) && (field==='전체' ? true : d.field===field))
        .sort((a, b) => {
          if (sortBy==='전체') return 1;
          else if (sortBy==='거리 순'){
            const dis_a = (a.latitude - position.latitude)**2 + (a.longitude - position.longitude)**2;
            const dis_b = (b.latitude - position.latitude)**2 + (b.longitude - position.longitude)**2;
            if (dis_a < dis_b) return 1;
            else return -1;
          }
          else if (sortBy==='kpass 순') return a.kpass - b.kpass;
          else if (sortBy==='travelwallet 순') return a.travelwallet - b.travelwallet;
        })
    )
  }, [inputText, sortBy, field, data]);

  return (
    <LogContext.Provider 
      value={{
        server,
        position, 
        setPosition, 
        locationPermission,
        setLocationPermission,
        inputText,
        setInputText,
        field,
        setField,
        sortBy,
        setSortBy,
        data,
        setData,
        showData,
        loadingGetData,
        loadingGetLocation,
      }}
    >
      {children}
    </LogContext.Provider>
  );
}