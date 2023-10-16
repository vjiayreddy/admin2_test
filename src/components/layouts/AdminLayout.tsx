import React, { FC, Fragment, ReactNode } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import _ from "lodash";
import clsx from "clsx";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import List from "@material-ui/core/List";

//Utils
import { colors } from "../../../settings/colors";

// Apollo

// UI

import NavigationComponent from "../Ui/navigation";
import AdminMenuList from "../Ui/drawerMenuList/adminMenuList";
//import LoadingIndicatorComponent from "../Ui/loading";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    // appBar: {
    //   zIndex: theme.zIndex.drawer + 1,
    // },
    // drawer: {
    //   width: drawerWidth,
    //   flexShrink: 0,
    // },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    // content: {
    //   flexGrow: 1,
    //   padding: theme.spacing(0),
    // },
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

    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: 60,
      [theme.breakpoints.up("sm")]: {
        width: 60,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
    },
  })
);

interface props {
  children?: ReactNode;
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

const AdminLayoutComponent: FC<props> = ({ children, session }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}></div>
            <AdminMenuList session={session} />
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

export default AdminLayoutComponent;
