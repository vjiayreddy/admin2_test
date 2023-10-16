import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  sectionHeader: {
    backgroundColor: "#F5F5F5",
    padding: "10px 20px",
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

const KurtaMeasurments = ({ measurments }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.sectionHeader}>KURTA MEASUREMENTS</div>
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
                  measurments.kurta_length,
                  measurments.kurta_length_size
                )}
              </td>
              <td>Knee Length</td>
              <td>
                {getMeasurment(
                  measurments.kurta_knee_length,
                  measurments.kurta_knee_length_size
                )}
              </td>
              <td>Shoulder</td>
              <td>
                {getMeasurment(
                  measurments.kurta_shoulder,
                  measurments.kurta_shoulder_size
                )}
              </td>
              <td>Cross Back</td>
              <td>
                {getMeasurment(
                  measurments.kurta_cross_back,
                  measurments.kurta_cross_back_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              
            </tr>

            <tr>
              <td>Neck Body </td>
              <td>
                {getMeasurment(
                  measurments.kurta_body_neck,
                  measurments.kurta_body_neck_size
                )}
              </td>
              <td>Neck Ready</td>
              <td>
                {getMeasurment(
                  measurments.kurta_ready_neck,
                  measurments.kurta_ready_neck_size
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
                  measurments.kurta_chest_body,
                  measurments.kurta_chest_body_size
                )}
              </td>
              <td>Chest Loosening </td>
              <td>
                {getMeasurment(
                  measurments.kurta_chest_loosening,
                  measurments.kurta_chest_loosening_size
                )}
              </td>
              <td>Chest Ready</td>
              <td>
                {getMeasurment(
                  measurments.kurta_chest_ready,
                  measurments.kurta_chest_ready_size
                )}
              </td>
              <td>Chest Front</td>
              <td>
                {getMeasurment(
                  measurments.kurta_front_half_chest,
                  measurments.kurta_front_half_chest_size
                )}
              </td>
              <td>Chest Back</td>
              <td>
                {getMeasurment(
                  measurments.kurta_back_chest,
                  measurments.kurta_back_chest_size
                )}
              </td>
              <td></td>
              <td></td>
            
            </tr>
            <tr>
              <td>Below Chest</td>
              <td>
                {getMeasurment(
                  measurments.kurta_below_chest,
                  measurments.kurta_below_chest_size
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
                  measurments.kurta_waist_body,
                  measurments.kurta_waist_body_size
                )}
              </td>

              <td>Waist Loosening</td>
              <td>
                {getMeasurment(
                  measurments.kurta_waist_loosening,
                  measurments.kurta_waist_loosening_size
                )}
              </td>
              <td>Waist Ready</td>
              <td>
                {getMeasurment(
                  measurments.kurta_waist_ready,
                  measurments.kurta_waist_ready_size
                )}
              </td>

              <td>Waist Front</td>
              <td>
                {getMeasurment(
                  measurments.kurta_front_half_waist,
                  measurments.kurta_front_half_waist_size
                )}
              </td>
              <td>Waist Back</td>
              <td>
                {getMeasurment(
                  measurments.kurta_back_waist,
                  measurments.kurta_back_waist_size
                )}
              </td>
              <td></td>
              <td></td>
             
            </tr>

            <tr>
              <td>Seat Body</td>
              <td>
                {getMeasurment(
                  measurments.kurta_seat_body,
                  measurments.kurta_seat_body_size
                )}
              </td>

              <td>Seat Loosening</td>
              <td>
                {getMeasurment(
                  measurments.kurta_seat_loosening,
                  measurments.kurta_seat_loosening_size
                )}
              </td>
              <td>Seat Ready</td>
              <td>
                {getMeasurment(
                  measurments.kurta_seat_ready,
                  measurments.kurta_seat_ready_size
                )}
              </td>
              <td>Seat Front</td>
              <td>
                {getMeasurment(
                  measurments.kurta_front_half_seat,
                  measurments.kurta_front_half_seat_size
                )}
              </td>
              <td>Seat Back</td>
              <td>
                {getMeasurment(
                  measurments.kurta_back_seat,
                  measurments.kurta_back_seat_size
                )}
              </td>
              <td></td>
              <td></td>
              
            </tr>

            <tr>
              <td>Biceps Tight</td>
              <td>
                {getMeasurment(
                  measurments.kurta_biceps_tight,
                  measurments.kurta_biceps_tight_size
                )}
              </td>
              <td>Biceps Loosening</td>
              <td>
                {getMeasurment(
                  measurments.kurta_biceps_loosening,
                  measurments.kurta_biceps_loosening_size
                )}
              </td>
              <td>Biceps Ready</td>
              <td>
                {getMeasurment(
                  measurments.kurta_biceps_ready,
                  measurments.kurta_biceps_ready_size
                )}
              </td>
              <td>Elbow Tight</td>
              <td>
                {getMeasurment(
                  measurments.kurta_elbow_tight,
                  measurments.kurta_elbow_tight_size
                )}
              </td>
              <td>Elbow Loosening</td>
              <td>
                {getMeasurment(
                  measurments.kurta_elbow_loosening,
                  measurments.kurta_elbow_loosening_size
                )}
              </td>
              <td>Elbow Loose</td>
              <td>
                {getMeasurment(
                  measurments.kurta_elbow_loose,
                  measurments.kurta_elbow_loose_size
                )}
              </td>
             
            </tr>
            <tr>
              <td>Sleeve Length</td>
              <td>
                {getMeasurment(
                  measurments.kurta_sleeve_length,
                  measurments.kurta_sleeve_length_size
                )}
              </td>
              <td>Cuff Opening</td>
              <td>
                {getMeasurment(
                  measurments.kurta_cuff_opening,
                  measurments.kurta_cuff_opening_size
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

export default KurtaMeasurments;
