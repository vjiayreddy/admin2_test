import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewDhotiMeasurements = ({
  data,
  enteredValues,
  onClick,
  padding = 4,
  showButton = true,
}) => {
  const { watch, register, handleSubmit, reset } = useForm();
  const watchAllFields = watch();

  const getMeasurmentValuesByName = (name) => {
    if (data) {
      const _findValue = _.find(data, (item) => item.name === name);
      if (_findValue) {
        return _findValue.value;
      }
    }
    return 0;
  };

  const calculateValues = (existing, modified) => {
    const value =
      getMeasurmentValuesByName(existing) - Number(watchAllFields[modified]);
    return value ? value : 0;
  };

  const onSubmit = (_data) => {
    onClick(_data);
  };

  useEffect(() => {
    if (enteredValues) {
      reset(enteredValues);
    }
  }, [enteredValues]);

  return (
    <Box p={padding}>
      <div className="orderFormTable">
        <table className="table">
          <tr style={{ backgroundColor: "cornsilk" }}>
            <td style={{ backgroundColor: "#B3E5FC" }}>Measurement</td>
            <td>
              <b>Body Measurements</b>
            </td>
            <td>
              <b>Loosening</b>
            </td>
            <td>
              <b>Ready Measurements (A)</b>
            </td>
            <td style={{ backgroundColor: "#E1F5FE" }}>
              <b>Actual (B) </b>
            </td>
            <td>
              <b>Difference </b>
            </td>
          </tr>
      
          
          <tr>
            <td> Dhoti Waist</td>
            <td>{getMeasurmentValuesByName("dhoti_waist")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="dhoti_waist"
                ref={register({})}
                min={0}
              
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td> {calculateValues(
                "dhoti_waist",
                "dhoti_waist"
              )}</td>
          </tr>
          <tr>
            <td> Dhoti Seat </td>
            <td>{getMeasurmentValuesByName("dhoti_seat")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="dhoti_seat"
                ref={register({})}
                min={0}
                
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td> {calculateValues(
                "dhoti_seat",
                "dhoti_seat"
              )}</td>
          </tr>

          <tr>
            <td>Dhoti Tummy To Back</td>
            <td>{getMeasurmentValuesByName("dhoti_tummy_to_back")}</td>
            <td></td>
            <td></td>
            
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="dhoti_tummy_to_back"
                ref={register({})}
                min={0}
                
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td> {calculateValues(
                "dhoti_tummy_to_back",
                "dhoti_tummy_to_back"
              )}</td>
          </tr>

          <tr>
            <td> Dhoti Length</td>
            <td>{getMeasurmentValuesByName("dhoti_length")}</td>
            <td></td>
            <td></td>
            
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="dhoti_length"
                ref={register({})}
                min={0}
              
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td> {calculateValues(
                "dhoti_length",
                "dhoti_length"
              )}</td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewDhotiMeasurements;
