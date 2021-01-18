import { createMuiTheme } from "@material-ui/core/styles";

const colors = {
  primary: {
    main: "#6EA5A2",
    light: "#8CD1CD",
  },
  secondary: {
    main: "#FBD937",
    light: "#FAF4D1",
  },
  grey: "#707070",
};

export default createMuiTheme({
  palette: {
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
    },
  },
  typography: {
    fontSizes: {
      small: "1rem",
      sm: "1.3rem",
      medium: "1.8rem",
      large: "3rem",
      xlarge: "4.5rem",
    },
  },
  rounded: "49px",
  overrides: {
    MuiButton: {
      sizeLarge: {
        width: "272px",
        height: "52px",
        fontWeight: "bold",
      },
      label: {
        fontSize: "1.8rem",
        fontWeight: "bold",
        fontFamily: "Brandon",
      },
      contained: {
        boxShadow: "0px 3px 6px #00000029",
        borderRadius: "49px",
      },
      text: {
        color: colors.primary.main,
        border: "none",
        textDecoration: "underline",
        background: "none",
      },
      containedPrimary: {
        backgroundColor: colors.primary.main,
        color: "white",
      },
      containedSecondary: {
        backgroundColor: colors.secondary.main,
        color: "white",
      },
    },
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: colors.primary.light,
          borderRadius: 0,
        },
        "&$focused $notchedOutline": {
          borderColor: colors.primary.main,
          borderWidth: 1,
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: colors.primary.main,
        },
      },
    },
    MuiInputLabel: {
      root: {
        fontFamily: "Brandon",
        textTransform: "uppercase",
      },
    },
  },
});
