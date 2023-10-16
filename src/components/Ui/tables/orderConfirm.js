import React, { useRef, useState } from "react";
import moment from "moment";
import { Button, Box, Divider, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { handleDeleteDraft } from "../../../services/_orders";
import { SAVE_STORE_ORDER } from "../../../apollo/queries/orders";
import { useMutation } from "@apollo/client";
import _ from "lodash";
import InfoDialogComponent from "../../Ui/dialog/infoDialog";

const productOrderTable = [
  "P.No",
  "Product",
  "Color",
  "Fab-Code",
  "Fab-Pic",
  "Ref-Pic",
  "Des-Pic",
  "Trail Date",
  "Price",
];

const ImageAvathar = ({ url }) => {
  return (
    <div
      style={{
        height: 70,
        width: 70,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "top center",
        backgroundImage: `url(${url})`,
      }}
    ></div>
  );
};

const checkDateFormates = (data, key) => {
  if (_.has(data[key], "timestamp") && !_.isEmpty(data[key].timestamp)) {
    return moment(data[key].timestamp).format("DD-MMM-YYYY");
  } else if (!_.has(data[key], "timestamp") && !_.isEmpty(data[key])) {
    return moment(data[key]).format("DD-MMM-YYYY");
  } else {
    return "-";
  }
};

const checkColor = (data, key) => {
  if (_.has(data[key], "color") && !_.isEmpty(data[key].color)) {
    return data[key].color;
  } else if (!_.has(data[key], "color") && !_.isEmpty(data[key])) {
    return data[key];
  } else {
    return "-";
  }
};


// const getStudioName = (studio) => {
//   if (studio === "61c55048429a4414e8755e69") {
//     // return "HY01";
//     return " GROOM2B";
//   } else if (studio === "61d3ef5a2aa36c23004375ec") {
//     // return "HY02";
//     return "My Perfect Fit ";
//   }else if(studio === "61d3ef622aa36c23004375ed"){
//       // return "HY03";
//       return "BLUTAILOR";
//     } 
//     else {
//       // return "HY04";
//       return "STYLE CLUB";
//     }
// };

const getStudioName = (studio) => {
  if (studio === "61c55048429a4414e8755e69") {
    return " GROOM2B";
  } else if (studio === "61d3ef5a2aa36c23004375ec") {
    return "My Perfect Fit";
  } else if (studio === "61d3ef622aa36c23004375ed") {
    return "BLUTAILOR";
  } else {
    return studio ? "MPF STYLE CLUB" : "GROOM2B";
  }
};
const OrderConfirmTable = ({
  data,
  showsubmitbtn,
  showEditBtn,
  showEditPrnt,
}) => {
  const router = useRouter();
  const componentRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [saveStoreOrder, { data: dataSUSO, loading: loadingSUSO }] =
    useMutation(SAVE_STORE_ORDER, {
      onCompleted(data) {
        setIsSubmitted(true);
      },
      onError(error) {
        console.log(error);
      },
    });

  return (
    <div>
      {data && (
        <div className="orderTable" ref={componentRef}>
          <table className="table">
            <tr>
              <td className="cellSelect">Studio Id</td>
              <td>{getStudioName(data.studioId)}</td>
              <td className="cellSelect">CustomerId</td>
              <td>{data.customerId}</td>
            </tr>
            <tr>
              <td className="cellSelect">First Name</td>
              <td>{data.customerFirstName}</td>
              <td className="cellSelect">Last Name</td>
              <td>{data.customerLastName}</td>
            </tr>
            <tr>
              <td className="cellSelect">Mobile</td>
              <td>+{data.customerCountryCode} {data.customerPhone}</td>
              <td className="cellSelect">Email</td>
              <td>{data.customerEmail}</td>
            </tr>

            <tr>
              <td className="cellSelect">Source (Main category)</td>
              <td>{data.sourceChannel}</td>
              <td className="cellSelect">Source (Sub category)</td>
              <td>{data.sourceSubChannel}</td>
            </tr>
            <tr>
              <td className="cellSelect">Stylist</td>
              <td>{!_.isEmpty(data.stylist) ? data.stylist[0].name : "-"}</td>
              <td className="cellSelect">Persona</td>
              <td>{!_.isEmpty(data.persona) ? data.persona[0].name : "-"}</td>
            </tr>
            <tr>
              <td className="cellSelect">Estm Height</td>
              <td>{data.customerHeight}(cm)</td>
              <td className="cellSelect">Estm Weight</td>
              <td>{data.customerWeight}(Kg)</td>
            </tr>
            <tr>
              <td className="cellSelect">City</td>
              <td>{data.customerCity}</td>
              <td className="cellSelect">Order No</td>
              <td>{data.orderNo}</td>
            </tr>
            <tr>
              <td className="cellSelect">OrderDate</td>
              <td>{checkDateFormates(data, "orderDate")}</td>
              <td className="cellSelect">Event Date</td>
              <td>{checkDateFormates(data, "eventDate")}</td>
            </tr>
            <tr>
              <td className="cellSelect">Ready Date</td>
              <td>{checkDateFormates(data, "readyDate")}</td>
              <td className="cellSelect">Trial Date</td>
              <td>{checkDateFormates(data, "trialDate")}</td>
            </tr>
            <tr>
              <td className="cellSelect">Delivery Date</td>
              <td>{checkDateFormates(data, "deliveryDate")}</td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <table className="table">
            <tr>
              {productOrderTable.map((item, index) => (
                <th
                  style={{ textAlign: "left" }}
                  key={index}
                  className="cellSelect"
                >
                  {item}
                </th>
              ))}
            </tr>

            {data.orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.itemNumber}</td>
                <td>{item.itemName}</td>
                <td>{checkColor(item, "itemColor")}</td>
                <td>{item.fabricCode}</td>
                <td>
                  <ImageAvathar
                    url={
                      !_.isEmpty(item.fabricImage)
                        ? item.fabricImage
                        : "/images/noImage.jpg"
                    }
                  />
                  {!_.isEmpty(item.fabricImageNote) && (
                    <Box
                      style={{
                        marginTop: 5,
                        padding: 5,
                        borderTop: "1px solid gray",
                      }}
                    >
                      {item.fabricImageNote}
                    </Box>
                  )}
                </td>

                <td>
                  <ImageAvathar
                    url={
                      !_.isEmpty(item.referenceImage)
                        ? item.referenceImage
                        : "/images/noImage.jpg"
                    }
                  />
                  {!_.isEmpty(item.referenceImageNote) && (
                    <Box
                      style={{
                        marginTop: 5,
                        padding: 5,
                        borderTop: "1px solid gray",
                      }}
                    >
                      {item.referenceImageNote}
                    </Box>
                  )}
                </td>

                <td>
                  <ImageAvathar
                    url={
                      !_.isEmpty(item.styleDesignImage)
                        ? item.styleDesignImage
                        : "/images/noImage.jpg"
                    }
                  />
                  {!_.isEmpty(item.styleDesignImageNote) && (
                    <Box
                      style={{
                        marginTop: 5,
                        padding: 5,
                        borderTop: "1px solid gray",
                      }}
                    >
                      {item.styleDesignImageNote}
                    </Box>
                  )}
                </td>
                <td>{checkDateFormates(data, "trialDate")}</td>
                <td>₹{item.itemPrice}/-</td>
              </tr>
            ))}

            <tr>
              <td
                style={{ textAlign: "right", fontWeight: "bold" }}
                colSpan={8}
              >
                Total
              </td>
              <td>₹{data.orderTotal}/-</td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "right", fontWeight: "bold" }}
                colSpan={8}
              >
                Other Charges
              </td>
              <td>₹{Number(data.otherCharges)}/-</td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "right", fontWeight: "bold" }}
                colSpan={8}
              >
                Grand Total
              </td>
              <td>₹{data.afterChargesTotal}/-</td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "right", fontWeight: "bold" }}
                colSpan={8}
              >
                Deductions
              </td>
              <td>₹{data.deductions}/-</td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "right", fontWeight: "bold" }}
                colSpan={8}
              >
                Net Amount
              </td>
              <td>₹{data.afterDeductionsTotal}/-</td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "right", fontWeight: "bold" }}
                colSpan={8}
              >
                Advance Paid
              </td>
              <td>
                ₹{_.has(data, "payment") ? data.payment : 0}
                /-
              </td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "right", fontWeight: "bold" }}
                colSpan={8}
              >
                Balance Amount
              </td>
              <td>₹{data.balanceAmount}/-</td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "right", fontWeight: "bold" }}
                colSpan={8}
              >
                Order Status
              </td>
              <td>{data.orderStatus}</td>
            </tr>
          </table>
        </div>
      )}

      <Box display="flex" alignItems="center">
        {showEditBtn && (
          <Box mr={1}>
            <Button
              color="secondary"
              onClick={() =>
                router.push(`/orders/new-orders-form?id=${data._id}`)
              }
            >
              Edit
            </Button>
          </Box>
        )}
        {showEditPrnt && (
          <Button
            onClick={() => {
              router.push(`/orders/pdf?id=${data._id}`);
            }}
            style={{ marginRight: 10 }}
          >
            Print
          </Button>
        )}
        {showsubmitbtn && (
          <Box mr={1}>
            <Button
              disabled={loadingSUSO}
              color="secondary"
              onClick={async () => {
                const personalStylistId = data.personalStylistId.value;
                const customerPersonaIds = [data.customerPersonaIds.value];
                const payload = {
                  ...data,
                  personalStylistId,
                  customerPersonaIds,
                };
                await saveStoreOrder({
                  variables: {
                    params: payload,
                  },
                });
              }}
            >
              Place Order
            </Button>
          </Box>
        )}
      </Box>
      <InfoDialogComponent open={isSubmitted} onCloseModel={() => {}}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minHeight: "200px",
          }}
        >
          <Typography align="center" variant="h6" component="h6">
            Successfully Saved Order
          </Typography>
          <Button
            onClick={() => {
              handleDeleteDraft(data.customerPhone);
              setIsSubmitted(false);
            }}
          >
            Close
          </Button>
        </Box>
      </InfoDialogComponent>
    </div>
  );
};

export default OrderConfirmTable;
