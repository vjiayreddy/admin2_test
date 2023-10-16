import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Apollo
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";

// Ui Component
import UserInfoFormComponent from "../../src/components/forms/userInfo";
import UserLayoutComponent from "../../src/components/layouts/UserLayout";
import AddressForm from "../../src/components/forms/addressForm";
const useStyles = makeStyles((theme) => ({
  tabRoot: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const UserInfoPage = (props) => {
  const classes = useStyles();
  const { session, user } = props;
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <UserLayoutComponent session={session} user={user}>
      <Tabs
        onChange={(e, index) => { 
          setTabIndex(index);
        }}
        value={tabIndex}
        classes={{ root: classes.tabRoot }}
      >
        <Tab label="UPDATE USER INFO"></Tab>
        <Tab label="ADD USER ADDRESS"></Tab>
      </Tabs>
      <Box p={1}>
        {tabIndex === 0 && <UserInfoFormComponent authData={user} />}
        {tabIndex === 1 && <AddressForm authData={user} />}
      </Box>
    </UserLayoutComponent>
  ); 
};

export default nonAuthenticated({
  Component: UserInfoPage,
  baseUrl: "/userInfo",
});
