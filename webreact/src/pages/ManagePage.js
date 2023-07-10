import React, { useContext, useEffect } from "react";
import { useMediaQuery } from 'react-responsive'
import Header from "../components/Header";
import Filter from "../components/Filter";
import ItemList from "../components/ItemList";
import { LogContext } from "../contexts/LogContext";
import { useNavigate } from "react-router";
import { ManageContextProvider } from "../contexts/ManageContext";
import axios from 'axios';

const ManagePage = () => {
  const isMobile = useMediaQuery({query: '(max-width: 765px)'});
  const navigate = useNavigate();
  const {server} = useContext(LogContext);
  useEffect(() => {
    (async()=>{
      await axios.get(`${server}/auth/authentication`,  { withCredentials: true })
        .then(res => {
          console.log(res.data);
          //if (!res.data.authenticated) navigate('/');
        })
        .catch(err => {
          console.log(err);
        })
    })()
  }, []);

  return (
    <div style={{background : '#e1e1e1'}}>
      <div style={{
        width : isMobile ? 'calc(100vw - 20px)' : '1080px',
        margin : 'auto',
        background : 'white',
        border : isMobile ? 'none' : '1px solid lightGray',
        borderRadius : isMobile ? '0px' : '10px',
        padding : isMobile ? '10px' : '30px',}}>
        <Header />
        <ManageContextProvider>
          <Filter />
          <ItemList />
        </ManageContextProvider>
      </div>
    </div>
  );
};

export default ManagePage;