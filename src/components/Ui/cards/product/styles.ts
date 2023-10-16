import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  cardWrapperBox: {
    height:'100%',
    backgroundColor: theme.palette.common.white,
    boxShadow: `0px 3px 8px rgba(0, 0, 0, 0.05)`
  },
  cardImage: {
    height: 300,
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "cover",
  },
  cardContent: {
    padding: 10,
    display:'flex',
  },
  productTitle:{
    fontSize:14,
    fontWeight:600
  },
  productPrice:{

  }
}));

export default useStyles;
