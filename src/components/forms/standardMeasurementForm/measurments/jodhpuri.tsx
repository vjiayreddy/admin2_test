import React from "react";
import { Box } from "@material-ui/core";
import _ from "lodash";

const ViewJodhpuriMeasurements = ({ data }) => {
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
            <td>Jodhpuri Chest </td>

            <td>{findMeasurments("jodhpuri_chest")?.value}</td>

            <td>{findMeasurments("jodhpuri_chest_ready")?.value}</td>
          </tr>

          <tr>
            <td>Jodhpuri Waist </td>

            <td>{findMeasurments("jodhpuri_waist")?.value}</td>
            <td>{findMeasurments("jodhpuri_waist_ready")?.value}</td>
          </tr>

          <tr>
            <td>Jodhpuri Seat </td>

            <td>{findMeasurments("jodhpuri_seat")?.value}</td>
            <td>{findMeasurments("jodhpuri_seat_ready")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewJodhpuriMeasurements;
