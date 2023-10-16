import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  mainGridContainer: {
    height: "80vh",
  },
  errorLbl: {
    fontSize: 45,
    marginBottom: 10,
  },
  MuiButton: {
    marginTop: 30,
  },
}));

const AccessDeined = () => {
  const router = useRouter();
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
          component="h4"
        >
          Access denied
        </Typography>
        <Typography align="center" variant="body2" component="p">
          WE ARE SORRY, THIS RESOURCE NOT ACCESSIBLE!
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Back To Home
        </Button>
      </Grid>
    </Grid>
  );
};

export default AccessDeined;
