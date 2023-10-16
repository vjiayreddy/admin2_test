import React from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  sectionHeader: {
    backgroundColor: "#F5F5F5",
    padding: "10px 20px",
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: 16,
    textAlign:"center",
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


const ChudidaarMeasurmet= ({ measurments }) => {
  const classes = useStyles();
  console.log("measurments", measurments);
  return (
    <div>
      <div className={classes.sectionHeader}>CHUDIDAAR MEASUREMENTS</div>
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
        <table style={{"width":"60%" , "marginLeft":"auto","marginRight":"auto",}}>
              <tr>
                <td> Waist </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_waist,
                    measurments.chudidar_waist_size
                  )}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td> Seat </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_seat,
                    measurments.chudidar_seat_size
                  )}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td> Thigh Body </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_thigh_body,
                    measurments.chudidar_thigh_body_size
                  )}
                </td>
                <td> Thigh Loosening </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_thigh_loosening,
                    measurments.chudidar_thigh_loosening_size
                  )}
                </td>
                <td> Thigh Ready </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_thigh_ready,
                    measurments.chudidar_thigh_ready_size
                  )}
                </td>
              </tr>

              <tr>
                <td> Knee Body </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_knee_body,
                    measurments.chudidar_knee_body_size
                  )}
                </td>
                <td> Knee Loosening </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_knee_loosening,
                    measurments.chudidar_knee_loosening_size
                  )}
                </td>
                <td> Knee Ready </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_knee_ready,
                    measurments.chudidar_knee_ready_size
                  )}
                </td>
              </tr>

              
              <tr>
                <td> Calf Body </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_calf_body,
                    measurments.chudidar_calf_body_size
                  )}
                </td>
                <td> Calf Loosening </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_calf_loosening,
                    measurments.chudidar_calf_loosening_size
                  )}
                </td>
                <td> Calf Ready </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_calf_ready,
                    measurments.chudidar_calf_ready_size
                  )}
                </td>
              </tr>
              
              <tr>
                <td> Leg Opening Tight </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_leg_opening_tight,
                    measurments.chudidar_leg_opening_tight_size
                  )}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td> Leg Opening loose </td>
                <td>
                  {getMeasurment(
                    measurments.chudidar_leg_opening_loose,
                    measurments.chudidar_leg_opening_loose_size
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

export default ChudidaarMeasurmet;