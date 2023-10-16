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



const PatiyalaMeasurments = ({ measurments }) => {
  const classes = useStyles();
  console.log("measurments", measurments);
  return (
    <div>
      <div className={classes.sectionHeader}>PATIYALA MEASUREMENTS</div>
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
                <td>Patyala Dhoti Waist</td>
                <td>
                  {getMeasurment(
                    measurments.patyala_dhoti_waist,
                    measurments.patyala_dhoti_waist_size
                  )}
                </td>
              </tr>
              <tr>
                <td>Patyala Dhoti Seat</td>
                <td>
                  {getMeasurment(
                    measurments.patyala_dhoti_seat,
                    measurments.patyala_dhoti_seat_size
                  )}
                </td>
              </tr>

              <tr>
                <td> Patyala Tummy To Back </td>
                <td>
                  {getMeasurment(
                    measurments.patyala_tummy_to_back,
                    measurments.patyala_tummy_to_back_size
                  )}
                </td>
              </tr>

              <tr>
                <td>Patyala Dhoti Length </td>
                <td>
                  {getMeasurment(
                    measurments.patyala_dhoti_length,
                    measurments.patyala_dhoti_length_size
                  )}
                </td>
              </tr>
            </table>
         
        </div>
      </div>
    </div>
  );
};

export default PatiyalaMeasurments;