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




const  ShoesMeasurments= ({ measurments }) => {
  const classes = useStyles();
  console.log("measurments", measurments);
  return (
    <div>
      <div className={classes.sectionHeader}>SHOES MEASUREMENTS</div>
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
                <td>Foot Length </td>
                <td>
                  {getMeasurment(
                    measurments.shoes_foot_length,
                    measurments.shoes_foot_length_size
                  )}
                </td>
              </tr>
              <tr>
                <td>Foot width </td>
                <td>
                  {getMeasurment(
                    measurments.shoes_foot_width,
                    measurments.shoes_foot_width_size
                  )}
                </td>
              </tr>

              <tr>
                <td>Foot Girth </td>
                <td>
                  {getMeasurment(
                    measurments.shoes_foot_girth,
                    measurments.shoes_foot_girth_size
                  )}
                </td>
              </tr>

              <tr>
                <td>Shoes Size (UK) </td>
                <td>
                  {getMeasurment(
                    measurments.shoes_shoes_size_uk,
                    measurments.shoes_shoes_size_uk_size
                  )}
                </td>
              </tr>
              <tr>
                <td>Shoes Size (US) </td>
                <td>
                  {getMeasurment(
                    measurments.shoes_shoes_size_us,
                    measurments.shoes_shoes_size_us_size
                  )}
                </td>
              </tr>
            </table>
       
        </div>
      </div>
    </div>
  );
};

export default  ShoesMeasurments;