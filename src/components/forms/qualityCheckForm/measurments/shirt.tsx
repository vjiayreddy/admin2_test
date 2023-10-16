import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewShirtMeasurements = ({
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
            <td>In Shirt Length</td>
            <td>{getMeasurmentValuesByName("in_shirt_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="in_shirt_length"
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
            <td>{calculateValues("in_shirt_length", "in_shirt_length")}</td>
          </tr>
          <tr>
            <td>Out Shirt Length</td>
            <td>{getMeasurmentValuesByName("out_shirt_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="out_shirt_length"
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
            <td>{calculateValues("out_shirt_length", "out_shirt_length")}</td>
          </tr>
          <tr>
            <td>Shirt Shoulder</td>
            <td>{getMeasurmentValuesByName("shirt_shoulder")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                ref={register({})}
                name="shirt_shoulder"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("shirt_shoulder", "shirt_shoulder")}</td>
          </tr>
          <tr>
            <td>Shirt Cross Back</td>
            <td>{getMeasurmentValuesByName("shirt_cross_back")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="shirt_cross_back"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("shirt_cross_back", "shirt_cross_back")}</td>
          </tr>
          <tr>
            <td>Shirt Neck</td>
            <td>{getMeasurmentValuesByName("shirt_neck")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                ref={register({})}
                name="shirt_neck"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("shirt_neck", "shirt_neck")}</td>
          </tr>

          <tr>
            <td>Shirt Chest Body</td>
            <td>{getMeasurmentValuesByName("shirt_chest_body")}</td>
            <td>{getMeasurmentValuesByName("shirt_chest_loosening")}</td>
            <td>{getMeasurmentValuesByName("shirt_chest_ready")}</td>
            <td>{getMeasurmentValuesByName("shirt_from_half_chest")}</td>
            <td>{getMeasurmentValuesByName("shirt_back_chest")}</td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="shirt_chest_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("shirt_chest_ready", "shirt_chest_ready")}</td>
          </tr>
          <tr>
            <td>Shirt Below Chest</td>
            <td>{getMeasurmentValuesByName("shirt_below_chest")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="shirt_below_chest"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("shirt_below_chest", "shirt_below_chest")}</td>
          </tr>
          <tr>
            <td>Shirt Waist Body</td>
            <td>{getMeasurmentValuesByName("shirt_waist_body")}</td>
            <td>{getMeasurmentValuesByName("shirt_waist_loosening")}</td>
            <td>{getMeasurmentValuesByName("shirt_waist_ready")}</td>
            <td>{getMeasurmentValuesByName("shirt_front_half_waist")}</td>
            <td>{getMeasurmentValuesByName("shirt_back_waist")}</td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="shirt_waist_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("shirt_waist_ready", "shirt_waist_ready")}</td>
          </tr>

          <tr>
            <td>Shirt Seat Body</td>
            <td>{getMeasurmentValuesByName("shirt_seat_body")}</td>
            <td>{getMeasurmentValuesByName("shirt_seat_loosening")}</td>
            <td>{getMeasurmentValuesByName("shirt_seat_ready")}</td>
            <td>{getMeasurmentValuesByName("shirt_front_half_seat")}</td>
            <td>{getMeasurmentValuesByName("shirt_back_seat")}</td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="shirt_seat_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("shirt_seat_ready", "shirt_seat_ready")}</td>
          </tr>
          <tr>
            <td>Shirt Bicep Body</td>
            <td>{getMeasurmentValuesByName("shirt_biceps_tight")}</td>
            <td>{getMeasurmentValuesByName("shirt_biceps_loosening")}</td>
            <td>{getMeasurmentValuesByName("shirt_biceps_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="shirt_biceps_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("shirt_biceps_ready", "shirt_biceps_ready")}</td>
          </tr>

          <tr>
            <td>Shirt Elbow Body</td>
            <td>{getMeasurmentValuesByName("shirt_elbow_tight")}</td>
            <td>{getMeasurmentValuesByName("shirt_elbow_loosening")}</td>
            <td>{getMeasurmentValuesByName("shirt_elbow_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="shirt_elbow_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("shirt_elbow_ready", "shirt_elbow_ready")}</td>
          </tr>
          <tr>
            <td>Shirt Sleeve Length</td>
            <td>{getMeasurmentValuesByName("shirt_sleeve_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="shirt_sleeve_length"
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
              {calculateValues("shirt_sleeve_length", "shirt_sleeve_length")}
            </td>
          </tr>
          <tr>
            <td>Cuff Opening</td>
            <td>{getMeasurmentValuesByName("cuff_opening")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="cuff_opening"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("cuff_opening", "cuff_opening")}</td>
          </tr>
          <tr>
            <td>Shirt Half Sleeve Length</td>
            <td>{getMeasurmentValuesByName("shirt_half_sleeve_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="shirt_half_sleeve_length"
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
                "shirt_half_sleeve_length",
                "shirt_half_sleeve_length"
              )}
            </td>
          </tr>
          <tr>
            <td>Shirt Half Sleeve Length</td>
            <td>{getMeasurmentValuesByName("shirt_half_sleeve_opening")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="shirt_half_sleeve_opening"
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
                "shirt_half_sleeve_opening",
                "shirt_half_sleeve_opening"
              )}
            </td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewShirtMeasurements;
