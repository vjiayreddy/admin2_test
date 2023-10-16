import React from "react";
import { Button, Box } from "@material-ui/core";
import { useRouter } from "next/router";
import _ from "lodash";
import moment from "moment";
import Typography from "@material-ui/core/Typography";

const CustomerViewTable = ({ cifInfo }) => {
  const router = useRouter();

  console.log(cifInfo);
  return (
    <div>
      <div className="orderTable">
        <table className="table">
          <tr>
            <td className="cellSelect">Form No</td>
            <td>{cifInfo?.cifSerialNumber}</td>
            <td className="cellSelect">CustomerId</td>
            <td>{cifInfo?.customerSerialNo}</td>
          </tr>
          <tr>
            <td className="cellSelect">First Name</td>
            <td>{cifInfo?.firstName}</td>
            <td className="cellSelect">Last Name</td>
            <td>{cifInfo?.lastName}</td>
          </tr>
          <tr>
            <td className="cellSelect">Mobile</td>
            <td>{cifInfo?.phone}</td>

            <td className="cellSelect">Creation Date</td>
            <td>
              {cifInfo.createdDate
                ? moment(cifInfo?.createdDate?.timestamp).format("DD/MM/YYYY")
                : "-"}
            </td>
          </tr>
          <tr>
            <td className="cellSelect">Event Date</td>
            <td>{moment(cifInfo?.eventDate?.timestamp).format("DD/MM/YYYY")}</td>
            <td className="cellSelect">Event Type</td>
            <td>{cifInfo?.eventType}</td>
          </tr>
          <tr>
            <td className="cellSelect">Looking For</td>
            <td>{cifInfo.lookingFor}</td>
            <td className="cellSelect">Source (Main category)</td>
            <td>{cifInfo?.source[0]?.name}</td>
          </tr>
          <tr>
            <td className="cellSelect">Status</td>
            <td>{cifInfo?.customerInfoStatus}</td>
            <td className="cellSelect">Email</td>
            <td>{cifInfo?.email}</td>
          </tr>
        </table>

        <Box mt={1} mb={1}>
          <Typography
            style={{ fontSize: "16px", marginTop: 20 }}
            align="center"
            variant="h6"
          >
            OCCASION DETAILS
          </Typography>
        </Box>
        <div className="orderTable">
          <table className="table">
            <tr>
              <th className="cellSelect">Occasion</th>
              <th className="cellSelect">Outfit Notes</th>
              <th className="cellSelect">Ref Image</th>
              <th className="cellSelect">Budget</th>
              <th className="cellSelect">Price Quote</th>
            </tr>

            {cifInfo?.occasionDetails?.map((item, index) => (
              <tr key={index}>
                <td style={{ height: 50 }}>{item?.occasion}</td>
                <td>{item?.outfitsNote}</td>
                <td>
                  <img width={100} src={item?.refImage} />
                </td>
                <td>{item?.budget}</td>
                <td>{item?.priceQuote}</td>
              </tr>
            ))}
          </table>
        </div>
        <div className="orderTable" style={{ marginTop: 30 }}>
          <table className="table">
            <tr>
              <td className="cellSelect">Stylist Notes</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>{cifInfo?.note}</td>
            </tr>
          </table>
        </div>
      </div>

      <Box display="flex" alignItems="center">
        <Box mr={1}>
          <Button
            color="secondary"
            onClick={() => {
              router.push({
                pathname: "/customerInfo/form",
                query: {
                  edit: cifInfo._id,
                },
              });
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default CustomerViewTable;
