import React from "react";
import { makeStyles } from "@material-ui/core";
import _ from "lodash";

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

const BlazerMeasurments = ({ measurments, title }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.sectionHeader}>
        {title ? title : "BLAZER MEASUREMENTS"}
      </div>
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
                  measurments.blazer_length,
                  measurments.blazer_length_size
                )}
              </td>
              <td>Shoulder</td>
              <td>
                {getMeasurment(
                  measurments.blazer_shoulder,
                  measurments.blazer_shoulder_size
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cross Back</td>
              <td>
                {getMeasurment(
                  measurments.blazer_cross_back,
                  measurments.blazer_cross_back_size
                )}
              </td>
              <td>Neck</td>
              <td>
                {getMeasurment(
                  measurments.blazer_neck,
                  measurments.blazer_neck_size
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Chest</td>
              <td>
                {getMeasurment(
                  measurments.blazer_chest,
                  measurments.blazer_chest_size
                )}
              </td>
              <td>Chest Loosening</td>
              <td>
                {getMeasurment(
                  measurments.blazer_chest_loosening,
                  measurments.blazer_chest_loosening_size
                )}
                {/* {measurments.blazer_chest_loosening} -{" "}
                {measurments.blazer_chest_loosening_size} */}
              </td>
              <td>Chest Ready</td>
              <td>
                {getMeasurment(
                  measurments.blazer_chest_ready,
                  measurments.blazer_chest_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Below Chest</td>
              <td>
                {getMeasurment(
                  measurments.blazer_below_chest,
                  measurments.blazer_below_chest_size
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
                  measurments.blazer_waist,
                  measurments.blazer_waist_size
                )}
              </td>
              <td>Waist Loosening</td>
              <td>
                {getMeasurment(
                  measurments.blazer_waist_loosening,
                  measurments.blazer_waist_loosening_size
                )}
              </td>
              <td>Waist Ready</td>
              <td>
                {getMeasurment(
                  measurments.blazer_waist_ready,
                  measurments.blazer_waist_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Seat</td>
              <td>
                {getMeasurment(
                  measurments.blazer_seat,
                  measurments.blazer_seat_size
                )}
              </td>
              <td>Seat Loosening</td>
              <td>
                {getMeasurment(
                  measurments.blazer_seat_loosening,
                  measurments.blazer_seat_loosening_size
                )}
              </td>
              <td>Seat Ready</td>
              <td>
                {getMeasurment(
                  measurments.blazer_seat_ready,
                  measurments.blazer_seat_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Biceps Tight</td>
              <td>
                {getMeasurment(
                  measurments.blazer_biceps_tight,
                  measurments.blazer_biceps_tight_size
                )}
              </td>
              <td>Biceps Loosening</td>
              <td>
                {getMeasurment(
                  measurments.blazer_biceps_loosening,
                  measurments.blazer_biceps_loosening_size
                )}
              </td>
              <td>Biceps Ready</td>
              <td>
                {getMeasurment(
                  measurments.blazer_biceps_loose,
                  measurments.blazer_biceps_loose_size
                )}
              </td>
            </tr>
            <tr>
              <td>Elbow Tight</td>
              <td>
                {getMeasurment(
                  measurments.blazer_elbow_tight,
                  measurments.blazer_elbow_tight_size
                )}
              </td>
              <td>Elbow Loosening</td>
              <td>
                {getMeasurment(
                  measurments.blazer_elbow_loosening,
                  measurments.blazer_elbow_loosening_size
                )}
              </td>
              <td>Elbow Ready</td>
              <td>
                {getMeasurment(
                  measurments.blazer_elbow_loose,
                  measurments.blazer_elbow_loose_size
                )}
              </td>
            </tr>
            <tr>
              <td>Sleeve Length</td>
              <td>
                {getMeasurment(
                  measurments.blazer_sleeve_length,
                  measurments.blazer_sleeve_length_size
                )}
              </td>
              <td>Cuff Opening</td>
              <td>
                {getMeasurment(
                  measurments.blazer_cuff_opening,
                  measurments.blazer_cuff_opening_size
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

export default BlazerMeasurments;
