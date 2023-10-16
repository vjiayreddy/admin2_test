import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewJodhpuriMeasurements = ({ 
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
            <td>Jodhpuri Length</td>
            <td>{getMeasurmentValuesByName("jodhpuri_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_length"
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
            <td>{calculateValues("jodhpuri_length", "jodhpuri_length")}</td>
          </tr>

          <tr>
            <td>Jodhpuri Shoulder</td>
            <td>{getMeasurmentValuesByName("jodhpuri_shoulder")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_shoulder"
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
            <td>{calculateValues("jodhpuri_shoulder", "jodhpuri_shoulder")}</td>
          </tr>
          <tr>
            <td>Jodhpuri Cross Back</td>
            <td>{getMeasurmentValuesByName("jodhpuri_cross_back")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_cross_back"
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
            <td>
              {calculateValues("jodhpuri_cross_back", "jodhpuri_cross_back")}
            </td>
          </tr>
          <tr>
            <td>Jodhpuri Neck Body</td>
            <td>{getMeasurmentValuesByName("jodhpuri_neck_body ")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_neck_body_loosening")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_neck_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_neck_ready"
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
            <td>
              {calculateValues("jodhpuri_neck_ready", "jodhpuri_neck_ready")}
            </td>
          </tr>

          <tr>
            <td>Jodhpuri Chest </td>
            <td>{getMeasurmentValuesByName("jodhpuri_chest")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_chest_loosening")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_chest_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_chest_ready"
                ref={register({})}
                min={0}
                onChange={(e) => {}}
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
              {calculateValues("jodhpuri_chest_ready", "jodhpuri_chest_ready")}
            </td>
          </tr>
          <tr>
            <td>Jodhpuri Below Chest</td>
            <td>{getMeasurmentValuesByName("jodhpuri_below_chest")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_below_chest"
                ref={register({})}
                min={0}
                onChange={(e) => {}}
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
              {calculateValues("jodhpuri_below_chest", "jodhpuri_below_chest")}
            </td>
          </tr>
          <tr>
            <td>Jodhpuri Waist </td>
            <td>{getMeasurmentValuesByName("jodhpuri_waist")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_waist_loosening")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_waist_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_waist_ready"
                ref={register({})}
                min={0}
                onChange={(e) => {}}
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
              {calculateValues("jodhpuri_waist_ready", "jodhpuri_waist_ready")}
            </td>
          </tr>

          <tr>
            <td>Jodhpuri Seat </td>
            <td>{getMeasurmentValuesByName("jodhpuri_seat")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_seat_loosening")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_seat_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_seat_ready"
                ref={register({})}
                min={0}
                onChange={(e) => {}}
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
              {calculateValues("jodhpuri_seat_ready", "jodhpuri_seat_ready")}
            </td>
          </tr>
          <tr>
            <td>Jodhpuri Biceps Tight</td>
            <td>{getMeasurmentValuesByName("jodhpuri_biceps_tight")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_biceps_loosening")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_biceps_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_biceps_loose"
                ref={register({})}
                min={0}
                onChange={(e) => {}}
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
              {calculateValues(
                "jodhpuri_biceps_loose",
                "jodhpuri_biceps_loose"
              )}
            </td>
          </tr>
          <tr>
            <td>Jodhpuri Elbow Tight</td>
            <td>{getMeasurmentValuesByName("jodhpuri_elbow_tight")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_elbow_loosening")}</td>
            <td>{getMeasurmentValuesByName("jodhpuri_elbow_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_elbow_loose"
                ref={register({})}
                min={0}
                onChange={(e) => {}}
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
              {calculateValues("jodhpuri_elbow_loose", "jodhpuri_elbow_loose")}
            </td>
          </tr>
          <tr>
            <td>Jodhpuri Sleeve Length</td>
            <td>{getMeasurmentValuesByName("jodhpuri_sleeve_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_sleeve_length"
                ref={register({})}
                min={0}
                onChange={(e) => {}}
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
              {calculateValues(
                "jodhpuri_sleeve_length",
                "jodhpuri_sleeve_length"
              )}
            </td>
          </tr>
          <tr>
            <td>Jodhpuri Cuff Opening</td>
            <td>{getMeasurmentValuesByName("jodhpuri_cuff_opening")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="jodhpuri_cuff_opening"
                ref={register({})}
                min={0}
                onChange={(e) => {}}
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
              {calculateValues(
                "jodhpuri_cuff_opening",
                "jodhpuri_cuff_opening"
              )}
            </td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewJodhpuriMeasurements;
