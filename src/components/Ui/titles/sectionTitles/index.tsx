import React, { FC, ReactNode } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Styles
import useStyles from "./styles";

type AlignType = "left" | "center" | "right";

interface props {
  id?: string;
  title: string;
  subTitle?: string;
  children?: ReactNode;
  align?: AlignType;
}

const SectionTitlesComponent: FC<props> = ({
  id,
  title,
  subTitle,
  children,
  align,
}) => {
  const classes = useStyles();
  return (
    <Box component="div" id={id} mb={2}>
      <Box component="div">
        <Typography
          variant="h3"
          component="h3"
          classes={{ root: classes.sectionMainTitle }}
          align={align}
        >
          {title}
        </Typography>
      </Box>
      {subTitle && (
        <Box component="div">
          <Typography
            variant="body1"
            component="p"
            classes={{ root: classes.sectionSubTitle }}
            align={align}
          >
            {subTitle}
          </Typography>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default SectionTitlesComponent;
