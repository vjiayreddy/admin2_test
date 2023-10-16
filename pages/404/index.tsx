import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  mainGridContainer: {
    height: "80vh",
  },
  errorLbl: {
    fontSize: 80,
  },
  MuiButton: {
    marginTop: 20,
  },
}));

const PageError = () => {
  const classes = useStyles();
  return (
    <Grid
      id="mpf-app-pageerror-container"
      container
      direction="column"
      justify="center"
      alignItems="center"
      classes={{ root: classes.mainGridContainer }}
    >
      <Grid item>
        <Typography
          classes={{ root: classes.errorLbl }}
          align="center"
          variant="h1"
          component="h1"
        >
          404
        </Typography>
        <Typography align="center" variant="body2" component="p">
          WE ARE SORRY, PAGE NOT FOUND!
        </Typography>
      </Grid>
      <Grid item>
        <Button>Back To Home</Button>
      </Grid>
    </Grid>
  );
};

export default PageError;
