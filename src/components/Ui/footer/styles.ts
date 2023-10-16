import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  footerMainBox: {
    paddingLeft: 130,
    paddingRight: 130,
    paddingTop: 50,
    paddingBottom: 80,
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.between("xs", "sm")]: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  footerLinksTitle: {
    fontSize: 12,
  },
}));
export default useStyles;
