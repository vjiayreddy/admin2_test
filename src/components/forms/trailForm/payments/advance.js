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
import TextInputField from "../../../Ui/formFields/TextInputField";

import {
  calculateAdvancePaymentModes,
  calculateAfterRemoveItems,
  calculatePaymentModes,
  handleChangeField,
  getSingleOrderByMobile,
} from "../../../services/_orders";

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

const AdvancePayment = ({ getFomValues, onCloseModel }) => {
  const { control, register, handleSubmit, setValue, errors, getValues } =
    useForm({
      mode: "all",
      defaultValues: {
        paymentBreakdownTotal: 0,
        paymentBreakdown: [
          {
            date: moment(new Date()),
            amount: 0,
            modeOfPayment: "online",
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

  const onsubmit = (data) => {
    handleChangeField(
      "paymentBreakdown",
      data.paymentBreakdown,
      getFomValues("customerPhone")
    );
    calculatePaymentModes(getFomValues("customerPhone"));
    alert("Advance payment added");
    onCloseModel();
  };

  useEffect(() => {
    const order = getSingleOrderByMobile(getFomValues("customerPhone"));
    if (!_.isEmpty(order)) {
      if (
        _.has(order, "paymentBreakdown") &&
        _.has(order, "paymentBreakdownTotal")
      ) {
        setValue("paymentBreakdown", order.paymentBreakdown);
        setValue("paymentBreakdownTotal", order.paymentBreakdownTotal);
      }
    }
  }, []);

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
                  defaultValue={moment(new Date())}
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
                    required: true,
                  })}
                  placeholder="Amount"
                  onChange={(e) => {
                    if (e.target.value) {
                      setValue(
                        "paymentBreakdownTotal",
                        calculateAdvancePaymentModes(getValues)
                      );
                    }
                  }}
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
                  defaultValue={item.modeOfPayment}
                  render={(props) => (
                    <select style={{ height: 40, border: "none" }}>
                      {paymentModes.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.name}
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
                        console.log(name, e.target.checked);
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
                        setValue(
                          "paymentBreakdownTotal",
                          calculateAfterRemoveItems(fields)
                        );
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
