import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewChudidaarMeasurements = ({  data,
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
            <td>Chudidar Waist</td>
            <td>{getMeasurmentValuesByName("chudidar_waist")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="chudidar_waist"
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
            <td>{calculateValues("chudidar_waist", "chudidar_waist")}</td>
          </tr>
          <tr>
            <td> Chudidar Seat </td>
            <td>{getMeasurmentValuesByName("chudidar_seat")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="chudidar_seat"
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
            <td>{calculateValues("chudidar_seat", "chudidar_seat")}</td>
          </tr>

          <tr>
            <td>Chudidar Thigh Body</td>
            <td>{getMeasurmentValuesByName("chudidar_thigh_body")}</td>
            <td>{getMeasurmentValuesByName("chudidar_thigh_loosening")}</td>
            <td>{getMeasurmentValuesByName("chudidar_thigh_ready")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="chudidar_thigh_ready"
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
            <td>{calculateValues("chudidar_thigh_ready", "chudidar_thigh_ready")}</td>
          </tr>

          <tr>
            <td>Chudidar Knee Body</td>
            <td>{getMeasurmentValuesByName("chudidar_knee_body")}</td>
            <td>{getMeasurmentValuesByName("chudidar_knee_loosening")}</td>
            <td>{getMeasurmentValuesByName("chudidar_knee_ready")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="chudidar_knee_ready"
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
            <td>{calculateValues("chudidar_knee_ready", "chudidar_knee_ready")}</td>
          </tr>

          <tr>
            <td>Chudidar Calf Bodyt</td>
            <td>{getMeasurmentValuesByName("chudidar_calf_body")}</td>
            <td>{getMeasurmentValuesByName("chudidar_calf_loosening")}</td>
            <td>{getMeasurmentValuesByName("chudidar_calf_ready")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="chudidar_calf_ready"
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
            <td>{calculateValues("chudidar_calf_ready", "chudidar_calf_ready")}</td>
          </tr>

          <tr>
            <td>Chudidar Leg Opening Tight</td>
            <td>{getMeasurmentValuesByName("chudidar_leg_opening_tight")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="chudidar_leg_opening_tight"
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
            <td>{calculateValues("chudidar_leg_opening_tight", "chudidar_leg_opening_tight")}</td>
          </tr>
          <tr>
            <td>Chudidar Leg Opening Loose</td>
            <td>{getMeasurmentValuesByName("chudidar_leg_opening_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="chudidar_leg_opening_loose"
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
            <td>{calculateValues("chudidar_leg_opening_loose", "chudidar_leg_opening_loose")}</td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewChudidaarMeasurements;
