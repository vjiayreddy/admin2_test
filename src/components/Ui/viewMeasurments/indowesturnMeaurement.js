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

const IndoWestrenMeasurments = ({ measurments }) => {
  const classes = useStyles();
  console.log(measurments);
  return (
    <div>
      <div className={classes.sectionHeader}>INDO WESTERN MEASUREMENTS</div>
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
                  measurments.indowestern_length,
                  measurments.indowestern_length_size
                )}
              </td>
              <td>Knee Length</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_knee_length,
                  measurments.indowestern_knee_length_size
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
                  measurments.indowestern_shoulder,
                  measurments.indowestern_shoulder_size
                )}
              </td>
              <td>Cross Back</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_cross_back,
                  measurments.indowestern_cross_back_size
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
              <td>Neck Body </td>
              <td>
                {getMeasurment(
                  measurments.indowestern_neck_body,
                  measurments.indowestern_neck_body_size
                )}
              </td>
              <td>Neck Ready</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_neck_ready,
                  measurments.indowestern_neck_ready_size
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
                  measurments.indowestern_chest_body,
                  measurments.indowestern_chest_body_size
                )}
              </td>
              <td>Chest Loosening</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_chest_loosening,
                  measurments.indowestern_chest_loosening_size
                )}
              </td>
              <td>Chest Ready</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_chest_ready,
                  measurments.indowestern_chest_ready_size
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
                  measurments.indowestern_below_chest,
                  measurments.indowestern_below_chest_size
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
                  measurments.indowestern_waist_body,
                  measurments.indowestern_waist_body_size
                )}
              </td>

              <td>Waist Loosening</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_waist_loosening,
                  measurments.indowestern_waist_loosening_size
                )}
              </td>
              <td>Waist Ready</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_waist_ready,
                  measurments.indowestern_waist_ready_size
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
                  measurments.indowestern_seat_body,
                  measurments.indowestern_seat_body_size
                )}
              </td>

              <td>Seat Loosening</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_seat_loosening,
                  measurments.indowestern_seat_loosening_size
                )}
              </td>
              <td>Seat Ready</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_seat_ready,
                  measurments.indowestern_seat_ready_size
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
                  measurments.indowestern_biceps_tight,
                  measurments.indowestern_biceps_tight_size
                )}
              </td>
              <td>Biceps Loosening</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_biceps_loosening,
                  measurments.iindowestern_biceps_loosening_size
                )}
              </td>
              <td>Biceps Loose</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_biceps_loose,
                  measurments.indowestern_biceps_loose_size
                )}
              </td>
              <td>Elbow Tight</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_elbow_tight,
                  measurments.indowestern_elbow_tight_size
                )}
              </td>
              <td>Elbow Loosening</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_elbow_loosening,
                  measurments.indowestern_elbow_loosening_size
                )}
              </td>
              <td>Elbow Loose</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_elbow_loose,
                  measurments.indowestern_elbow_loose_size
                )}
              </td>
            </tr>

            <tr>
              <td>Sleeve Length</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_sleeve_length,
                  measurments.indowestern_sleeve_length_size
                )}
              </td>
              <td>Cuff Opening</td>
              <td>
                {getMeasurment(
                  measurments.indowestern_cuff_opening,
                  measurments.indowestern_cuff_opening_size
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

export default IndoWestrenMeasurments;
