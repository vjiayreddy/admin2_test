import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewPatiyalaMeasurements = ({
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
              <b>Ready Measurements (A)</b>
            </td>
           
          </tr>
      
          
          <tr>
            <td>Patiyala Dhoti Waist</td>
            {/* <td>{getMeasurmentValuesByName("patyala_dhoti_waist")}</td> */}
            <td></td>
            <td></td>
         
          </tr>
          <tr>
            <td>  Patiyala Dhoti Seat </td>
            {/* <td>{getMeasurmentValuesByName("patyala_dhoti_seat")}</td> */}
            <td></td>
            <td></td>
          
          </tr>

         

          <tr>
            <td>Patiyala Dhoti Length</td>
            {/* <td>{getMeasurmentValuesByName("patyala_dhoti_length")}</td> */}
            <td></td>
            <td></td>
            
           
          </tr>
        </table>
      </div>
      
    </Box>
  );
};

export default ViewPatiyalaMeasurements;
