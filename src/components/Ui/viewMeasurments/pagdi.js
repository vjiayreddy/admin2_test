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





const PagdiMeasurments= ({ measurments }) => {
  const classes = useStyles();
  console.log("measurments", measurments);
  return (
    <div>
      <div className={classes.sectionHeader}>PAGADI MEASUREMENTS</div>
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
                <td>Pagdi Forhead Size</td>
                <td>
                  {getMeasurment(
                    measurments.pagdi_forhead_size,
                    measurments.pagdi_forhead_size_size
                  )}
                </td>
              </tr>
            </table>
       
        </div>
      </div>
    </div>
  );
};

export default PagdiMeasurments;