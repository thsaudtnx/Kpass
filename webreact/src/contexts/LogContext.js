import React, { useState } from "react";
import { createContext} from "react";
import axios from 'axios';
import { useCallback } from "react";
import {server} from '../lib/serverURL';

export const LogContext = createContext();

export function LogContextProvider({children}){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const checkAuth = useCallback(async () => {
    const result = await axios.get(`${server}/auth/authentication`,  { withCredentials: true });
    setIsLoggedIn(result.data.authenticated);
    console.log(result.data);
  }, []);

  return (
    <LogContext.Provider value={{
      server,
      checkAuth,
      isLoggedIn,
      setIsLoggedIn}}>
      {children}
    </LogContext.Provider>
  );
}