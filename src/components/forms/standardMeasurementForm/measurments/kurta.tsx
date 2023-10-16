import React from "react";
import { Box } from "@material-ui/core";
import _ from "lodash";

const ViewKurtaMeasurements = ({ data }) => {
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
            <td>Kurta Chest Body</td>
            {/* <td>{getMeasurmentValuesByName("kurta_chest_body")}</td>
            
            <td>{getMeasurmentValuesByName("kurta_chest_ready")}</td> */}

            <td>{findMeasurments("kurta_chest_body")?.value}</td>
            <td>{findMeasurments("kurta_chest_ready")?.value}</td>
          </tr>

          <tr>
            <td>Kurta Waist Body</td>

            <td>{findMeasurments("kurta_waist_body")?.value}</td>
            <td>{findMeasurments("kurta_waist_ready")?.value}</td>
          </tr>

          <tr>
            <td>Kurta Seat Body</td>

            <td>{findMeasurments("kurta_seat_body")?.value}</td>
            <td>{findMeasurments("kurta_seat_ready")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewKurtaMeasurements;
