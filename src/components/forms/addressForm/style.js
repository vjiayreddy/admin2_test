import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  formInputWrapper: {
    padding:20
  },
  validationText: {
    color: `${theme.palette.error.main} !important`,
  },
  progressCircle: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  validationError: {
    border: `1px solid ${theme.palette.error.main}  !important`,
  },
  formFooter: {
    marginTop: theme.spacing(3),
  },
  infoLabel: {
    ...theme.typography.subtitle2,
    fontSize: 13,
  },
  infoLinkBtn: {
    ...theme.typography.subtitle2,
    fontSize: 13,
    color: "#E27217",
  },
  noPaddingR: {
    paddingRight: `0 !important`,
  },
  noPaddingTB: {
    paddingTop: `0 !important`,
    paddingBottom: `0 !important`,
  },
  siginButton: {
    marginTop: 20,
  },
}));
export default useStyles;
