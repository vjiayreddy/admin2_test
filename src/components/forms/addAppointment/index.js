import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Button,
  makeStyles,
  FormControlLabel,
  Box,
} from "@material-ui/core";
import TextInputField from "../../Ui/formFields/TextInputField";
import SelectDropDown from "../../Ui/formFields/SelectDropdown";
import EventIcon from "@material-ui/icons/Event";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import LoadingIndicatorComponent from "../../Ui/loading";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";
import { extractAppointDateFormate } from "../../../utils/validations";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { GET_ALL_STYLISTS } from "../../../apollo/queries/user";
import {
  GET_LATEST_APPOINTMENT_ID,
  SAVE_LEAD_APPOINTMENT,
} from "../../../apollo/queries/appointment";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

// Apollo

import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  errorInput: {
    border: `1px solid red`,
  },
  orderFormGrid: {
    margin: 0,
    width: "100%",
  },
  actionButton: {
    marginTop: 50,
  },
}));

const AppointmentForm = ({ leadData, onAutoClose }) => {
  const [stylists, setStylists] = useState([]);
  const [appointment, setAppointmentType] = React.useState("online");
  const [appointmentID, setAppointmentID] = React.useState();

  const handleChange = (event) => {
    setAppointmentType(event.target.value);
  };
  const { register, errors, handleSubmit, setValue, control, getValues } =
    useForm();
  const classes = useStyles();
  const { loading: loadingStylists } = useQuery(GET_ALL_STYLISTS, {
    onCompleted({ getAllStylists }) {
      let tempData = [];
      getAllStylists.map((item) => {
        tempData.push({ name: item.name, value: item._id });
      });
      setStylists(tempData);
    },
  });

  const { loading: loadingLAI, data: dataLAI } = useQuery(
    GET_LATEST_APPOINTMENT_ID
  );

  const [saveLeadAppointment, { loading: loadingSLA }] = useMutation(
    SAVE_LEAD_APPOINTMENT,
    {
      onCompleted() {
        alert("Appointment Saved Successfully");
        onAutoClose();
      },
    }
  );

  const onSubmit = async (data) => {
  
    const payload = {
      appointmentId: Number(data.appointmentId),
      userId: leadData.userId,
      leadId: leadData.id,
      //  phone:leadData.phone,
      //  phone: leadData ? `${leadData.countryCode} ${leadData.phone}` : null,
      appointmentDate: extractAppointDateFormate(
        data.appointmentDate,
        data.appointmentTime
      ),
      appointmentType: appointment,
      appointmentSelectedTimestamp: new Date(
        data.appointmentTime
      ).toISOString(),
      stylistIds: [data.stylistIds],
    };
    await saveLeadAppointment({
      variables: {
        body: payload,
      },
    });
  };

  const checkError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? classes.errorInput : "";
  };

  useEffect(() => {
    if (!_.isEmpty(dataLAI)) {
      setAppointmentID(dataLAI.getLatestAppointmentId);
    }
  }, [dataLAI]);

  return (
    <Fragment>
      {loadingStylists || loadingLAI ? (
        <LoadingIndicatorComponent height={400} />
      ) : (
        <Fragment>
          <Box p={2}>
            <Grid spacing={1} container>
              <Grid item xs={12} md={6} lg={6} sm={6}>
                <p>Appointment Id:</p>
                <TextInputField
                  inputRef={register({
                    required: {
                      value: true,
                      message: "",
                    },
                  })}
                  readOnly={true}
                  name="appointmentId"
                  value={appointmentID}
                  placeholder="Appointment Id"
                  className={checkError(errors, "appointmentId")}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={6}>
                <p>Appointment Date:</p>
                <Controller
                  name={`appointmentDate`}
                  control={control}
                  setValue={setValue}
                  defaultValue={moment(new Date())}
                  render={({ value, name }) => (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        minDate={moment(new Date())}
                        clearable
                        onChange={(date) => {
                          setValue(name, date);
                        }}
                        format="DD/MM/YYYY"
                        keyboardIcon={
                          <EventIcon classes={{ root: classes.icon }} />
                        }
                        value={value}
                      />
                    </MuiPickersUtilsProvider>
                  )}
                ></Controller>
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={6}>
                <p>Appointment allocated to</p>

                <select
                  ref={register({
                    required: {
                      value: true,
                      message: "",
                    },
                  })}
                  name="stylistIds"
                  style={{
                    height: 40,
                    width: "100%",
                    border: "1px solid #DAD9E2",
                    borderRadius: "4px",
                  }}
                >
                  {stylists.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={6}>
                <p>Appointment Time:</p>

                <Controller
                  name={`appointmentTime`}
                  control={control}
                  setValue={setValue}
                  defaultValue={moment(new Date())}
                  render={({ value, name }) => (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        clearable
                        placeholder="08:00 AM"
                        mask="__:__ _M"
                        value={value}
                        onChange={(date) => {
                          setValue(name, date);
                        }}
                        keyboardIcon={
                          <AccessTimeIcon classes={{ root: classes.icon }} />
                        }
                      />
                    </MuiPickersUtilsProvider>
                  )}
                ></Controller>
              </Grid>
              <Grid item xs={12} md={6} lg={6} sm={6}>
                <p>Appointment Type:</p>
                <RadioGroup
                  row={true}
                  aria-label="appointmentType"
                  name="appointmentType"
                  value={appointment}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label="Online"
                  />
                  <FormControlLabel
                    value="studio"
                    control={<Radio />}
                    label="Studio"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit(onSubmit)}
              className={classes.actionButton}
              disabled={loadingSLA}
            >
              Submit
            </Button>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AppointmentForm;
