import React from "react";
import { Box } from "@material-ui/core";
import _ from "lodash";

const ViewPunaPantMeasurements = ({data,}) => {
  const findMeasurments = (name) => {
    const _measurment = _.find(data, (item, index) => item.name === name);
    return _measurment;
  };

  return (
    <Box >
      <div className="orderFormTable">
        <table className="table">
          <tr style={{ backgroundColor: "cornsilk" }}>
            <td style={{ backgroundColor: "#B3E5FC" }}>PARAMETERS</td>
            <td>
              <b>BODY MEAUREMENTS</b>
            </td>
          
            <td>
              <b>GARMENT MEASUREMENTS</b>
            </td>
           
          </tr>
        

          <tr>
            <td>Puna Pant Waist</td>
           
            <td>{findMeasurments("poonapant_waist")?.value}</td>
            <td>{findMeasurments("poonapant_waist")?.value}</td>
           
          </tr>
          <tr>
            <td> Puna Pant Seat</td>
           
            <td>{findMeasurments("poonapant_seat")?.value}</td>
            <td>{findMeasurments("poonapant_seat")?.value}</td>
          
          </tr>

        </table>
      </div>
    </Box>
  );
};

export default ViewPunaPantMeasurements;
