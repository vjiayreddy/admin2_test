import React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

// Styles
import useStyles from "./styles";

const LoadingIndicatorComponent = ({ height }) => {
  const classes = useStyles();
  return (
    <Box
      id="loading-component"
      className={classes.loadingMainBox}
      component="div"
      style={{ height: height ? height : `calc(100vh - 64px)` }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicatorComponent;
