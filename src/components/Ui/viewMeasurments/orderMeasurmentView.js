import React, { Fragment, useEffect, useState, useRef } from "react";
import { Grid, Box, Button, Typography, makeStyles } from "@material-ui/core";
import moment from "moment";

import _ from "lodash";

import {
  GET_SHOULDER_TYPES,
  GET_BODYPOSTURE_TYPES,
  GET_BODYPROFILE,
  GET_USER_MEASURMENTS,
} from "../../../apollo/queries/measurments";
import { useLazyQuery } from "@apollo/client";
import BlazerMeasurments from "./blazerMeasurments";
import ShirtMeasurments from "./shirtMeasurments";
import TrouserMeasurments from "./touserMeasurments";
import ChinosMeasurments from "./chinosMeasurments";
import JodhpuriMeasurments from "./jodhpuriMeasurment";
import KurtaMeasurments from "./kurtaMeasurements";
import SadriMeasurments from "./sadariMeasurements";
import WaistcoatMeasurments from "./waistcoat";
import SherwaniMeasurments from "./sherwaniMeasurements";
import IndoWestrenMeasurments from "./indowesturnMeaurement";
import ReactToPrint from "react-to-print";
import LoadingIndicatorComponent from "../loading";

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
}));

const getCatid = (product) => {
  switch (product) {
    case "full_shirt":
      return {
        catId: "5da7220571762c2a58b27a65",
        subCatId: "half_shirt",
      };
      break;
    case "half_shirt":
      return {
        catId: "5da7220571762c2a58b27a65",
        subCatId: "half_shirt",
      };
      break;
    case "chinos":
      return {
        catId: "5da7220571762c2a58b27a6b",
        subCatId: "chinos",
      };
      break;
    case "trouser":
      return {
        catId: "5da7220571762c2a58b27a6b",
        subCatId: "trouser",
      };
      break;
    case "blazer":
      return {
        catId: "5da7220571762c2a58b27a68",
        subCatId: "blazer",
      };

      break;
    case "indowestern_top":
      return {
        catId: "5da7220571762c2a58b27a6f",
        subCatId: "indowestern",
      };
      break;
    case "jodhpuri_top":
      return {
        catId: "5da7220571762c2a58b27a6c",
        subCatId: "jodhpuri",
      };
      break;
    case "kurta":
      return {
        catId: "5da7220571762c2a58b27a6e",
        subCatId: "kurta",
      };
      break;
    case "sadris":
      return {
        catId: "5da7220571762c2a58b27a6d",
        subCatId: "sadri",
      };
      break;
    case "sherwani":
      return {
        catId: "5da7220571762c2a58b27a6d",
        subCatId: "sherwani",
      };
      break;
    default:
      return {
        catId: null,
        subCatId: null,
      };
  }
};

const converCmToInch = (n) => {
  var realFeet = (n * 0.3937) / 12;
  var feet = Math.floor(realFeet);
  var inches = Math.round((realFeet - feet) * 12);
  return feet + "." + inches;
};

const convertToOption = (value) => {
  let val = value < 10 ? value * 10 : value;
  if (val <= 12) return "0";
  if (val >= 13 && val <= 37) return "1/4";
  if (val >= 38 && val < 62) return "1/2";
  if (val >= 63 && val < 87) return "3/4";
  if (val >= 88) return "0";
  if (val === NaN) return "0";
};

const OrderMeasurmentView = ({ onClose, userId, catId, dataRow }) => {
  const classes = useStyles();
  const [bodyProfileData, setBodyProfileData] = useState({});
  const [bodyPosture, setBodyPosture] = useState();
  const [shoulder, setShoulder] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [measurments, setMeasurments] = useState(null);
  const componentRef = useRef();
  const [getSavedUserMeasurments, { loading: loadingUM, data: dataUM }] =
    useLazyQuery(GET_USER_MEASURMENTS, { fetchPolicy: "network-only" });

  useEffect(async () => {
    if (!_.isEmpty(catId)) {
      await getSavedUserMeasurments({
        variables: {
          userId: userId,
          catId: getCatid(dataRow.itemName).catId,
          subCat: getCatid(dataRow.itemName).subCatId,
        },
      });
    }
  }, [catId]);

  useEffect(() => {
    if (!_.isEmpty(dataUM)) {
      const { getUserMeasurements } = dataUM;
      if (!_.isEmpty(getUserMeasurements)) {
        const options = !_.isEmpty(getUserMeasurements[0].options)
          ? getUserMeasurements[0].options
          : getUserMeasurements[1].options;
        var opts = {};
        options.forEach((op) => {
          var opStr = !_.isNull(op.value)
            ? op.value.toString().split(".")
            : "0.0"; //12.5
          opts[op.name] = Number(opStr[0]).toString();
          opts[op.name + "_size"] =
            convertToOption(Number(opStr[1])) !== undefined
              ? convertToOption(Number(opStr[1]))
              : "0";
          opts["note"] = !_.isEmpty(getUserMeasurements[0].options)
            ? getUserMeasurements[0].note
            : getUserMeasurements[1].note;
        });
        setMeasurments(opts);
      }
    }
  }, [dataUM]);

  const categories = [
    {
      catId: "5da7220571762c2a58b27a68",
      catName: "BLAZER",
      catImage: "images/Blazer.png",
    },
    {
      catId: "5da7220571762c2a58b27a65",
      catName: "SHIRT",
      catImage: "images/Shirt.png",
    },
    {
      catId: "5da7220571762c2a58b27a67",
      catName: "TROUSER",
      catImage: "images/Trouser.png",
    },
    {
      catId: "5da7220571762c2a58b27a6b",
      catName: "CHINOS",
      catImage: "images/Chinos.png",
    },
    {
      catId: "5da7220571762c2a58b27a6c",
      catName: "JODHPURI ",
      catImage: "images/Jodhpuri.png",
    },
    {
      catId: "5da7220571762c2a58b27a6e",
      catName: "KURTA",
      catImage: "images/Kurta.png",
    },
    {
      catId: "5da7220571762c2a58b27a6d",
      catName: "SADARI",
      catImage: "images/Sadri.png",
    },
    {
      catId: "5da7220571762c2a58b27a6a",
      catName: "WAIST COAT",
      catImage: "images/Waistcoat.png",
    },
    {
      catId: "5da7220571762c2a58b27a70",
      catName: "SHERWANI",
      catImage: null,
    },
    {
      catId: "5da7220571762c2a58b27a6f",
      catName: "INDO WESTREN",
      catImage: null,
    },
  ];

  const getCategories = (catId) => {
    const category = _.find(categories, (item) => item.catId === catId);
    if (!_.isEmpty(category)) {
      return category;
    }
    return null;
  };

  const [getBodyPostureTypes, { data: dataBPT }] = useLazyQuery(
    GET_BODYPOSTURE_TYPES
  );
  const [getShoulderTypes, { loading: loadingST, data: dataST }] =
    useLazyQuery(GET_SHOULDER_TYPES);

  const [getGetUserBodyProfile, { data: { getBodyProfile } = {} }] =
    useLazyQuery(GET_BODYPROFILE);
  useEffect(async () => {
    if (!_.isEmpty(userId)) {
      await getGetUserBodyProfile({
        variables: {
          userId: userId,
        },
      });
      await getBodyPostureTypes({
        variables: {
          filter: {
            masterName: "master_bodyposture",
          },
        },
      });
      await getShoulderTypes({
        variables: {
          filter: {
            masterName: "master_shouldertype",
          },
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (!_.isEmpty(getBodyProfile)) {
      setBodyProfileData(getBodyProfile[0]);
    }
  }, [getBodyProfile]);

  useEffect(() => {
    if (!_.isEmpty(dataST)) {
      const { getUserAttributeMaster } = dataST;
      const shoulderType = _.find(
        getUserAttributeMaster,
        (item) => item._id === bodyProfileData.shoulderTypeId
      );
      if (!_.isEmpty(shoulderType)) {
        setShoulder(shoulderType.name);
      }
    }
  }, [dataST]);

  useEffect(() => {
    if (!_.isEmpty(dataBPT)) {
      const { getUserAttributeMaster } = dataBPT;
      const bodyPosture = _.find(
        getUserAttributeMaster,
        (item) => item._id === bodyProfileData.bodyPostureId
      );
      if (!_.isEmpty(bodyPosture)) {
        setBodyPosture(bodyPosture.name);
      }
    }
  }, [dataBPT]);

  console.log(dataRow);

  return (
    <Fragment>
      {loadingUM ? (
        <LoadingIndicatorComponent />
      ) : (
        <div>
          <div
            ref={componentRef}
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <div style={{ flexGrow: 1 }}>
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
                  {dataRow && (
                    <Typography
                      classes={{ root: classes.headerLabel }}
                      variant="h2"
                      component="h6"
                    >
                      {getCategories(catId)?.catName} MEASURMENTS -{" "}
                      {dataRow.customerFirstName} ({dataRow.customerId})
                    </Typography>
                  )}
                </div>
                <Box>
                  <ReactToPrint
                    trigger={() => (
                      <Button style={{ marginRight: 10 }}>PRINT</Button>
                    )}
                    content={() => componentRef.current}
                  ></ReactToPrint>

                  <Button onClick={onClose}>CLOSE</Button>
                </Box>
              </div>
              <div style={{ backgroundColor: "white", display: "flex" }}>
                <div
                  style={{
                    paddingLeft: 30,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: "1px solid gainsboro",
                  }}
                >
                  <div
                    style={{
                      minHeight: "150px",
                      width: "150px",
                      height: "auto",
                      backgroundPosition: "top center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      marginRight: 30,
                      backgroundImage: `url(${
                        !_.isEmpty(getCategories(catId)?.catImage)
                          ? getCategories(catId)?.catImage
                          : "images/noImage.jpg"
                      })`,
                    }}
                  ></div>
                </div>
                <div style={{ flex: 1, borderRight: "1px solid gainsboro" }}>
                  <Box component="div" className={classes.sectionHeader}>
                    Order Details
                  </Box>
                  <Box className={classes.contentSection}>
                    <Box mb={0.2}>
                      <label>
                        <b>Order Id : </b>
                        {!_.isEmpty(dataRow) ? (
                          <span className={classes.span}>
                            {dataRow.orderNo}
                          </span>
                        ) : (
                          "-"
                        )}
                      </label>
                    </Box>
                    <Box mb={0.2}>
                      <label>
                        <b>Customer Id : </b>
                        {!_.isEmpty(dataRow) ? (
                          <span className={classes.span}>
                            {dataRow.customerId}
                          </span>
                        ) : (
                          "-"
                        )}
                      </label>
                    </Box>
                    <Box mb={0.2}>
                      <label>
                        <b>Stylist : </b>
                        {!_.isEmpty(dataRow) && (
                          <span className={classes.span}>
                            {dataRow.stylist}
                          </span>
                        )}
                      </label>
                    </Box>
                    <Box mb={0.2}>
                      <label>
                        <b>Measured by : </b>
                      </label>
                    </Box>
                    <Box mb={0.2}>
                      <label>
                        <b>Date : </b>{" "}
                        <span className={classes.span}>
                          {moment().format("DD/MM/YYYY")}
                        </span>
                      </label>
                    </Box>
                  </Box>
                </div>
                <div style={{ flex: 1 }}>
                  <Box className={classes.sectionHeader}>Basic details</Box>
                  <Box className={classes.contentSection}>
                    <Box mb={0.2}>
                      <label>
                        <b>Name : </b>
                        {!_.isEmpty(bodyProfileData) ? (
                          <span className={classes.span}>
                            {bodyProfileData.firstName}{" "}
                            {bodyProfileData.lastName}
                          </span>
                        ) : (
                          "-"
                        )}
                      </label>
                    </Box>

                    <Box mb={0.2}>
                      <label>
                        <b>Age : </b>{" "}
                        {!_.isEmpty(bodyProfileData) ? (
                          <span className={classes.span}>
                            {bodyProfileData.age}
                          </span>
                        ) : (
                          "-"
                        )}
                      </label>
                    </Box>

                    <Box mb={0.2}>
                      <label>
                        <b>Weight : </b>
                        {!_.isEmpty(bodyProfileData) ? (
                          <span className={classes.span}>
                            {bodyProfileData.weight} kg
                          </span>
                        ) : (
                          "-"
                        )}
                      </label>
                    </Box>
                    <Box mb={0.2}>
                      <label>
                        <b>Height : </b>{" "}
                        {!_.isEmpty(bodyProfileData) ? (
                          <span className={classes.span}>
                            {converCmToInch(bodyProfileData.height)} inch
                          </span>
                        ) : (
                          "-"
                        )}
                      </label>
                    </Box>
                    <Box mb={0.2}>
                      <label>
                        <b>Body Posture : </b>{" "}
                        {!_.isEmpty(bodyPosture) ? (
                          <span className={classes.span}>{bodyPosture}</span>
                        ) : (
                          "-"
                        )}
                      </label>
                    </Box>
                    <Box mb={0.2}>
                      <label>
                        <b>Shoulder : </b>{" "}
                        {!_.isEmpty(shoulder) ? (
                          <span className={classes.span}>{shoulder}</span>
                        ) : (
                          "-"
                        )}
                      </label>
                    </Box>
                  </Box>
                </div>
              </div>
              <Grid container style={{ paddingBottom: 10 }} direction="column">
                <Grid item>
                  <Box className={classes.sectionHeader}>CLIENT PICTURES</Box>
                </Grid>
                <Grid style={{ paddingTop: 20 }} item container>
                  {!_.isEmpty(bodyProfileData) &&
                    !_.isEmpty(bodyProfileData.frontPicture) && (
                      <Grid item>
                        <Box
                          style={{
                            backgroundImage: `url(${bodyProfileData.frontPicture})`,
                          }}
                          className={classes.imageContainer}
                        ></Box>
                      </Grid>
                    )}

                  {!_.isEmpty(bodyProfileData) &&
                    !_.isEmpty(bodyProfileData.sidePicture) && (
                      <Grid item>
                        <Box
                          style={{
                            backgroundImage: `url(${bodyProfileData.sidePicture})`,
                          }}
                          className={classes.imageContainer}
                        ></Box>
                      </Grid>
                    )}
                  {!_.isEmpty(bodyProfileData) &&
                    !_.isEmpty(bodyProfileData.backPicture) && (
                      <Grid item>
                        <Box
                          style={{
                            backgroundImage: `url(${bodyProfileData.backPicture})`,
                          }}
                          className={classes.imageContainer}
                        ></Box>
                      </Grid>
                    )}
                </Grid>
              </Grid>
              {measurments && (
                <Fragment>
                  {catId === "5da7220571762c2a58b27a68" && (
                    <BlazerMeasurments measurments={measurments} />
                  )}
                  {catId === "5da7220571762c2a58b27a65" && (
                    <ShirtMeasurments measurments={measurments} />
                  )}
                  {catId === "5da7220571762c2a58b27a67" && (
                    <TrouserMeasurments measurments={measurments} />
                  )}
                  {catId === "5da7220571762c2a58b27a6b" && (
                    <ChinosMeasurments measurments={measurments} />
                  )}
                  {catId === "5da7220571762c2a58b27a6c" && (
                    <JodhpuriMeasurments measurments={measurments} />
                  )}
                  {catId === "5da7220571762c2a58b27a6e" && (
                    <KurtaMeasurments measurments={measurments} />
                  )}
                  {catId === "5da7220571762c2a58b27a6d" && (
                    <SadriMeasurments measurments={measurments} />
                  )}
                  {catId === "5da7220571762c2a58b27a6a" && (
                    <WaistcoatMeasurments measurments={measurments} />
                  )}
                  {catId === "5da7220571762c2a58b27a70" && (
                    <SherwaniMeasurments measurments={measurments} />
                  )}
                  {catId === "5da7220571762c2a58b27a6f" && (
                    <IndoWestrenMeasurments measurments={measurments} />
                  )}
                </Fragment>
              )}
              <Grid container style={{ paddingBottom: 10 }} direction="column">
                <Grid item>
                  <Box className={classes.sectionHeader}>ADDITIONAL NOTE</Box>
                </Grid>
                <Grid item>
                  <Box
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 30,
                      paddingRight: 30,
                      whiteSpace: "pre-line",
                      wordWrap: "break-word",
                    }}
                  >
                    
                    {/* {measurments.note} */}
                  </Box>
                </Grid>
              </Grid>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 20,
                paddingBottom: 20,
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
        </div>
      )}
    </Fragment>
  );
};

export default OrderMeasurmentView;
