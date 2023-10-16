import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Styles
import useStyles from "./style";
//Utils

//Models
import { serviceModel } from "../../../../models/general/global";
import { serviceBanner } from "../../../../utils/mockData";

const ServiceCardComponent: FC<serviceModel> = ({
  icon,
  title,
  subTitle,
  alt,
}) => {
  const classes = useStyles();
  return (
    <Box
      mb={2}
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Box mt={0.2} pr={1}>
        <img alt={alt} src={icon} />
      </Box>
      <Box flexGrow={1}>
        <Typography
          classes={{ root: classes.footerServiceTitle }}
          variant="body2"
          component="h6"
        >
          {title}
        </Typography>
        <Typography
          classes={{ root: classes.footerServiceSubTitle }}
          variant="subtitle2"
          component="span"
        >
          {subTitle}
        </Typography>
      </Box>
    </Box>
  );
};

const FooterServiceComponent: FC = () => {
  const classes = useStyles();
  return (
    <Box>
      {serviceBanner.map((service, index) => (
        <ServiceCardComponent key={index} {...service} />
      ))}
      <Box>
        <Typography
          classes={{ root: classes.footerServiceSubTitle }}
          variant="subtitle2"
          component="span"
        >
          © 2021 My Perfect Fit | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default FooterServiceComponent;
