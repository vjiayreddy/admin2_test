import React, { useEffect } from "react";
import { Box, IconButton, Button } from "@material-ui/core";
import { useFieldArray, useForm } from "react-hook-form";
import "date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";
import _ from "lodash";
import TextInputField from "../../Ui/formFields/TextInputField";
import {
  handleChangeField,
  calculateOtherCharges,
  calculateOtherPaymentModes,
  getSingleOrderByMobile,
  calculateAfterRemoveItems,
} from "../../../services/_orders";

const tableCols = ["Name", "Amount", "Note", "Action"];

const AdvancePayment = ({ formfields, onCloseModel, data }) => {
  const { control, register, handleSubmit, setValue, getValues, watch } =
    useForm({
      mode: "all",
      defaultValues: {
        [formfields.field_2]: 0,
        [formfields.field_1]: [
          {
            name: "",
            amount: 0,
            note: "",
          },
        ],
      },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: formfields.field_1,
  });

  const _changeChargesChange = watch([formfields.field_1]);

  const onsubmit = (data) => {
    alert("Added Charges");
    onCloseModel(data);
  };

  useEffect(() => {
    if (!_.isEmpty(data)) {
      setValue(formfields.field_1, data);
    }
  }, [data]);

  useEffect(() => {
    if (!_.isEmpty(_changeChargesChange[formfields.field_1])) {
      let otherCharges = _changeChargesChange[formfields.field_1].reduce(
        (sum, x) => (sum += parseFloat(x.amount)),
        0
      );
      setValue(formfields.field_2, otherCharges);
    }
  }, [_changeChargesChange]);

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
                <TextInputField
                  type="text"
                  name={`${formfields.field_1}[${index}].name`}
                  defaultValue={item.name}
                  inputRef={register({
                    required: true,
                  })}
                  placeholder="Name"
                />
              </td>
              <td>
                <TextInputField
                  type="number"
                  name={`${formfields.field_1}[${index}].amount`}
                  defaultValue={item.amount}
                  inputRef={register({
                    required: true,
                  })}
                  placeholder="Amount"
                  onChange={(e) => {
                    if (!_.isEmpty(e.target.value)) {
                      setValue(
                        formfields.field_2,
                        calculateOtherPaymentModes(getValues, formfields)
                      );
                    }
                  }}
                />
              </td>
              <td>
                <textarea
                  name={`${formfields.field_1}[${index}].note`}
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
                <Box display="flex">
                  {index !== 0 && (
                    <IconButton
                      onClick={() => {
                        remove(index);
                        fields.splice(index, 1);
                        remove(index);
                        setValue(
                          formfields.field_2,
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
                        name: "",
                        amount: 0,
                        note: "",
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
            <td colSpan={3}>Total</td>
            <td colSpan={4}>
              <Box display="flex" alignItems="center">
                <Box>र</Box>
                <Box>
                  <TextInputField
                    type="number"
                    name={formfields.field_2}
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
        <Button onClick={handleSubmit(onsubmit)}>Apply Charges</Button>
      </Box>
    </Box>
  );
};

export default AdvancePayment;
