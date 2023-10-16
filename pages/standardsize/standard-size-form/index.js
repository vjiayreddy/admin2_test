
import React from "react";
import { Box, Typography, makeStyles, Grid } from "@material-ui/core";

import SizingFormComponent from "../../../src/components/forms/standardSizingForm";
// import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import { nonAuthenticated } from "../../../src/apollo/hoc/withAuthRedirect";
import UserLayoutComponent from "../../../src/components/layouts/UserLayout";


const useStyles = makeStyles((theme) => ({
  headerBox: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    paddingLeft: 30,
    paddingRight: 30,
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leadFormBox: {
    paddingLeft: 30,
    paddingRight: 30,
  },
}));

const EditStandardFormPage = (props) => {
  const classes = useStyles();
  const { session,user } = props;
  return (
    <UserLayoutComponent session={session} user={user}>
      <SizingFormComponent session={session} user={user} />
    </UserLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: EditStandardFormPage,
  baseUrl: "/styleclub",
});
