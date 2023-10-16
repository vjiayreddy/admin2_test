import React from "react";
import { Box } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import { MomentInput } from "moment";
import { DateRangeType } from "../../../utils/enumType";
import EventIcon from "@material-ui/icons/Event";

interface DateRangeProps {
  getStartDate: (date: MomentInput) => void;
  getEndDate: (date: MomentInput) => void;
  startDate: MomentInput;
  endDate: MomentInput;
  dateType: string;
}

export const DateRange: React.FC<DateRangeProps> = ({
  getEndDate,
  getStartDate,
  startDate,
  endDate,
  dateType,
}) => {
  return (
    <Box style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          clearable
          onChange={(date) => {
            getStartDate(date);
          }}
          format="DD/MM/YYYY"
          label={`${dateType} Start Date`}
          style={{height: "50px"}}
          keyboardIcon={
            <EventIcon
            //   classes={{ root: classes.icon }}
            />
          }
          value={startDate}
          placeholder={`Please enter ${dateType} start date`}
        />
      </MuiPickersUtilsProvider>
      <Box style={{ paddingInline: "10px" }}></Box>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          clearable
          style={{height: "50px"}}
          
          onChange={(date) => {
            getEndDate(date);
          }}
          format="DD/MM/YYYY"
          keyboardIcon={
            <EventIcon
            //   classes={{ root: classes.icon }}
            />
          }
          label={`${dateType} End Date`}
          value={endDate}
          placeholder={`Please enter ${dateType} end date`}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
};
