import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  slectionRadioSection: {
    marginBottom: 30,
    marginTop: 20,
    margin: "auto",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      marginBottom: 5,
      marginTop: 10,
    },
  },
  radioGroupRow: {
    justifyContent: "center !important",
    alignItems: "center  !important",
  },
  backButton: {
    padding: 0,
    margin: 0,
  },

  radioCheckBox: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  inputSelectedChecked: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  inputCheckBox: {
    height: 40,
    backgroundColor: `rgba(218,217,226,0.3)`,
    textAlign: "center",
    fontFamily: "MPF_HEAVY",
    margin: 0,
    paddingLeft: `16px !important`,
    paddingRight: `16px !important`,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "40px",
    width: "100%",
    color: theme.palette.secondary.main,
  },

  optionTitle: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: "22px",
    fontFamily: "MPF_HEAVY",
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      lineHeight: "20px",
      fontSize: 15,
    },
  },

  topSticyBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  formControlLabelRoot: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
  },
}));

export default useStyles;
