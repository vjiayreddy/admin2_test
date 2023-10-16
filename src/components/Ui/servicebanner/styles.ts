import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme: any) => ({
  serviceBox: {
    width: "100%",
    backgroundColor: "white",
    ...theme.utils.shadow,
    paddingLeft: 180,
    paddingRight: 180,
    paddingTop: 30,
    paddingBottom: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      paddingLeft: 5,
      paddingRight: 5,
      paddingBottom: 20,
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
  },
}));

export default useStyles;
