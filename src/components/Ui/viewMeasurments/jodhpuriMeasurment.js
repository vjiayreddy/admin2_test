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

const JodhpuriMeasurments = ({ measurments }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.sectionHeader}>JODHPURI MEASUREMENTS</div>
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
                  measurments.jodhpuri_length,
                  measurments.jodhpuri_length_size
                )}
              </td>
              <td>Shoulder</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_shoulder,
                  measurments.jodhpuri_shoulder_size
                )}
              </td>
              <td>Cross Back</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_cross_back,
                  measurments.jodhpuri_cross_back_size
                )}
              </td>
            </tr>
            <tr>
              <td>Neck Body</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_neck_body,
                  measurments.jodhpuri_neck_body_size
                )}
              </td>
              <td>Neck Ready</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_neck_ready,
                  measurments.jodhpuri_neck_ready_size
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Chest</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_chest,
                  measurments.jodhpuri_chest_size
                )}
              </td>
              <td>Chest Loosening</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_chest_loosening,
                  measurments.jodhpuri_chest_loosening_size
                )}
              </td>
              <td>Chest Ready</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_chest_ready,
                  measurments.jodhpuri_chest_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Below Chest</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_below_chest,
                  measurments.jodhpuri_below_chest_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Waist</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_waist,
                  measurments.jodhpuri_waist_size
                )}
              </td>
              <td>Waist Loosening</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_waist_loosening,
                  measurments.jodhpuri_waist_loosening_size
                )}
              </td>
              <td>Waist Ready</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_waist_ready,
                  measurments.jodhpuri_waist_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Seat</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_seat,
                  measurments.jodhpuri_seat_size
                )}
              </td>
              <td>Seat Loosening</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_seat_loosening,
                  measurments.jodhpuri_seat_loosening_size
                )}
              </td>
              <td>Seat Ready</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_seat_ready,
                  measurments.jodhpuri_seat_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Biceps Tight</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_biceps_tight,
                  measurments.jodhpuri_biceps_tight_size
                )}
              </td>
              <td>Biceps Loosening</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_biceps_loosening,
                  measurments.jodhpuri_biceps_loosening_size
                )}
              </td>
              <td>Biceps Loose</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_biceps_loose,
                  measurments.jodhpuri_biceps_loose_size
                )}
              </td>
            
            </tr>
            <tr>
              <td>Elbow Tight</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_elbow_tight,
                  measurments.jodhpuri_elbow_tight_size
                )}
              </td>
              <td>Elbow Loosening</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_elbow_loosening,
                  measurments.jodhpuri_elbow_loosening_size
                )}
              </td>
              <td>Elbow Loose</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_elbow_loose,
                  measurments.jodhpuri_elbow_loose_size
                )}
              </td>
            
            </tr>
            <tr>
              <td>Sleeve Length</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_sleeve_length,
                  measurments.jodhpuri_sleeve_length_size
                )}
              </td>
              <td>Cuff Opening</td>
              <td>
                {getMeasurment(
                  measurments.jodhpuri_cuff_opening,
                  measurments.jodhpuri_cuff_opening_size
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JodhpuriMeasurments;
