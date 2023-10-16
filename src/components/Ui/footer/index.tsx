import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import useStyles from "./styles";

//UI
import LinksListComponent from "./LinksList";
import ServiceCardComponent from "./Service";
import AddressComponent from "./Address";

// Utils
import { mpfLinks, helpLinks, shopNowLinks } from "../../../utils/mockData";

const FooterComponent: FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footerMainBox} id="mpf-app-footer-box-wrapper">
      <Grid container>
        <Grid
          id="mpf-app-footer-address"
          item
          md={6}
          lg={6}
          xl={6}
          sm={6}
          xs={12}
        >
          <AddressComponent />
        </Grid>
        <Grid
          id="mpf-app-footer-socials"
          item
          md={6}
          lg={6}
          xl={6}
          sm={6}
          xs={12}
        >
          Social
        </Grid>
      </Grid>
      <Grid container>
        <Grid id="mpf-app-footer-mpflinks" item md={3} xs={6} lg={3} sm={4}>
          <LinksListComponent data={mpfLinks} title="MY PERFECT FIT" />
        </Grid>
        <Grid id="mpf-app-footer-helplinks" item md={3} xs={6} lg={3} sm={4}>
          <LinksListComponent data={helpLinks} title="HELP" />
        </Grid>
        <Grid id="mpf-app-footer-shoplinks" item md={3} xs={6} lg={3} sm={4}>
          <LinksListComponent data={shopNowLinks} title="SHOP NOW" />
        </Grid>
        <Grid id="mpf-app-footer-service" item md={3} xs={12} lg={3} sm={12}>
          <ServiceCardComponent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FooterComponent;
