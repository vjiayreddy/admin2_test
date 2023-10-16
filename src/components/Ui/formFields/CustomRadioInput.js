import React from "react";
import {
  FormControlLabel,
  Radio,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clxs from "clsx";
import { fonts } from "../../../../settings/fonts";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  radioButton: {
    minHeight: 40,
    backgroundColor: `rgba(218,217,226,0.3)`,
    margin: 5,
    paddingLeft: `16px !important`,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: `16px !important`,
    width: "100%",
    fontFamily: fonts.MPF_HEAVY,
    color: theme.palette.secondary.main,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "20px",
    textAlign: "center",
  },

  selected: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  formLblRoot: {
    marginLeft: 0,
    marginRight: 0,
  },
  radioBtn: {
    padding: 0,
  },
}));

const CustomRadioGroup = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { data, master_name } = props;
  return (
    <Fragment>
      {data.map((_item) => (
        <FormControlLabel
          classes={{ root: classes.formLblRoot }}
          key={_item._id}
          value={_item._id}
          control={
            <Radio
              classes={{ root: classes.radioBtn }}
              disableRipple
              color="default"
              checkedIcon={
                <div className={clxs(classes.radioButton, classes.selected)}>
                  <span style={{ display: "block" }}>{_item.name}</span>
                  {master_name === "master_pricepoints" && <span>$$</span>}
                </div>
              }
              icon={
                <div className={classes.radioButton}>
                  <span style={{ display: "block" }}>{_item.name}</span>
                  {master_name === "master_pricepoints" && <span>$$</span>}
                </div>
              }
            />
          }
        />
      ))}
    </Fragment>
  );
});

export default CustomRadioGroup;
