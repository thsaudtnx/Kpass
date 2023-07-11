import React from "react";
import { createContext, useState ,useEffect } from "react";
import axios from 'axios';
import { useCallback } from "react";
import {server} from '../lib/serverURL';

export const ManageContext = createContext();

export function ManageContextProvider({children}){

  const [isUpdated, setIsUpdated] = useState(0);
  const [inputText, setInputText] = useState();
  const [field, setField] = useState('ALL');
  const [sortBy, setSortBy] = useState('ALL');
  const [deletedData, setDeletedData] = useState(false);
  const [data, setData] = useState();
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [addModal, setAddModal] = useState(false);

  const getData = useCallback(async () => {
    console.log(`isUpdated : ${isUpdated} \nhasMore : ${hasMore}
    \npageNum : ${pageNum} \npageSize : ${pageSize} \nfield : ${field} \ninputText : ${inputText} \nsortBy : ${sortBy} \ndeletedData : ${deletedData}`);
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
          if (pageNum===0) setData(res.data)
          else setData([...data, ...res.data])

          if (res.data.length < pageSize) setHasMore(false)
          else {
            setPageNum(pageNum + 1); 
            if (!hasMore) setHasMore(true)
          }
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        })
  }, [pageNum, pageSize, field, inputText, sortBy, deletedData, data, isUpdated]);

  useEffect(() => {
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
      getData,
      deletedData,
      setDeletedData,
      isUpdated,
      setIsUpdated,}}>
      {children}
    </ManageContext.Provider>
  );
}