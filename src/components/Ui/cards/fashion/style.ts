import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  fashionCardBox: {
    width: "100%",
    height: 350,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.only("xs")]: {
      height: 200,
    },
  },
  fashionCardImage: {
    width: "100%",
  },
}));

export default useStyles;
