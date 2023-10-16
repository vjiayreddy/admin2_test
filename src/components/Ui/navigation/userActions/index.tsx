import React, { ReactNode } from "react";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button } from "@material-ui/core";
import { authStylist } from "../../../../apollo/withApollo";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";

interface props {
  data: any;
}
interface uiIconBtnProps {
  id?: string;
  imgSrc?: string;
  btnSize?: string;
  children?: ReactNode;
  data?: any;
}

const useStyles = makeStyles(() => ({
  MuiIconButtonRoot: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  sectionUserActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: "100%",
    backgroundColor: "gray",
  },
  imgIcons: {
    width: 24,
    height: 24,
  },
}));

const UiIconButton: React.FC<uiIconBtnProps> = ({
  id,
  btnSize,
  children,
  data,
}) => {
  const classes = useStyles();
  return (
    <IconButton
      classes={{ root: classes.MuiIconButtonRoot }}
      size="small"
      id={id}
      disableFocusRipple
      disableRipple
    >
      {children}
    </IconButton>
  );
};

const UserActionsComponent: React.FC<props> = ({ data }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.sectionUserActions}
      component="section"
      id="mpf-app-user-actions"
    >
      <Box pl={{ xs: 1, md: 2, sm: 2, lg: 2, xl: 2 }}>
        <Button
          endIcon={<img src="/icons/logout.svg"/>}
          onClick={() => {
            signOut().then(() => {
              window.location.replace("https://admin2.myperfectfit.co.in/");
            });
          }}
        >
          {data?.user?.name}
        </Button>
        {/* <UiIconButton id="mpf-app-user-avatar">
          <Box component="div" className={classes.profileAvatar}></Box>
        </UiIconButton> */}
      </Box>
    </Box>
  );
};
export default UserActionsComponent;
