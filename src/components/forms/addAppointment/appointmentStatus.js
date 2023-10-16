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
import TextInputField from "../../../components/Ui/formFields/TextInputField";

const _appointmentStatus = [
  {
    name: "Created",
    value: "created",
  },
  {
    name: "Unconfirmed",
    value: "unconfirmed",
  },
  {
    name: "Not Interested",
    value: "not_interested",
  },

  {
    name: "Follow Up ",
    value: "follow_up",
  },
  {
    name: "Ordered",
    value: "ordered",
  },

  {
    name: " Unsuccessful",
    value: "unsuccessful",
  },
];

const AppointmentStatusForm = ({ onSubmitForm, formData, loading }) => {
  const [appointmentStatus, setAppointmentStatus] = useState("created");
  const [_date, setDate] = useState(null);
  const {
    register,
    setValue,
    control,
    errors,
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      status: "created",
    },
  });
  const checkError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? classes.errorInput : "";
  };

  const onSubmit = (data) => {
    if (data.status === "follow_up") {
      onSubmitForm({
        reason: data.reason,
        status: data.status,
        date: !_.isEmpty(data.date) ? data.date : _date,
        orderValue: null,
      });
    } else if (data.status === "ordered") {
      onSubmitForm({
        reason: data.reason,
        status: data.status,
        date: null,
        orderValue: parseFloat(data.orderValue),
      });
    } else {
      onSubmitForm({
        reason: data.reason,
        status: data.status,
        date: null,
        orderValue: null,
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
          orderValue: formData._orderValue,
        };
        setDate(formData._followUpDate);
        setAppointmentStatus(formData._status.name);
        reset(payload);
      }
    }
  }, [formData]);

  return (
    <Box p={2}>
      <Box>
        <p>Appointment Status:</p>
        <select
          name="status"
          style={{ height: 40, width: "100%" }}
          ref={register({
            required: true,
          })}
          onChange={(e) => {
            setAppointmentStatus(e.target.value);
          }}
        >
          {_appointmentStatus.map((item, index) => (
            <option
              selected={appointmentStatus === item.value}
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
      {appointmentStatus === "ordered" && (
        <Box>
          <p>Order Value:</p>
          <TextInputField
            inputRef={register({
              required: {
                value: false,
                message: "",
              },
            })}
            name="orderValue"
            type="number"
            placeholder="Order Value"
            className={checkError(errors, "orderValue")}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>
      )}
      {appointmentStatus === "follow_up" && (
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

      <Box marginBottom="20px" marginTop="20px">
        <Divider />
      </Box>

      <Button disabled={loading} onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Box>
  );
};

export default AppointmentStatusForm;
