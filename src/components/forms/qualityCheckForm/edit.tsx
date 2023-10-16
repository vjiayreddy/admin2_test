import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import { useRouter } from "next/router";
import {
  GET_SINGLE_STORE_ORDERBY_ID,
  GET_STORE_PRODUCTS,
} from "../../../apollo/queries/orders";
import {
  CREATE_QUALITY_CHECK,
  GET_QUALITY_CHECK_ITEM,
  UPDATE_QUALITY_CHECK_ITEM,
} from "../../../apollo/queries/qualitycheck";
import { useLazyQuery, useMutation } from "@apollo/client";
import _ from "lodash";
import Chip from "@material-ui/core/Chip";
import InfoDialogComponent from "../../Ui/dialog/infoDialog";
import Box from "@material-ui/core/Box";
import { Divider, Typography, Checkbox, Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import StyleFormComponent from "../orderForm/styleForm";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import OrderHeader from "../orderForm/orderHeader";
import { GET_CATEGORY_MEASURMENTS } from "../../../apollo/queries/measurments";
import ViewShirtMeasurements from "./measurments/shirt";
import { CAT_IDS } from "../../../apollo/calculateMeasurments/utils";
import ViewTrouserMeasurements from "./measurments/trouser";
import ViewChinosMeasurements from "./measurments/chinos";
import ViewKurtaMeasurements from "./measurments/kurta";
import ViewBlazerMeasurements from "./measurments/blazer";
import ViewSherwaniMeasurements from "./measurments/sherwani";
import ViewJodhpuriMeasurements from "./measurments/jodhpuri";
import ViewIndowesternMeasurements from "./measurments/indowestern";
import ViewSadariMeasurements from "./measurments/sadari";
import ViewWaistcoatMeasurements from "./measurments/waistcoat";
import ViewPagadiMeasurements from "./measurments/pagadi";
import ViewJootiMeasurements from "./measurments/jooti";
import ViewPatiyalaMeasurements from "./measurments/patiyala";
import ViewShoesMeasurements from "./measurments/shoes";
import ViewChudidaarMeasurements from "./measurments/chudidar";
import ViewDhotiMeasurements from "./measurments/dhoti";
import ViewPunaPantMeasurements from "./measurments/punaPant";
import ViewSuitMeasurements from "./measurments/suit";
import Rating from "@material-ui/lab/Rating";
import { uploadToS3 } from "../../../hooks/utils/s3Upload";
import { GET_ORDER_TRIAL_IMAGE_PATH } from "../../../apollo/queries/trialForm";
import ImageUpload from "../../Ui/upload";

const _qualityCheckStatus = [
  {
    name: "",
    value: "NA",
  },
  {
    name: "APPROVED",
    value: "APPROVED",
  },
  {
    name: "ALTERATIONS",
    value: "ALTERATIONS",
  },
  {
    name: "DISCUSSION",
    value: "DISCUSSION",
  },
  {
    name: "REJECTED",
    value: "REJECTED",
  },
];

const QualityCheckForm = () => {
  const classes = useStyles();
  const [uploadImage, setUploadImage] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState();
  const [storeProducts, setStoreProducts] = useState<any>();
  const [userCatMeasurments, setUserCartMeasurments] = useState<any>();
  const [catId, setCatId] = useState<string | null | undefined>("");
  const [qualityCheckStatus, setQualityCheckStatus] = useState("NA");
  const [openStylingForm, setOpenStylingForm] = useState(false);
  const [ironing, setIroning] = useState(false);
  const [measurments, setMeasurments] = useState(false);
  const [fabricColor, setFabricColor] = useState(false);
  const [designer, setDesigner] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [cleanliness, setCleanliness] = useState(false);
  const [ironingNote, setIroningNote] = useState("");
  const [measurmentsNote, setMeasurmentsNote] = useState("");
  const [qualitycheckNote, setQualitycheckNote] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fabricColorNote, setFabricColorNote] = useState("");
  const [designerNote, setDesignerNote] = useState("");
  const [finishingNote, setFinishingNote] = useState("");
  const [cleanlinessNote, setCleanlinessNote] = useState("");
  const [actualMeasurement, setActualMeasurement] = useState<any>();
  const [selectedMeasurments, setSelectedMeasurments] = useState<any>();
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const [openFabricDialog, setOpenFabricDialog] = useState<boolean>(false);
  const [openDesignerDialog, setOpenDesignerDialog] = useState<boolean>(false);
  const [openMeasurements, setOpenMeasurements] = useState<boolean>(false);
  const [orderItem, setOrderItem] = useState<any>();

  const [fabricRating, setFabricRating] = useState(0);
  const [stylingRating, setStylingRating] = useState(0);
  const [measurmentRating, setMeasurmentRating] = useState(0);
  const [ironPackageRating, setIronPackageRating] = useState(0);
  const [finishingRating, setFinishingRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);

  const [GetUploadOrderTrialProductMediaPath, { data: dataUOTPM }] =
    useLazyQuery(GET_ORDER_TRIAL_IMAGE_PATH, {
      fetchPolicy: "network-only",
    });
  const [getCategoryMeasurments, { data: dataUCM }] = useLazyQuery(
    GET_CATEGORY_MEASURMENTS,
    {
      fetchPolicy: "network-only",
    }
  );

  const [GetOrderQualityCheckById, { data: dataGOQC }] = useLazyQuery(
    GET_QUALITY_CHECK_ITEM,
    {
      fetchPolicy: "network-only",
    }
  );

  const [UpdateOrderQualityCheck, { loading: loadingUOC }] = useMutation(
    UPDATE_QUALITY_CHECK_ITEM,
    {
      onCompleted: () => {
        alert("Updated successfully");
        router.back();
      },
      onError: () => {
        alert("Something went wrong please try again...");
      },
    }
  );

  const [
    getStoreProductAttributeMaster,
    { loading: loadingSPAM, data: dataSPAM },
  ] = useLazyQuery(GET_STORE_PRODUCTS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    getStoreProductAttributeMaster({
      variables: {
        filter: {
          masterName: "master_store_category",
        },
      },
    });
  }, []);

  useEffect(() => {
    if (dataSPAM?.getProductAttributeMaster) {
      let data = [];
      if (!_.isEmpty(dataSPAM?.getProductAttributeMaster)) {
        dataSPAM?.getProductAttributeMaster.map((item) => {
          data.push({
            name: item.name,
            value: item.name,
            catId: item.catId,
          });
        });
      }

      GetOrderQualityCheckById({
        variables: {
          orderQualityCheckId: router.query?.itemId,
        },
      });

      setStoreProducts(data);
    }
  }, [dataSPAM]);

  useEffect(() => {
    if (!_.isEmpty(dataUCM)) {
      const { getUserMeasurements } = dataUCM;
      if (!_.isEmpty(getUserMeasurements[0])) {
        const options = !_.isEmpty(getUserMeasurements[0].options)
          ? getUserMeasurements[0].options
          : getUserMeasurements[1].options;
        setUserCartMeasurments(options);
        setOpenMeasurements(true);
      } else {
        alert(
          "No Measurments found.Please add measurments for this category and try again... "
        );
      }
    }
  }, [dataUCM]);

  useEffect(() => {
    if (dataGOQC) {
      const { getOrderQualityCheckById } = dataGOQC;
      if (getOrderQualityCheckById) {
        setDesigner(getOrderQualityCheckById.design.check);
        setStylingRating(getOrderQualityCheckById.design.rating);
        setDesignerNote(getOrderQualityCheckById.design.note);
        setUploadedImage(getOrderQualityCheckById.productImage);
        setFabricColor(getOrderQualityCheckById.fabricAndColor.check);
        setFabricColorNote(getOrderQualityCheckById.fabricAndColor.note);
        setFabricRating(getOrderQualityCheckById.fabricAndColor.rating);
        setMeasurments(getOrderQualityCheckById.measurements.check);
        setMeasurmentsNote(getOrderQualityCheckById.measurements.note);
        setMeasurmentRating(getOrderQualityCheckById.measurements.rating);
        setFinishing(getOrderQualityCheckById.finishing.check);
        setFinishingNote(getOrderQualityCheckById.finishing.note);
        setFinishingRating(getOrderQualityCheckById.finishing.rating);
        setCleanliness(getOrderQualityCheckById.cleanliness.check);
        setCleanlinessNote(getOrderQualityCheckById.cleanliness.note);
        setCleanlinessRating(getOrderQualityCheckById.cleanliness.rating);
        setIroning(getOrderQualityCheckById.ironAndPackaging.check);
        setIroningNote(getOrderQualityCheckById.ironAndPackaging.note);
        setIronPackageRating(getOrderQualityCheckById.ironAndPackaging.rating);
        setQualityCheckStatus(getOrderQualityCheckById.qualityCheckStatus);
        setQualitycheckNote(getOrderQualityCheckById.qualityCheckNote);
        if (getOrderQualityCheckById?.actualMeasurement?.length > 0) {
          let measurments = {};
          getOrderQualityCheckById?.actualMeasurement.map((item) => {
            measurments[item.name] = item.value;
          });
          setSelectedMeasurments(measurments);
        }
      }
    }
  }, [dataGOQC]);

  const getCatId = () => {
    if (dataGOQC) {
      const findCatId = _.find(
        storeProducts,
        (item) => item.name === dataGOQC.getOrderQualityCheckById.name
      );
      if (findCatId) {
        return findCatId.catId;
      }
    }
    return null;
  };

  const getOrderItem = (itemNumber) => {
    if (dataGOQC) {
      const findCatId = _.find(
        dataGOQC?.getOrderQualityCheckById?.storeProductOrder?.orderItems,
        (item) => item.itemNumber === itemNumber
      );
      if (findCatId) {
        return findCatId;
      }
    }
    return null;
  };

  const onSubmit = () => {
    let _measurments = [];

    if (actualMeasurement) {
      for (var key in actualMeasurement) {
        if (actualMeasurement.hasOwnProperty(key)) {
          _measurments.push({
            name: key,
            value: Number(actualMeasurement[key]),
          });
        }
      }
    } else {
      const { getOrderQualityCheckById } = dataGOQC;
      if (getOrderQualityCheckById?.actualMeasurement?.length > 0) {
        _measurments = getOrderQualityCheckById?.actualMeasurement;
      }
    }

    const payload = {
      orderId: dataGOQC?.getOrderQualityCheckById.orderId,
      qualityCheckStatus: qualityCheckStatus,
      userId: dataGOQC?.getOrderQualityCheckById.userId,
      stylistId: dataGOQC?.getOrderQualityCheckById.stylistId || null,
      itemNumber: dataGOQC?.getOrderQualityCheckById?.itemNumber,
      catId: getCatId(),
      name: dataGOQC?.getOrderQualityCheckById?.itemName,
      qualityCheckNote: qualitycheckNote,
      fabricAndColor: {
        note: fabricColorNote,
        check: fabricColor,
        rating: Number(fabricRating),
      },
      design: {
        note: designerNote,
        check: designer,
        rating: Number(stylingRating),
      },
      measurements: {
        note: measurmentsNote,
        check: measurments,
        rating: Number(measurmentRating),
      },
      ironAndPackaging: {
        note: ironingNote,
        check: ironing,
        rating: Number(ironPackageRating),
      },
      finishing: {
        note: finishingNote,
        check: finishing,
        rating: Number(finishingRating),
      },
      cleanliness: {
        note: cleanlinessNote,
        check: cleanliness,
        rating: Number(cleanlinessRating),
      },
      actualMeasurement: _measurments.length <= 0 ? null : _measurments,
      productImage: uploadedImage,
    };

    UpdateOrderQualityCheck({
      variables: {
        orderQualityCheckId: router?.query?.itemId,
        orderQualityCheck: payload,
      },
    });
  };

  useEffect(() => {
    if (dataUOTPM) {
      setIsUploading(true);
      const { dirName, imageName } =
        dataUOTPM.getUploadOrderTrialProductMediaPath;
      const rand = 1 + Math.random() * (1000 - 1);
      const _imgName = "qc_module" + Math.ceil(rand) + imageName;
      uploadToS3(dirName, _imgName, selectedFile)
        .then((response: any) => {
          setIsUploading(false);
          if (response.status === 204) {
            setUploadedImage(response.location);
            alert("Saved Image successfully");
            setUploadImage(false);
          }
        })
        .catch((error) => {
          setIsUploading(false);
          alert("Something went wrong please try again..");
        });
    }
  }, [dataUOTPM]);

  useEffect(() => {
    if (dataGOQC) {
      const { getOrderQualityCheckById } = dataGOQC;
      const _findItem = _.find(
        getOrderQualityCheckById.storeProductOrder.orderItems,
        (item) => item.itemNumber === router.query.itemNumber
      );
      if (_findItem) {
        setOrderItem(_findItem);
      }
    }
  }, [dataGOQC]);

  return (
    <Fragment>
      {dataGOQC && (
        <OrderHeader
          title={`Product(${dataGOQC?.getOrderQualityCheckById?.itemNumber})`}
          btnTitle="Share"
          onClick={() => {}}
        />
      )}

      <Grid
        style={{ backgroundColor: "white" }}
        container
        spacing={1}
        className={classes.orderFormGrid}
        direction="row"
      >
        {dataGOQC?.getOrderQualityCheckById && (
          <Grid xs={12}>
            <div className="orderFormTable">
              <p style={{ marginTop: 0, marginBottom: 2 }}>
                Client Name:{" "}
                {
                  dataGOQC?.getOrderQualityCheckById?.storeProductOrder
                    ?.customerFirstName
                }{" "}
                {
                  dataGOQC?.getOrderQualityCheckById?.storeProductOrder
                    ?.customerLastName
                }
              </p>
              <p style={{ marginTop: 0, marginBottom: 2 }}>
                Product No: {dataGOQC?.getOrderQualityCheckById?.itemNumber}
              </p>
              <p style={{ marginTop: 0, marginBottom: 2 }}>
                Order No:{" "}
                {dataGOQC?.getOrderQualityCheckById?.storeProductOrder.orderNo}
              </p>
              <p style={{ marginTop: 0, marginBottom: 2 }}>
                Order Date:{" "}
                {moment(
                  dataGOQC?.getOrderQualityCheckById?.storeProductOrder
                    ?.orderDate?.timestamp
                ).format("DD-MM-YYYY") || ""}
              </p>
              <p style={{ marginTop: 0, marginBottom: 25 }}>
                Trial Date:{" "}
                {moment(
                  dataGOQC?.getOrderQualityCheckById?.storeProductOrder
                    ?.trialDate?.timestamp
                ).format("DD-MM-YYYY") || ""}
              </p>

              <table className="table">
                <tr style={{ backgroundColor: "cornsilk" }}>
                  <td>Quality Check</td>
                  <td>Completed</td>
                  <td>Rating</td>
                  <td>Note</td>
                </tr>

                <tbody>
                  <tr>
                    <td>
                      <Chip
                        deleteIcon={<HelpOutlineRoundedIcon />}
                        onDelete={() => {
                          return;
                        }}
                        onClick={() => {
                          setOpenFabricDialog(true);
                        }}
                        color="secondary"
                        label="Fabric and Color"
                      />
                    </td>
                    <td>
                      <Checkbox
                        name="fabricColorChecked"
                        checked={fabricColor}
                        onChange={(e, checked) => {
                          setFabricColor(checked);
                        }}
                      />
                    </td>
                    <td>
                      <Rating
                        //name="fabricRating"
                        onChange={(event, newValue) => {
                          setFabricRating(newValue);
                        }}
                        value={fabricRating}
                      />
                    </td>
                    <td>
                      <textarea
                        value={fabricColorNote}
                        onChange={(e) => {
                          setFabricColorNote(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Chip
                        deleteIcon={<HelpOutlineRoundedIcon />}
                        onDelete={() => {
                          return;
                        }}
                        onClick={() => {
                          setCatId(getCatId());
                          setOpenStylingForm(true);
                        }}
                        color="secondary"
                        label="Styling Form"
                      />

                      <Chip
                        deleteIcon={<HelpOutlineRoundedIcon />}
                        onDelete={() => {
                          return;
                        }}
                        onClick={() => {
                          setOpenDesignerDialog(true);
                        }}
                        color="secondary"
                        label="Designer Image"
                      />
                    </td>
                    <td>
                      <Checkbox
                        name="designer"
                        checked={designer}
                        onChange={(e, checked) => {
                          setDesigner(checked);
                        }}
                      />
                    </td>
                    <td>
                      <Rating
                        name="designerRating"
                        onChange={(event, newValue) => {
                          setStylingRating(newValue);
                        }}
                        value={stylingRating}
                      />
                    </td>
                    <td>
                      <textarea
                        value={designerNote}
                        onChange={(e) => {
                          setDesignerNote(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Chip
                        deleteIcon={<HelpOutlineRoundedIcon />}
                        onClick={() => {
                          getCategoryMeasurments({
                            variables: {
                              page: 1,
                              limit: 3,
                              userId: dataGOQC?.getOrderQualityCheckById.userId,
                              catId: getCatId(),
                            },
                          });
                        }}
                        onDelete={() => {}}
                        color="secondary"
                        label="Measurements"
                      />
                    </td>
                    <td>
                      <Checkbox
                        name="Measurements"
                        checked={measurments}
                        onChange={(e, checked) => {
                          setMeasurments(checked);
                        }}
                      />
                    </td>
                    <td>
                      <Rating
                        name="measurmentRating"
                        onChange={(event, newValue) => {
                          setMeasurmentRating(newValue);
                        }}
                        value={measurmentRating}
                      />
                    </td>
                    <td>
                      <textarea
                        value={measurmentsNote}
                        onChange={(e) => {
                          setMeasurmentsNote(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Chip color="secondary" label="Ironing and Package" />
                    </td>
                    <td>
                      <Checkbox
                        name="ironing"
                        checked={ironing}
                        onChange={(e, checked) => {
                          setIroning(checked);
                        }}
                      />
                    </td>
                    <td>
                      <Rating
                        name="ironingRating"
                        onChange={(event, newValue) => {
                          setIronPackageRating(newValue);
                        }}
                        value={ironPackageRating}
                      />
                    </td>
                    <td>
                      <textarea
                        value={ironingNote}
                        onChange={(e) => {
                          setIroningNote(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Chip color="secondary" label="Finishing" />
                    </td>
                    <td>
                      <Checkbox
                        name="finishing"
                        checked={finishing}
                        onChange={(e, checked) => {
                          setFinishing(checked);
                        }}
                      />
                    </td>
                    <td>
                      <Rating
                        name="finishingRating"
                        onChange={(event, newValue) => {
                          setFinishingRating(newValue);
                        }}
                        value={finishingRating}
                      />
                    </td>
                    <td>
                      <textarea
                        value={finishingNote}
                        onChange={(e) => {
                          setFinishingNote(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Chip color="secondary" label="Cleanliness" />
                    </td>
                    <td>
                      <Checkbox
                        name="cleanliness"
                        checked={cleanliness}
                        onChange={(e, checked) => {
                          setCleanliness(checked);
                        }}
                      />
                    </td>
                    <td>
                      <Rating
                        name="cleanliness"
                        onChange={(event, newValue) => {
                          setCleanlinessRating(newValue);
                        }}
                        value={cleanlinessRating}
                      />
                    </td>
                    <td>
                      <textarea
                        value={cleanlinessNote}
                        onChange={(e) => {
                          setCleanlinessNote(e.target.value);
                        }}
                        style={{ width: "100%" }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Grid>
        )}

        <Grid xs={12}>
          <p>Upload Image:</p>
          <Box style={{ height: 150, width: 150, backgroundColor: "#EEEEEE" }}>
            <img
              width={150}
              height={150}
              src={uploadedImage as string | "/images/upload.png"}
            />
          </Box>
          <Box>
            <Button
              onClick={() => {
                setUploadImage(true);
              }}
            >
              Upload
            </Button>
          </Box>
        </Grid>

        <Grid xs={12}>
          <p>Status:</p>
          <select
            style={{ height: 40 }}
            onChange={async (e) => {
              setQualityCheckStatus(e.target.value);
            }}
          >
            {_qualityCheckStatus.map((item, index) => (
              <option
                key={index}
                selected={qualityCheckStatus === item.value}
                value={item.value}
              >
                {item.name}
              </option>
            ))}
          </select>
        </Grid>
        <Grid xs={12}>
          <p>Note:</p>
          <textarea
            value={qualitycheckNote}
            onChange={(e) => {
              setQualitycheckNote(e.target.value);
            }}
            rows={6}
            style={{ width: "100%", padding: 10 }}
          />
        </Grid>

        <Grid xs={12}>
          <Button disabled={loadingUOC} onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <InfoDialogComponent
        onCloseModel={() => {
          setOpenFabricDialog(false);
        }}
        open={openFabricDialog}
      >
        <Box p={2}>
          <Typography gutterBottom>
            Fabric Image
            {getOrderItem(dataGOQC?.getOrderQualityCheckById?.itemNumber)
              ?.itemColor
              ? ` - Color(${orderItem?.itemColor})`
              : ""}
          </Typography>
          <Divider />
          <Box mt={2}>
            <img
              alt="fabric-image"
              width={200}
              src={
                getOrderItem(dataGOQC?.getOrderQualityCheckById?.itemNumber)
                  ?.fabricImage
              }
            />
          </Box>
        </Box>
      </InfoDialogComponent>

      <InfoDialogComponent
        onCloseModel={() => {
          setOpenDesignerDialog(false);
        }}
        open={openDesignerDialog}
      >
        <Box p={2}>
          <Typography gutterBottom>Designer Image</Typography>
          <Divider />
          <Box mt={2}>
            <img
              alt="designer-image"
              width={200}
              src={
                getOrderItem(dataGOQC?.getOrderQualityCheckById?.itemNumber)
                  ?.styleDesignImage
              }
            />
          </Box>
        </Box>
      </InfoDialogComponent>

      <InfoDialogComponent
        onCloseModel={() => {
          setOpenStylingForm(false);
        }}
        open={openStylingForm}
        maxWidth="lg"
      >
        <StyleFormComponent
          catId={catId}
          showSubmitButton={false}
          selectedFormData={orderItem}
          onSubmit={(data, note) => {}}
        />
      </InfoDialogComponent>

      {/* <InfoDialogComponent
        onCloseModel={() => {
          setOpenMeasurements(false);
        }}
        open={openMeasurements}
        maxWidth="md"
      >
        {storeProducts && (
          <>
            {getCatId() === CAT_IDS.SHIRT_CAT_ID && (
              <ViewShirtMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(false);
                }}
                enteredValues={actualMeasurement}
                data={userCatMeasurments}
              />
            )}
          </>
        )}
      </InfoDialogComponent> */}

      <InfoDialogComponent
        onCloseModel={() => {
          setOpenMeasurements(false);
        }}
        open={openMeasurements}
        maxWidth="md"
      >
        {storeProducts && (
          <>
            {getCatId() === CAT_IDS.SHIRT_CAT_ID && (
              <ViewShirtMeasurements
                onClick={(data) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(false);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}

            {getCatId() === CAT_IDS.SUIT_CAT_ID && (
              <ViewSuitMeasurements
                onClick={(data) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(false);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}

            {getCatId() === CAT_IDS.TROUSER_CAT_ID && (
              <ViewTrouserMeasurements
                onClick={(data) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(false);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}

            {getCatId() === CAT_IDS.CHINOS_CAT_ID && (
              <ViewChinosMeasurements
                onClick={(data) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}

            {getCatId() === CAT_IDS.BLAZER_CAT_ID && (
              <ViewBlazerMeasurements
                onClick={(data) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
            {getCatId() === CAT_IDS.KURTA_CAT_ID && (
              <ViewKurtaMeasurements
                onClick={(data) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(false);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
            {getCatId() === CAT_IDS.SHERWANI_CAT_ID && (
              <ViewSherwaniMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
            {getCatId() === CAT_IDS.JODHPURI_CAT_ID && (
              <ViewJodhpuriMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
            {getCatId() === CAT_IDS.INDOWESTERN_CAT_ID && (
              <ViewIndowesternMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}

            {getCatId() === CAT_IDS.SADRI_CAT_ID && (
              <ViewSadariMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}

            {getCatId() === CAT_IDS.WAISTCOAT_CAT_ID && (
              <ViewWaistcoatMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
            {getCatId() === CAT_IDS.POONAPANT_CAT_ID && (
              <ViewPunaPantMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
            {getCatId() === CAT_IDS.JUTTIS_CAT_ID && (
              <ViewJootiMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
            {getCatId() === CAT_IDS.PAGDIS_CAT_ID && (
              <ViewPagadiMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
            {getCatId() === CAT_IDS.PATYALA_CAT_ID && (
              <ViewPatiyalaMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
            {getCatId() === CAT_IDS.CHUDIDAR_CAT_ID && (
              <ViewChudidaarMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
            {getCatId() === CAT_IDS.SHOES_CAT_ID && (
              <ViewShoesMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
            {getCatId() === CAT_IDS.DHOTI_CAT_ID && (
              <ViewDhotiMeasurements
                onClick={({ data }) => {
                  setActualMeasurement(data);
                  setOpenMeasurements(true);
                }}
                enteredValues={selectedMeasurments}
                data={userCatMeasurments}
              />
            )}
          </>
        )}
      </InfoDialogComponent>
      <InfoDialogComponent
        open={uploadImage}
        maxWidth="md"
        onCloseModel={() => {
          setUploadImage(false);
        }}
      >
        <Box p={1}>
          <Typography variant="h6">
            Upload Image
            {/* {selectItem && `(${selectItem.itemName}-${selectItem.itemNumber})`} */}
          </Typography>
        </Box>
        <Divider />
        <Box p={0}>
          <ImageUpload
            onChange={async (imageList) => {
              setSelectedFile(imageList[0].file);
              const fileType = imageList[0].file.type;
              const extension = fileType.replace("image/", "");
              await GetUploadOrderTrialProductMediaPath({
                variables: {
                  storeOrderNo: `${dataGOQC?.getOrderQualityCheckById?.storeProductOrder.orderNo}`,
                  itemNumber: dataGOQC?.getOrderQualityCheckById?.itemName,
                  catName: dataGOQC?.getOrderQualityCheckById?.name,
                  extension: extension,
                },
              });
            }}
            imgUrl={"/images/upload.png"}
            imgWidth={"100%"}
            imgHeight={"100%"}
            server={false}
            btnTitle={`Upload Quality Check image`}
            loading={isUploading}
            onDelete={() => {}}
            id={undefined}
            image={undefined}
            imageTitle={undefined}
            onClickImage={undefined}
            error={undefined}
          />

          <Box mt={2}></Box>
        </Box>
      </InfoDialogComponent>
    </Fragment>
  );
};

export default QualityCheckForm;
