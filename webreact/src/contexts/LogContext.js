import React from "react";
import { createContext} from "react";
import axios from 'axios';
import { useMemo } from "react";
import { useCallback } from "react";

export const LogContext = createContext();

export function LogContextProvider({children}){
  const server = useMemo(() => 'http://127.0.0.1:5000', []); //server value change
  
  const checkAuth = useCallback(async () => {
    const result = await axios.get(`${server}/auth/authentication`,  { withCredentials: true });
    console.log(result.data);
    return result.data;
  }, []);

  return (
    <LogContext.Provider value={{
      server,
      checkAuth,}}>
      {children}
    </LogContext.Provider>
  );
}