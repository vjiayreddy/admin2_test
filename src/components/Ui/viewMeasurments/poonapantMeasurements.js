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

const PoonapantMeasurments = ({ measurments, title }) => {
  console.log(measurments);
  const classes = useStyles();
  return (
    <div>
      <div className={classes.sectionHeader}>
        {title ? title : "POONA PANT MEASUREMENTS"}
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
                  measurments.poonapant_length,
                  measurments.poonapant_length_size
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
                  measurments.poonapant_waist,
                  measurments.poonapant_waist_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Seat</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_seat,
                  measurments.poonapant_seat_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Thigh Tight</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_thigh_tight,
                  measurments.poonapant_thigh_tight_size
                )}
              </td>

              <td>Thigh Loosening</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_thigh_loosening,
                  measurments.poonapant_thigh_loosening_size
                )}
              </td>

              <td>Thigh Loose</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_thigh_loose,
                  measurments.poonapant_thigh_loose_size
                )}
              </td>
            </tr>

            <tr>
              <td>Knee Tight</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_knee_tight,
                  measurments.poonapant_knee_tight_size
                )}
              </td>
              <td>Knee Loosening</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_knee_loosening,
                  measurments.poonapant_knee_loosening_size
                )}
              </td>

              <td>Knee Loose</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_knee_loose,
                  measurments.poonapant_knee_loose_size
                )}
              </td>
            </tr>

            <tr>
              <td>Calf Tight</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_calf_tight,
                  measurments.poonapant_calf_tight_size
                )}
              </td>
              <td>Calf Loosening</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_calf_loosening,
                  measurments.poonapant_calf_loosening_size
                )}
              </td>

              <td>Calf Loose</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_calf_loose,
                  measurments.poonapant_calf_loose_size
                )}
              </td>
            </tr>

            <tr>
              <td>Leg Opening</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_leg_opening,
                  measurments.poonapant_leg_opening_size
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Tummy to Back</td>
              <td>
                {getMeasurment(
                  measurments.poonapant_tummy_to_back,
                  measurments.poonapant_tummy_to_back_size
                )}
              </td>
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

export default PoonapantMeasurments;
