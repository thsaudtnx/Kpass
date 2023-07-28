import React from "react";
import { createContext, useState ,useEffect } from "react";
import axios from 'axios';
import { useCallback } from "react";
import {server} from '../lib/serverURL';

export const ManageContext = createContext();

export function ManageContextProvider({children}){

  const [isUpdated, setIsUpdated] = useState(0);
  const [inputText, setInputText] = useState();
  const [field_id, setField_id] = useState(0);
  const [sortBy, setSortBy] = useState('ALL');
  const [deletedData, setDeletedData] = useState(false);


  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const getData = useCallback(async () => {
    /* console.log(`data : ${data.length} \nhasMore : ${hasMore}
    \npageNum : ${pageNum} \npageSize : ${pageSize} \nfield : ${field} \ninputText : ${inputText} \nsortBy : ${sortBy} \ndeletedData : ${deletedData}`); */
      await axios.get(`${server}/business/list`, {
        params : {
          pageNum : pageNum,
          pageSize : pageSize,
          field_id : field_id,
          inputText : inputText,
          sortBy : sortBy,
          deletedData : deletedData,
        }
      })
        .then(res => {
          if (pageNum===0) setData(res.data)
          else setData([...data, ...res.data])

          if (res.data.length < pageSize){
            setHasMore(false)
          } else {
            setPageNum(pageNum + 1); 
            setHasMore(true);
          }
        })
        .catch(err => {
          console.error(err);
        })
  }, [pageNum, pageSize, field_id, inputText, sortBy, deletedData, setData, isUpdated, hasMore]);

  useEffect(() => {
    getData();
  }, [isUpdated]);

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
      field_id,
      setField_id,
      sortBy,
      setSortBy,
      data,
      setData,
      getData,
      deletedData,
      setDeletedData,
      isUpdated,
      setIsUpdated,
      }}>
      {children}
    </ManageContext.Provider>
  );
}