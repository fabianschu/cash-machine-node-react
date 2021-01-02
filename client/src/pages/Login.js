import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import InputField from "../components/InputField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBox: {
    backgroundColor: "transparent",
    border: "none",
    width: (mobile) => {
      if (mobile) {
        return "100%";
      }
      return "300px";
    },
    alignSelf: "center",
    justifySelf: "center",
    height: (mobile) => {
      if (mobile) {
        return "100vh";
      }
      return "auto";
    },
    padding: (mobile) => {
      if (mobile) {
        return "40px 80px";
      }
      return "40px 80px";
    },
    display: "flex",
    flexDirection: "column",
  },
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    marginTop: "20px",
    width: "200px",
  },
}));

const Login = () => {
  const userId = useSelector(({ authReducer }) => authReducer.userId);
  const error = useSelector(({ authReducer }) => authReducer.error);
  const loading = useSelector(({ authReducer }) => authReducer.loading);
  const dispatch = useDispatch();

  const theme = useTheme();
  const classes = useStyles(useMediaQuery(theme.breakpoints.down("xs")));

  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  if (loading) {
    // TODO
  }

  if (error) {
    // TODO
  }

  if (userId) {
    return <Redirect to="/" />;
  }

  return (
    <Box className={classes.container}>
      <Paper square className={classes.loginBox} elevation={0}>
        <Typography variant="h5" component="h1" align="center">
          Login
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          // validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field component={InputField} name="username" />
            <Field component={InputField} name="password" />
            <Box className={classes.buttonWrapper}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.button}
              >
                <Typography>Login</Typography>
              </Button>
            </Box>
          </Form>
        </Formik>
      </Paper>
    </Box>
  );
};

export default Login;
