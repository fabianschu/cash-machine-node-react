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
import { CustomersContext } from "../context/CustomersContext";

const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: "green",
    // height: "100%",
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    // paddingBottom: "400px",
  },
  loginBox: {
    width: (mobile) => {
      if (mobile) {
        return "100%";
      }
      return "40%";
    },
    height: (mobile) => {
      if (mobile) {
        return "100vh";
      }
      return "240px";
    },
    padding: "50px",
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
    marginTop: "40px",
    width: "200px",
  },
}));

const Login = () => {
  const theme = useTheme();
  const classes = useStyles(useMediaQuery(theme.breakpoints.down("xs")));
  const { user, setUser } = useContext(CustomersContext);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        values
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {};

  return (
    <Box className={classes.container}>
      <Paper square className={classes.loginBox}>
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
                Login
              </Button>
            </Box>
          </Form>
        </Formik>
        <Button onClick={handleLogout}>Logout</Button>
      </Paper>
    </Box>
  );
};
export default Login;
