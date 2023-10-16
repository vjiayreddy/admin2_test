import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewIndowesternMeasurements = ({  data,
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
            <td>Indowestern Length</td>
            <td>{getMeasurmentValuesByName("indowestern_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_length"
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
              {calculateValues("indowestern_length", "indowestern_length")}
            </td>
          </tr>
          <tr>
            <td>Indowestern Knee Length</td>
            <td>{getMeasurmentValuesByName("indowestern_knee_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_knee_length"
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
              {calculateValues("indowestern_length", "indowestern_length")}
            </td>
          </tr>
          <tr>
            <td>Indowestern Shoulder</td>
            <td>{getMeasurmentValuesByName("indowestern_shoulder")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_shoulder"
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
              {calculateValues("indowestern_shoulder", "indowestern_shoulder")}
            </td>
          </tr>
          <tr>
            <td>Indowestern Cross Back</td>
            <td>{getMeasurmentValuesByName("indowestern_cross_back")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_cross_back"
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
              {calculateValues(
                "indowestern_cross_back",
                "indowestern_cross_back"
              )}
            </td>
          </tr>
          <tr>
            <td>Indowestern Neck Body</td>
            <td>{getMeasurmentValuesByName("indowestern_neck_body ")}</td>
            <td>
              {getMeasurmentValuesByName("indowestern_neck_body_loosening")}
            </td>
            <td>{getMeasurmentValuesByName("indowestern_neck_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_neck_ready"
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
              {calculateValues(
                "indowestern_neck_ready",
                "indowestern_neck_ready"
              )}
            </td>
          </tr>

          <tr>
            <td>Indowestern Chest Body</td>
            <td>{getMeasurmentValuesByName("indowestern_chest_body")}</td>
            <td>{getMeasurmentValuesByName("indowestern_chest_loosening")}</td>
            <td>{getMeasurmentValuesByName("indowestern_chest_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_chest_ready"
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
              {calculateValues(
                "indowestern_chest_ready",
                "indowestern_chest_ready"
              )}
            </td>
          </tr>
          <tr>
            <td>Indowestern Below Chest</td>
            <td>{getMeasurmentValuesByName("indowestern_below_chest")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_below_chest"
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
              {calculateValues(
                "indowestern_below_chest",
                "indowestern_below_chest"
              )}
            </td>
          </tr>
          <tr>
            <td>Indowestern Waist Body</td>
            <td>{getMeasurmentValuesByName("indowestern_waist_body")}</td>
            <td>{getMeasurmentValuesByName("indowestern_waist_loosening")}</td>
            <td>{getMeasurmentValuesByName("indowestern_waist_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_waist_ready"
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
              {calculateValues(
                "indowestern_waist_ready",
                "indowestern_waist_ready"
              )}
            </td>
          </tr>

          <tr>
            <td>Indowestern Seat Body</td>
            <td>{getMeasurmentValuesByName("indowestern_seat_body")}</td>
            <td>{getMeasurmentValuesByName("indowestern_seat_loosening")}</td>
            <td>{getMeasurmentValuesByName("indowestern_seat_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_seat_ready"
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
              {calculateValues(
                "indowestern_seat_ready",
                "indowestern_seat_ready"
              )}
            </td>
          </tr>
          <tr>
            <td>Indowestern Biceps Tight</td>
            <td>{getMeasurmentValuesByName("indowestern_biceps_tight")}</td>
            <td>{getMeasurmentValuesByName("indowestern_biceps_loosening")}</td>
            <td>{getMeasurmentValuesByName("indowestern_biceps_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_biceps_loose"
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
              {calculateValues(
                "indowestern_biceps_loose",
                "indowestern_biceps_loose"
              )}
            </td>
          </tr>
          <tr>
            <td>Indowestern Elbow Tight</td>
            <td>{getMeasurmentValuesByName("indowestern_elbow_tight")}</td>
            <td>{getMeasurmentValuesByName("indowestern_elbow_loosening")}</td>
            <td>{getMeasurmentValuesByName("indowestern_elbow_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_elbow_loose"
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
              {calculateValues(
                "indowestern_elbow_loose",
                "indowestern_elbow_loose"
              )}
            </td>
          </tr>
          <tr>
            <td>Indowestern Sleeve Length</td>
            <td>{getMeasurmentValuesByName("indowestern_sleeve_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_sleeve_length"
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
              {calculateValues(
                "indowestern_sleeve_length",
                "indowestern_sleeve_length"
              )}
            </td>
          </tr>
          <tr>
            <td>Indowestern Cuff Opening</td>
            <td>{getMeasurmentValuesByName("indowestern_cuff_opening")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="indowestern_cuff_opening"
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
              {calculateValues(
                "indowestern_cuff_opening",
                "indowestern_cuff_opening"
              )}
            </td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewIndowesternMeasurements;
