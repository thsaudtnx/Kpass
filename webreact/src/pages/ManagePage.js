import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import ItemList from "../components/ItemList";
import { ManageContextProvider } from "../contexts/ManageContext";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteFieldAsync, editFieldAsync, fetchFieldAsync, insertFieldAsync } from "../modules/field";

const PageWrapper = styled.div`
  background : lightGray;
  display : flex;
  width : 100vw;

  div.screen {
    width : 1080px;
    background : white;
    padding : 20px;
    border-radius : 5px;
    border : 1px solid lightGray;
    margin : auto;
  }
  
`;


const ManagePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (() => dispatch(fetchFieldAsync()))();
  }, []);

  return (
    <PageWrapper>
      <div className="screen">
        <ManageContextProvider>
          <Header />
          <Filter/>
          <ItemList />
        </ManageContextProvider>
      </div>
    </PageWrapper>
  );
};

export default ManagePage;