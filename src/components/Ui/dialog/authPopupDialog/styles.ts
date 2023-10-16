import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  paperFullWidth: {
    margin: 0,
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      height: "100vh",
      maxHeight: "100%",
    },
  },
  paperWidthSm: {
    minWidth: 700,
  },
}));

export default useStyles;
