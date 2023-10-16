import React from "react";
import { Box } from "@material-ui/core";
import _ from "lodash";

const ViewSherwaniMeasurements = ({ data }) => {
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
              <b>GARMENT MEAUREMENTS</b>
            </td>
          </tr>
          <tr>
            <td>Sherwani Chest Body</td>

            <td>{findMeasurments("sherwani_chest_body")?.value}</td>
            <td>{findMeasurments("sherwani_chest_ready")?.value}</td>
          </tr>

          <tr>
            <td>Sherwani Waist Body</td>

            <td>{findMeasurments("sherwani_waist_body")?.value}</td>
            <td>{findMeasurments("sherwani_waist_ready")?.value}</td>
          </tr>

          <tr>
            <td>Sherwani Seat Body</td>

            <td>{findMeasurments("sherwani_seat_body")?.value}</td>
            <td>{findMeasurments("sherwani_seat_ready")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewSherwaniMeasurements;
