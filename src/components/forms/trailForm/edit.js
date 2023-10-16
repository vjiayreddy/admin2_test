import React, { Fragment, useState, useEffect } from "react";
import useStyles from "./styles";
import dynamic from "next/dynamic";
import moment from "moment";
import {
  Grid,
  Box,
  Button,
  TableRow,
  Typography,
  Divider,
  Dialog,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import CloseIcon from "@material-ui/icons/Close";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { initialConfig, resetTrailFormData } from "../../../services/_trail";
import {
  _resetBasicUserData,
  _handleOrderCalculation,
  _getFinalOrderPayload,
  _resetOrderPayload,
  _updateProductTrailDates,
} from "../../../services/orderAutoSave";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { useRouter } from "next/router";
import _ from "lodash";
import { extractDateFormate } from "../../../utils/validations";
import ReactPlayer from "react-player";

// Apollo
import {
  UPDATE_ORDER_TRIAL_BY_ID,
  GET_ORDER_TRIAL_IMAGE_PATH,
  GET_ORDER_TRIAL_BY_ID,
} from "../../../apollo/queries/trialForm";
import { GET_USER_MEASURMENTS } from "../../../apollo/queries/measurments";

import { useLazyQuery, useMutation } from "@apollo/client";
import SelectDropDown from "../../Ui/formFields/SelectDropdown";
import BlazerMeasurments from "../../Ui/viewMeasurments/blazerMeasurments";
import ShirtMeasurments from "../../Ui/viewMeasurments/shirtMeasurments";
import TrouserMeasurments from "../../Ui/viewMeasurments/touserMeasurments";
import ChinosMeasurments from "../../Ui/viewMeasurments/chinosMeasurments";
import JodhpuriMeasurments from "../../Ui/viewMeasurments/jodhpuriMeasurment";
import KurtaMeasurments from "../../Ui/viewMeasurments/kurtaMeasurements";
import SadriMeasurments from "../../Ui/viewMeasurments/sadariMeasurements";
import WaistcoatMeasurments from "../../Ui/viewMeasurments/waistcoat";
import SherwaniMeasurments from "../../Ui/viewMeasurments/sherwaniMeasurements";
import IndoWestrenMeasurments from "../../Ui/viewMeasurments/indowesturnMeaurement";
import SuitMeasurements from "../../Ui/viewMeasurments/suitMeasurements";
import DhotiMeasurments from "../../Ui/viewMeasurments/dhoti";
import ChudidarMeasurments from "../../Ui/viewMeasurments/chudidar";
import JootisMeasurments from "../../Ui/viewMeasurments/jootis";
import ShoesMeasurments from "../../Ui/viewMeasurments/shoes";
import PagdiMeasurments from "../../Ui/viewMeasurments/pagdi";
import PatiyalaMeasurments from "../../Ui/viewMeasurments/patiyala";
import PoonapantMeasurments from "../../Ui/viewMeasurments/poonapantMeasurements";
import SuitBlazerMeasurments from "../../Ui/viewMeasurments/suitBlazerMeasurement";
import SuitTrouserMeasurments from "../../Ui/viewMeasurments/suitTrouserMeasurement";

// UI
import InfoDialogComponent from "../../Ui/dialog/infoDialog";
import LoadingIndicatorComponent from "../../Ui/loading";
import OrderHeader from "./orderHeader";
import TextInputField from "../../Ui/formFields/TextInputField";
import ImageUpload, { UploadFileButton } from "../../Ui/upload";
import { uploadToS3, deleteS3dImage } from "../../../hooks/utils/s3Upload";
const UppyUpload = dynamic(() => import("../../Ui/uppy"), { ssr: false });

const EditTrialForm = (props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [video, setVideo] = useState(null);
  const [showUppy, setShowUppy] = useState(false);
  const [uploadType, setUploadType] = useState("IMAGES");
  const [uploadImage, setUploadImage] = useState();
  const [uploadedImages, setUploadImages] = useState([]);
  const [measurments, setMeasurments] = useState([]);
  const [formMeasurments, setFormMeasurments] = useState({});
  const [showMeasurmens, setShowMeasurments] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [orderIndex, setOrderItemIndex] = useState(0);
  const [catId, setCatId] = useState();
  const classes = useStyles();
  const { control, reset, getValues, register, setValue, handleSubmit } =
    useForm({
      mode: "all",
      defaultValues: {
        orderItems: [],
      },
    });
  const { fields } = useFieldArray({
    control,
    name: "orderItems",
  });
  const router = useRouter();

  const [
    GetOrderTrialById,
    { loading: loadingOrderTrail, data: { getOrderTrialById } = {} },
  ] = useLazyQuery(GET_ORDER_TRIAL_BY_ID, {
    onError(error) {
      alert("Something went wrong please try again");
    },
  });

  const [UpdateOrderTrial, { loading: UOToading }] = useMutation(
    UPDATE_ORDER_TRIAL_BY_ID,
    {
      onCompleted: () => {
        alert("Data saved successfully");
        delete router.query?.id;
        router.push({ pathname: "/trial", query: { ...router.query } });
      },
      onError: () => {
        alert("Something went wrong please try again...");
      },
    }
  );
  const [GetUploadOrderTrialProductMediaPath, { data: dataUOTPM }] =
    useLazyQuery(GET_ORDER_TRIAL_IMAGE_PATH, {
      fetchPolicy: "network-only",
    });

  const checkError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? classes.errorInput : "";
  };

  useEffect(async () => {
    if (!_.isEmpty(router.query.id)) {
      await GetOrderTrialById({
        variables: {
          orderTrialId: router.query.id,
        },
      });
    }
  }, [router]);

  useEffect(() => {
    if (!_.isEmpty(getOrderTrialById)) {
      reset(resetTrailFormData(getOrderTrialById));
    }
  }, [getOrderTrialById]);

  const [getSavedUserMeasurments, { data: dataGSUM, variables }] = useLazyQuery(
    GET_USER_MEASURMENTS,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (
          data?.getUserMeasurements[0] !== null &&
          data?.getUserMeasurements
        ) {
          const { getUserMeasurements } = dataGSUM;
          const options = getUserMeasurements[0]?.options
            ? getUserMeasurements[0].options
            : getUserMeasurements[1].options;

          setMeasurments(options);
          setShowMeasurments(true);
        } else {
          window.open(
            `/measurements?tabIndex=2&&uid=${getOrderTrialById.user._id}&&catId=${variables.catId}`,
            "_blank"
          );
        }
      },
      onError: (error) => {
        window.open(
          `/measurements?tabIndex=2&&uid=${getOrderTrialById.user._id}&&catId=${variables.catId}`,
          "_blank"
        );
      },
    }
  );

  const onsubmit = async (data) => {
    let products = [];
    if (!_.isEmpty(data.orderItems)) {
      data.orderItems.map((item) => {
        products.push({
          name: item.name,
          itemNumber: item.itemNumber,
          catId: !_.isEmpty(item.catId) ? item.catId : null,
          trialNote: item.trialNote,
          trialVideoLink: null,
          fabricImageLink: !_.isEmpty(item?.fabricImageLink)
            ? item.fabricImageLink
            : null,
            trialVideoLink: !_.isEmpty(item?.trialVideoLink)
            ? item?.trialVideoLink
            : null,
          trialImageLinks: !_.isEmpty(item.trialImageLinks)
            ? JSON.parse(item.trialImageLinks)
            : [],
        });
      });
    }

    const payload = {
      orderId: getOrderTrialById.orderId,
      userId: getOrderTrialById.user._id,
      stylistId: getOrderTrialById.stylistId,
      trialDate: extractDateFormate(data.trialDate),
      trialStatus: data.trialStatus,
      trialBy: data.trialBy,
      trialDecision: data.trialDecision,
      trialRating: data.trialRating,
      measurementStatus: data.measurementStatus,
      trialByIds: [],
      note: data.note,
      deliveryDate: extractDateFormate(data.deliveryDate),
      products: products,
    };
    await UpdateOrderTrial({
      variables: {
        orderTrialId: router.query.id,
        orderTrial: payload,
      },
    });
  };

  // useEffect(() => {
  //   if (!_.isEmpty(dataUOTPM)) {
  //     setIsUploading(true);
  //     const { dirName, imageName } =
  //       dataUOTPM.getUploadOrderTrialProductMediaPath;
  //     const rand = 1 + Math.random() * (1000 - 1);
  //     const _imgName = Math.ceil(rand) + imageName;
  //     uploadToS3(dirName, _imgName, selectedFile)
  //       .then((response) => {
  //         setIsUploading(false);
  //         const _uploadedImages = [...uploadedImages];
  //         if (response.status === 204) {
  //           setUploadImages([..._uploadedImages, response.location]);
  //         }
  //       })
  //       .catch((error) => {
  //         setIsUploading(false);
  //         alert("Something went wrong please try again..");
  //       });
  //   }
  // }, [dataUOTPM]);

  const handleDeleteS3Image = (imageUrl) => {
    const imageName = imageUrl.replace(
      `https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3-${process.env.NEXT_PUBLIC_REGION}.amazonaws.com/Images/MPFUserImages_2.0/${getOrderTrialById.storeProductOrder.orderNo}/`,
      ""
    );
    deleteS3dImage("Images/MPFUserImages_2.0/", imageName)
      .then((response) => {
        if (response.status === 204) {
          alert("Image deleted successfully");
          const _remainingImages = uploadedImages.filter(function (item) {
            return item !== imageUrl;
          });
          setUploadImages(_remainingImages);
        }
      })
      .catch((error) => {
        alert("Something went wrong please try again...");
        console.log(error);
      });
  };

  useEffect(() => {
    var target = {};
    if (measurments) {
      measurments.forEach((key) => {
        target[key.name] = `${key.value}`;
        target[key.name + "_size"] = "0";
      });
    }
    setFormMeasurments(target);
  }, [measurments]);

  return (
    <Fragment>
      <OrderHeader
        title={"Edit Trial Form"}
        btnTitle="Print"
        onClick={() => {}}
      />
      {loadingOrderTrail ? (
        <LoadingIndicatorComponent height={500} />
      ) : (
        <Fragment>
          <Grid
            style={{ backgroundColor: "white" }}
            container
            spacing={1}
            className={classes.orderFormGrid}
            direction="row"
          >
            {getOrderTrialById && (
              <Grid item xs={12}>
                <Box mb={5}>
                  <Box>
                    <span
                      className={classes.formLabel}
                      style={{ marginBottom: 2 }}
                    >
                      Client Name: {getOrderTrialById.user.firstName}{" "}
                      {getOrderTrialById.user.lastName}
                    </span>
                  </Box>
                  <Box>
                    <span
                      className={classes.formLabel}
                      style={{ marginBottom: 2 }}
                    >
                      OrderNo: {getOrderTrialById.storeProductOrder.orderNo}
                    </span>
                  </Box>
                  <Box>
                    <span
                      className={classes.formLabel}
                      style={{ marginBottom: 2 }}
                    >
                      Order Date:{" "}
                      {moment(
                        getOrderTrialById?.storeProductOrder?.orderDate
                          ?.timestamp
                      ).format("DD-MMM-YYYY")}
                    </span>
                  </Box>
                  <Box>
                    <span
                      className={classes.formLabel}
                      style={{ marginBottom: 2 }}
                    >
                      Order Trial Date:{" "}
                      {moment(
                        getOrderTrialById?.storeProductOrder?.trialDate
                          ?.timestamp
                      ).format("DD-MMM-YYYY")}
                    </span>
                  </Box>
                  <Box>
                    <span
                      className={classes.formLabel}
                      style={{ marginBottom: 2 }}
                    >
                      {getOrderTrialById?.storeProductOrder?.stylist?.length >
                        0 && (
                        <>
                          Stylist:{" "}
                          {getOrderTrialById?.storeProductOrder.stylist[0].name}
                        </>
                      )}
                    </span>
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <div className="orderFormTable">
                <table className="table">
                  <tr style={{ backgroundColor: "cornsilk" }}>
                    {initialConfig.trailTable.map((item, index) => (
                      <td
                        style={{ paddingLeft: 10, textAlign: "center" }}
                        key={index}
                      >
                        {item}
                      </td>
                    ))}
                  </tr>

                  <tbody style={{ textAlign: "center" }}>
                    {fields.map((item, index) => (
                      <TableRow key={item.id}>
                        <input
                          type="hidden"
                          ref={register()}
                          name={`orderItems[${index}].name`}
                          value={item.name}
                        />
                        <input
                          type="hidden"
                          ref={register()}
                          name={`orderItems[${index}].catId`}
                          value={item.catId}
                        />
                        <input
                          type="hidden"
                          ref={register()}
                          name={`orderItems[${index}].itemNumber`}
                          value={item.itemNumber}
                        />
                        <input
                          type="hidden"
                          ref={register()}
                          name={`orderItems[${index}].fabricImageLink`}
                          value={item.fabricImageLink}
                        />
                        <input
                          type="hidden"
                          ref={register()}
                          name={`orderItems[${index}].trialVideoLink`}
                          value={item.trialVideoLink}
                        />

                        <td>{item.name}</td>
                        <td classes={{ root: classes.tableCellRoot }}>
                          {item.itemNumber}
                        </td>
                        <td>
                          {item?.fabricImageLink && (
                            <img
                              src={item?.fabricImageLink}
                              width={75}
                              height={75}
                            />
                          )}
                        </td>
                        <td classes={{ root: classes.tableCellRoot }}>
                          <textarea
                            ref={register({
                              required: {
                                value: false,
                                message: "",
                              },
                            })}
                            style={{
                              width: "100%",
                              whiteSpace: "pre-line",
                              wordWrap: "break-word",
                            }}
                            defaultValue={item.trialNote}
                            multiline={true}
                            name={`orderItems[${index}].trialNote`}
                            placeholder="Trail Note"
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        </td>
                        <td classes={{ root: classes.tableCellRoot }}>
                          <input
                            type="hidden"
                            ref={register()}
                            name={`orderItems[${index}].trialImageLinks`}
                            value={item.trialImageLinks}
                          />

                          {item.trialImageLinks && (
                            <>
                              <Button
                                style={{ marginRight: 10 }}
                                onClick={() => {
                                  setUploadType("IMAGES");
                                  if (!_.isEmpty(item.trialImageLinks)) {
                                    if (
                                      !_.isEmpty(
                                        JSON.parse(item.trialImageLinks)
                                      )
                                    ) {
                                      setUploadImages([
                                        ...JSON.parse(item.trialImageLinks),
                                      ]);
                                    }
                                  }
                                  setUploadImage(true);
                                }}
                                color="secondary"
                              >
                                <VisibilityIcon />
                              </Button>
                            </>
                          )}

                          <Button
                            onClick={() => {
                              setOrderItemIndex(index);
                              setUploadType("IMAGES");
                              setUploadImages([]);
                              if (!_.isEmpty(item.trialImageLinks)) {
                                if (
                                  !_.isEmpty(JSON.parse(item.trialImageLinks))
                                ) {
                                  setUploadImages([
                                    ...JSON.parse(item.trialImageLinks),
                                  ]);
                                }
                              }
                              setShowUppy(true);
                            }}
                          >
                            <CloudUploadIcon />
                          </Button>
                        </td>
                        <td classes={{ root: classes.tableCellRoot }}>
                          {item.trialVideoLink && (
                            <>
                              <Button
                                style={{ marginRight: 10 }}
                                onClick={() => {
                                  setUploadType("VIDEO");
                                  setVideo(item.trialVideoLink);
                                  setUploadImage(true);
                                }}
                                color="secondary"
                              >
                                <PlayCircleOutlineIcon />
                              </Button>
                            </>
                          )}
                          <Button
                            onClick={() => {
                              setOrderItemIndex(index);
                              setUploadType("VIDEO");
                              setShowUppy(true);
                            }}
                          >
                            <CloudUploadIcon />
                          </Button>
                        </td>
                        <td classes={{ root: classes.tableCellRoot }}>
                          <Button
                            onClick={async () => {
                              setCatId(item.catId);
                              await getSavedUserMeasurments({
                                variables: {
                                  page: 1,
                                  limit: 3,
                                  userId: getOrderTrialById.user._id,
                                  catId: item.catId,
                                },
                              });
                            }}
                          >
                            View
                          </Button>
                        </td>
                      </TableRow>
                    ))}
                  </tbody>
                </table>
              </div>
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}> Actual Trial Date</p>
              <Controller
                name={`trialDate`}
                control={control}
                setValue={setValue}
                defaultValue={moment(getOrderTrialById?.trialDate?.timestamp)}
                render={({ value, name }) => (
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      clearable
                      onChange={(date) => {
                        setValue(name, date);
                      }}
                      format="DD/MM/YYYY"
                      keyboardIcon={
                        <EventIcon classes={{ root: classes.icon }} />
                      }
                      value={value}
                    />
                  </MuiPickersUtilsProvider>
                )}
              ></Controller>
            </Grid>

            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Trial Status</p>
              <Controller
                control={control}
                name="trialStatus"
                defaultValue={getOrderTrialById?.trialStatus}
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    options={initialConfig.status}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Trial By</p>
              <TextInputField
                defaultValue={getOrderTrialById?.trialBy}
                inputRef={register({
                  required: {
                    value: false,
                  },
                })}
                name="trialBy"
                placeholder=""
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Final Delivery Date</p>
              <Controller
                name={`deliveryDate`}
                control={control}
                defaultValue={moment(
                  getOrderTrialById?.deliveryDate?.timestamp
                )}
                setValue={setValue}
                render={({ value, name }) => (
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      clearable
                      onChange={(date) => {
                        setValue(name, date);
                      }}
                      format="DD/MM/YYYY"
                      keyboardIcon={
                        <EventIcon classes={{ root: classes.icon }} />
                      }
                      value={value}
                    />
                  </MuiPickersUtilsProvider>
                )}
              ></Controller>
            </Grid>

            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Trial Decision</p>
              <Controller
                control={control}
                name="trialDecision"
                defaultValue={getOrderTrialById?.trialDecision}
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    options={initialConfig.trailDecision}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Trial Rating</p>
              <Controller
                control={control}
                name="trialRating"
                defaultValue={getOrderTrialById?.trialRating}
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    options={initialConfig.trailRating}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Measurement Status</p>
              <Controller
                control={control}
                name="measurementStatus"
                defaultValue={getOrderTrialById?.measurementStatus}
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    options={initialConfig.measurementsUpdated}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <p className={classes.formLabel}>Summary Note</p>
              <textarea
                ref={register({
                  required: {
                    value: false,
                    message: "",
                  },
                })}
                style={{
                  width: "100%",
                  whiteSpace: "pre-line",
                  wordWrap: "break-word",
                }}
                defaultValue={getOrderTrialById?.note}
                multiline={true}
                name="note"
                rows={10}
                placeholder="Trail Note"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
          </Grid>
          <Box p={2}>
            <Button
              style={{ marginRight: 10 }}
              onClick={handleSubmit(onsubmit)}
              disabled={UOToading}
            >
              Submit
            </Button>
          </Box>
        </Fragment>
      )}

      {/* <InfoDialogComponent
        open={uploadImage}
        maxWidth="md"
        onCloseModel={() => {
          const formValues = getValues();
          const orderItems = [...formValues.orderItems];
          const imagePath = !_.isEmpty(uploadedImages)
            ? JSON.stringify(uploadedImages)
            : null;
          orderItems[orderIndex]["trialImageLinks"] = imagePath;
          setValue("orderItems", orderItems);
          setUploadImages([]);
          setUploadImage(false);
        }}
      >
        <Box
          p={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 50,
          }}
        >
          <Typography variant="h6">Upload Image</Typography>
          <UploadFileButton
            onChange={async (imageList) => {
              setSelectedFile(imageList[0].file);
              const fileType = imageList[0].file.type;
              const extension = fileType.replace("image/", "");
              const getFormValues = getValues();
              const orderItems = getFormValues.orderItems;
              await GetUploadOrderTrialProductMediaPath({
                variables: {
                  storeOrderNo: `${getOrderTrialById.storeProductOrder.orderNo}`,
                  itemNumber: orderItems[orderIndex]["itemNumber"],
                  catName: orderItems[orderIndex]["name"],
                  extension: extension,
                },
              });
            }}
            btnTitle={`Upload Trial Image`}
            loading={isUploading}
            error={null}
          />
        </Box>
        <Divider />
        <Box p={0}>
          {uploadedImages.length > 0 && (
            <Box p={2}>
              <Grid container spacing={1}>
                {uploadedImages.map((item, index) => (
                  <Grid key={index} item xs={6} md={3} lg={3}>
                    <Box className={classes.imageCard}>
                      <img src={item} width="100%" />
                    </Box>
                    <Box>
                      <Button
                        onClick={() => {
                          handleDeleteS3Image(item);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </InfoDialogComponent> */}

      <InfoDialogComponent
        open={uploadImage}
        onCloseModel={() => {
          setUploadImage(false);
        }}
      >
        <Box
          p={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 50,
          }}
        >
          <Typography variant="h6">Upload Image</Typography>
        </Box>
        <Divider />
        {uploadType === "IMAGES" && (
          <Box p={0}>
            {uploadedImages.length > 0 && (
              <Box p={2}>
                <Grid container spacing={1}>
                  {uploadedImages.map((item, index) => (
                    <Grid key={index} item xs={6} md={3} lg={3}>
                      <Box className={classes.imageCard}>
                        <img src={item} width="100%" />
                      </Box>
                      <Box>
                        <Button
                          onClick={() => {
                            handleDeleteS3Image(item);
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            <Box mt={2}></Box>
          </Box>
        )}
        {uploadType === "VIDEO" && (
          <Box>
            <ReactPlayer controls={true} playing={true} url={video} />
          </Box>
        )}
      </InfoDialogComponent>

      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showMeasurmens}
        onClose={() => setShowMeasurments(false)}
      >
        {measurments && (
          <DialogContent classes={{ root: classes.modelContent }}>
            <Box pb={3}>
              {catId === "5da7220571762c2a58b27a68" && (
                <BlazerMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a65" && (
                <ShirtMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a67" && (
                <TrouserMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a6b" && (
                <ChinosMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a6c" && (
                <JodhpuriMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a6e" && (
                <KurtaMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a6d" && (
                <SadriMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a6a" && (
                <WaistcoatMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a70" && (
                <SherwaniMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a6f" && (
                <IndoWestrenMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a66" && (
                <>
                  <SuitBlazerMeasurments measurments={formMeasurments} />
                  <SuitTrouserMeasurments measurments={formMeasurments} />
                </>
              )}
              {catId === "6036451627e32d7fd776a580" && (
                <DhotiMeasurments measurments={formMeasurments} />
              )}
              {catId === "6036446927e32d7fd776a57f" && (
                <ChudidarMeasurments measurments={formMeasurments} />
              )}
              {catId === "5ebb993abcb3d23714b2ebf4" && (
                <ShoesMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a73" && (
                <JootisMeasurments measurments={formMeasurments} />
              )}
              {catId === "621a34485417ab1e143a5245" && (
                <PatiyalaMeasurments measurments={formMeasurments} />
              )}
              {catId === "5da7220571762c2a58b27a72" && (
                <PagdiMeasurments measurments={formMeasurments} />
              )}
              {catId === "636f3012feea0816508c5c45" && (
                <PoonapantMeasurments measurments={measurments} />
              )}
            </Box>

            <div className={classes.modelCloseIcon}>
              <IconButton onClick={() => setShowMeasurments(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <Box mt={3}>
              <Button
                onClick={() => {
                  window.open(
                    `/measurements?tabIndex=2&&uid=${getStoreOrderById.userId}&&catId=${variables.catId}`,
                    "_blank"
                  );
                }}
              >
                Update
              </Button>
            </Box>
          </DialogContent>
        )}
      </Dialog>

      {showUppy && (
        <Dialog maxWidth="lg" open={showUppy}>
          <DialogContent className={classes.dialogContentRoot}>
            <UppyUpload
              openModel={showUppy}
              maxNumberOfFiles={uploadType === "VIDEO" ? 1 : 4}
              allowedFileTypes={
                uploadType === "VIDEO"
                  ? [".mp4", ".wmv", ".mkv", ".webm"]
                  : null
              }
              path={`Images/MPFUserImages_2.0/${getOrderTrialById.storeProductOrder.orderNo}`}
              onComplete={(result) => {
                if (result?.successful) {
                  let imageLinks = [];
                  let s3Links = [];
                  const formValues = getValues();
                  const orderItems = [...formValues.orderItems];
                  if (uploadType === "IMAGES") {
                    result.successful.map((item) => {
                      s3Links.push(item.uploadURL);
                    });
                    if (Array.isArray(uploadedImages)) {
                      imageLinks = [...uploadedImages, ...s3Links];
                    }
                    const imagePath = !_.isEmpty(imageLinks)
                      ? JSON.stringify(imageLinks)
                      : null;
                    orderItems[orderIndex]["trialImageLinks"] = imagePath;
                    setValue("orderItems", orderItems);
                    setUploadImages([]);
                  }
                  if (uploadType === "VIDEO") {
                    orderItems[orderIndex]["trialVideoLink"] =
                      result.successful[0].uploadURL;
                    setValue("orderItems", orderItems);
                  }
                }
              }}
            />
            <div className={classes.closeIcon}>
              <IconButton onClick={() => setShowUppy(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Fragment>
  );
};

export default EditTrialForm;
