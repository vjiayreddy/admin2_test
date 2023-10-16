import React from "react";
import { Button, Box, TableRow } from "@material-ui/core";
import moment from "moment";
import { useRouter } from "next/router";
import _ from "lodash";
import { initialConfig } from "../../../services/_trail";

const TrialViewTable = ({ data, onClick }) => {
  const router = useRouter();
  console.log(data);
  return (
    <div>
      <div className="orderTable">
        <table className="table">
          <tr>
            <td className="cellSelect">Client Name:</td>
            <td>
              {data.serverData.storeProductOrder.customerFirstName}{" "}
              {data.serverData.storeProductOrder.customerLastName}
            </td>
            <td className="cellSelect">Trial Date:</td>
            <td>{moment(data.trialDate?.timestamp).format("DD-MM-YYYY")}</td>
          </tr>

          <tr>
            <td className="cellSelect">Order No:</td>
            <td>{data.orderNo}</td>
            <td className="cellSelect">Trial Status:</td>
            <td>{data.trialStatus}</td>
          </tr>
          <tr>
            <td className="cellSelect">Order Trial Date:</td>
            <td>
              {moment(
                data.serverData?.storeProductOrder?.trialDate?.timestamp
              ).format("DD-MM-YYYY")}
            </td>
            <td className="cellSelect">Trial By:</td>
            <td>{data.serverData.trialBy}</td>
          </tr>
          <tr>
            <td className="cellSelect">Actual Trial date:</td>
            <td>{data.actualTrialDate}</td>
            <td className="cellSelect">Final Delivery Date:</td>
            <td>{data.finalDeliveryDate}</td>
          </tr>
          <tr>
            <td className="cellSelect">Stylist:</td>
            <td>{data?.stylist && <>{data.stylist}</>}</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div className="orderFormTable">
        <table className="table">
          <tr style={{ backgroundColor: "cornsilk" }}>
            {initialConfig.trailTable.map((item, index) => (
              <td style={{ paddingLeft: 10 }} key={index}>
                {item}
              </td>
            ))}
          </tr>

          <tbody>
            {data.products?.map((item, index) => (
              <TableRow key={index}>
                <td>{item.name}</td>
                <td>{item.itemNumber}</td>
                <td>
                  {item.fabricImageLink && (
                    <img src={item.fabricImageLink} width={75} height={75} />
                  )}
                </td>
                <td style={{ whiteSpace: "pre-line", wordWrap: "break-word" }}>
                  {item.trialNote}{" "}
                </td>
                <td>
                  {item.trialImageLinks.length > 0 && (
                    <>
                      {item.trialImageLinks.map((item, index) => (
                        <img key={index} src={item} width={75} height={75} />
                      ))}
                    </>
                  )}
                </td>
                <td></td>
                <td>{data?.measurementStatus}</td>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
      <div className="orderTable">
        <table className="table">
          <tr>
            <td className="cellSelect">Note</td>
          </tr>
          <tr>
            <td style={{ padding: "10px" }}>{data.notes}</td>
          </tr>
        </table>
      </div>

      <Box>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => {
            router.push({
              pathname: `/trial/form/edit`,
              query: {
                ...router.query,
                id: `${data._id}`,
              },
            });
          }}
          color="secondary"
        >
          Edit
        </Button>
        <Button color="primary" onClick={onClick}>
          Close
        </Button>
      </Box>
    </div>
  );
};

export default TrialViewTable;
