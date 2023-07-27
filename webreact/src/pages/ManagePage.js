import React from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import ItemList from "../components/ItemList";
import { ManageContextProvider } from "../contexts/ManageContext";
import { styled } from "styled-components";
import { FieldContextProvider } from "../contexts/FieldContext";

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

  return (
    <PageWrapper>
      <div className="screen">
      <FieldContextProvider>
        <Header />
        <ManageContextProvider>
          <Filter />
          <ItemList />
        </ManageContextProvider>
      </FieldContextProvider>
      </div>
    </PageWrapper>
  );
};

export default ManagePage;