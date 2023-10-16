import makeStyles from "@material-ui/styles/makeStyles";
const useStyles = makeStyles((theme: any) => ({
  leftSide: { backgroundColor: "#E1F4FF" },
  styleSectionWrapper: {
    minHeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  productSection: {
    maxHeight: "500px",
    width: "100%",
    height:"100%",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    overflowY: "auto",
  },
  productImageWrapper: {
    minHeight: 20,
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.common.white,
    padding: 10,
    textAlign: "center",
  },
  contentSection: {
    position: "relative",
    borderLeft: "1px solid #D0D0D0",
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
    left: -40,
    backgroundColor: "#ABABAB",
    opacity: 0.2,
  },
  colorCard: {
    width: "100%",
    height: 50,
  },
  numberDecoration: {
    position: "absolute",
    top: 0,
    right: 50,
    color: "transparent",
    fontSize: 150,
    WebkitTextStroke: `1px black` /* width and color */,
    opacity: 0.2,
    fontFamily: "MPF_HEAVY",
  },
  contentDec: {},
}));

export default useStyles;
