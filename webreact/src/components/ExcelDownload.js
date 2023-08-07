import React from "react";
import {CSVLink} from 'react-csv';
import { useSelector } from "react-redux";
import {AiOutlineDownload} from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { server } from "../lib/serverURL";
import { useState } from "react";
import { useEffect } from "react";

const header = [
  {label : '업체명', key : 'name'},
  {label : '업종', key : 'field'},
  {label : '전화번호', key : 'phone'},
  {label : '주소', key : 'address'},
  {label : '상세주소', key : 'addressdetail'},
  {label : 'Kpass%', key : 'kpass'},
  {label : 'TravelWallet%', key : 'travelwallet'},
  {label : '비고', key : 'note'},
];

const ExcelDownload = () => {
  const fieldList = useSelector(state => state.field);
  const isMobile = useMediaQuery({query : '(max-width : 670px)'});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${server}/business`)
        .then(res => {
          //console.log(res.data.data);
          setData(res.data.data);
        })
        .catch(err => {
          console.error(err);
        })
    };
    fetchData();
  }, []);

  return (
    <CSVLink style={{
      textDecoration : 'none',
      color : 'gray',
      fontSize : '14px',
      cursor : 'pointer',
      marginRight : '20px',}}
      data={data?.map(d => ({...d, field : fieldList?.find(f => f.id===d.field_id)?.english}))}
      headers={header}
      filename="kpassList.csv"
      className="hidden"
      target="_blank">
      <AiOutlineDownload style={ isMobile ? {
        width : '15px', height : '15px', paddingLeft : '15px'
      } : {
        width : '20px', height : '20px', paddingLeft : '20px'}}
      />
    </CSVLink>
  );
};

export default ExcelDownload;