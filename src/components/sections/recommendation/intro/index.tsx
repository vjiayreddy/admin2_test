import React, { FC } from "react";
import Box from "@material-ui/core/Box";

//Styles
import useStyles from "./styles";
import { Typography } from "@material-ui/core";

interface props {
  data?: any;
}

const IntroSectionComponent: FC<props> = ({ data }) => {
  const classes = useStyles();
  return (
    <Box p={2}>
      <Box pt={2} pb={5}>
        <Typography
          classes={{ root: classes.sectionMainTitle }}
          variant="h1"
          component="h1"
          align="center"
        >
          {data.title}
        </Typography>
        <Typography classes={{ root: classes.sectionSubTile }}>
          {data.dec}
        </Typography>
      </Box>
    </Box>
  );
};

export default IntroSectionComponent;
