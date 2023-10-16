import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewSherwaniMeasurements = ({  data,
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
            <td>Sherwani Length</td>
            <td>{getMeasurmentValuesByName("sherwani_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_length"
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
            <td>{calculateValues("sherwani_length", "sherwani_length")}</td>
          </tr>
          <tr>
            <td>Sherwani Knee Length</td>
            <td>{getMeasurmentValuesByName("sherwani_knee_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_knee_length"
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
            <td>{calculateValues("sherwani_knee_length", "sherwani_knee_length")}</td>
          </tr>
          <tr>
            <td>Sherwani Shoulder</td>
            <td>{getMeasurmentValuesByName("sherwani_shoulder")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_knee_length"
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
            <td>{calculateValues("sherwani_shoulder", "sherwani_shoulder")}</td>
          </tr>
          <tr>
            <td>Sherwani Cross Back</td>
            <td>{getMeasurmentValuesByName("sherwani_cross_back")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_cross_back"
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
            <td>{calculateValues("sherwani_cross_back", "sherwani_cross_back")}</td>
          </tr>
          <tr>
            <td>Sherwani Neck Body</td>
            <td>{getMeasurmentValuesByName("sherwani_neck_body ")}</td>
            <td>{getMeasurmentValuesByName("sherwani_neck_body_loosening")}</td>
            <td>{getMeasurmentValuesByName("sherwani_neck_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_neck_ready"
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
            <td>{calculateValues("sherwani_neck_ready", "sherwani_neck_ready")}</td>
          </tr>

          <tr>
            <td>Sherwani Chest Body</td>
            <td>{getMeasurmentValuesByName("sherwani_chest_body")}</td>
            <td>{getMeasurmentValuesByName("sherwani_chest_loosening")}</td>
            <td>{getMeasurmentValuesByName("sherwani_chest_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_chest_ready"
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
            <td>{calculateValues("sherwani_chest_ready", "sherwani_chest_ready")}</td>
          </tr>
          <tr>
            <td>Sherwani Below Chest</td>
            <td>{getMeasurmentValuesByName("sherwani_below_chest")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_below_chest"
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
            <td>{calculateValues("sherwani_below_chest", "sherwani_below_chest")}</td>
          </tr>
          <tr>
            <td>Sherwani Waist Body</td>
            <td>{getMeasurmentValuesByName("sherwani_waist_body")}</td>
            <td>{getMeasurmentValuesByName("sherwani_waist_loosening")}</td>
            <td>{getMeasurmentValuesByName("sherwani_waist_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_waist_ready"
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
            <td>{calculateValues("sherwani_waist_ready", "sherwani_waist_ready")}</td>
          </tr>

          <tr>
            <td>Sherwani Seat Body</td>
            <td>{getMeasurmentValuesByName("sherwani_seat_body")}</td>
            <td>{getMeasurmentValuesByName("sherwani_seat_loosening")}</td>
            <td>{getMeasurmentValuesByName("sherwani_seat_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_seat_ready"
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
            <td>{calculateValues("sherwani_seat_ready", "sherwani_seat_ready")}</td>
          </tr>
          <tr>
            <td>Sherwani Biceps Tight</td>
            <td>{getMeasurmentValuesByName("sherwani_biceps_tight")}</td>
            <td>{getMeasurmentValuesByName("sherwani_biceps_loosening")}</td>
            <td>{getMeasurmentValuesByName("sherwani_biceps_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_biceps_loose"
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
            <td>{calculateValues("sherwani_biceps_loose", "sherwani_biceps_loose")}</td>
          </tr>
          <tr>
            <td>Sherwani Elbow Tight</td>
            <td>{getMeasurmentValuesByName("sherwani_elbow_tight")}</td>
            <td>{getMeasurmentValuesByName("sherwani_elbow_loosening")}</td>
            <td>
              {getMeasurmentValuesByName("sherwani_elbow_loose")}
            </td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_elbow_loose"
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
            <td>{calculateValues("sherwani_elbow_loose", "sherwani_elbow_loose")}</td>
          </tr>
          <tr>
            <td>Sherwani Sleeve Length</td>
            <td>{getMeasurmentValuesByName("sherwani_sleeve_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_sleeve_length"
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
            <td>{calculateValues("sherwani_sleeve_length", "sherwani_sleeve_length")}</td>
          </tr>
          <tr>
            <td>Sherwani Cuff Opening</td>
            <td>{getMeasurmentValuesByName("sherwani_cuff_opening")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                ref={register({})}
                name="sherwani_cuff_opening"
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
            <td>{calculateValues("sherwani_cuff_opening", "sherwani_cuff_opening")}</td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewSherwaniMeasurements;
