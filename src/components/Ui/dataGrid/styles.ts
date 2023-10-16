import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  dataGridBoxRoot: {
    borderRadius: 0,
    borderLeft: 0,
  },
  modelCloseIcon: {
    position: "absolute",
    top: 0,
    right: 10,
    [theme.breakpoints.only("xs")]: {
      top: -10,
      right: 0,
    },
  },
  modelContent: {
    minHeight: 400,
  },
  span: {
    color: "#757575",
  },
  modelTitle: {
    fontWeight: 600,
    marginTop: 10,
  },
  tableImageWrapper: {
    width: 50,
    height: 70,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "contain",
  },
  productListDialog: {
    position: "relative",
    height: "100%",
    width: "100%",
    minHeight: 200,
    
  },
  productListLoadinIndicator: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    top: 0,
    left: 0,
  },
  formLblRoot: {
    marginLeft: 0,
    marginRight: 0,
  },
  formControlLabelRoot: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
  },
  radioCheckBox: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  imageSelected: {
    border: `3px solid ${theme.palette.common.white}`,
    outline: `2px solid ${theme.palette.secondary.main}`,
    height: 70,
    width: 70,
    [theme.breakpoints.only("xs")]: {
      height: 70,
      width: 70,
    },
  },
  checkBoxImage: {
    height: 70,
    width: 70,
    [theme.breakpoints.only("xs")]: {
      height: 70,
      width: 70,
    },
  },
  slectionRadioSection: {
    // marginTop: 29,
    width: "100%",
    margin: 0,
  },
  optionTitle: {
    fontSize: 12,
    marginTop: 10,
    fontFamily: "MPF_HEAVY",
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      lineHeight: "20px",
      fontSize: 15,
    },
  },
  validationText: {
    color: theme.palette.error.main,
  },
  dialogPaper: {
    // width: "100%",
     minHeight: 150,
    background:"white",

  },
  dialogTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom:10,
  },
  dialogSubTitle: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: "22px",
  },
  dialogCloseIcon: {
    position: "absolute",
    top: -3,
    right: 0,
  },
  labelstyle:{
    border:"1px solid black",
    borderRadius:5,
    padding:5,
    textAlign:"center",

  },
  
  dialogContainer:{
 
    // minHeight: "215px",
    position: "relative",
    // paddingBottom: 20,
    // marginBottom:20,
    [theme.breakpoints.down("xs")]: {
     paddingLeft:0,
     paddingRight:0,
    },
  }
}));
export default useStyles;
