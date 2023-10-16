import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Styles
import useStyles from "./styles";
import { Button } from "@material-ui/core";

interface props {
  data: any;
}

const BlogCardComponent: FC<props> = ({ data }) => {
  const classes = useStyles();
  return (
    <Box
      style={{ backgroundImage: `url(${data.bannerImage})` }}
      component="div"
      className={classes.blogCardWrapper}
    >
      <Box className={classes.blogCardOverly} p={1} component="div">
        <Typography className={classes.blogCardTitle}>{data.title}</Typography>
        <Button
          classes={{ root: classes.readMoreButton }}
          variant="text"
          size="small"
          color="primary"
          onClick={() => window.open(`${data.url}`)}
        >
          Read Artical
        </Button>
      </Box>
    </Box>
  );
};

export default BlogCardComponent;
