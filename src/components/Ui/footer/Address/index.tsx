import React, { FC, ReactNode } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import RoomIcon from "@material-ui/icons/Room";

// Styles
import useStyles from "./styles";
// Ui Components
import LogoComponent from "../../../Ui/logo";

interface props {
  alt?: string;
  children?: ReactNode;
  title?: string;
}

const AddressLine: FC<props> = ({ alt, children, title }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" pl={0.5} mt={0.6}>
      <Box mr={1}>{children}</Box>
      <Box flexGrow={1}>
        <Typography
          classes={{ root: classes.contactLbl }}
          variant="subtitle2"
          component="p"
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export const AddressComponent: FC = () => {
  const classes = useStyles();
  return (
    <Box mb={4}>
      <Box mb={1}>
        <LogoComponent width={190} height={30} darkMode={false} />
      </Box>
      <AddressLine title="1st Floor, Plot No.1108, Road Number 55, Opp. Peddammagudi Entrance, CBI Colony, Jubilee Hills, Hyderabad, Telangana 500033.">
        <RoomIcon className={classes.locationIcon} />
      </AddressLine>
      <AddressLine title="+91 8008329992">
        <img alt="phone-icon" src={"/icons/phone.svg"} />
      </AddressLine>
    </Box>
  );
};

export default AddressComponent;
