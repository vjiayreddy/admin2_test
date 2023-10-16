import React from "react";
import Box from "@material-ui/core/Box";
// Styles
import useStyles from "./style";

const FashionCardComponent = () => {
  const classes = useStyles();
  return (
    <Box className={classes.fashionCardBox}>
      <img
        className={classes.fashionCardImage}
        loading="lazy"
        src="https://www.myperfectfit.co.in/_next/image?url=http%3A%2F%2Fdsdi4dt428hzp.cloudfront.net%2FImages%2Fmpf_assets_v2%2Ffashion%2F02.jpg&w=1920&q=100"
      />
    </Box>
  );
};

export default FashionCardComponent;
