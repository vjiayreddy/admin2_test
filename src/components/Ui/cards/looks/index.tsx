import React, { FC } from "react";
import Box from "@material-ui/core/Box";

// Styles
import useStyles from "./styles";

interface props {
  data: any;
}

const LooksCardComponent: FC<props> = ({ data }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.looksCard}
      style={{
        backgroundImage: `url(${data.imgUrl})`,
      }}
    >
      <Box p={2} component="div" className={classes.looksCardOverly}>
        <span>{data.title}</span>
      </Box>
    </Box>
  );
};

export default LooksCardComponent;
