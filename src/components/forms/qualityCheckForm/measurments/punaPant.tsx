import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

import _ from "lodash";

const ViewPunaPantMeasurements = ({
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
    console.log(_data);
    onClick(_data);
  };

  useEffect(() => {
    if (enteredValues) {
      reset(enteredValues);
    }
  }, [enteredValues]);

  useEffect(() => {}, [watchAllFields]);

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
            <td>Puna Pant Length</td>
            <td>{getMeasurmentValuesByName("poonapant_length")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="poonapant_length"
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
            <td>{calculateValues("poonapant_length", "poonapant_length")}</td>
          </tr>

          <tr>
            <td>Puna Pant Waist</td>
            <td>{getMeasurmentValuesByName("poonapant_waist")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="poonapant_waist"
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
            <td>{calculateValues("poonapant_waist", "poonapant_waist")}</td>
          </tr>
          <tr>
            <td> Puna Pant Seat</td>
            <td>{getMeasurmentValuesByName("poonapant_seat")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="trouser_seat"
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
            <td>{calculateValues("trouser_seat", "trouser_seat")}</td>
          </tr>

          <tr>
            <td>Puna Pant Thigh Tight</td>
            <td>{getMeasurmentValuesByName("poonapant_thigh_tight")}</td>
            <td>{getMeasurmentValuesByName("poonapant_thigh_loosening ")}</td>
            <td>{getMeasurmentValuesByName("poonapant_thigh_loose")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="poonapant_thigh_loose"
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
            <td>
              {calculateValues("poonapant_thigh_loose", "poonapant_thigh_loose")}
            </td>
          </tr>

          <tr>
            <td>Puna Pant Knee Tight</td>
            <td>{getMeasurmentValuesByName("poonapant_knee_tight")}</td>
            <td>{getMeasurmentValuesByName("poonapant_knee_loosening")}</td>
            <td>{getMeasurmentValuesByName("poonapant_knee_loose")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="poonapant_knee_loose"
                ref={register({})}
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>
              {calculateValues("poonapant_knee_loose", "poonapant_knee_loose")}
            </td>
          </tr>

          <tr>
            <td>Puna Pant Calf Tight</td>
            <td>{getMeasurmentValuesByName("poonapant_calf_tight")}</td>
            <td>{getMeasurmentValuesByName("poonapant_calf_loosening ")}</td>
            <td>{getMeasurmentValuesByName("poonapant_calf_loose")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="poonapant_calf_loose"
                ref={register({})}
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>
              {calculateValues("poonapant_calf_loose", "poonapant_calf_loose")}
            </td>
          </tr>

          <tr>
            <td>Puna Pant Leg Opening</td>
            <td>{getMeasurmentValuesByName("poonapant_leg_opening")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="poonapant_leg_opening"
                ref={register({})}
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>
              {calculateValues("poonapant_leg_opening", "poonapant_leg_opening")}
            </td>
          </tr>
          <tr>
            <td>Puna Pant Tummy to back</td>
            <td>{getMeasurmentValuesByName("poonapant_tummy_to_back")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="poonapant_tummy_to_back"
                ref={register({})}
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>
              {calculateValues(
                "poonapant_tummy_to_back",
                "poonapant_tummy_to_back"
              )}
            </td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewPunaPantMeasurements;
