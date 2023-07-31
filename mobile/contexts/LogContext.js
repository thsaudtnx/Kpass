import React from "react";
import { createContext, useState } from "react";
import logsStorage from "../storages/logsStorage";
import { useEffect } from "react";
import * as Location from "expo-location";
import client from "../api/client";
import { useQuery } from "react-query";
import { getField } from "../api/field";
import { getBusiness } from "../api/business";
import { getLocation } from "../api/location";

export const LogContext = createContext();

export function LogContextProvider({children}){
  const [inputText, setInputText] = useState('');
  const [fieldId, setFieldId] = useState(0);
  const [sortBy, setSortBy] = useState(0); //0 All, 1 Distance, 2 Kpass, 3 Travelwallet
  const [showData, setShowData] = useState();
  const fieldQuery = useQuery('field', getField);
  const businessQuery = useQuery('business', getBusiness);
  const locationQuery = useQuery('location', getLocation);

  useEffect(() => {
    setShowData(
      businessQuery?.data
        ?.filter(d => d.name.includes(inputText) && (fieldId===0 ? true : d.field_id===fieldId))
        ?.sort((a, b) => {
          if (sortBy===0) return 1;
          else if (sortBy===1){
            const dis_a = (a.latitude - locationQuery.data.latitude)**2 + (a.longitude - locationQuery.data.longitude)**2;
            const dis_b = (b.latitude - locationQuery.data.latitude)**2 + (b.longitude - locationQuery.data.longitude)**2;
            if (dis_a > dis_b) return 1;
            else return -1;
          }
          else if (sortBy===2) return b.kpass - a.kpass;
          else if (sortBy===3) return b.travelwallet - a.travelwallet;
        })
    )
  }, [inputText, sortBy, fieldId, (fieldQuery.isLoading || businessQuery.isLoading || locationQuery.isLoading)]);

  return (
    <LogContext.Provider value={{
      fieldQuery,
      businessQuery,
      locationQuery,
      inputText,
      setInputText,
      fieldId,
      setFieldId,
      sortBy,
      setSortBy,
      showData,}}>
      {children}
    </LogContext.Provider>
  );
}