import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

import _ from "lodash";

const ViewTrouserMeasurements = ({
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
            <td>Trouser Length</td>
            <td>{getMeasurmentValuesByName("trouser_length")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="trouser_length"
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
            <td>{calculateValues("trouser_length", "trouser_length")}</td>
          </tr>

          <tr>
            <td>Trouser Waist</td>
            <td>{getMeasurmentValuesByName("trouser_waist")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="trouser_waist"
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
            <td>{calculateValues("trouser_waist", "trouser_waist")}</td>
          </tr>
          <tr>
            <td> Trouser Seat</td>
            <td>{getMeasurmentValuesByName("trouser_seat")}</td>
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
            <td>Trouser Thigh Tight</td>
            <td>{getMeasurmentValuesByName("trouser_thigh_tight")}</td>
            <td>{getMeasurmentValuesByName("trouser_thigh_loosening ")}</td>
            <td>{getMeasurmentValuesByName("trouser_thigh_loose")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="trouser_thigh_loose"
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
              {calculateValues("trouser_thigh_loose", "trouser_thigh_loose")}
            </td>
          </tr>

          <tr>
            <td>Trouser Knee Tight</td>
            <td>{getMeasurmentValuesByName("trouser_knee_tight")}</td>
            <td>{getMeasurmentValuesByName("trouser_knee_loosening")}</td>
            <td>{getMeasurmentValuesByName("trouser_knee_loose")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="trouser_knee_loose"
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
              {calculateValues("trouser_knee_loose", "trouser_knee_loose")}
            </td>
          </tr>

          <tr>
            <td>Trouser Calf Tight</td>
            <td>{getMeasurmentValuesByName("trouser_calf_tight")}</td>
            <td>{getMeasurmentValuesByName("trouser_calf_loosening ")}</td>
            <td>{getMeasurmentValuesByName("trouser_calf_loose")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="trouser_calf_loose"
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
              {calculateValues("trouser_calf_loose", "trouser_calf_loose")}
            </td>
          </tr>

          <tr>
            <td>Trouser Leg Opening</td>
            <td>{getMeasurmentValuesByName("trouser_leg_opening")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="trouser_leg_opening"
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
              {calculateValues("trouser_leg_opening", "trouser_leg_opening")}
            </td>
          </tr>
          <tr>
            <td>Trouser Tummy to back</td>
            <td>{getMeasurmentValuesByName("trouser_tummy_to_back")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="trouser_tummy_to_back"
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
                "trouser_tummy_to_back",
                "trouser_tummy_to_back"
              )}
            </td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewTrouserMeasurements;
