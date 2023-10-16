import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";


const ViewJootiMeasurements = ({data,
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
            <td>Jootis Foot Length</td>
            <td>{getMeasurmentValuesByName("jootis_foot_length")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jootis_foot_length"
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
            <td>{calculateValues(
                "jootis_foot_length ",
                "jootis_foot_length "
              )}</td>
          </tr>
          <tr>
            <td>  Jootis Foot Width </td>
            <td>{getMeasurmentValuesByName("jootis_foot_width")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="jootis_foot_width"
                ref={register({})}
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues(
                "jootis_foot_width ",
                "jootis_foot_width "
              )}</td>
          </tr>
          <tr>
            <td>  Jootis Foot Girth </td>
            <td>{getMeasurmentValuesByName("jootis_foot_girth")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="jootis_foot_girth"
                ref={register({})}
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues(
                "jootis_foot_girth",
                "jootis_foot_girth"
              )}</td>
          </tr>

          <tr>
            <td>Jootis Shoes Size (UK)</td>
            <td>{getMeasurmentValuesByName("jootis_shoes_size_uk")}</td>
            <td></td>
            <td></td>
            
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="jootis_shoes_size_uk"
                ref={register({})}
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues(
                "jootis_shoes_size_uk",
                "jootis_shoes_size_uk"
              )}</td>
          </tr>

          <tr>
            <td>Jootis Shoes Size (US)</td>
            <td>{getMeasurmentValuesByName("jootis_shoes_size_us")}</td>
            <td></td>
            <td></td>
            
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="jootis_shoes_size_us"
                ref={register({})}
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues(
                "jootis_shoes_size_us",
                "jootis_shoes_size_us"
              )}</td>
          </tr>

        
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewJootiMeasurements;
