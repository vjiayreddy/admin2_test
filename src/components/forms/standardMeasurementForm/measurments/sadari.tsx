import React from "react";
import { Box } from "@material-ui/core";
import _ from "lodash";

const ViewSadariMeasurements = ({ data }) => {
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
            <td>Sadari Chest</td>
            <td>{findMeasurments("sadri_chest")?.value}</td>
            <td>{findMeasurments("sadri_chest_ready")?.value}</td>
          </tr>

          <tr>
            <td>Sadari Waist</td>

            <td>{findMeasurments("sadri_waist")?.value}</td>
            <td>{findMeasurments("sadri_waist_ready")?.value}</td>
          </tr>

          <tr>
            <td>Sadari Seat</td>

            <td>{findMeasurments("sadari_seat")?.value}</td>
            <td>{findMeasurments("sadri_seat_ready")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewSadariMeasurements;
