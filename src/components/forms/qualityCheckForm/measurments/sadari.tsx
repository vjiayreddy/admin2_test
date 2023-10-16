import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

import _ from "lodash";

const ViewSadariMeasurements = ({ data,
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
            <td>Sadari Length</td>
            <td>{getMeasurmentValuesByName("sadri_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="sadri_length"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("sadri_length", "sadri_length")}</td>
          </tr>
          <tr>
            <td>Sadari Shoulder</td>
            <td>{getMeasurmentValuesByName("sadri_shoulder")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="sadri_shoulder"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("sadri_shoulder", "sadri_shoulder")}</td>
          </tr>
       
          <tr>
            <td>Sadari Neck</td>
            <td>{getMeasurmentValuesByName("sadri_neck")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="sadri_neck"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("sadri_neck", "sadri_neck")}</td>
          </tr>

          <tr>
            <td>Sadari Chest</td>
            <td>{getMeasurmentValuesByName("sadri_chest")}</td>
            <td>{getMeasurmentValuesByName("sadri_chest_loosening")}</td>
            <td>{getMeasurmentValuesByName("sadri_chest_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sadri_chest_ready"
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
            <td>{calculateValues("sadri_chest_ready", "sadri_chest_ready")}</td>
          </tr>
          <tr>
            <td>Sadari Below Chest</td>
            <td>{getMeasurmentValuesByName("sadri_below_chest")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sadri_below_chest"
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
            <td>{calculateValues("sadri_below_chest", "sadri_below_chest")}</td>
          </tr>
          <tr>
            <td>Sadari Waist</td>
            <td>{getMeasurmentValuesByName("sadri_waist ")}</td>
            <td>{getMeasurmentValuesByName("sadri_waist_loosening")}</td>
            <td>{getMeasurmentValuesByName("sadri_waist_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sadri_waist_ready"
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
            <td>{calculateValues("sadri_waist_ready", "sadri_waist_ready")}</td>
          </tr>

          <tr>
            <td>Sadari Seat</td>
            <td>{getMeasurmentValuesByName("sadari_seat")}</td>
            <td>{getMeasurmentValuesByName("sadri_seat_loosening")}</td>
            <td>{getMeasurmentValuesByName("sadri_seat_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sadri_seat_ready"
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
            <td>{calculateValues("sadri_seat_ready", "sadri_seat_ready")}</td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewSadariMeasurements;
