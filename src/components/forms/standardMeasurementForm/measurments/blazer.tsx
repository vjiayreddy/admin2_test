import React from "react";
import { Box } from "@material-ui/core";

import _ from "lodash";

const ViewBlazerMeasurements = ({ data }) => {
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
              <b>GARMENT MEASUREMENTS </b>
            </td>
          </tr>

          <tr>
            <td>Blazer Chest</td>

            <td>{findMeasurments("blazer_chest")?.value}</td>
            <td>{findMeasurments("blazer_chest_ready")?.value}</td>
          </tr>

          <tr>
            <td>Blazer Waist</td>

            <td>{findMeasurments("blazer_waist")?.value}</td>
            <td>{findMeasurments("blazer_waist_ready")?.value}</td>
          </tr>

          <tr>
            <td>Blazer Seat</td>

            <td>{findMeasurments("blazer_seat")?.value}</td>
            <td>{findMeasurments("blazer_seat_ready")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewBlazerMeasurements;
