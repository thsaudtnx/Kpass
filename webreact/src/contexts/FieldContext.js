import React from "react";
import { createContext, useState ,useEffect } from "react";
import axios from 'axios';
import { useCallback } from "react";
import {server} from '../lib/serverURL';

export const FieldContext = createContext();

export function FieldContextProvider ({children}) {
  const [fieldList, setFieldList] = useState([
    {id: 1, name: 'ALL',},
    {id : 2, name: 'RESTURANT'},
    {id: 3, name: 'CAFE/BAKERY'},
    {id: 4, name: 'MART/TRANSPORT'},
    {id: 5, name: 'EDUCATION/CONSULTING'},
    {id: 6, name: 'HEALTH/HOSPITAL'},
    {id: 7, name: 'TRAVEL/FACILITY'},
    {id: 8, name: 'HAIR SALON'},
    {id: 9, name: 'FITNESS'},
    {id: 10, name: 'FASHION/SPORT'},
    {id: 11, name: 'ETC', },
  ]);
  const [isUpdated, setIsUpdated] = useState(0);

  /* useEffect(() => {
    (async () => {
      await axios.get(`${server}/field`)
        .then(res => {
          console.log(res.data);
          setFieldList(res.data);
        })
        .catch(err => {
          console.error(err);
        })
    })();
  }, [isUpdated]); */

  return (
    <FieldContext.Provider value={{
      fieldList,
      setFieldList,
      isUpdated,
      setIsUpdated,
    }}>
      {children}
    </FieldContext.Provider>
  );
};
