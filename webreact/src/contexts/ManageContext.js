import React from "react";
import { createContext, useState ,useEffect } from "react";
import axios from 'axios';
import { LogContext } from "./LogContext";
import { useContext } from "react";
import { useCallback } from "react";

export const ManageContext = createContext();

export function ManageContextProvider({children}){
  const {server} = useContext(LogContext);

  const [isUpdated, setIsUpdated] = useState(false);
  const [inputText, setInputText] = useState();
  const [field, setField] = useState('전체');
  const [sortBy, setSortBy] = useState('전체');
  const [deletedData, setDeletedData] = useState(false);
  const [data, setData] = useState();
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [addModal, setAddModal] = useState(false);

  const getData = useCallback(async () => {
    console.log(`pageNum : ${pageNum} \npageSize : ${pageSize} \nfield : ${field} \ninputText : ${inputText} \nsortBy : ${sortBy} \ndeletedData : ${deletedData}`);
      await axios.get(`${server}/business/list`, {
        params : {
          pageNum : pageNum,
          pageSize : pageSize,
          field : field,
          inputText : inputText,
          sortBy : sortBy,
          deletedData : deletedData,
        }
      })
        .then(res => {
          if (res.data.length < pageSize){
            setHasMore(false);
            setPageNum(0);
          } else setPageNum(pageNum + 1);

          if (pageNum===0) setData(res.data);
          else setData([...data, ...res.data]);
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        })
  }, [pageNum, pageSize, field, inputText, sortBy, deletedData, data, isUpdated]);

  useEffect(() => {
    if (isUpdated) setIsUpdated(false);
    getData();
  }, [isUpdated])

  return (
    <ManageContext.Provider value={{
      inputText,
      setInputText,
      pageNum,
      setPageNum,
      pageSize,
      setPageSize,
      hasMore,
      setHasMore,
      field,
      setField,
      sortBy,
      setSortBy,
      addModal,
      setAddModal,
      data,
      setData,
      deletedData,
      setDeletedData,
      setIsUpdated,}}>
      {children}
    </ManageContext.Provider>
  );
}