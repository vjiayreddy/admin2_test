import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  sectionHeader: {
    backgroundColor: "#F5F5F5",
    padding: "10px 30px",
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: 16,
    textAlign: "center",
  },
}));

const getMeasurment = (value, size) => {
  if (!_.isEmpty(value) && !_.isEmpty(size)) {
    if (value === "0" && size === "0") {
      return "";
    } else if (value === "0" && size !== "0") {
      return size;
    } else if (value !== "0" && size === "0") {
      return value;
    } else {
      return value + " - " + size;
    }
  } else {
    if (!_.isEmpty(value) && value !== "0") {
      return value ? value : "";
    } else {
      return "";
    }
  }
};

const WaistcoatMeasurments = ({ measurments }) => {
  const classes = useStyles();
  console.log(measurments);
  return (
    <div>
      <div className={classes.sectionHeader}>WAIST COAT MEASUREMENTS</div>
      <div
        style={{
          display: "flex",
          alignContent: "stretch",
          paddingLeft: 30,
          paddingRight: 30,
          alignItems: "center",
        }}
      >
        <div style={{ flexGrow: 1 }} className="measurmentTable">
          <table>
            <tr>
              <td>Shoulder</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_shoulder,
                  measurments.waistcoat_shoulder_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Neck</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_neck,
                  measurments.waistcoat_neck_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Chest Body</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_chest_body,
                  measurments.waistcoat_chest_body_size
                )}
              </td>
              <td>Chest Loosening</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_chest_loosening,
                  measurments.waistcoat_chest_loosening_size
                )}
              </td>
              <td>Chest Ready</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_chest_ready,
                  measurments.waistcoat_chest_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Below Chest</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_below_chest,
                  measurments.waistcoat_below_chest_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Waist Body</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_waist_body,
                  measurments.waistcoat_waist_body_size
                )}
              </td>
              <td>Waist Loosening</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_waist_loosening,
                  measurments.waistcoat_waist_loosening_size
                )}
              </td>
              <td>Waist Ready</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_waist_ready,
                  measurments.waistcoat_waist_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Seat Body</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_seat_body,
                  measurments.waistcoat_seat_body_size
                )}
              </td>
              <td>Seat Loosening</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_seat_loosening,
                  measurments.waistcoat_seat_loosening_size
                )}
              </td>
              <td>Seat Ready</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_seat_ready,
                  measurments.waistcoat_seat_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Overall Pointed Length</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_overall_pointed_length,
                  measurments.waistcoat_overall_pointed_length_size
                )}
              </td>
              <td>Coat Belt Length</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_belt_length,
                  measurments.waistcoat_belt_length_size
                )}
              </td>
              <td>Length for Double Brested</td>
              <td>
                {getMeasurment(
                  measurments.waistcoat_length_for_double_breasted,
                  measurments.waistcoat_length_for_double_breasted_size
                )}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WaistcoatMeasurments;
