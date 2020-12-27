import React from "react";
import styled from "styled-components";
import bottomWave from "../assets/bottom-wave.png";
import topCloud from "../assets/top-cloud.png";

const DefaultPageLayout = styled.div`
  background: url(${topCloud}) 20% 0% / 120% 60% no-repeat,
    url(${bottomWave}) 20% 100% / 100% 100% no-repeat;
  min-height: 100vh;
  width: 100vw;
  padding: 20px 30px;
  div {
    height: 100%;
    background-color: red;
  }
`;

const DefaultPage = ({ children }) => {
  return (
    <DefaultPageLayout>
      <div>{children}ll</div>
    </DefaultPageLayout>
  );
};

export default DefaultPage;
