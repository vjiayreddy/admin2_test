import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  bodyProfileMain: {
    padding: 30,
    backgroundColor: theme.palette.common.white,
  },
  sectionTitle: {
    fontSize: 15,
    lineHeight: "17px",
    fontWeight: 900,
    marginTop: 0,
  },
  radioGroupTitle: {
    fontSize: 15,
    lineHeight: "17px",
    fontWeight: 900,
    marginTop: 30,
  },
  inputText: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  btnButton: {
    marginTop: 40,
    width: "300px",
  },
  validationText: {
    color: `${theme.palette.error.main} !important`,
  },
  errorInput: {
    border: `1px solid ${theme.palette.error.main} !important`,
  },
  profile_container: {
    padding: 20,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight:600,
    color:"#757575"
  },
}));

export default useStyles;
