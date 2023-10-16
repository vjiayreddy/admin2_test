import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  sectionMainTitle: {},
  sectionSubTitle: {
    fontSize: 18,
    lineHeight: "30px",
    fontWeight: 500,
    width: "74%",
    margin: "0px auto",
    [theme.breakpoints.only('xs')]:{
      fontSize: 14,
      width: "90%",
      lineHeight: "20px",
    }
  },
}));

export default useStyles;
