import React, { FC, Fragment, ReactNode } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import _ from "lodash";
import clsx from "clsx";

//Utils
import { colors } from "../../../settings/colors";

// Apollo
import { withSharedAuthData } from "../../apollo/hoc/withSharedAuthData";

// UI

import NavigationComponent from "../Ui/navigation";
import DrawerMenuListComponent from "../Ui/drawerMenuList/menuList";
//import LoadingIndicatorComponent from "../Ui/loading";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    userInfoBox: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      backgroundColor: colors.USER_INFO_BGCOLOR,
    },
    userName: {
      color: colors.USER_TXT_COLOR,
    },
    userExtraInfo: {},
    isCloseDrawer: {
      width: 0,
    },
  })
);

interface props {
  children?: ReactNode;
  authData?: any;
  loading?: boolean;
  session: any;
}

const UseInfoBoxComponent = ({ data }) => {
  const classes = useStyles();
  return (
    <Box
      id="user-info-card"
      p={2}
      className={classes.userInfoBox}
      component="div"
    >
      <Box component="div">
        <img
          alt="profile_icon"
          width={50}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwiiUFvfsqGv9y_jOy_8irGhksmKCpLWqGMQ&usqp=CAU"
        />
      </Box>
      <Box flexGrow={1} component="div">
        <Typography
          align="center"
          className={classes.userName}
          variant="subtitle2"
        >
          {data.currentUser.firstName} {data.currentUser.lastName}
        </Typography>
        <Typography
          align="center"
          variant="caption"
          component="p"
          className={classes.userExtraInfo}
        >
          {data.currentUser.email}
        </Typography>
      </Box>
    </Box>
  );
};

const DrawerLayoutComponent: FC<props> = ({ children, authData, session }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  return (
    <Fragment>
      <div className={classes.root}>
        {session && (
          <NavigationComponent
            userData={session}
            onClickMenuIcon={() => {
              setOpen(!open);
            }}
          />
        )}

        {session && (
          <Drawer
            open={open}
            variant="persistent"
            anchor="left"
            className={
              open
                ? classes.drawer
                : clsx(classes.drawerPaper, classes.isCloseDrawer)
            }
            classes={{
              paper: open
                ? classes.drawerPaper
                : clsx(classes.drawerPaper, classes.isCloseDrawer),
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              {session && (
                <Fragment>
                  <UseInfoBoxComponent
                    data={{
                      currentUser: {
                        firstName: session.user["firstName"],
                        lastName: session.user["lastName"],
                        email: session.user["email"],
                      },
                    }}
                  />
                  <DrawerMenuListComponent session={session} />
                  <Divider />
                </Fragment>
              )}
            </div>
          </Drawer>
        )}

        <main className={classes.content}>
          <Toolbar />
          {children}
        </main>
      </div>
    </Fragment>
  );
};

//export default DrawerLayoutComponent;

export default withSharedAuthData({ Component: DrawerLayoutComponent });
