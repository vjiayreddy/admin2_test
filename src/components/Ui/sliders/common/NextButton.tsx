import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Gray from "@material-ui/core/colors/grey";
import makeStyles from "@material-ui/styles/makeStyles";

interface props {
  className?: any;
  style?: any;
  onClick?: () => void;
}

const useStyles = makeStyles((theme: any) => ({
  MuiIconButton: {
    padding: 0,
  },
  mui_button_box: {
    height: 50,
    width: 50,
    borderRadius: "100%",
    backgroundColor: Gray[900],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      height: 25,
      width: 25,
    },
  },
  icon:{
    width:25,
    height:25,
    [theme.breakpoints.only("xs")]: {
      height: 14,
      width: 14,
    },
  }
}));

const NextButtonComponent: FC<props> = ({ className, style, onClick }) => {
  const classes = useStyles();
  return (
    <Box className={className} onClick={onClick}>
      <Box className={classes.mui_button_box}>
        <img
          className={classes.icon}
          alt="next-arrow"
          src="/icons/next-arrow.png"
        />
      </Box>
    </Box>
  );
};

export default NextButtonComponent;
