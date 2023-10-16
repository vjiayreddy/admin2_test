import makeStyles from "@material-ui/styles/makeStyles";
const useStyles = makeStyles((theme: any) => ({
  rightSide: { backgroundColor: "#F5F5F5" },
  styleSectionWrapper: {
    minHeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  productSection: {
    maxHeight: "500px",
    height:"100%",
    width: "100%",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    overflowY: "auto",
  },
  productImageWrapper: {
    minHeight: 20,
    height: "100%",
    width: "100%",
    padding: 10,
    backgroundColor: theme.palette.common.white,
    textAlign: "center",
  },
  contentSection: {
    position: "relative",
    borderRight: "1px solid #D0D0D0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 30,
  },
  contentMainTitle: {
    textTransform: "uppercase",
    fontSize: 45,
  },
  contentSubTitle: {
    textTransform: "uppercase",
    fontSize: 22,
    fontWeight: 500,
  },
  circleDecorator: {
    width: 80,
    height: 80,
    borderRadius: "100px",
    position: "absolute",
    top: -40,
    right: -40,
    backgroundColor: "#ABABAB",
    opacity: 0.2,
  },
  numberDecoration: {
    position: "absolute",
    top: 0,
    left: 50,
    color: "transparent",
    fontSize: 150,
    WebkitTextStroke: `1px black` /* width and color */,
    opacity: 0.2,
    fontFamily: "MPF_HEAVY",
  },
  colorCard: {
    width: "100%",
    height: 50,
  },
  contentDec: {},
}));

export default useStyles;
