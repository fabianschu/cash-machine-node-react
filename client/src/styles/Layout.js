import React from "react";
import styled from "styled-components";

const LayoutProperties = styled.div`
  background-color: red;
`;

const Layout = ({ children }) => {
  return <LayoutProperties>{children}</LayoutProperties>;
};

export default Layout;
