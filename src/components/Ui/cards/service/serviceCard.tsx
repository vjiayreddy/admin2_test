import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

// Styles
import useStyles from "./style";

interface props {
  title: string;
  subTitle: string;
  icon: string;
  alt: string;
}

const CategoriesCard: FC<props> = ({ title, subTitle, icon, alt }) => {
  const classes = useStyles();
  return (
    <Box className={classes.mainServiceCard} flex="1">
      <Box p={{ xs: 0.5, md: 1, sm: 0.5, lg: 1, xl: 1 }}>
        <img alt={alt} src={icon} />
      </Box>
      <Box>
        <Typography variant="h6" component="p">
          {title}
        </Typography>
        <Hidden only={["xs"]}>
          <Typography variant="subtitle2" component="p">
            {subTitle}
          </Typography>
        </Hidden>
      </Box>
    </Box>
  );
};

export default CategoriesCard;
