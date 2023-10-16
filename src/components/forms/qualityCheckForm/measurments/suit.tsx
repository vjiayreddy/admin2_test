import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewSuitMeasurements = ({ 
  data,
  enteredValues,
  onClick,
  padding = 4,
  showButton = true,
}) => {
  const { watch, register, handleSubmit,reset } = useForm();
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
            <td>Blazer Length</td>
            <td>{getMeasurmentValuesByName("suit_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_length"
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
            {calculateValues("suit_length","suit_length")}
            </td>
          </tr>
          <tr>
            <td>Blazer Shoulder</td>
            <td>{getMeasurmentValuesByName("suit_shoulder")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_shoulder"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td> {calculateValues("suit_shoulder","suit_shoulder")}</td>
          </tr>
          <tr>
            <td>Blazer Cross Back</td>
            <td>{getMeasurmentValuesByName("suit_cross_back")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_cross_back"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("suit_cross_back","suit_cross_back")}</td>
          </tr>
          <tr>
            <td>Blazer Neck</td>
            <td>{getMeasurmentValuesByName("suit_neck")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_neck"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("suit_neck","suit_neck")}</td>
          </tr>
         

          <tr>
            <td>Blazer Chest</td>
            <td>{getMeasurmentValuesByName("suit_chest")}</td>
            <td>{getMeasurmentValuesByName("suit_chest_loosening")}</td>
            <td>{getMeasurmentValuesByName("suit_chest_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_chest_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td> {calculateValues("suit_chest_ready", "suit_chest_ready")}</td>
          </tr>
          <tr>
            <td>Blazer Below Chest</td>
            <td>{getMeasurmentValuesByName("suit_below_chest")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_below_chest"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("suit_below_chest", "suit_below_chest")}</td>
          </tr>
          <tr>
            <td>Blazer Waist</td>
            <td>{getMeasurmentValuesByName("suit_waist")}</td>
            <td>{getMeasurmentValuesByName("suit_waist_loosening")}</td>
            <td>{getMeasurmentValuesByName("suit_waist_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_waist_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("suit_waist_ready", "suit_waist_ready")}</td>
          </tr>

          <tr>
            <td>Blazer Seat</td>
            <td>{getMeasurmentValuesByName("suit_seat")}</td>
            <td>{getMeasurmentValuesByName("suit_seat_loosening")}</td>
            <td>{getMeasurmentValuesByName("suit_seat_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_seat_ready"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("suit_seat_ready", "suit_seat_ready")}</td>
          </tr>
          <tr>
            <td>Blazer Biceps Tight</td>
            <td>{getMeasurmentValuesByName("suit_biceps_tight")}</td>
            <td>{getMeasurmentValuesByName("suit_biceps_loosening")}</td>
            <td>{getMeasurmentValuesByName("suit_biceps_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_biceps_loose"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("suit_biceps_loose","suit_biceps_loose")}</td>
          </tr>
          <tr>
            <td>Blazer Elbow Tight</td>
            <td>{getMeasurmentValuesByName("suit_elbow_tight")}</td>
            <td>{getMeasurmentValuesByName("suit_elbow_loosening")}</td>
            <td>{getMeasurmentValuesByName("suit_elbow_loose")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_elbow_loose"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("suit_elbow_loose","suit_elbow_loose")}</td>
          </tr>
          <tr>
            <td>Blazer Sleeve Length</td>
            <td>{getMeasurmentValuesByName("suit_sleeve_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
           
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_sleeve_length"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("suit_sleeve_length", "suit_sleeve_length")}</td>
          </tr>
          <tr>
            <td>Blazer Cuff Opening</td>
            <td>{getMeasurmentValuesByName("suit_cuff_opening")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                ref={register({})}
                name="suit_cuff_opening"
                placeholder="inch"
                style={{
                  width: "100%",
                  height: 30,
                  border: "none",
                  paddingLeft: 8,
                }}
              />
            </td>
            <td>{calculateValues("suit_cuff_opening", "suit_cuff_opening")}</td>
          </tr>
          
          <tr>
            <td>Trouser Length</td>
            <td>{getMeasurmentValuesByName("suit_trouser_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="suit_trouser_length"
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
            <td>{calculateValues("suit_trouser_length", "suit_trouser_length")}</td>
          </tr>

          <tr>
            <td>Trouser Waist</td>
            <td>{getMeasurmentValuesByName("suit_trouser_waist")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="suit_trouser_waist"
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
            <td>{calculateValues("suit_trouser_waist", "suit_trouser_waist")}</td>
          </tr>
          <tr>
            <td> Trouser Seat</td>
            <td>{getMeasurmentValuesByName("suit_trouser_seat")}</td>
            <td></td>
            <td></td>
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
            <td>{calculateValues("suit_trouser_seat", "suit_trouser_seat")}</td>
          </tr>

          <tr>
            <td>Trouser Thigh Tight</td>
            <td>{getMeasurmentValuesByName("suit_trouser_thigh_tight")}</td>
            <td>{getMeasurmentValuesByName("suit_trouser_thigh_loosening ")}</td>
            <td>{getMeasurmentValuesByName("suit_trouser_thigh_loose")}</td>
            <td></td>
            <td></td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                name="suit_trouser_thigh_loose"
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
              {calculateValues("suit_trouser_thigh_loose", "suit_trouser_thigh_loose")}
            </td>
          </tr>
          <tr>
            <td>Trouser Knee Tight</td>
            <td>{getMeasurmentValuesByName("suit_trouser_knee_tight")}</td>
            <td>{getMeasurmentValuesByName("suit_trouser_knee_loosening")}</td>
            <td>{getMeasurmentValuesByName("suit_trouser_knee_loose")}</td>
            <td></td>
            <td></td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="suit_trouser_knee_loose"
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
              {calculateValues("suit_trouser_knee_loose", "suit_trouser_knee_loose")}
            </td>
          </tr>
          <tr>
            <td>Trouser Calf Tight</td>
            <td>{getMeasurmentValuesByName("suit_trouser_calf_tight")}</td>
            <td>{getMeasurmentValuesByName("suit_trouser_calf_loosening ")}</td>
            <td>{getMeasurmentValuesByName("suit_trouser_calf_loose")}</td>
            <td></td>
            <td></td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="suit_trouser_calf_loose"
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
              {calculateValues("suit_trouser_calf_loose", "suit_trouser_calf_loose")}
            </td>
          </tr>

          <tr>
            <td>Trouser Leg Opening</td>
            <td>{getMeasurmentValuesByName("suit_trouser_leg_opening")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="suit_trouser_leg_opening"
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
              {calculateValues("suit_trouser_leg_opening", "suit_trouser_leg_opening")}
            </td>
          </tr>
          <tr>
            <td>Trouser Tummy to back</td>
            <td>{getMeasurmentValuesByName("suit_trouser_tummy_to_back")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                min={0}
                placeholder="inch"
                name="suit_trouser_tummy_to_back"
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
                "suit_trouser_tummy_to_back",
                "suit_trouser_tummy_to_back"
              )}
            </td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewSuitMeasurements;
