import { createMuiTheme } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

import { colors } from "./colors";
import { fonts } from "./fonts";

const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: 40,
      lineHeight: "55px",
      fontFamily: fonts.MPF_HEAVY,
      [breakpoints.only("xs")]: {
        fontSize: 22,
        lineHeight: "30px",
      },
    },
    h3: {
      fontSize: 30,
      fontFamily: fonts.MPF_HEAVY,
      lineHeight: "41px",
      color: colors.SECONDARY_COLOR_MAIN,
      [breakpoints.only("xs")]: {
        fontSize: 22,
        lineHeight: "30px",
        fontWeight: 900,
      },
    },
    h6: {
      fontSize: 18,
      fontFamily: fonts.MPF_HEAVY,
      lineHeight: "25px",
      [breakpoints.only("xs")]: {
        fontSize: 14,
        lineHeight: "16px",
      },
      [breakpoints.only("sm")]: {
        fontSize: 14,
        lineHeight: "16px",
      },
    },
    subtitle1: {
      fontFamily: fonts.MPF_BLACK,
      fontSize: 12,
      lineHeight: "17px",
    },
    subtitle2: {
      fontSize: 15,
      lineHeight: "20px",
      fontFamily: fonts.MPF_MEDIUM,
      color: colors.FONT_COLOT_LITE,
    },
    body1: {
      fontSize: 15,
      fontFamily: fonts.MPF_MEDIUM,
      [breakpoints.only("xs")]: {
        fontSize: 14,
      },
    },
    body2: {
      fontFamily: fonts.MPF_HEAVY,
      fontSize: 14,
      fontWeight: 500,
      color: colors.SECONDARY_COLOR_MAIN,
    },
  },
  palette: {
    primary: {
      main: colors.PRIMARY_COLOR_MAIN,
    },
    secondary: {
      main: colors.SECONDARY_COLOR_MAIN,
    },
  },
  spacing: 10,
  shape: 0,
  //shadows:'none',
  overrides: {
    MuiIconButton: {
      root: {
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
    MuiAccordion: {
      root: {
        margin: `0px !important`,
      },
    },

    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "none !important",
        },
        "&:hover:": {
          borderBottom: "none !important",
        },
        "&:after": {
          borderBottom: "none !important",
        },
      },
    },

    MuiFormHelperText: {
      root: {
        fontFamily: "MPF_MEDIUM",
        fontWeight: 500,
        marginTop: 1,
        fontSize: 12,
        lineHeight: "16px",
        color: "#999DAE",
      },
    },

    MuiTextField: {
      root: {
        fontFamily: "MPF_MEDIUM",
        fontWeight: 500,
        color: "#31354C",
        minHeight: "40px",
        borderRadius: "4px",
        fontSize:16,
        width: "100%",
        border: `1px solid #DAD9E2`,
        padding: `5px 5px 5px 8px`,
        backgroundColor: "#ffffff",
      },
    },

    MuiInputBase: {
      root: {
        fontFamily: fonts.MPF_MEDIUM,
        //lineHeight: "24px",
        fontSize: 16,
      },
    },
    MuiButton: {
      root: {
        height: 30,
        textTransform: "none",
        borderRadius: "5px",
        fontFamily: fonts.MPF_HEAVY,
        fontWeight: 300,
        fontSize: 14,
        lineHeight: "22px",
        marginTop: 15,
        marginBottom: 15,
        [breakpoints.only("xs")]: {
          fontSize: 14,
        },
      },
      containedPrimary: {
        color: colors.WHITE_COLOR,
      },
      containedSecondary: {
        color: colors.WHITE_COLOR,
      },
      contained: {
        boxShadow: "none",
      },
    },
    MuiTab: {
      root: {
        fontFamily: fonts.MPF_HEAVY,
        minWidth: `10px !important`,
        fontSize: 11,
        letterSpacing: 0,
      },
    },
  },
  props: {
    MuiTabs: {
      indicatorColor: "primary",
      textColor: "secondary",
    },
    MuiButton: {
      color: "primary",
      variant: "contained",
      disableRipple: true,
    },
    MuiIconButton: {
      disableRipple: true,
      disableFocusRipple: true,
      disableTouchRipple: true,
    },
    MuiDialog: {
      disableBackdropClick: true,
      disableEscapeKeyDown: true,
    },
  },
  utils: {
    section: {
      paddingLeft: 150,
      paddingRight: 150,
      paddingTop: 100,
      paddingBottom: 100,
      [breakpoints.only("xs")]: {
        padding: `60px 20px 80px 20px`,
      },
    },
    shadow: {
      boxShadow: `0 3px 8px 0 rgba(0,0,0,0.05)`,
    },
  },
});

export default theme;
