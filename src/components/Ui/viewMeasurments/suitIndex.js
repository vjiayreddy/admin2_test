import React, { Fragment, useEffect, useState, useRef } from "react";
import { Grid, Box, Button, Typography, makeStyles } from "@material-ui/core";
import moment from "moment";

import _ from "lodash";

import {
  GET_SHOULDER_TYPES,
  GET_BODYPOSTURE_TYPES,
  GET_BODYPROFILE,
  GET_FITPREFRENCE_TYPES,
} from "../../../apollo/queries/measurments";
import { useLazyQuery } from "@apollo/client";
import BlazerMeasurments from "./blazerMeasurments";
import SuitBlazerMeasurments from "./suitBlazerMeasurement";
import SuitTrouserMeasurments from "./suitTrouserMeasurement";
import ShirtMeasurments from "./shirtMeasurments";
import TrouserMeasurments from "./touserMeasurments";
import ChinosMeasurments from "./chinosMeasurments";
import JodhpuriMeasurments from "./jodhpuriMeasurment";
import KurtaMeasurments from "./kurtaMeasurements";
import SadriMeasurments from "./sadariMeasurements";
import WaistcoatMeasurments from "./waistcoat";
import SherwaniMeasurments from "./sherwaniMeasurements";
import IndoWestrenMeasurments from "./indowesturnMeaurement";
import SuitMeasurements from "./suitMeasurements";
import DhotiMeasurments from "./dhoti";
import ChudidarMeasurments from "./chudidar";
import JootisMeasurments from "./jootis";
import ShoesMeasurments from "./shoes";
import PagdiMeasurments from "./pagdi";
import PatiyalaMeasurments from "./patiyala";
import ReactToPrint from "react-to-print";

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

const ViewComponent = ({
  onClose,
  userId,
  authData,
  measurments,
  data,
  note,
  catId,
  approvedDate,
}) => {
  const classes = useStyles();
  const [bodyProfileData, setBodyProfileData] = useState({});
  const [bodyPosture, setBodyPosture] = useState();
  const [fitPreferenceValue, setfitPreferenceValue] = useState(null);

  const [shoulder, setShoulder] = useState();
  const { data: currentUser } = authData;
  const componentRef = useRef();

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
      catImage: "images/Sherwani.png",
    },
    {
      catId: "5da7220571762c2a58b27a6f",
      catName: "INDO WESTREN",
      catImage: null,
    },
    {
      catId: "5da7220571762c2a58b27a66",
      catName: "SUIT",
      catImage: null,
    },
    {
      catId: "6036451627e32d7fd776a580",
      catName: "DHOTI",
      catImage: "images/Dhoti.png",
    },
    {
      catId: "5da7220571762c2a58b27a72",
      catName: "PAGADI",
      catImage: "images/Pagadi.png",
    },
    {
      catId: "621a34485417ab1e143a5245",
      catName: "PATYALA",
      catImage: "images/Patiyala.png",
    },
    {
      catId: "5da7220571762c2a58b27a73",
      catName: "JOOTIES",
      catImage: "images/Jootis.png",
    },
    {
      catId: "6036446927e32d7fd776a57f",
      catName: "CHIDIDAR",
      catImage: "images/Chudidaar.png",
    },
    {
      catId: "5ebb993abcb3d23714b2ebf4",
      catName: "SHOES",
      catImage: "images/Shoes.png",
    },
  ];

  const getCategories = (catId) => {
    const category = _.find(categories, (item) => item.catId === catId);
    return category;
  };

  const converCmToInch = (n) => {
    var realFeet = (n * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + "." + inches;
  };

  const [getBodyPostureTypes, { data: dataBPT }] = useLazyQuery(
    GET_BODYPOSTURE_TYPES
  );
  const [getShoulderTypes, { loading: loadingST, data: dataST }] =
    useLazyQuery(GET_SHOULDER_TYPES);

  const [getFitPreferenceTypes, { loading: loadingFPT, data: dataPT }] =
    useLazyQuery(GET_FITPREFRENCE_TYPES);

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
      await getFitPreferenceTypes({
        variables: {
          filter: {
            masterName: "master_fitpreference",
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

  useEffect(() => {
    if (!_.isEmpty(dataPT)) {
      const { getUserAttributeMaster } = dataPT;
      const fitPref = _.find(
        getUserAttributeMaster,
        (item) => item._id === bodyProfileData.fitPreferenceId
      );
      if (!_.isEmpty(fitPref)) {
        setfitPreferenceValue(fitPref.name);
      }
    }
  }, [dataPT]);

  return (
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
              <Typography
                classes={{ root: classes.headerLabel }}
                variant="h2"
                component="h6"
              >
                {getCategories(catId).catName} MEASUREMENTS -{" "}
                {currentUser.firstName} {currentUser.lastName} (
                {currentUser.customerSrNo})
              </Typography>
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
                    !_.isEmpty(getCategories(catId).catImage)
                      ? getCategories(catId).catImage
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
                  </label>
                </Box>
                <Box mb={0.2}>
                  <label>
                    <b>Customer Id : </b>
                    {!_.isEmpty(currentUser) ? (
                      <span className={classes.span}>
                        {currentUser.customerSrNo}
                      </span>
                    ) : (
                      "-"
                    )}
                  </label>
                </Box>
                <Box mb={0.2}>
                  <label>
                    <b>Stylist : </b>
                    {!_.isEmpty(currentUser) ? (
                      !_.isEmpty(currentUser.stylist) ? (
                        <span className={classes.span}>
                          {currentUser.stylist[0].name}
                        </span>
                      ) : (
                        "-"
                      )
                    ) : (
                      "-"
                    )}
                  </label>
                </Box>
                <Box mb={0.2}>
                  <label>
                    <b>
                      Measured by :{" "}
                      <span className={classes.span}>
                        {measurments.measuredBy}
                      </span>
                    </b>
                  </label>
                </Box>
                <Box mb={0.2}>
                  <label>
                    <b>
                      Meters :{" "}
                      <span className={classes.span}>
                        {measurments.meters === "0.0" ? "" : measurments.meters}
                      </span>
                    </b>
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
                        {bodyProfileData.firstName} {bodyProfileData.lastName}
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
                <Box mb={0.2}>
                  <label>
                    <b>Fit Type : </b>{" "}
                    {!_.isEmpty(fitPreferenceValue) ? (
                      <span className={classes.span}>{fitPreferenceValue}</span>
                    ) : (
                      ""
                    )}
                  </label>
                </Box>
              </Box>
            </div>
            <div style={{ flex: 1 }}>
              <Box className={classes.sectionHeader}>Loosening Approval</Box>
              <Box className={classes.contentSection}>
                <Box mb={0.2}>
                  <label>
                    <b>Loosening Approved By: </b>
                    {!_.isEmpty(currentUser) ? (
                      !_.isEmpty(currentUser.stylist) ? (
                        <span className={classes.span}>
                          {measurments.approvedBy}
                        </span>
                      ) : (
                        "-"
                      )
                    ) : (
                      "-"
                    )}
                  </label>
                </Box>

                <Box mb={0.2}>
                  <label>
                    <b>Date : </b>{" "}
                    <span className={classes.span}>
                      {moment(approvedDate).format("DD/MM/YYYY")}
                    </span>
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
              {catId === "5da7220571762c2a58b27a66" && (
                <>
                  <SuitBlazerMeasurments
                    title="SUIT BLAZER MEASUREMENTS"
                    measurments={measurments}
                  />

                 
                  
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: "white",
                      padding: 30,
                      backgroundColor: "#31354C",
                    }}
                  >
                    <div>
                      <Typography
                        classes={{ root: classes.headerLabel }}
                        variant="h2"
                        component="h6"
                      >
                        {getCategories(catId).catName} MEASUREMENTS -{" "}
                        {currentUser.firstName} {currentUser.lastName} (
                        {currentUser.customerSrNo})
                      </Typography>
                    </div>
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
                            !_.isEmpty(getCategories(catId).catImage)
                              ? getCategories(catId).catImage
                              : "images/noImage.jpg"
                          })`,
                        }}
                      ></div>
                    </div>
                    <div
                      style={{ flex: 1, borderRight: "1px solid gainsboro" }}
                    >
                      <Box component="div" className={classes.sectionHeader}>
                        Order Details
                      </Box>
                      <Box className={classes.contentSection}>
                        <Box mb={0.2}>
                          <label>
                            <b>Order Id : </b>
                          </label>
                        </Box>
                        <Box mb={0.2}>
                          <label>
                            <b>Customer Id : </b>
                            {!_.isEmpty(currentUser) ? (
                              <span className={classes.span}>
                                {currentUser.customerSrNo}
                              </span>
                            ) : (
                              "-"
                            )}
                          </label>
                        </Box>
                        <Box mb={0.2}>
                          <label>
                            <b>Stylist : </b>
                            {!_.isEmpty(currentUser) ? (
                              !_.isEmpty(currentUser.stylist) ? (
                                <span className={classes.span}>
                                  {currentUser.stylist[0].name}
                                </span>
                              ) : (
                                "-"
                              )
                            ) : (
                              "-"
                            )}
                          </label>
                        </Box>
                        <Box mb={0.2}>
                          <label>
                            <b>
                              Measured by :{" "}
                              <span className={classes.span}>
                                {measurments.measuredBy}
                              </span>
                            </b>
                          </label>
                        </Box>
                        <Box mb={0.2}>
                          <label>
                            <b>
                              Meters :{" "}
                              <span className={classes.span}>
                                {measurments.meters === "0.0"
                                  ? ""
                                  : measurments.meters}
                              </span>
                            </b>
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
                              <span className={classes.span}>
                                {bodyPosture}
                              </span>
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
                        <Box mb={0.2}>
                          <label>
                            <b>Fit Type : </b>{" "}
                            {!_.isEmpty(fitPreferenceValue) ? (
                              <span className={classes.span}>
                                {fitPreferenceValue}
                              </span>
                            ) : (
                              ""
                            )}
                          </label>
                        </Box>
                      </Box>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Box className={classes.sectionHeader}>
                        Loosening Approval
                      </Box>
                      <Box className={classes.contentSection}>
                        <Box mb={0.2}>
                          <label>
                            <b>Loosening Approved By: </b>
                            {!_.isEmpty(currentUser) ? (
                              !_.isEmpty(currentUser.stylist) ? (
                                <span className={classes.span}>
                                  {measurments.approvedBy}
                                </span>
                              ) : (
                                "-"
                              )
                            ) : (
                              "-"
                            )}
                          </label>
                        </Box>

                        <Box mb={0.2}>
                          <label>
                            <b>Date : </b>{" "}
                            <span className={classes.span}>
                              {moment(approvedDate).format("DD/MM/YYYY")}
                            </span>
                          </label>
                        </Box>
                      </Box>
                    </div>
                  </div>
                  <Grid
                    container
                    style={{ paddingBottom: 10 }}
                    direction="column"
                  >
                    <Grid item>
                      <Box className={classes.sectionHeader}>
                        CLIENT PICTURES
                      </Box>
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

                  <SuitTrouserMeasurments
                    title="SUIT TROUSER MEASUREMENTS"
                    measurments={measurments}
                  />
                </>
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
                {note}
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
  );
};

export default ViewComponent;
