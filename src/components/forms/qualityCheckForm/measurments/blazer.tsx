import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewBlazerMeasurements = ({ 
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
            <td>
              <b>Front Half </b>
            </td>
            <td>
              <b>Back </b>
            </td>
            <td style={{ backgroundColor: "#E1F5FE" }}>
              <b>Actual (B) </b>
            </td>
            <td>
              <b>Difference </b>
            </td>
          </tr>

          <tr>
            <td>Blazer Length</td>
            <td>{getMeasurmentValuesByName("blazer_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_length"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>
            {calculateValues("blazer_length","blazer_length")}
            </td>
          </tr>
          <tr>
            <td>Blazer Shoulder</td>
            <td>{getMeasurmentValuesByName("blazer_shoulder")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_shoulder"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td> {calculateValues("blazer_shoulder","blazer_shoulder")}</td>
          </tr>
          <tr>
            <td>Blazer Cross Back</td>
            <td>{getMeasurmentValuesByName("blazer_cross_back")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_cross_back"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("blazer_cross_back","blazer_cross_back")}</td>
          </tr>
          <tr>
            <td>Blazer Neck</td>
            <td>{getMeasurmentValuesByName("blazer_neck")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_neck"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("blazer_neck","blazer_neck")}</td>
          </tr>
         

          <tr>
            <td>Blazer Chest</td>
            <td>{getMeasurmentValuesByName("blazer_chest")}</td>
            <td>{getMeasurmentValuesByName("blazer_chest_loosening")}</td>
            <td>{getMeasurmentValuesByName("blazer_chest_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_chest_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td> {calculateValues("blazer_chest_ready", "blazer_chest_ready")}</td>
          </tr>
          <tr>
            <td>Blazer Below Chest</td>
            <td>{getMeasurmentValuesByName("blazer_below_chest")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_below_chest"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("blazer_below_chest", "blazer_below_chest")}</td>
          </tr>
          <tr>
            <td>Blazer Waist</td>
            <td>{getMeasurmentValuesByName("blazer_waist")}</td>
            <td>{getMeasurmentValuesByName("blazer_waist_loosening")}</td>
            <td>{getMeasurmentValuesByName("blazer_waist_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_waist_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("blazer_waist_ready", "blazer_waist_ready")}</td>
          </tr>

          <tr>
            <td>Blazer Seat</td>
            <td>{getMeasurmentValuesByName("blazer_seat")}</td>
            <td>{getMeasurmentValuesByName("blazer_seat_loosening")}</td>
            <td>{getMeasurmentValuesByName("blazer_seat_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_seat_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("blazer_seat_ready", "blazer_seat_ready")}</td>
          </tr>
          <tr>
            <td>Blazer Biceps Tight</td>
            <td>{getMeasurmentValuesByName("blazer_biceps_tight")}</td>
            <td>{getMeasurmentValuesByName("blazer_biceps_loosening")}</td>
            <td>{getMeasurmentValuesByName("blazer_biceps_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_biceps_loose"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("blazer_biceps_loose","blazer_biceps_loose")}</td>
          </tr>
          <tr>
            <td>Blazer Elbow Tight</td>
            <td>{getMeasurmentValuesByName("blazer_elbow_tight")}</td>
            <td>{getMeasurmentValuesByName("blazer_elbow_loosening")}</td>
            <td>{getMeasurmentValuesByName("blazer_elbow_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_elbow_loose"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("blazer_elbow_loose", "blazer_elbow_loose")}</td>
          </tr>
          <tr>
            <td>Blazer Sleeve Length</td>
            <td>{getMeasurmentValuesByName("blazer_sleeve_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
           
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_sleeve_length"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("blazer_sleeve_length", "blazer_sleeve_length")}</td>
          </tr>
          <tr>
            <td>Blazer Cuff Opening</td>
            <td>{getMeasurmentValuesByName("blazer_cuff_opening")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="blazer_cuff_opening"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("blazer_cuff_opening", "blazer_cuff_opening")}</td>
          </tr>
          
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewBlazerMeasurements;
