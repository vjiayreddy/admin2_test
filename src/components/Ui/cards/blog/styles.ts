import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  blogCardWrapper: {
    position: "relative",
    minHeight: 200,
    backgroundColor: "red",
    margin: 10,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "cover",
  },
  blogCardOverly: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "flex-end",
    flexDirection: "column",
    background: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.9) 100%)`,
    color: theme.palette.common.white,
  },
  readMoreButton: {
    margin:0,
    padding:0,
    minWidth:10
  },
  blogCardTitle:{
    fontSize:14,
    lineHeight:'16px'
  }
}));
export default useStyles;
