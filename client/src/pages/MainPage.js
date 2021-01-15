import React from "react";
import styled from "styled-components";
import bottomWave from "../assets/bottom-wave.png";
import topCloud from "../assets/top-cloud.png";

const MainPageLayout = styled.div`
  background: url(${topCloud}) 20% 0% / 120% 60% no-repeat,
    url(${bottomWave}) 20% 100% / 100% 100% no-repeat;
  min-height: 100vh;
  width: 100vw;
  padding: 60px 100px;
  div {
    height: 100%;
  }
`;

const MainPage = ({ children }) => {
  return (
    <MainPageLayout>
      <div>{children}</div>
    </MainPageLayout>
  );
};

export default MainPage;
