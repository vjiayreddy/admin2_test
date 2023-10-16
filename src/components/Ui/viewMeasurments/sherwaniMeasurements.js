import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

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

const SherwaniMeasurments = ({ measurments }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.sectionHeader}>SHERWANI MEASUREMENTS</div>
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
                  measurments.sherwani_length,
                  measurments.sherwani_length_size
                )}
              </td>
              <td>Knee Length</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_knee_length,
                  measurments.sherwani_knee_length_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Shoulder</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_shoulder,
                  measurments.sherwani_shoulder_size
                )}
              </td>
              <td>Cross Back</td>
              <td>
                {getMeasurment(measurments.sherwani, measurments.sherwani_size)}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Neck Body </td>
              <td>
                {getMeasurment(
                  measurments.sherwani_neck_body,
                  measurments.sherwani_neck_body_size
                )}
              </td>
              <td>Neck Ready</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_neck_ready,
                  measurments.sherwani_neck_ready_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Chest Body </td>
              <td>
                {getMeasurment(
                  measurments.sherwani_chest_body,
                  measurments.sherwani_chest_body_size
                )}
              </td>
              <td>Chest Loosening</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_chest_loosening,
                  measurments.sherwani_chest_loosening_size
                )}
              </td>
              <td>Chest Ready</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_chest_ready,
                  measurments.sherwani_chest_ready_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Below Chest</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_below_chest,
                  measurments.sherwani_below_chest_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Waist Body</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_waist_body,
                  measurments.sherwani_waist_body_size
                )}
              </td>

              <td>Waist Loosening</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_waist_loosening,
                  measurments.sherwani_waist_loosening_size
                )}
              </td>
              <td>Waist Ready</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_waist_ready,
                  measurments.sherwani_waist_ready_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Seat Body</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_seat_body,
                  measurments.sherwani_seat_body_size
                )}
              </td>

              <td>Seat Loosening</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_seat_loosening,
                  measurments.sherwani_seat_loosening_size
                )}
              </td>
              <td>Seat Ready</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_seat_ready,
                  measurments.sherwani_seat_ready_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Biceps Tight</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_biceps_tight,
                  measurments.sherwani_biceps_tight_size
                )}
              </td>
              <td>Biceps Loosening</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_biceps_loosening,
                  measurments.sherwani_biceps_loosening_size
                )}
              </td>
              <td>Biceps Loose</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_biceps_loose,
                  measurments.sherwani_biceps_loose_size
                )}
              </td>
              <td>Elbow Tight</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_elbow_tight,
                  measurments.sherwani_elbow_tight_size
                )}
              </td>
              <td>Elbow Loosening</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_elbow_loosening,
                  measurments.sherwani_elbow_loosening_size
                )}
              </td>
              <td>Elbow Loose</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_elbow_loose,
                  measurments.sherwani_elbow_loose_size
                )}
              </td>
            </tr>

            <tr>
              <td>Sleeve Length</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_sleeve_length,
                  measurments.sherwani_sleeve_length_size
                )}
              </td>
              <td>Cuff Opening</td>
              <td>
                {getMeasurment(
                  measurments.sherwani_cuff_opening,
                  measurments.sherwani_cuff_opening_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SherwaniMeasurments;
