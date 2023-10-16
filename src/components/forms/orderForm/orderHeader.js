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
  },
  basicForm: {
    minHeight: 200,
    padding: 20,
  },
}));

const OrderHeader = ({ title, onClick, btnTitle }) => {
  const classes = useStyles();
  return (
    <Box className={classes.orderFormHeader}>
      <Typography>{title}</Typography>
      <Button onClick={onClick}>{btnTitle}</Button>
    </Box>
  );
};

export default OrderHeader;
