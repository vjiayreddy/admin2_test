import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
// Styles
import useStyles from "./styles";

//Utils
import { user } from "../../../../models/user";

interface props {
  data: user;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const UserInfoComponent: FC<props> = ({ data, onClick }) => {
  const classes = useStyles();
  return (
    <Box p={20} className={classes.userInfoMainBox}>
      <Box component="div" className={classes.userProfileImageBox}></Box>
      <Box pt={1} pb={1}>
        <Typography
          classes={{ root: classes.userNameLbl }}
          variant="h3"
          component="h3"
          align="center"
        >
          {data.fullName}
        </Typography>
        <Typography
          classes={{ root: classes.userSubTitle }}
          variant="subtitle2"
          component="p"
          align="center"
        >
          {data.email}
        </Typography>
      </Box>
      <Box>
        <Box>
          <Button onClick={onClick}>Edit Personalizations</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfoComponent;
