import React from "react";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CachedIcon from "@material-ui/icons/Cached";
import { Button } from "@material-ui/core";
import {
  RadioGroup,
  Typography,
  FormControlLabel,
  makeStyles,
  Radio,
  Box,
} from "@material-ui/core";
import LoadingButton from "../../Ui/formFields/LoadingButton";

const useStyles = makeStyles((theme) => ({
  sizeLabel: {
    fontSize: 13,
    color: theme.palette.common.COLOR_8E919E,
  },
  radioLabel: {
    ...theme.typography.h3,
    fontSize: 14,
    lineHeight: "21px",
    color: theme.palette.common.COLOR_354052,
    fontWeight: 500,
  },
  radioGroup: {
    marginBottom: 20,
  },
}));

const SizeSeleteRadioGroup = ({
  value,
  onChange,
  disabled,
  onClickPdfbtn,
  isView,
  onClickView,
  onClickReset
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box flexGrow="1">
        <Typography
          classes={{ root: classes.sizeLabel }}
          variant="h4"
          component="h4"
        >
          SIZES ARE IN:
        </Typography>
        <RadioGroup
          row={true}
          color="primary"
          aria-label="measurementsize"
          name="measurementSize"
          value={value}
          classes={{ root: classes.radioGroup }}
          onChange={onChange}
        >
          <FormControlLabel
            value="inches"
            control={<Radio color="primary" />}
            label="Inches (in)"
            classes={{ label: classes.radioLabel }}
          />
          <FormControlLabel
            value="centimeters"
            control={<Radio color="primary" />}
            label="Centimeters (cm)"
            classes={{ label: classes.radioLabel }}
          />
        </RadioGroup>
      </Box>
      {/* <Box mr={2}>
        <Button
          size="small"
          startIcon={<CachedIcon />}
          onClick={onClickReset}
          color="secondary"
          variant="contained"
        >
          Reset
        </Button>
      </Box> */}
      {isView && (
        <Box>
          <Button
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={onClickView}
            color="primary"
            variant="contained"
          >
            View
          </Button>
          {/* <LoadingButton
            id="btn-proceed-view"
            btnTitle="View"
            color="primary"
            onClick={onClickView}
          /> */}
        </Box>
      )}

      <Box ml={2}>
        <Button
          size="small"
          startIcon={<PictureAsPdfIcon />}
          onClick={onClickPdfbtn}
          disabled={disabled}
          color="secondary"
          variant="contained"
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default SizeSeleteRadioGroup;
