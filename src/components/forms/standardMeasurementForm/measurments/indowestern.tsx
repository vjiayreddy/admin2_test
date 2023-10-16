import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";

const ViewIndowesternMeasurements = ({ data }) => {
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
              <b>GARMENT MEASUREMENTS (A)</b>
            </td>
          </tr>

          <tr>
            <td>Indowestern Chest Body</td>

            <td>{findMeasurments("indowestern_chest_body")?.value}</td>
            <td>{findMeasurments("indowestern_chest_ready")?.value}</td>
          </tr>

          <tr>
            <td>Indowestern Waist Body</td>

            <td>{findMeasurments("indowestern_waist_body")?.value}</td>
            <td>{findMeasurments("indowestern_waist_ready")?.value}</td>
          </tr>

          <tr>
            <td>Indowestern Seat Body</td>

            <td>{findMeasurments("indowestern_seat_body")?.value}</td>
            <td>{findMeasurments("indowestern_seat_ready")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewIndowesternMeasurements;
