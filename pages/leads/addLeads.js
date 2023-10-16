import React from "react";
import { Box, Typography, makeStyles, Grid } from "@material-ui/core";
import LeadForm from "../../src/components/forms/leads";
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";
import AdminLayoutComponent from "../../src/components/layouts/AdminLayout";

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

const AddLeadsPage = (props) => {
  const classes = useStyles();
  const { session } = props;
  return (
    <AdminLayoutComponent session={session}>
      <Box className={classes.headerBox}>
        <Typography>Create New Lead</Typography>
      </Box>
      <Box className={classes.leadFormBox} padding={1}>
        <LeadForm session={session} />
      </Box>
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({ Component: AddLeadsPage, baseUrl: "/leads" });
