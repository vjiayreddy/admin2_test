import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  looksCard: {
    height: 344,
    backgroundColor: theme.palette.common.white,
    margin: 10,
    padding: 10,
    boxShadow: `0px 3px 8px rgba(0, 0, 0, 0.05)`,
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    overflow: "hidden",
    position: "relative",
  },
  looksCardOverly: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "flex-end",
    flexDirection: "column",
    background: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.8) 100%)`,
    color: theme.palette.common.white,
  },
}));

export default useStyles;
