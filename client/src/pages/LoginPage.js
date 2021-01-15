import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import InputField from "../components/InputField";
import Button from "@material-ui/core/Button";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import illustration from "../assets/login-illustration.png";

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

const StyledYellowButtom = styled.button`
  background: #fbd937 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 49px;
  opacity: 1;
  width: 330px;
  height: 60px;
  border: none;
  font-family: Brandon;
  text-transform: uppercase;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.large};
`;

const SoftButton = styled.button`
  font-size: ${({ theme }) => theme.typography.fontSizes.small};
  border: none;
  text-decoration: underline;
  background: none;
`;

const LoginPage = () => {
  // const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const handleSubmit = (values) => {
    // axios
    //   .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, values)
    //   .then((res) => setAuthenticatedUser(res.data.id))
    //   .catch((err) => console.log(err));
  };

  // if (authenticatedUser) {
  //   return <Redirect to="/" />;
  // }

  return (
    <LoginPageLayout>
      <StyledLoginContainer>
        <StyledHeading>Make it rain</StyledHeading>
        <StyledSpacer />
        <StyledSubHeading>Welcome to your cashmachine</StyledSubHeading>
        <Formik
          initialValues={{ username: "", password: "" }}
          // validationSchema={SignupSchema}
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
              <SoftButton type="submit">Registrieren</SoftButton>
            </StyledInteractionContainer>
          </Form>
        </Formik>
      </StyledLoginContainer>
    </LoginPageLayout>
  );
};
export default LoginPage;
