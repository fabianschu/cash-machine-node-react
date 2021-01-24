import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import InputField from "../components/Inputs/InputField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import illustration from "../assets/login-illustration.png";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/actions/authAction";
import StyledSoftButton from "../styled/SoftButton";
import StyledWidgetContainer from "../styled/WidgetContainer";
import StyledHeading from "../styled/Heading";

const LoginPageLayout = styled.div`
  background: url(${illustration}) 15% 100% / auto 50% no-repeat,
    linear-gradient(119deg, #fcf5d2 0%, #70c7cb 100%) 0% 0% no-repeat;
  opacity: 1;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  padding: 9% 11%;
  min-height: 100vh;
`;

const StyledLoginContainer = styled(StyledWidgetContainer)`
  width: 30%;
  min-width: 470px;
  height: 500px;
  box-shadow: ${({ theme }) => theme.shadows[5]};
`;

const StyledSubHeading = styled.h2`
  text-align: left;
  font: Brandon;
  color: #6ea5a2;
  opacity: 1;
  font-size: ${({ theme }) => theme.typography.fontSizes.medium};
`;

const StyledInteractionContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 280px;
  flex: 1;
`;

const LoginPage = () => {
  const isAuthenticated = useSelector(({ authReducer }) => authReducer.userId);
  const dispatch = useDispatch();
  const [screen, setScreen] = useState("login");

  const handleSubmit = (values) => {
    if (screen === "login") {
      dispatch(login(values));
    } else {
      dispatch(register(values));
    }
  };

  const handleSceenChange = (values) => {
    if (screen === "login") {
      setScreen("register");
    } else {
      setScreen("login");
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <LoginPageLayout>
      <StyledLoginContainer>
        <StyledHeading>Make it rain</StyledHeading>
        <StyledSubHeading>Welcome to your cashmachine</StyledSubHeading>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <StyledInteractionContainer>
              <Field
                component={InputField}
                name="username"
                label="Benutzername"
              />
              <Field
                component={InputField}
                name="password"
                label="Passwort"
                type="password"
              />
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="secondary"
              >
                {screen === "login" ? "Anmelden" : "Registrieren"}
              </Button>
              <StyledSoftButton onClick={handleSceenChange}>
                {screen === "login" ? "Registrieren" : "Anmelden"}
              </StyledSoftButton>
            </StyledInteractionContainer>
          </Form>
        </Formik>
      </StyledLoginContainer>
    </LoginPageLayout>
  );
};
export default LoginPage;
