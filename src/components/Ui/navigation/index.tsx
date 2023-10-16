import React, { ReactNode, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import ToolBar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import _ from "lodash";

// UI Components
import LogoComponent from "../logo";
import UserActionsComponent from "../navigation/userActions";
import { useSession } from "next-auth/client";

const useStyles = makeStyles((theme) => ({
  appBarPosition: {
    zIndex: 9999,
  },
  sectionLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      flexGrow: 1,
    },
  },
  sectionNavmenu: {
    flexGrow: 1,
  },
  muiToolbarRoot: {
    backgroundColor: theme.palette.common.white,
    boxShadow: `0 3px 8px 0 rgba(0,0,0,0.1)`,
  },
  menuIcon: {
    padding: "0px 10px 0px 0px",
    marginBottom: "5px",
    color: "gray",
  },
}));

interface props {
  children?: ReactNode;
  userData: any;
  onClickMenuIcon: React.MouseEventHandler<HTMLButtonElement>;
}

const NavigationComponent: React.FC<props> = ({
  userData,
  onClickMenuIcon,
}) => {
  const classes = useStyles();
  const [session] = useSession();
  return (
    <React.Fragment>
      {userData && (
        <AppBar
          classes={{ positionFixed: classes.appBarPosition }}
          id="app-navigation"
          position="fixed"
          elevation={0}
        >
          <ToolBar classes={{ root: classes.muiToolbarRoot }} id="app-toolbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onClickMenuIcon}
              edge="start"
              classes={{ root: classes.menuIcon }}
            >
              <MenuIcon />
            </IconButton>
            <Box flexGrow="1">
              <LogoComponent className={classes.sectionLogo} darkMode={true} />
            </Box>
            {!_.isEmpty(userData) && <UserActionsComponent data={userData} />}
          </ToolBar>
        </AppBar>
      )}
    </React.Fragment>
  );
};

export default NavigationComponent;
