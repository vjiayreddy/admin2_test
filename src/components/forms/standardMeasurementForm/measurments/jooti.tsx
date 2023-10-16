import React from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewJootiMeasurements = ({ data }) => {
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
            <td>Jootis Foot Length</td>

            <td>{findMeasurments("jootis_foot_length")?.value}</td>
            <td>{findMeasurments("jootis_foot_length")?.value}</td>
          </tr>
          <tr>
            <td> Jootis Foot Width </td>

            <td>{findMeasurments("jootis_foot_width")?.value}</td>

            <td>{findMeasurments("jootis_foot_width")?.value}</td>
          </tr>
          <tr>
            <td> Jootis Foot Girth </td>

            <td>{findMeasurments("jootis_foot_girth")?.value}</td>
            <td>{findMeasurments("jootis_foot_girth")?.value}</td>
          </tr>

          <tr>
            <td>Jootis Shoes Size (UK)</td>

            <td>{findMeasurments("jootis_shoes_size_uk")?.value}</td>
            <td>{findMeasurments("jootis_shoes_size_uk")?.value}</td>
          </tr>

          <tr>
            <td>Jootis Shoes Size (US)</td>

            <td>{findMeasurments("jootis_shoes_size_us")?.value}</td>
            <td>{findMeasurments("jootis_shoes_size_us")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewJootiMeasurements;
