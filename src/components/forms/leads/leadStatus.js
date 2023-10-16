import React, { useState, useEffect } from "react";
import { Box, Divider, Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import EventIcon from "@material-ui/icons/Event";
import moment from "moment";

const leadStatus = [
  {
    name: "Created",
    value: "created",
  },
  {
    name: "Follow Up",
    value: "follow_up",
  },

  {
    name: "Appointment ",
    value: "appointment",
  },
  {
    name: "Order Closed",
    value: "order_closed",
  },

  {
    name: " Unsuccessful",
    value: "unsuccessful",
  },
];

const LeadStatusForm = ({ onSubmitForm, formData, loading }) => {
  const [leadModuleStatus, setLeadModuleStatus] = useState("created");
  const { register, setValue, control, errors, handleSubmit, reset } = useForm({
    defaultValues: {
      status: "created",
    },
  });
  const checkError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? classes.errorInput : "";
  };

  const onSubmit = (data) => {
    if (data.status !== "follow_up") {
      onSubmitForm({
        reason: data.reason,
        status: data.status,
        date: null,
      });
    } else {
      onSubmitForm({
        reason: data.reason,
        status: data.status,
        date: data.date,
      });
    }
  };

  useEffect(() => {
    if (!_.isEmpty(formData)) {
      if (!_.isEmpty(formData._status)) {
        const payload = {
          status: formData._status.name,
          reason: formData._status.note,
          date: formData._followUpDate,
        };
        setLeadModuleStatus(formData._status.name);
        reset(payload);
      }
    }
  }, [formData]);

  return (
    <Box p={2}>
      <Box>
        <Box mb={2}>
          <p>Lead Status:</p>
        </Box>

        <Box mb={5}>
          <Divider />
        </Box>
        <select
          name="status"
          style={{ height: 40, width: "100%" }}
          ref={register({
            required: true,
          })}
          onChange={(e) => {
            setLeadModuleStatus(e.target.value);
          }}
        >
          {leadStatus.map((item, index) => (
            <option
              selected={leadModuleStatus === item.value}
              key={index}
              value={item.value}
            >
              {item.name}
            </option>
          ))}
        </select>
      </Box>
      <Box>
        <p>Reason:</p>
        <textarea
          ref={register({
            required: {
              value: false,
              message: "",
            },
          })}
          name="reason"
          style={{ width: "100%" }}
          rows={5}
          placeholder="Reason"
          className={checkError(errors, "reason")}
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Box>
      {leadModuleStatus === "follow_up" && (
        <Box>
          <p>Date:</p>
          <Controller
            name={`date`}
            control={control}
            setValue={setValue}
            defaultValue={moment(new Date())}
            render={({ value, name }) => (
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  clearable
                  onChange={(date) => {
                    setValue(name, date);
                  }}
                  format="DD/MM/YYYY"
                  keyboardIcon={<EventIcon />}
                  value={value}
                />
              </MuiPickersUtilsProvider>
            )}
          ></Controller>
        </Box>
      )}

      <Box mt={2} mb={2}>
        <Divider />
      </Box>

      <Button disabled={loading} onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Box>
  );
};

export default LeadStatusForm;
