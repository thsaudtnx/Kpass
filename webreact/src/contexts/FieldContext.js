import React from "react";
import { createContext, useState ,useEffect } from "react";
import axios from 'axios';
import { useCallback } from "react";
import {server} from '../lib/serverURL';

export const FieldContext = createContext();

export function FieldContextProvider ({children}) {
  const [fieldList, setFieldList] = useState();
  const [isUpdated, setIsUpdated] = useState(0);

  useEffect(() => {
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
  }, [isUpdated]);

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
