import React from "react";
import { Box } from "@material-ui/core";
import _ from "lodash";

const ViewShoesMeasurements = ({ data }) => {
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
            <td>Shoes Foot Length</td>

            <td>{findMeasurments("shoes_foot_length")?.value}</td>
            <td>{findMeasurments("shoes_foot_length")?.value}</td>
          </tr>
          <tr>
            <td> Shoes Foot Width </td>

            <td>{findMeasurments("shoes_foot_width")?.value}</td>
            <td>{findMeasurments("shoes_foot_width")?.value}</td>
          </tr>
          <tr>
            <td> Shoes Foot Girth </td>

            <td>{findMeasurments("shoes_foot_girth")?.value}</td>

            <td>{findMeasurments("shoes_foot_girth")?.value}</td>
          </tr>

          <tr>
            <td>Shoes Shoes Size (UK)</td>

            <td>{findMeasurments("shoes_size_uk")?.value}</td>
            <td>{findMeasurments("shoes_size_uk")?.value}</td>
          </tr>

          <tr>
            <td>Shoes Shoes Size (US)</td>

            <td>{findMeasurments("shoes_size_us")?.value}</td>
            <td>{findMeasurments("shoes_size_us")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewShoesMeasurements;
