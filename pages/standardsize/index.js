


import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Apollo
import { nonAuthenticated } from "../../src/apollo/hoc/withAuthRedirect";

// Ui Component
import UserInfoFormComponent from "../../src/components/forms/userInfo";
import StandardSizeGridDataComponent from "../../src/components/Ui/dataGrid/standardSizeGrid"
import UserLayoutComponent from "../../src/components/layouts/UserLayout";

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
      <div
          style={{
            height: `calc(100vh - 60px)`,
            overflowY: "scroll",
            width: "100%",
          }}
        >
        <StandardSizeGridDataComponent/>
        </div>
    </UserLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: UserInfoPage,
  baseUrl: "/userInfo",
});
