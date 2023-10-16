import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  looksCardWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  blogWrapperBox: {
    backgroundColor: "#EEEEEE",
  },
  sectionMainTitle: {
    fontSize: 25,
  },
}));

export default useStyles;
