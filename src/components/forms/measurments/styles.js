import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  measurmentContainer: {
    backgroundColor: theme.palette.common.white,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
  },
  radioLabel: {
    ...theme.typography.h3,
    fontSize: 14,
    lineHeight: "21px",
    color: theme.palette.common.COLOR_354052,
    fontWeight: 500,
  },
  expandPanel: {
    backgroundColor: theme.palette.common.white,
    border: `1px solid #DAD9E2`,
    paddingLeft: `25px`,
    marginBottom: 10,
    borderRadius: 4,
    "&:before": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  expandSummary: {
    padding: 0,
  },
  expandDetails: {
    padding: 0,
  },
  expandTitle: {
    fontSize: 15,
    marginBottom: 30,
  },
  radioGroup: {
    marginBottom: 20,
  },
  sideImageSection: {
    //width: "100%",
    height: 350,
    position: "relative",
  },
  sideImage: {
    objectFit: "contain",
    objectPosition: "top center",
  },
  optionTitle: {
    fontSize: 13,
  },
  selectOptions: {
    border: `1px solid #DDDCE4`,
    borderRadius: 4,
    padding: 10,
    [theme.breakpoints.between("xs", "sm")]: {
      padding: 7,
    },
  },
  selectOptionsForm: {
    border: `2px solid ${theme.palette.primary.main} `,
    borderRadius: 4,
    padding: 10,
    [theme.breakpoints.between("xs", "sm")]: {
      padding: 7,
    },
  },
  validationText: {
    color: `${theme.palette.error.main} !important`,
  },
  errorInput: {
    border: `1px solid ${theme.palette.error.main} !important`,
  },
  btnContinue: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    width: 200,
    [theme.breakpoints.only("xs", "sm")]: {
      width: "100%",
    },
  },
  expandSummaryContent: {
    margin: 0,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 12,
    },
  },
  attributeImageWrapper: {
    width: 264,
    height: 180,
    position: "relative",
    //position: "sticky",
    backgroundColor: "#ecf0f1",
    [theme.breakpoints.only("xs")]: {
      height: 185,
      width: 300,
      marginBottom: 20,
      //position: "sticky",
      top: 0,
    },
  },
  attributeImage: {
    objectPosition: "top center",
    objectFit: "contain",
  },

  dialogPaper: {
    width: 500,
    minHeight: 350,
  },
  dialogContainer: {
    height: "100%",
    position: "relative",
    paddingBottom: 20,
  },
  dialogTitle: {
    fontSize: 21,
    fontWeight: 800,
    marginTop: 15,
  },
  dialogSubTitle: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: "22px",
  },
  dialogCloseIcon: {
    position: "absolute",
    top: -5,
    right: -5,
  },
  infoTitle: {
    fontSize: 14,
    lineHeight: "22px",
    fontWeight: 500,
  },
  measurmentTitle: {
    lineHeight: "25px",
    fontSize: 18,
    marginBottom: 20,
  },
  sizeLabel: {
    fontSize: 13,
    color: theme.palette.common.COLOR_8E919E,
    marginBottom: 10,
    [theme.breakpoints.only("xs")]: {
      marginTop: 30,
    },
  },
  measurmentTypeSection: {
    marginTop: 20,
  },
  measurementHistoryForm: {
    border: `1px solid #DAD9E2`,
    padding: 20,
    [theme.breakpoints.only("xs")]: {
      padding: 10,
    },
  },
  measurmentInfo: {
    width: "100%",
    border: `1px solid #DAD9E2`,
    padding: 30,
    [theme.breakpoints.only("xs")]: {
      padding: 10,
    },
  },
  measurmentInfoTitle: {
    paddingLeft: 100,
    paddingRight: 100,
    lineHeight: "22px",
    paddingBottom: 20,
    fontSize: 14,
    color: theme.palette.common.COLOR_31354C,
    fontWeight: 500,
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  measurmentInfoBtn: {
    minWidth: 220,
    [theme.breakpoints.only("xs")]: {
      fontSize: 12,
      minWidth: 100,
    },
  },
  orLabel: {
    fontSize: 12,
    fontWeight: 500,
  },
  dropzoneContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderWidth: 2,
    height: 300,
    width: 300,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  },
  uploadsecton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  uploadLabel: {
    fontSize: 14,
    marginTop: 10,
    lineHeight: "15px",
  },

  hightlightImageUrl: {
    width: "100%",
    height: 329,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },

  actionbButtons: {
    marginTop: 20,
  },
  attribueImageBanner: {
    position: "sticky",
  },
  stickyContainer: {
    minHeight: 200,
  },
  stickyEle: {
    position: "sticky",
    top: 70,
    zIndex: 99,
    height: 185,
    width: "100%",
    backgroundColor: "#ecf0f1",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    borderBottom: "20px solid white",
  },
  inputRoot: {
    height: 150,
    marginTop: 20,
    [theme.breakpoints.only("xs")]: {
      width: 300,
    },
  },
}));

export default useStyles;
