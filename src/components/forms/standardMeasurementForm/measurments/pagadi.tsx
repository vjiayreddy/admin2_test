import React from "react";
import { Box } from "@material-ui/core";
import _ from "lodash";

const ViewPagadiMeasurements = ({ data }) => {
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
            <td>Pagdi Forhead Size</td>

            <td>{findMeasurments("pagdi_forhead_size")?.value}</td>
            <td>{findMeasurments("pagdi_forhead_size")?.value}</td>
          </tr>
        </table>
      </div>
    </Box>
  );
};

export default ViewPagadiMeasurements;
