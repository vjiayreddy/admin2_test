import React from "react";
import { makeStyles, Typography, IconButton, Grid } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    lineHeight: "29px",
    fontSize: 18,
    marginBottom: 20,
    [theme.breakpoints.only("xs")]: {
      marginTop: 20,
      fontSize: 18,
    },
  },
  subTitle: {
    lineHeight: "29px",
    fontSize: 13,
  },
  infoIcon: {
    color: "#838694",
    padding: 2,
  },
  arrow: {
    color: theme.palette.secondary.main,
  },
  tooltip: {
    backgroundColor: theme.palette.secondary.main,
    fontSize: 12,
    lineHeight: "18px",
    fontWeight: 500,
  },
}));

const SectionHeaderComponent = ({
  optionTypeId,
  title,
  subTitle,
  sectionClasses,
  className,
  toolTip,
}) => {
  const classes = useStyles();

  const BootstrapTooltip = (props) => {
    const classes = useStyles();
    return <Tooltip arrow classes={classes} {...props} />;
  };

  return (
    <React.Fragment>
      {/* {optionTypeId === "608d388c2831161efcb9a6f5" ||
      optionTypeId === "60546863e0646e2994cfb7c3" ? (
        <React.Fragment />
      ) : (
        
      )} */}
      <Grid item xs={12} className={sectionClasses}>
        <Typography
          variant="h1"
          component="h2"
          align="center"
          classes={{ root: classes.mainTitle }}
        >
          {title}

          {!_.isEmpty(toolTip) && (
            <BootstrapTooltip title={toolTip} placement="right-end">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                classes={{ root: classes.infoIcon }}
              >
                <HelpOutlineIcon />
              </IconButton>
            </BootstrapTooltip>
          )}
        </Typography>
        {/* <Hidden only={["xs"]}>
          <Typography
            variant="subtitle2"
            component="p"
            align="center"
            classes={{ root: classes.subTitle }}
          >
            {!_.isEmpty(subTitle)
              ? subTitle
              : "This will help us better serve you, according to your persona."}
            {subTitle}
          </Typography>
        </Hidden> */}
      </Grid>
    </React.Fragment>
  );
};
export default SectionHeaderComponent;
