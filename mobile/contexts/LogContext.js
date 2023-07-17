import React from "react";
import { createContext, useState } from "react";
import axios from 'axios';
import logsStorage from "../storages/logsStorage";
import { useEffect } from "react";
import * as Location from "expo-location";
import { ServerContainer } from "@react-navigation/native";

export const LogContext = createContext();
const server = 'http://13.215.32.109'; //이 값은 맨날 바뀌니깐 확인 필요

export function LogContextProvider({children}){
  const [position, setPosition] = useState({latitude : null, longitude : null,});
  const [locationPermission, setLocationPermission] = useState(true);
  const [inputText, setInputText] = useState('');
  const [field, setField] = useState('ALL');
  const [sortBy, setSortBy] = useState('ALL');
  const [data, setData] = useState();
  const [showData, setShowData] = useState();
  const [loadingGetData, setLoadingGetData] = useState(true);
  const [loadingGetLocation, setLoadingGetLocation] = useState(true);
  const dateFormatter = (date) => {
    return date.getFullYear() + "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
    ("00" + date.getDate()).slice(-2) + " " +
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);
  }

  useEffect(() => {
    //logsStorage.clearAll();
    (async () => {
      const updatedAt = await logsStorage.getUpdatedAt();
      if (updatedAt) {
        console.log(`The device is last updated at ${updatedAt}`);
        let storageData = await logsStorage.getData();
        const serverData = await axios.get(`${server}/mobile`, {
          params : {
            updatedAt : updatedAt
          }
        });
        console.log('Updated server data : ', serverData.data);
        if (serverData.data.length!==0){
          let newData = [...storageData];
          serverData.data.forEach(servd => {
            flag = false;
            storageData.forEach(stord => {
              if (servd.id===stord.id){
                flag = true;
                if (servd.deletedAt) newData = newData.filter(d => d.id!==servd.id);
                else if (servd.createdAt !== servd.updatedAt) newData = newData.map(d => d.id===servd.id ? servd : d);
              }
            });
            if (!flag) newData = [...newData, servd];
          })
          setData(newData);
          logsStorage.setData(newData);
          logsStorage.setUpdatedAt(dateFormatter(new Date()));
          console.log({updatedAt : dateFormatter(new Date()), data : newData});
        } else {
          setData(storageData);
        }
      } else {
        console.log(`The device is new`);
        const serverData = await axios.get(`${server}/mobile`);
        console.log('서버 데이터 : ', serverData.data);
        setData(serverData.data);
        logsStorage.setData(serverData.data);
        logsStorage.setUpdatedAt(dateFormatter(new Date()));
        console.log({updatedAt : dateFormatter(new Date()), data : serverData.data});
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
      data
        ?.filter(d => d.name.includes(inputText) && (field==='ALL' ? true : d.field===field))
        ?.sort((a, b) => {
          if (sortBy==='ALL') return 1;
          else if (sortBy==='DISTANCE'){
            const dis_a = (a.latitude - position.latitude)**2 + (a.longitude - position.longitude)**2;
            const dis_b = (b.latitude - position.latitude)**2 + (b.longitude - position.longitude)**2;
            if (dis_a > dis_b) return 1;
            else return -1;
          }
          else if (sortBy==='KPASS') return b.kpass - a.kpass;
          else if (sortBy==='TRAVELWALLET') return b.travelwallet - a.travelwallet;
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