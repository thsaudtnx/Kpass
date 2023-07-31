import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import ItemList from "../components/ItemList";
import { ManageContextProvider } from "../contexts/ManageContext";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { fetchFieldAsync } from "../modules/field";

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

    @media (max-width : 1080px) {
      border : none;
      border-radius : 0px;
      margin : 0px;
      width : 100vw;
      padding : 10px;
    }

    @media (max-width : 500px) {
      border : none;
      border-radius : 0px;
      margin : 0px;
      width : 100vw;
      padding : 0px;
    }
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