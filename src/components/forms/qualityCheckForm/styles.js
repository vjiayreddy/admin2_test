import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  paperFullWidth: {
    overflowY: "visible",
  },
  dialogContentRoot: {
    overflowY: "visible",
  },
  orderFormGrid: {
    padding: 20,
    margin: 0,
    width: "100%",
  },
  mainBoxContainer: {
    maxWidth: 1098,
    minHeight: 1000,
    backgroundColor: "#ffff",
    paddingLeft: 0,
    paddingRight: 0,
    border: `1px solid grey  !important`,
  },
  headerTop: {
    maxWidth: 1132,
    height: "50px",
    backgroundColor: "#0984e3",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "MPF_HEAVY",
    fontWeight: 400,
    color: "#ffff",
    paddingTop: 18,
  },

  pagesLinkBox: {
    width: "70vw",
    height: 100,
    backgroundColor: theme.palette.grey[300],
    marginBottom: 30,
    border: `1px solid  #aaaaaa !important`,
  },

  formBox: { marginLeft: "20px" },

  titleDiv: {
    display: "flex",
    alignItem: "centre",
    justifyContent: "space-between",
  },
  CustOrderHeader: {
    height: "50px",
    backgroundColor: "#0984e3",
    marginBottom: 30,
  },
  CustOrderForm: {
    maxWidth: "88vw",
    height: "680px",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },
  formLabel: {
    fontSize: 14,
    fontFamily: "MPF_HEAVY",
    fontWeight: 500,
    marginBottom: 10,
  },

  noPaddingR: {
    paddingRight: `0 !important`,
  },
  labelSpacingL: {
    paddingLeft: 25,
  },

  validationError: {
    border: `1px solid ${theme.palette.error.main}  !important`,
  },

  sharebtn: {
    width: 125,
    height: 30,
    backgroundColor: "#EEEEEE",
    marginTop: 15,
    marginRight: 10,
  },
  lastField: {
    width: 300,
    paddingLeft: 25,
  },

  btnClass: {
    margin: 0,
  },
  tableCellRoot: {
    padding: 5,
    border: "none",
  },
  tableCellHead: {
    paddingLeft: 5,
  },
  tableActionButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    border: "none",
  },
  errorInput: {
    border: `1px solid red`,
  },
  expandCard: {
    marginTop: 30,
  },
  expandAccordion: {
    width: 400,
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
  imageCard: {
    padding: 20,
    border: "1px solid gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
