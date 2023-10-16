import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

//Ui
import SectionTitlesComponent from "../../../Ui/titles/sectionTitles";
import FashionCardComponent from "../../../Ui/cards/fashion";

// Styles
import useStyles from "./style";

const FashionSectionComponent = () => {
  const classes = useStyles();
  return (
    <Box className={classes.mainFashionBox}>
      <SectionTitlesComponent
        align="center"
        subTitle="Be it a wedding event, an evening party, a board meeting, or a business conference, My Perfect Fit helps you carry your best version for any or every occasion"
        title="A complete fashion solution for all your needs."
      />
      <Grid spacing={1} container>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <FashionCardComponent />
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <FashionCardComponent />
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <FashionCardComponent />
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <FashionCardComponent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FashionSectionComponent;
