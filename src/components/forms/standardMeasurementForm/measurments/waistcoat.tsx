import React from "react";
import { Box } from "@material-ui/core";
import _ from "lodash";

const ViewWaistcoatMeasurements = ({ data }) => {
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
            <td>Waistcoat Chest Body</td>

            <td>{findMeasurments("waistcoat_chest_body")?.value}</td>
            <td>{findMeasurments("waistcoat_chest_ready")?.value}</td>
          </tr>

          <tr>
            <td>Waistcoat Waist Body</td>

            <td>{findMeasurments("waistcoat_waist_body")?.value}</td>
            <td>{findMeasurments("waistcoat_waist_ready")?.value}</td>
          </tr>

          <tr>
            <td>Waistcoat Seat Body</td>

            <td>{findMeasurments("waistcoat_seat_body")?.value}</td>
            <td>{findMeasurments("waistcoat_seat_ready")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewWaistcoatMeasurements;
