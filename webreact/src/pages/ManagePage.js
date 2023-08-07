import React, { useEffect } from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import ItemList from "../components/ItemList";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { fetchFieldAsync } from "../modules/field";

const PageWrapper = styled.div`
  background : #e9e9e9;
  display : flex;
  width : 100vw;
  min-height : 100vh;

  div.screen {
    width : 1080px;
    background : white;
    padding : 20px;
    margin : 0px auto;

    @media (max-width : 1080px) {
      margin : 0px;
      width : 100vw;
      padding : 10px;
    }

    @media (max-width : 500px) {
      margin : 0px;
      width : 100vw;
      padding : 0px;
    }
  }
`;


const ManagePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFieldAsync());
  }, []);

  return (
    <PageWrapper>
      <div className="screen">
        <Header />
        <Filter />
        <ItemList />
      </div>
    </PageWrapper>
  );
};

export default ManagePage;