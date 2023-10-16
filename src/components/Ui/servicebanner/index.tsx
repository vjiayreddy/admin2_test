import React from "react";
import Box from "@material-ui/core/Box";

// Styles
import useStyles from "./styles";
// Ui
import ServiceCardComponent from "../cards/service/serviceCard";
// Utils

import { serviceBanner } from "../../../utils/mockData";
const ServiceBannerComponent = () => {
  const classes = useStyles();
  return (
    <Box id="mpf-app-service-banner" className={classes.serviceBox}>
      {serviceBanner.map((item, index) => (
        <ServiceCardComponent key={index} {...item} />
      ))}
    </Box>
  );
};

export default ServiceBannerComponent;
