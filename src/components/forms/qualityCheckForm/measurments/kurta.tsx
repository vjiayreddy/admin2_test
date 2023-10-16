import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewKurtaMeasurements = ({
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
            <td>Kurta Length</td>
            <td>{getMeasurmentValuesByName("kurta_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_length"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("kurta_length", "kurta_length")}</td>
          </tr>
          <tr>
            <td>Kurta Knee Length</td>
            <td>{getMeasurmentValuesByName("kurta_knee_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_knee_length"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("kurta_knee_length", "kurta_knee_length")}</td>
          </tr>
          <tr>
            <td>Kurta Shoulder</td>
            <td>{getMeasurmentValuesByName("kurta_shoulder")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_shoulder"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("kurta_shoulder", "kurta_shoulder")}</td>
          </tr>
          <tr>
            <td>Kurta Cross Back</td>
            <td>{getMeasurmentValuesByName("kurta_cross_back")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_cross_back"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("kurta_cross_back", "kurta_cross_back")}</td>
          </tr>
          <tr>
            <td>Kurta Neck Body</td>
            <td>{getMeasurmentValuesByName("kurta_body_neck")}</td>
            <td>{getMeasurmentValuesByName("kurta_neck_loosening")}</td>
            <td>{getMeasurmentValuesByName("kurta_ready_neck")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_ready_neck"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("kurta_ready_neck", "kurta_ready_neck")}</td>
          </tr>

          <tr>
            <td>Kurta Chest Body</td>
            <td>{getMeasurmentValuesByName("kurta_chest_body")}</td>
            <td>{getMeasurmentValuesByName("kurta_chest_loosening")}</td>
            <td>{getMeasurmentValuesByName("kurta_chest_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_chest_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("kurta_chest_ready", "kurta_chest_ready")}</td>
          </tr>
          <tr>
            <td>Kurta Below Chest</td>
            <td>{getMeasurmentValuesByName("kurta_below_chest")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_below_chest"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("kurta_below_chest", "kurta_below_chest")}</td>
          </tr>
          <tr>
            <td>Kurta Waist Body</td>
            <td>{getMeasurmentValuesByName("kurta_waist_body")}</td>
            <td>{getMeasurmentValuesByName("kurta_waist_loosening")}</td>
            <td>{getMeasurmentValuesByName("kurta_waist_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_waist_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("kurta_waist_ready", "kurta_waist_ready")}</td>
          </tr>

          <tr>
            <td>Kurta Seat Body</td>
            <td>{getMeasurmentValuesByName("kurta_seat_body")}</td>
            <td>{getMeasurmentValuesByName("kurta_seat_loosening")}</td>
            <td>{getMeasurmentValuesByName("kurta_seat_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_seat_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("kurta_seat_ready", "kurta_seat_ready")}</td>
          </tr>
          <tr>
            <td>Kurta Biceps Tight</td>
            <td>{getMeasurmentValuesByName("kurta_biceps_tight")}</td>
            <td>{getMeasurmentValuesByName("kurta_biceps_loosening")}</td>
            <td>{getMeasurmentValuesByName("kurta_biceps_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_biceps_loose"
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
              {calculateValues("kurta_biceps_loose", "kurta_biceps_loose")}
            </td>
          </tr>
          <tr>
            <td>Kurta Elbow Tight</td>
            <td>{getMeasurmentValuesByName("kurta_elbow_tight")}</td>
            <td>{getMeasurmentValuesByName("kurta_elbow_loosening")}</td>
            <td>{getMeasurmentValuesByName("kurta_elbow_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_elbow_loose"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("kurta_elbow_loose", "kurta_elbow_loose")}</td>
          </tr>
          <tr>
            <td>Kurta Sleeve Length</td>
            <td>{getMeasurmentValuesByName("kurta_sleeve_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_sleeve_length"
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
              {calculateValues("kurta_sleeve_length", "kurta_sleeve_length")}
            </td>
          </tr>
          <tr>
            <td> Kurta Cuff Opening</td>
            <td>{getMeasurmentValuesByName("kurta_cuff_opening")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="kurta_cuff_opening"
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
              {calculateValues("kurta_cuff_opening", "kurta_cuff_opening")}
            </td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewKurtaMeasurements;
