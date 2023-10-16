import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewChinosMeasurements = ({
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
            <td>Chinos Length</td>
            <td>{getMeasurmentValuesByName("chinos_length")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="chinos_length"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("chinos_length", "chinos_length")}</td>
          </tr>

          <tr>
            <td>Chinos Waist</td>
            <td>{getMeasurmentValuesByName("chinos_waist")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="chinos_waist"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("chinos_waist", "chinos_waist")}</td>
          </tr>
          <tr>
            <td> Chinos Seat</td>
            <td>{getMeasurmentValuesByName("chinos_seat")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="chinos_seat"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("chinos_seat", "chinos_seat")}</td>
          </tr>

          <tr>
            <td>Chinos Thigh Tight</td>
            <td>{getMeasurmentValuesByName("chinos_thigh_tight")}</td>
            <td>{getMeasurmentValuesByName("chinos_thigh_loosening ")}</td>
            <td>{getMeasurmentValuesByName("chinos_thigh_loose")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="chinos_thigh_loose"
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
              {calculateValues("chinos_thigh_loose", "chinos_thigh_loose")}
            </td>
          </tr>

          <tr>
            <td>Chinos Knee Tight</td>
            <td>{getMeasurmentValuesByName("chinos_knee_tight")}</td>
            <td>{getMeasurmentValuesByName("chinos_knee_loosening")}</td>
            <td>{getMeasurmentValuesByName("chinos_knee_loose")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="chinos_knee_loose"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("chinos_knee_loose", "chinos_knee_loose")}</td>
          </tr>

          <tr>
            <td>Chinos Calf Tight</td>
            <td>{getMeasurmentValuesByName("chinos_calf_tight ")}</td>
            <td>{getMeasurmentValuesByName("chinos_calf_loosening ")}</td>
            <td>{getMeasurmentValuesByName("chinos_calf_loose")}</td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="chinos_calf_loose"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("chinos_calf_loose", "chinos_calf_loose")}</td>
          </tr>

          <tr>
            <td>Chinos Leg Opening</td>
            <td>{getMeasurmentValuesByName("chinos_leg_opening")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="chinos_leg_opening"
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
              {calculateValues("chinos_leg_opening", "chinos_leg_opening")}
            </td>
          </tr>
          <tr>
            <td>Chinos Tummy to back</td>
            <td>{getMeasurmentValuesByName("chinos_tummy_to_back")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="chinos_tummy_to_back"
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
              {calculateValues("chinos_tummy_to_back", "chinos_tummy_to_back")}
            </td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewChinosMeasurements;
