import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  listRoot: {
    padding: 0,
  },
  primaryMenuListText: {
    ...theme.typography.body2,
    fontSize: 14,
  },
  userInfoBox: {
    backgroundColor: `rgb(228 253 231);`,
    width: "100%",
  },
  footerLinksTitle: {},
  nested: {
    paddingLeft: theme.spacing(3),
  },

}));
export default useStyles;
