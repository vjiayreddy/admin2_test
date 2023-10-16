import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";
import CallIcon from "@material-ui/icons/Call";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Hidden } from "@material-ui/core";
import clsx from "clsx";
import { colors } from "../../../../../settings/colors";

const useStyles = makeStyles((theme) => ({
  contactBox: {
    display: "flex",
    minWidth: 100,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 35,
    borderRadius: 4,
    backgroundColor: colors.CONTACT_BG_COLOR,
    overflow: "hidden",
  },
  callIconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    minHeight: 35,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    [theme.breakpoints.between("xs", "sm")]: {
      borderRadius: 4,
      minHeight: 30,
    },
  },
  callIcon: {
    height: 20,
    width: 20,
  },
  contactNumber: {
    ...theme.typography.body2,
  },
}));

const ContactComponent = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Hidden only={["md", "lg", "xl"]}>
        <Box pl={0.5} pr={0.5} className={clsx(classes.callIconBox)}>
          <CallIcon classes={{ root: classes.callIcon }} />
        </Box>
      </Hidden>
      <Hidden only={["xs", "sm"]}>
        <Box className={classes.contactBox}>
          <Box pl={0.5} pr={0.5} className={classes.callIconBox}>
            <CallIcon classes={{ root: classes.callIcon }} />
          </Box>
          <Box className={classes.contactNumber} pr={1} pl={1}>
            +91 8008329992
          </Box>
        </Box>
      </Hidden>
    </Fragment>
  );
};

export default ContactComponent;
