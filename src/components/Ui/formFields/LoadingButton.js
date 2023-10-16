import React from "react";
import PropTypes from "prop-types";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  circleLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const LoadingButton = ({
  btnTitle,
  onClick,
  id,
  color,
  disabled,
  btnClasses,
  btnClassName,
  circleLoaderClass,
  circleColor,
  spinner,
  startIcon,
}) => {
  const classes = useStyles();

  return (
    <Button
      id={id ? id : "action-button"}
      color={color ? color : "primary"}
      disableElevation={true}
      variant="contained"
      onClick={onClick}
      fullWidth={true}
      disabled={disabled}
      classes={btnClasses}
      className={btnClassName}
      startIcon={startIcon}
    >
      {btnTitle}
      {spinner && (
        <CircularProgress
          size={24}
          color={circleColor ? circleColor : "primary"}
          className={
            circleLoaderClass ? circleLoaderClass : classes.circleLoader
          }
        />
      )}
    </Button>
  );
};

LoadingButton.propTypes = {
  btnTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LoadingButton;
