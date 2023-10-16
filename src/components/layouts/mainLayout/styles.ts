import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  pageTitleLbl: {
    fontWeight: 900,
    padding: 19,
  },
  searchInput: {
    marginRight: 10,
    height: 35,
    borderRadius: 5,
    border: `1px solid gainsboro`,
    paddingLeft: 10,
    paddingRight: 5,
    boxSizing: `border-box`,
  },
}));

export default useStyles;
