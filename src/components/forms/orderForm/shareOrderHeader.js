import React from "react";
import { Box, makeStyles, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  orderFormHeader: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    [theme.breakpoints.down("xs")]: {
      marginTop: 10,
    },
  },

  basicForm: {
    minHeight: 200,
    padding: 20,
  },
  heading: {
    flex: 1, // Allow the heading to take up available space
    textAlign: "center", // Center the text within the heading
    fontSize: 20,
  },
  button: {
    marginLeft: 20, 
    marginRight: 20,// Add margin to push the button to the right
  },
}));

const ShareOrderHeader = ({
  title,
  onClick,
  btnTitle,
  onClick1,
  btnTitle1,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.orderFormHeader}>
      <Typography className={classes.heading}>{title}</Typography>
      <Button className={classes.button} onClick={onClick}>
        {btnTitle}
      </Button>
      {btnTitle1 && <Button onClick={onClick1}>{btnTitle1} </Button>}
    </Box>
  );
};

export default ShareOrderHeader;
