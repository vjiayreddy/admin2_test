import React, { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

// Models
import { footerLink } from "../../../../models/general/global";
// Styles
import useStyles from "./styles";
import { LinkProps } from "@material-ui/core";

interface props {
  title?: string;
  data: footerLink[];
}

const RouterLink: FC<React.PropsWithChildren<LinkProps>> = ({
  href,
  title,
}) => {
  const classes = useStyles();
  return (
    <Link href={href}>
      <a className={classes.footerAnchorLink}>{title}</a>
    </Link>
  );
};

const LinksListComponent: FC<props> = ({ title, data }) => {
  const classes = useStyles();
  return (
    <Box pb={0.5} mb={2}>
      <Typography
        classes={{ root: classes.footerLinksTitle }}
        variant="subtitle1"
        component="span"
      >
        {title}
      </Typography>
      <Box mt={1}>
        {data.map((link, index) => (
          <Box key={index}>
            <RouterLink href={link.href} title={link.linkTitle} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LinksListComponent;
