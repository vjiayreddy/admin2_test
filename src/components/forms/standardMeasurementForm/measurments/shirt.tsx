import React from "react";
import { Box } from "@material-ui/core";
import _ from "lodash";

const ViewShirtMeasurements = ({ data }) => {
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
            <td>Shirt Chest Body</td>
            <td>{findMeasurments("shirt_chest_body")?.value}</td>
            <td>{findMeasurments("shirt_chest_ready")?.value}</td>
          </tr>
          <tr>
            <td>Shirt Waist Body</td>
            <td>{findMeasurments("shirt_waist_body")?.value}</td>
            <td>{findMeasurments("shirt_waist_ready")?.value}</td>
          </tr>

          <tr>
            <td>Shirt Seat Body</td>
            <td>{findMeasurments("shirt_seat_body")?.value}</td>
            <td>{findMeasurments("shirt_seat_ready")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewShirtMeasurements;
