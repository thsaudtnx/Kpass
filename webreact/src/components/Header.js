import React from "react";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import axios from 'axios';
import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";

const Header = () => {
  const isMobile = useMediaQuery({query: '(max-width: 765px)'});
  const navigate = useNavigate();
  const {server} = useContext(LogContext);

  return (
    <div 
      className="header"
      style={{
      display : 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-between',}}>
      <div className='title' 
        style={{
        padding : isMobile ? '10px' : '20px',
        fontSize : '20px', 
        fontWeight : 'bold',}}>
        KPASS 관리자 
      </div>
      <div className="right"
        style={{
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center'}}>
        <div style={{
          fontSize : '14px',
          color : 'gray',
          cursor : 'pointer',
          padding : '10px',}}
          onClick={async () => {
            if (window.confirm('정말로 로그아웃 하시겠습니까?')){
              await axios.post(`${server}/auth/logout`)
                .then(res => {
                  console.log(res.data);
                  if (res.data.ok) navigate('/');
                })
                .catch(error => {
                  console.error(error);
                })
            }
          }}>
            로그아웃
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);