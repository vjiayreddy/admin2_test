import React from "react";
import { makeStyles, Radio, FormControlLabel } from "@material-ui/core";
import clsx from "clsx";

const CustomRadioButton = ({
  value,
  src,
  label,
  percent,
  position,
  width,
  height,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      paddingRight: 0,
      paddingLeft: 10,
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
    icon: {
      borderRadius: 4,
      width: width ? width : 120,
      height: height ? height : 120,
      margin: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: `2px solid ${theme.palette.common.COLOR_E6E8F1}`,
      backgroundColor: theme.palette.common.white,
      backgroundImage: `url(${src})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: position ? position : "center",
      backgroundSize: percent ? percent : "75%",
      ".Mui-focusVisible &": {
        outline: "none",
      },
      "input:hover ~ &": {
        backgroundColor: theme.palette.common.white,
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
      },
      [theme.breakpoints.only("xs")]: {
        width: 120,
        height: 120,
        margin: 5,
      },
    },
    checkedIcon: {
      border: `2px solid ${theme.palette.primary.main}`,
      "input:hover ~ &": {
        backgroundColor: theme.palette.common.white,
      },
    },
    formLblRoot: {
      marginLeft: 0,
      marginRight: 0,
    },
    formCtrlLabel: {
      ...theme.typography.h1,
      fontSize: 13,
      fontWeight: 900,
      textTransform: "none",
      paddingLeft:5,
      paddingRight:5
    },
  }));

  const classes = useStyles();

  return (
    <FormControlLabel
      label={label}
      labelPlacement="bottom"
      value={value}
      classes={{
        labelPlacementBottom: classes.formLblRoot,
        label: classes.formCtrlLabel,
      }}
      control={
        <Radio
          className={classes.root}
          disableRipple
          color="default"
          checkedIcon={
            <div className={clsx(classes.icon, classes.checkedIcon)}></div>
          }
          icon={<span className={classes.icon} />}
        />
      }
    />
  );
};

export default CustomRadioButton;
