import React from "react";
import { Grid, Radio, makeStyles, FormControlLabel } from "@material-ui/core";
import clxs from "clsx";
import _ from "lodash";

const ImageRadioGroup = React.forwardRef((props, ref) => {
  const { data, md, width, masterName } = props;
  const useStyles = makeStyles((theme) => ({
    sectionFitPreferGrid: {
      marginTop: 30,
      margin: "auto",
      width: width ? width : "100%",
      [theme.breakpoints.only("xs")]: {
        width: "100%",
      },
    },
    optionCard: {
      marginBottom: 30,
    },
    formControlLabelRoot: {
      display: "flex",
      flexDirection: "column",
      margin: 0,
    },
    optionTitle: {
      fontSize: 16,
      lineHeight: "22px",
      fontFamily: "MPF_HEAVY",
      textAlign: "center",
      [theme.breakpoints.only("xs")]: {
        lineHeight: "20px",
        fontSize: 15,
      },
    },
    selected: {
      border: `3px solid ${theme.palette.common.white}`,
      outline: `2px solid ${theme.palette.secondary.main}`,
      height: 200,
      width: 200,
      [theme.breakpoints.only("xs")]: {
        width: 152,
        height: 152,
      },
    },
    radioButton: {
      height: 200,
      width: 200,
      [theme.breakpoints.only("xs")]: {
        width: 152,
        height: 152,
      },
    },
    imageWithCircle: {
      width: 200,
      height: 200,
      backgroundColor: "white",
      border: "1px solid #eeeeee",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.only("xs")]: {
        width: 152,
        height: 152,
      },
    },
    imageWithCircleSelected: {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
    circleImage: {
      width: 150,
      height: 150,
      borderRadius: "100%",
      [theme.breakpoints.only("xs")]: {
        width: 120,
        height: 120,
      },
    },
  }));
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      container
      justify="center"
      alignItems="center"
      classes={{ root: classes.sectionFitPreferGrid }}
    >
      {data.map((_item) => (
        <Grid
          item
          key={_item.id}
          md={md ? md : 3}
          xs={6}
          container
          direction="column"
          alignItems="center"
          justify="center"
          classes={{ root: classes.optionCard }}
        >
          <FormControlLabel
            value={_item._id}
            classes={{
              root: classes.formControlLabelRoot,
              label: classes.optionTitle,
            }}
            control={
              <Radio
                onChange={() => {
                  var audio = new Audio("/media/click.wav");
                  audio.play();
                }}
                disableRipple
                color="default"
                checkedIcon={
                  masterName === "master_haircolor" ? (
                    <div
                      className={clxs(
                        classes.imageWithCircle,
                        classes.imageWithCircleSelected
                      )}
                    >
                      <img
                        className={clxs(classes.circleImage)}
                        src={
                          !_.isEmpty(_item.image)
                            ? _item.image
                            : "/images/dpform/noimage.png"
                        }
                      ></img>
                    </div>
                  ) : (
                    <img
                      className={clxs(classes.selected)}
                      src={
                        !_.isEmpty(_item.image)
                          ? _item.image
                          : "/images/dpform/noimage.png"
                      }
                    ></img>
                  )
                }
                icon={
                  masterName === "master_haircolor" ? (
                    <div className={classes.imageWithCircle}>
                      <img
                        className={clxs(classes.circleImage)}
                        src={
                          !_.isEmpty(_item.image)
                            ? _item.image
                            : "/images/dpform/noimage.png"
                        }
                      ></img>
                    </div>
                  ) : (
                    <img
                      src={
                        !_.isEmpty(_item.image)
                          ? _item.image
                          : "/images/dpform/noimage.png"
                      }
                      className={classes.radioButton}
                    ></img>
                  )
                }
              />
            }
            label={_item.name}
          />
        </Grid>
      ))}
    </Grid>
  );
});

export default ImageRadioGroup;
