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

const SadariMeasurments = ({ measurments }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.sectionHeader}>SADARI MEASUREMENTS</div>
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
              <td>Length</td>
              <td>
                {getMeasurment(
                  measurments.sadri_length,
                  measurments.sadri_length_size
                )}
              </td>
              <td>Shoulder</td>
              <td>
                {getMeasurment(
                  measurments.sadri_shoulder,
                  measurments.sadri_shoulder_size
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Neck Body</td>
              <td>
                {getMeasurment(
                  measurments.sadri_neck_body,
                  measurments.sadri_neck_body_size
                )}
              </td>
              <td>Neck Ready</td>
              <td>
                {getMeasurment(
                  measurments.sadri_neck_ready,
                  measurments.sadri_neck_ready_size
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Chest Body</td>
              <td>
                {getMeasurment(
                  measurments.sadri_chest,
                  measurments.sadri_chest_size
                )}
              </td>
              <td>Chest Loosening</td>
              <td>
                {getMeasurment(
                  measurments.sadri_chest_loosening,
                  measurments.sadri_chest_loosening_size
                )}
              </td>
              <td>Chest Ready</td>
              <td>
                {getMeasurment(
                  measurments.sadri_chest_ready,
                  measurments.sadri_chest_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Below Chest</td>
              <td>
                {getMeasurment(
                  measurments.sadri_below_chest,
                  measurments.sadri_below_chest_size
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
                  measurments.sadri_waist_body,
                  measurments.sadri_waist_body_size
                )}
              </td>
              <td>Waist Loosening</td>
              <td>
                {getMeasurment(
                  measurments.sadri_waist_loosening,
                  measurments.sadri_waist_loosening_size
                )}
              </td>
              <td>Waist Ready</td>
              <td>
                {getMeasurment(
                  measurments.sadri_waist_ready,
                  measurments.sadri_waist_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Seat Body</td>
              <td>
                {getMeasurment(
                  measurments.sadri_seat_body,
                  measurments.sadri_seat_body_size
                )}
              </td>
              <td>Seat Loosening</td>
              <td>
                {getMeasurment(
                  measurments.sadri_seat_loosening,
                  measurments.sadri_seat_loosening_size
                )}
              </td>
              <td>Seat Ready</td>
              <td>
                {getMeasurment(
                  measurments.sadri_seat_ready,
                  measurments.sadri_seat_ready_size
                )}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SadariMeasurments;
