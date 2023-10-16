import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  userInfoMainBox: {
    display: "flex",
    flexDirection: "column",
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  userProfileImageBox: {
    width: 120,
    height: 120,
    borderRadius: "100%",
    backgroundPosition: "top center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "gray",
  },
  userNameLbl: {
    fontSize: 20,
    lineHeight:"25px"
  },
  userSubTitle:{
      fontSize:14,
      margin:0
  }
}));

export default useStyles;
