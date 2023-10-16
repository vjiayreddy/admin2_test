import React from "react";
import { Box, IconButton, Button } from "@material-ui/core";
import "date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";
import _ from "lodash";
import TextInputField from "../../../Ui/formFields/TextInputField";
import { useForm } from "react-hook-form";

import { _handleOtherChargesTotal } from "../../../../services/orderAutoSave";

const tableCols = ["Name", "Amount", "Note", "Action"];

const OtherCharges = ({
  otherChargesFields,
  otherChargesAppend,
  otherChargesRemove,
  onCloseModel,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      otherChargesBreakdown: otherChargesFields,
    },
  });

  const onsubmit = (data) => {
    alert("Added Charges");
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
          {otherChargesFields.map((item, index) => (
            <tr key={item.id}>
              <td>
                <TextInputField
                  type="text"
                  name={`otherChargesBreakdown[${index}].name`}
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
                  name={`otherChargesBreakdown[${index}].amount`}
                  defaultValue={item.amount}
                  inputRef={register({
                    required: true,
                  })}
                  placeholder="Amount"
                />
              </td>
              <td>
                <textarea
                  name={`otherChargesBreakdown[${index}].note`}
                  ref={register({
                    required: false,
                  })}
                  defaultValue={item.note}
                  style={{ width: "100%", border: "none" }}
                  placeholder="Add Note"
                ></textarea>
              </td>
              <td>
                <Box display="flex">
                  {index !== 0 && (
                    <IconButton
                      onClick={() => {
                        otherChargesRemove(index);
                        otherChargesFields.splice(index, 1);
                        otherChargesRemove(index);
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
                      otherChargesAppend(appendValue);
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
                    name="otherCharges"
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

export default OtherCharges;
