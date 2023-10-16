import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewWaistcoatMeasurements = ({ data,
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
            <td>Waistcoat Shoulder</td>
            <td>{getMeasurmentValuesByName("waistcoat_shoulder")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="waistcoat_shoulder"
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
              {calculateValues("waistcoat_shoulder", "waistcoat_shoulder")}
            </td>
          </tr>

          <tr>
            <td>Waistcoat Neck</td>
            <td>{getMeasurmentValuesByName("waistcoat_neck")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="waistcoat_neck"
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
            <td>{calculateValues("waistcoat_neck", "waistcoat_neck")}</td>
          </tr>

          <tr>
            <td>Waistcoat Chest Body</td>
            <td>{getMeasurmentValuesByName("waistcoat_chest_body")}</td>
            <td>{getMeasurmentValuesByName("waistcoat_chest_loosening")}</td>
            <td>{getMeasurmentValuesByName("waistcoat_chest_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="waistcoat_chest_ready"
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
                "waistcoat_chest_ready",
                "waistcoat_chest_ready"
              )}
            </td>
          </tr>
          <tr>
            <td>Waistcoat Below Chest</td>
            <td>{getMeasurmentValuesByName("waistcoat_below_chest")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="waistcoat_below_chest"
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
            <td>{calculateValues("", "")}</td>
          </tr>
          <tr>
            <td>Waistcoat Waist Body</td>
            <td>{getMeasurmentValuesByName("waistcoat_waist_body ")}</td>
            <td>{getMeasurmentValuesByName("waistcoat_waist_loosening")}</td>
            <td>{getMeasurmentValuesByName("waistcoat_waist_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="waistcoat_waist_ready"
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
                "waistcoat_waist_ready",
                "waistcoat_waist_ready"
              )}
            </td>
          </tr>

          <tr>
            <td>Waistcoat Seat Body</td>
            <td>{getMeasurmentValuesByName("waistcoat_seat_body")}</td>
            <td>{getMeasurmentValuesByName("waistcoat_seat_loosening")}</td>
            <td>{getMeasurmentValuesByName("waistcoat_seat_ready")}</td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="waistcoat_seat_ready"
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
              {calculateValues("waistcoat_seat_ready", "waistcoat_seat_ready")}
            </td>
          </tr>
          <tr>
            <td>Waistcoat Overall Pointed Length</td>
            <td>
              {getMeasurmentValuesByName("waistcoat_overall_pointed_length")}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="waistcoat_overall_pointed_length"
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
                "waistcoat_overall_pointed_length",
                "waistcoat_overall_pointed_length"
              )}
            </td>
          </tr>
          <tr>
            <td>Waistcoat Belt Length</td>
            <td>{getMeasurmentValuesByName("waistcoat_belt_length")}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="waistcoat_belt_length"
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
                "waistcoat_belt_length",
                "waistcoat_belt_length"
              )}
            </td>
          </tr>
          <tr>
            <td>Waistcoat Length For Double Breasted</td>
            <td>
              {getMeasurmentValuesByName("waistcoat_double_breasted_length")}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td style={{ padding: 0 }}>
              <input
                type="number"
                name="waistcoat_double_breasted_length"
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
                "waistcoat_double_breasted_length",
                "waistcoat_double_breasted_length"
              )}
            </td>
          </tr>
        </table>
      </div>
      {showButton && <Button onClick={handleSubmit(onSubmit)}>Save</Button>}
    </Box>
  );
};

export default ViewWaistcoatMeasurements;
