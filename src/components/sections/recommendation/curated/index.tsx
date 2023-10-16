import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Styles
import useStyles from "./styles";

// UI
import ProductCardComponent from "../../../Ui/cards/product";

interface props {
  data: any;
}

useStyles;
export const CuratedProductsComponent: FC<props> = ({ data }) => {
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
      <Grid container alignItems="stretch" spacing={2}>
        {data.products.map((product, index) => (
          <Grid key={index} item xs={6} md={3} lg={3} xl={3} sm={4}>
            <ProductCardComponent data={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CuratedProductsComponent;
