import React, { useEffect } from "react";
import { useMediaQuery } from 'react-responsive'
import Header from "../components/Header";
import Filter from "../components/Filter";
import ItemList from "../components/ItemList";
import { useNavigate } from "react-router";
import { ManageContextProvider } from "../contexts/ManageContext";
import axios from "axios";
import { server } from "../lib/serverURL";

const ManagePage = () => {
  const isMobile = useMediaQuery({query: '(max-width: 765px)'});
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const result = await axios.get(`${server}/auth/authentication`,  { withCredentials: true });
      console.log(result.data);
      if (!result.data.authenticated) navigate('/');
    })()
  }, []);

  return (
    <div style={{background : '#e1e1e1'}}>
      <div style={{
        width : isMobile ? 'calc(100vw - 20px)' : '1080px',
        margin : 'auto',
        background : 'white',
        border : isMobile ? 'none' : '1px solid lightGray',
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