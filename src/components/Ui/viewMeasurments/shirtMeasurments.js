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

const ShirtMeasurments = ({ measurments }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.sectionHeader}>SHIRT MEASUREMENTS</div>
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
              <td>In Length</td>
              <td>
                {getMeasurment(
                  measurments.in_shirt_length,
                  measurments.in_shirt_length_size
                )}
              </td>
              <td> Out Length </td>
              <td>
                {getMeasurment(
                  measurments.out_shirt_length,
                  measurments.out_shirt_length_size
                )}
              </td>
              <td>Shoulder </td>
              <td>
                {getMeasurment(
                  measurments.shirt_shoulder,
                  measurments.shirt_shoulder_size
                )}
              </td>
              <td>Cross Back</td>
              <td>
                {getMeasurment(
                  measurments.shirt_cross_back,
                  measurments.shirt_cross_back_size
                )}
              </td>
              <td>Neck</td>
              <td>
                {getMeasurment(
                  measurments.shirt_neck,
                  measurments.shirt_neck_size
                )}
              </td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td> Chest Body</td>
              <td>
                {getMeasurment(
                  measurments.shirt_chest_body,
                  measurments.shirt_chest_body_size
                )}
              </td>

              <td>Chest Loosening</td>
              <td>
                {getMeasurment(
                  measurments.shirt_chest_loosening,
                  measurments.shirt_chest_loosening_size
                )}
              </td>
              <td>Chest Ready</td>
              <td>
                {getMeasurment(
                  measurments.shirt_chest_ready,
                  measurments.shirt_chest_ready_size
                )}
              </td>
              <td> Chest Front Half</td>
              <td>
                {getMeasurment(
                  measurments.shirt_from_half_chest,
                  measurments.shirt_from_half_chest_size
                )}
              </td>

              <td>Chest Back </td>
              <td>
                {getMeasurment(
                  measurments.shirt_back_chest,
                  measurments.shirt_back_chest_size
                )}
              </td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Below Chest</td>
              <td>
                {getMeasurment(
                  measurments.shirt_below_chest,
                  measurments.shirt_below_chest_size
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
                  measurments.shirt_waist_body,
                  measurments.shirt_waist_body_size
                )}
              </td>
              <td>Waist Loosening</td>
              <td>
                {getMeasurment(
                  measurments.shirt_waist_loosening,
                  measurments.shirt_waist_loosening_size
                )}
              </td>
              <td>Waist Ready</td>
              <td>
                {getMeasurment(
                  measurments.shirt_waist_ready,
                  measurments.shirt_waist_ready_size
                )}
              </td>
              <td>Waist Front Half</td>
              <td>
                {getMeasurment(
                  measurments.shirt_front_half_waist,
                  measurments.shirt_front_half_waist_size
                )}
              </td>
              <td>Waist Back</td>
              <td>
                {getMeasurment(
                  measurments.shirt_back_waist,
                  measurments.shirt_back_waist_size
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Seat Body</td>
              <td>
                {getMeasurment(
                  measurments.shirt_seat_body,
                  measurments.shirt_seat_body_size
                )}
              </td>
              <td>Seat Loosening</td>
              <td>
                {getMeasurment(
                  measurments.shirt_seat_loosening,
                  measurments.shirt_seat_loosening_size
                )}
              </td>
              <td>Seat Ready</td>
              <td>
                {getMeasurment(
                  measurments.shirt_seat_ready,
                  measurments.shirt_seat_ready_size
                )}
              </td>
              <td>Seat Front Half</td>
              <td>
                {getMeasurment(
                  measurments.shirt_front_half_seat,
                  measurments.shirt_front_half_seat_size
                )}
              </td>
              <td>Seat Back</td>
              <td>
                {getMeasurment(
                  measurments.shirt_back_seat,
                  measurments.shirt_back_seat_size
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Biceps Tight</td>
              <td>
                {getMeasurment(
                  measurments.shirt_biceps_tight,
                  measurments.shirt_biceps_tight_size
                )}
              </td>

              <td>Biceps Loosening</td>
              <td>
                {getMeasurment(
                  measurments.shirt_biceps_loosening,
                  measurments.shirt_biceps_loosening_size
                )}
              </td>

              <td>Biceps Ready</td>
              <td>
                {getMeasurment(
                  measurments.shirt_biceps_ready,
                  measurments.shirt_biceps_ready_size
                )}
              </td>

              <td>Elbow Tight</td>
              <td>
                {getMeasurment(
                  measurments.shirt_elbow_tight,
                  measurments.shirt_elbow_tight_size
                )}
              </td>
              <td>Elbow Loosening</td>
              <td>
                {getMeasurment(
                  measurments.shirt_elbow_loosening,
                  measurments.shirt_elbow_loosening_size
                )}
              </td>
              <td>Elbow Ready</td>
              <td>
                {getMeasurment(
                  measurments.shirt_elbow_ready,
                  measurments.shirt_elbow_ready_size
                )}
              </td>
            </tr>
            <tr>
              <td>Sleeve Length</td>
              <td>
                {getMeasurment(
                  measurments.shirt_sleeve_length,
                  measurments.shirt_sleeve_length_size
                )}
              </td>
              <td>Cuff Opening</td>
              <td>
                {getMeasurment(
                  measurments.cuff_opening,
                  measurments.cuff_opening_size
                )}
              </td>
              <td>Half Sleeve Length</td>
              <td>
                {getMeasurment(
                  measurments.shirt_half_sleeve_length,
                  measurments.shirt_half_sleeve_length_size
                )}
              </td>
              <td>Half Sleeve Opening</td>
              <td>
                {getMeasurment(
                  measurments.shirt_half_sleeve_opening,
                  measurments.shirt_half_sleeve_opening_size
                )}
              </td>
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

export default ShirtMeasurments;
