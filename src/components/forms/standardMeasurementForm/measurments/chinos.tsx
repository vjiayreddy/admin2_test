import React from "react";
import { Box } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewChinosMeasurements = ({ data }) => {
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
            <td>Chinos Length</td>

            <td>{findMeasurments("chinos_length")?.value}</td>
            <td>{findMeasurments("chinos_length")?.value}</td>
          </tr>

          <tr>
            <td>Chinos Waist</td>

            <td>{findMeasurments("chinos_waist")?.value}</td>
            <td>{findMeasurments("chinos_waist")?.value}</td>
          </tr>
          <tr>
            <td> Chinos Seat</td>

            <td>{findMeasurments("chinos_seat")?.value}</td>
            <td>{findMeasurments("chinos_seat")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewChinosMeasurements;
