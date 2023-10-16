import React from "react";
import { Box } from "@material-ui/core";
import _ from "lodash";

const ViewDhotiMeasurements = ({ data }) => {
  const findMeasurments = (name) => {
    const _measurment = _.find(data, (item, index) => item.name === name);
    return _measurment;
  };

  console.log(data);

  return (
    <Box>
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
            <td> Dhoti Waist</td>

            <td>{findMeasurments("dhoti_waist")?.value}</td>
            <td>{findMeasurments("dhoti_waist")?.value}</td>
          </tr>
          <tr>
            <td> Dhoti Seat </td>

            <td>{findMeasurments("dhoti_seat")?.value}</td>
            <td>{findMeasurments("dhoti_seat")?.value}</td>
          </tr>

          <tr>
            <td> Dhoti Length</td>

            <td>{findMeasurments("dhoti_length")?.value}</td>
            <td>{findMeasurments("dhoti_length")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewDhotiMeasurements;
