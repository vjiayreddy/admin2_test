import React, { useEffect } from "react";
import { Box, IconButton, Button } from "@material-ui/core";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import "date-fns";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import EventIcon from "@material-ui/icons/Event";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Checkbox from "@material-ui/core/Checkbox";
import _ from "lodash";
import TextInputField from "../../Ui/formFields/TextInputField";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const tableCols = [
  "Date",
  "Amount",
  "Note",
  "Payment Type",
  "Advance",
  "Action",
];

const paymentModes = [
  {
    name: "Online",
    value: "online",
  },
  {
    name: "Google Pay",
    value: "googleplay",
  },
  {
    name: "Cash",
    value: "cash",
  },
  {
    name: "MSwipe",
    value: "mswipe",
  },
  {
    name: "Razor Pay",
    value: "razorpay",
  },
  {
    name: "Pine Labs",
    value: "pine labs",
  },
  {
    name: "Ezetap",
    value: "ezetap",
  },
  {
    name: "Phone pe POS",
    value: "phonepepos",
  },
  {
    name: "Phone pe QR",
    value: "phonepeqr",
  },
  {
    name: "PSB QR",
    value: "psbqr",
  },
];

const AdvancePayment = ({ onCloseModel, formData }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    errors,
  } = useForm({
    mode: "all",
    defaultValues: {
      paymentBreakdownTotal: 0,
      paymentBreakdown: !_.isEmpty(formData)
        ? formData
        : [
            {
              date: moment(new Date()),
              amount: 0,
              modeOfPayment: null,
              note: "",
              isAdvance: true,
            },
          ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "paymentBreakdown",
  });
  const _watchPaymentModes = watch(["paymentBreakdown"]);
  useEffect(() => {
    if (!_.isEmpty(_watchPaymentModes)) {
      let otherCharges = _watchPaymentModes.paymentBreakdown.reduce(
        (sum, x) => (sum += parseFloat(x.amount)),
        0
      );
      setValue("paymentBreakdownTotal", otherCharges);
    }
  }, [_watchPaymentModes]);

  const onsubmit = (data) => {
    alert("Advance payment added");
    onCloseModel(data);
  };

  return (
    <Box p={1} className="orderTable">
      <table className="table">
        <tr>
          {tableCols.map((item, index) => (
            <th key={index} className="textalignLeft cellSelect">
              {item}
            </th>
          ))}
        </tr>
        <tbody>
          {fields.map((item, index) => (
            <tr key={item.id}>
              <td>
                <Controller
                  name={`paymentBreakdown[${index}].date`}
                  control={control}
                  setValue={setValue}
                  defaultValue={
                    !_.isEmpty(item.date) ? item.date : moment(new Date())
                  }
                  render={({ value, name }) => (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        clearable
                        onChange={(date) => {
                          setValue(name, date);
                          //   handleChangeField("orderDate", date, getValues);
                        }}
                        format="DD/MM/YYYY"
                        keyboardIcon={<EventIcon />}
                        value={value}
                      />
                    </MuiPickersUtilsProvider>
                  )}
                ></Controller>
              </td>
              <td>
                <TextInputField
                  type="number"
                  name={`paymentBreakdown[${index}].amount`}
                  defaultValue={item.amount}
                  inputRef={register({
                    required: false,
                  })}
                  placeholder="Amount"
                />
              </td>
              <td>
                <textarea
                  name={`paymentBreakdown[${index}].note`}
                  ref={register({
                    required: false,
                  })}
                  defaultValue={item.note}
                  style={{ width: "100%", border: "none" }}
                  onChange={(e) => {}}
                  placeholder="Add Note"
                ></textarea>
              </td>
              <td>
                <Controller
                  control={control}
                  name={`paymentBreakdown[${index}].modeOfPayment`}
                  defaultValue={item.value}
                  rules={{
                    required: true,
                  }}
                  render={(props) => (
                    <select
                      onChange={(e) => {
                        props.onChange(e.target.value);
                      }}
                      style={{ height: 40, border: "none" }}
                    >
                      <option disabled selected value></option>
                      {paymentModes.map((_item, index) => (
                        <option
                          selected={item.modeOfPayment === _item.value}
                          key={index}
                          value={_item.value}
                        >
                          {_item.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </td>
              <td>
                <Controller
                  name={`paymentBreakdown[${index}].isAdvance`}
                  control={control}
                  setValue={setValue}
                  defaultValue={item.isAdvance}
                  render={({ value, name }) => (
                    <Checkbox
                      onChange={(e) => {
                        setValue(name, e.target.checked);
                      }}
                      inputRef={register({})}
                      value={value}
                      checked={value}
                    />
                  )}
                ></Controller>
              </td>
              <td>
                <Box display="flex">
                  {index !== 0 && (
                    <IconButton
                      onClick={() => {
                        fields.splice(index, 1);
                        remove(index);
                      }}
                      size="small"
                    >
                      <DeleteIcon style={{ color: "crimson" }} />
                    </IconButton>
                  )}

                  <IconButton
                    onClick={() => {
                      const appendValue = {
                        date: moment(new Date()),
                        amount: 0,
                        modeOfPayment: "",
                        note: "",
                        isAdvance: false,
                      };
                      append(appendValue);
                    }}
                    size="small"
                  >
                    <AddBoxIcon style={{ color: "cadetblue" }} />
                  </IconButton>
                </Box>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={5}>Total</td>
            <td colSpan={4}>
              <Box display="flex" alignItems="center">
                <Box>र</Box>
                <Box>
                  <TextInputField
                    type="number"
                    name="paymentBreakdownTotal"
                    readOnly={true}
                    defaultValue={0}
                    inputRef={register()}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      paddingTop: 0,
                      paddingBottom: 0,
                      height: "auto",
                      fontWeight: "bold",
                    }}
                  />
                </Box>
              </Box>
            </td>
          </tr>
        </tbody>
      </table>
      <Box>
        <Button onClick={handleSubmit(onsubmit)}>Save Payments</Button>
      </Box>
    </Box>
  );
};

export default AdvancePayment;
