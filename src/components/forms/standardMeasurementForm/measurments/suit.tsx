import React from "react";
import { Box } from "@material-ui/core";

import _ from "lodash";

const ViewSuitMeasurements = ({ data }) => {
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
            <td>Blazer Chest</td>

            <td>{findMeasurments("suit_chest")?.value}</td>
            <td>{findMeasurments("suit_chest_ready")?.value}</td>
          </tr>

          <tr>
            <td>Blazer Waist</td>

            <td>{findMeasurments("suit_waist")?.value}</td>
            <td>{findMeasurments("suit_waist_ready")?.value}</td>
          </tr>

          <tr>
            <td>Blazer Seat</td>

            <td>{findMeasurments("suit_seat")?.value}</td>
            <td>{findMeasurments("suit_seat_ready")?.value}</td>
          </tr>

          <tr>
            <td>Trouser Length</td>

            <td>{findMeasurments("suit_trouser_length")?.value}</td>
            <td>{findMeasurments("suit_trouser_length")?.value}</td>
          </tr>

          <tr>
            <td>Trouser Waist</td>

            <td>{findMeasurments("suit_trouser_waist")?.value}</td>
            <td>{findMeasurments("suit_trouser_waist")?.value}</td>
          </tr>
          <tr>
            <td> Trouser Seat</td>

            <td>{findMeasurments("suit_trouser_seat")?.value}</td>
            <td>{findMeasurments("suit_trouser_seat")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewSuitMeasurements;
