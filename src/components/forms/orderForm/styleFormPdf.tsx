import React, { Fragment, useEffect, useRef, useState } from "react";
import { makeStyles, Typography, Box, Button } from "@material-ui/core";
import { GET_STYLING_CONFIG } from "../../../apollo/queries/orders";
import ReactToPrint from "react-to-print";
import _ from "lodash";
import { useLazyQuery } from "@apollo/client";
import { getImageUrl } from "../../../utils/utils";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  mainBoxContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  measurmentViewBox: {
    backgroundColor: "#ffffff",
  },
  headerSection: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerLabel: {
    fontSize: 18,
    fontFamily: "MPF_HEAVY",
    fontWeight: 400,
  },
  oderAndBasicDetailsSection: {
    backgroundColor: "white",
  },
  sectionHeader: {
    backgroundColor: "#F5F5F5",
    padding: "10px 30px",
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: 16,
  },
  contentSection: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  span: {
    color: "#757575",
  },
  imageContainer: {
    paddingRight: 20,
    height: 200,
    width: 200,
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
  imageCard: {},
  imageCardTitle: {
    fontSize: 13,
    fontWeight: 600,
    paddingLeft: 10,
  },
  dataContent: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
  },

  contentLeft: {
    backgroundColor: "#f5f5f5",
  },
}));

interface styleFormProps {
  data: any;
  onClose: () => void;
  catId: string;
  orderData: any;
}

const StyleFormPdf: React.FC<styleFormProps> = ({
  data,
  onClose,
  catId,
  orderData,
}) => {
  const componentRef = useRef();
  const [orderItems, setOrderItems] = useState([]);
  const [note, setNote] = useState(null);
  const [formData, setStyleForm] = useState([]);
  const classes = useStyles();
  const [getOrderStylingConfig, { data: styleFormData, loading }] =
    useLazyQuery(GET_STYLING_CONFIG);
  useEffect(() => {
    getOrderStylingConfig({
      variables: {
        catId: catId,
      },
    });
  }, []);

  useEffect(() => {
    if (styleFormData && !_.isEmpty(data)) {
      const { getStylingConfig } = styleFormData;
      if (!_.isEmpty(data.styleDesign) && getStylingConfig) {
        let _finalData = [];
        const _data = JSON.parse(data.styleDesign);
        _data.styleAttributes.map((item) => {
          const _findOption = _.find(
            getStylingConfig.attributes,
            (itm) => itm.masterName === item.master_name
          );
          setStyleForm(getStylingConfig);
          if (!_.isEmpty(_findOption)) {
            const getSelectedOption = _.find(
              _findOption.options,
              (itm) => itm._id === item.value
            );
            if (!_.isEmpty(getSelectedOption)) {
              const finalData = {
                label: _findOption.label,
                sortOrder: _findOption.sortOrder,
                masterName: _findOption.masterName,
                options: [getSelectedOption],
              };
              setNote(_data.note);
              _finalData.push(finalData);
              _finalData.sort((a, b) => a.sortOrder - b.sortOrder);
            }
          }
        });

        setOrderItems(_finalData);
      }
    }
  }, [styleFormData, data]);

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: "#31354C",
        }}
      >
        <div>
          <Typography
            classes={{ root: classes.headerLabel }}
            variant="h2"
            component="h6"
          >{`${data.itemName}-(${data.itemNumber})`}</Typography>
        </div>
        <Box>
          <ReactToPrint
            trigger={() => <Button style={{ marginRight: 10 }}>PRINT</Button>}
            content={() => componentRef.current}
          ></ReactToPrint>

          <Button onClick={onClose}>CLOSE</Button>
        </Box>
      </div>
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
        ref={componentRef}
      >
        <div style={{ flexGrow: 1 }}>
          <div className="styleFormTable" style={{ padding: 30 }}>
            {!_.isEmpty(orderData) && (
              <Box mb={1}>
                <table>
                  <tr>
                    <th>P.NO</th>
                    <th>OrderNo</th>
                    <th>CusId</th>
                    <th>NAME</th>
                    <th>STYLIST</th>
                    <th>DATE</th>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: 5, textAlign: "center", width: 155 }}
                    >{`${data.itemName}-(${data.itemNumber})`}</td>
                    <td style={{ padding: 5, textAlign: "center" }}>
                      {orderData.orderNo}
                    </td>
                    <td style={{ padding: 5, textAlign: "center" }}>
                      {orderData.customerId}
                    </td>
                    <td style={{ padding: 5, textAlign: "center" }}>
                      {orderData.customerFirstName} {orderData.customerLastName}
                    </td>
                    <td style={{ padding: 5, textAlign: "center" }}>
                      {orderData.personalStylistId?.name}
                    </td>
                    <td>{moment(orderData.orderDate).format("DD-MMM-YYYY")}</td>
                  </tr>
                </table>
              </Box>
            )}

            <Box mb={1}>
              <table>
                <tr>
                  <td width={150} style={{ padding: 5 }}>
                    <img width={120} src={getImageUrl(catId)} />
                  </td>
                  <td>
                    <Box
                      style={{
                        whiteSpace: "pre-line",
                        wordWrap: "break-word",
                      
                      }}
                     
                    >
                      {note}
                    </Box>
                  </td>
                </tr>
              </table>
            </Box>
            {orderItems.length > 0 && (
              <table>
                {orderItems.map((_item, index) => (
                  <tr key={index} style={{ width: 30 }}>
                    <td
                      className="cellSelect"
                      style={{ width: 20, textAlign: "center" }}
                    >
                      {index + 1}
                    </td>
                    <td>
                      <Typography
                        className={classes.imageCardTitle}
                        align="left"
                      >
                        {_item.label}
                      </Typography>
                    </td>
                    {_item.options.map((item, index) => (
                      <td key={index}>
                        <Box className={classes.dataContent}>
                          {_item.options.map((item, index) => (
                            <Box>
                              <img
                                width={40}
                                src={
                                  !_.isEmpty(item.image)
                                    ? item.image
                                    : "/images/noImage.jpg"
                                }
                              />
                              <Typography
                                style={{ fontSize: 12, fontWeight: 600 }}
                                align="left"
                              >
                                {item.name}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </td>
                    ))}
                  </tr>
                ))}
              </table>
            )}
            <Box mt={1}>
              <table>
                <tr>
                  <td style={{ padding: 10 }}>
                    <Typography
                      style={{ marginBottom: 5 }}
                      className={classes.imageCardTitle}
                      align="left"
                    >
                      Fabric Image
                    </Typography>
                    <img
                      width={100}
                      height={100}
                      src={
                        !_.isEmpty(data.fabricImage)
                          ? data.fabricImage
                          : "/images/noImage.jpg"
                      }
                    />
                  </td>
                  <td style={{ padding: 10 }}>
                    <Typography
                      style={{ marginBottom: 5 }}
                      className={classes.imageCardTitle}
                      align="left"
                    >
                      Ref Image
                    </Typography>
                    <img
                      width={100}
                      height={100}
                      src={
                        !_.isEmpty(data.referenceImage)
                          ? data.referenceImage
                          : "/images/noImage.jpg"
                      }
                    />
                  </td>
                </tr>
              </table>
            </Box>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#31354C",
          }}
        >
          <div style={{ color: "white", fontWeight: 500 }}>
            www.myperfectfit.co.in
          </div>
          <div style={{ color: "white", fontWeight: 500 }}>
            Contact: +91 8008329992
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StyleFormPdf;
