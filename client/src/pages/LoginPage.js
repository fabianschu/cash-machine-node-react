import React from "react";
import { Formik, Form, Field } from "formik";
import InputField from "../components/InputField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import illustration from "../assets/login-illustration.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authAction";
import StyledSoftButton from "../styled/SoftButton";

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

const StyledLoginContainer = styled.div`
  background-color: white;
  width: 30%;
  min-width: 470px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 49px;
  opacity: 1;
  padding: 40px 45px 6px 45px;
  height: 500px;
`;

const StyledHeading = styled.h1`
  text-align: left;
  font: Brandon;
  color: #6ea5a2;
  opacity: 1;
  font-size: ${({ theme }) => theme.typography.fontSizes.xlarge};
  text-transform: uppercase;
`;

const StyledSubHeading = styled.h2`
  text-align: left;
  font: Brandon;
  color: #6ea5a2;
  opacity: 1;
  font-size: ${({ theme }) => theme.typography.fontSizes.medium};
`;

const StyledSpacer = styled.div`
  border: 4px solid #fbd937;
  height: 0px;
  width: 50px;
  margin: ${({ theme }) => theme.spacing(2)}px 0;
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

  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <LoginPageLayout>
      <StyledLoginContainer>
        <StyledHeading>Make it rain</StyledHeading>
        <StyledSpacer />
        <StyledSubHeading>Welcome to your cashmachine</StyledSubHeading>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <StyledInteractionContainer>
              <Field component={InputField} name="username" />
              <Field component={InputField} name="password" />
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
              <StyledSoftButton>Registrieren</StyledSoftButton>
            </StyledInteractionContainer>
          </Form>
        </Formik>
      </StyledLoginContainer>
    </LoginPageLayout>
  );
};
export default LoginPage;
