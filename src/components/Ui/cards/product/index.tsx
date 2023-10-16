import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Styles
import useStyles from "./styles";

interface props {
  data: any;
}

const ProductCardComponent: FC<props> = ({ data }) => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.cardWrapperBox}>
      <Box
        className={classes.cardImage}
        style={{
          backgroundImage: `url(${data.images[0]})`,
        }}
        component="div"
      ></Box>
      <Box component="div" className={classes.cardContent}>
        <Box pr={2} flexGrow={1}>
          <Typography
            classes={{ root: classes.productTitle }}
            variant="body1"
            component="p"
          >
            {data.title}
          </Typography>
        </Box>
        <Box>
          <Typography color="primary" variant="h6" component="span">
            ₹{data.discPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCardComponent;
