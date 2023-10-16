import React, { Fragment, useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../../../src/components/forms/qualityCheckForm/styles";
import { useRouter } from "next/router";
import {
  GET_SINGLE_STORE_ORDERBY_ID,
  GET_STORE_PRODUCTS,
} from "../../../src/apollo/queries/orders";
import {
  CREATE_QUALITY_CHECK,
  GET_QUALITY_CHECK_ITEM,
  UPDATE_QUALITY_CHECK_ITEM,
} from "../../../src/apollo/queries/qualitycheck";
import { useLazyQuery, useMutation } from "@apollo/client";
import _ from "lodash";
import Chip from "@material-ui/core/Chip";
import InfoDialogComponent from "../../../src/components/Ui/dialog/infoDialog";
import Box from "@material-ui/core/Box";
import { Divider, Typography, Checkbox, Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import StyleFormComponent from "../../../src/components/forms/orderForm/styleForm";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import OrderHeader from "../../../src/components/forms/orderForm/orderHeader";
import { GET_CATEGORY_MEASURMENTS } from "../../../src/apollo/queries/measurments";
import ViewShirtMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/shirt";
import { CAT_IDS } from "../../../src/apollo/calculateMeasurments/utils";
import ViewTrouserMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/trouser";
import ViewChinosMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/chinos";
import ViewKurtaMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/kurta";
import ViewBlazerMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/blazer";
import ViewSherwaniMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/sherwani";
import ViewJodhpuriMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/jodhpuri";
import ViewIndowesternMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/indowestern";
import ViewSadariMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/sadari";
import ViewWaistcoatMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/waistcoat";
import ViewPunaPantMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/punaPant";
import ViewChudidaarMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/chudidar";
import ViewPatiyalaMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/patiyala";
import ViewJootiMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/jooti";
import ViewShoesMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/shoes";
import ViewPagadiMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/pagadi";
import ViewSuitMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/suit";
import ViewDhotiMeasurements from "../../../src/components/forms/qualityCheckForm/measurments/dhoti";
import AdminLayoutComponent from "../../../src/components/layouts/AdminLayout";
import { nonAuthenticated } from "../../../src/apollo/hoc/withAuthRedirect";
import ReactToPrint from "react-to-print";

const _qualityCheckStatus = [
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

const QualityViewForm = (props: any) => {
  const classes = useStyles();
  const { session } = props;
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

  const [fabricRating, setFabricRating] = useState(0);
  const [stylingRating, setStylingRating] = useState(0);
  const [measurmentRating, setMeasurmentRating] = useState(0);
  const [ironPackageRating, setIronPackageRating] = useState(0);
  const [finishingRating, setFinishingRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);

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
  const componentRef = useRef();

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
      if (!_.isEmpty(getUserMeasurements)) {
        const options = !_.isEmpty(getUserMeasurements[0].options)
          ? getUserMeasurements[0].options
          : getUserMeasurements[1].options;
        setUserCartMeasurments(options);
        setOpenMeasurements(true);
      }
    }
  }, [dataUCM]);

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

  useEffect(() => {
    if (dataGOQC) {
      const { getOrderQualityCheckById } = dataGOQC;
      if (getOrderQualityCheckById) {
        if (getCatId()) {
          getCategoryMeasurments({
            variables: {
              page: 1,
              limit: 3,
              userId: getOrderQualityCheckById.userId,
              catId: getCatId(),
            },
          });
        }

        setDesignerNote(getOrderQualityCheckById.design.note);
        setDesigner(getOrderQualityCheckById.design.check);
        setStylingRating(getOrderQualityCheckById.design.rating);
        setFabricRating(getOrderQualityCheckById.fabricAndColor.rating);
        setFinishingRating(getOrderQualityCheckById.finishing.rating);
        setCleanlinessRating(getOrderQualityCheckById.cleanliness.rating);
        setIronPackageRating(getOrderQualityCheckById.ironAndPackaging.rating);
        setMeasurmentRating(getOrderQualityCheckById.measurements.rating);
        setDesignerNote(getOrderQualityCheckById.design.note);
        setFabricColor(getOrderQualityCheckById.fabricAndColor.check);
        setFabricColorNote(getOrderQualityCheckById.fabricAndColor.note);
        setMeasurments(getOrderQualityCheckById.measurements.check);
        setMeasurmentsNote(getOrderQualityCheckById.measurements.note);
        setFinishing(getOrderQualityCheckById.finishing.check);
        setFinishingNote(getOrderQualityCheckById.finishing.note);
        setCleanliness(getOrderQualityCheckById.cleanliness.check);
        setCleanlinessNote(getOrderQualityCheckById.cleanliness.note);
        setIroning(getOrderQualityCheckById.ironAndPackaging.check);
        setIroningNote(getOrderQualityCheckById.ironAndPackaging.note);
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

  return (
    <AdminLayoutComponent session={session}>
      <Fragment>
        {dataGOQC && (
          <ReactToPrint
            trigger={() => (
              <OrderHeader
                title={`Product(${dataGOQC?.getOrderQualityCheckById?.itemNumber})`}
                btnTitle="Download"
                onClick={() => {}}
              />
            )}
            content={() => componentRef.current}
            bodyClass="printBody"
          ></ReactToPrint>
        )}

        <div ref={componentRef}>
          <Grid
            style={{ backgroundColor: "white" }}
            container
            spacing={1}
            className={classes.orderFormGrid}
            direction="row"
          >
            {dataGOQC?.getOrderQualityCheckById && (
              <Grid item xs={12}>
                <div className="orderFormTable">
                  <table className="table">
                    <tr>
                      <td>Client Name</td>
                      <td>
                        <b>
                          {
                            dataGOQC?.getOrderQualityCheckById
                              ?.storeProductOrder?.customerFirstName
                          }{" "}
                          {
                            dataGOQC?.getOrderQualityCheckById
                              ?.storeProductOrder?.customerLastName
                          }
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>Product No</td>
                      <td>
                        <b>{dataGOQC?.getOrderQualityCheckById?.itemNumber}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Order Date</td>
                      <td>
                        <b>
                          {
                            dataGOQC?.getOrderQualityCheckById
                              ?.storeProductOrder.orderNo
                          }
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>Trial Date</td>
                      <td>
                        <b>
                          {moment(
                            dataGOQC?.getOrderQualityCheckById
                              ?.storeProductOrder?.trialDate?.timestamp
                          ).format("DD-MM-YYYY") || ""}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>
                        <b>{qualityCheckStatus}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Note</td>
                      <td>
                        <b>{qualitycheckNote}</b>
                      </td>
                    </tr>
                  </table>

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
                          <b>FabricColorChecked</b>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="fabricColorChecked"
                            checked={fabricColor}
                          />
                        </td>
                        <td>{fabricRating}</td>
                        <td>{fabricColorNote}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Styling Form</b>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="designer"
                            checked={designer}
                          />
                        </td>
                        <td>{stylingRating}</td>
                        <td>{designerNote}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Measurements</b>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="Measurements"
                            checked={measurments}
                          />
                        </td>
                        <td>{measurmentRating}</td>
                        <td>{measurmentsNote}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Ironing and Package</b>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="ironing"
                            checked={ironing}
                          />
                        </td>
                        <td>{ironPackageRating}</td>
                        <td>{ironingNote}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Finishing</b>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="finishing"
                            checked={finishing}
                          />
                        </td>
                        <td>{finishingRating}</td>
                        <td>{finishingNote}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Cleanliness</b>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="cleanliness"
                            checked={cleanliness}
                          />
                        </td>
                        <td>{cleanlinessRating}</td>
                        <td>{cleanlinessNote}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Fabric Image</b>
                        </td>
                        <td>
                          {getOrderItem(
                            dataGOQC?.getOrderQualityCheckById?.itemNumber
                          )?.fabricImage && (
                            <img
                              alt="fabric-image"
                              width={75}
                              src={
                                getOrderItem(
                                  dataGOQC?.getOrderQualityCheckById?.itemNumber
                                )?.fabricImage
                              }
                            />
                          )}
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <b>Designer Image</b>
                        </td>
                        <td>
                          {getOrderItem(
                            dataGOQC?.getOrderQualityCheckById?.itemNumber
                          )?.styleDesignImage && (
                            <img
                              alt="fabric-image"
                              width={75}
                              src={
                                getOrderItem(
                                  dataGOQC?.getOrderQualityCheckById?.itemNumber
                                )?.styleDesignImage
                              }
                            />
                          )}
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <b>Quality Check Image</b>
                        </td>
                        <td>
                          {dataGOQC?.getOrderQualityCheckById.productImage && (
                            <img
                              alt="fabric-image"
                              width={75}
                              src={
                                dataGOQC?.getOrderQualityCheckById.productImage
                              }
                            />
                          )}
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Grid>
            )}
            <Grid item xs={12}>
              {storeProducts && (
                <>
                  {getCatId() === CAT_IDS.SHIRT_CAT_ID && (
                    <ViewShirtMeasurements
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
                      onClick={(data) => {
                        setActualMeasurement(data);
                        setOpenMeasurements(false);
                      }}
                      enteredValues={selectedMeasurments}
                      data={userCatMeasurments}
                    />
                  )}
                  {getCatId() === CAT_IDS.POONAPANT_CAT_ID && (
                    <ViewPunaPantMeasurements
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
                      onClick={({ data }) => {
                        setActualMeasurement(data);
                        setOpenMeasurements(true);
                      }}
                      enteredValues={selectedMeasurments}
                      data={userCatMeasurments}
                    />
                  )}

                  {getCatId() === CAT_IDS.BLAZER_CAT_ID && (
                    <ViewBlazerMeasurements
                      padding={0}
                      showButton={false}
                      onClick={({ data }) => {
                        setActualMeasurement(data);
                        setOpenMeasurements(true);
                      }}
                      enteredValues={selectedMeasurments}
                      data={userCatMeasurments}
                    />
                  )}
                  {getCatId() === CAT_IDS.KURTA_CAT_ID && (
                    <ViewKurtaMeasurements
                      padding={0}
                      showButton={false}
                      onClick={({ data }) => {
                        setActualMeasurement(data);
                        setOpenMeasurements(true);
                      }}
                      enteredValues={selectedMeasurments}
                      data={userCatMeasurments}
                    />
                  )}
                  {getCatId() === CAT_IDS.SHERWANI_CAT_ID && (
                    <ViewSherwaniMeasurements
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
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
                      padding={0}
                      showButton={false}
                      onClick={({ data }) => {
                        setActualMeasurement(data);
                        setOpenMeasurements(true);
                      }}
                      enteredValues={selectedMeasurments}
                      data={userCatMeasurments}
                    />
                  )}

                  {getCatId() === CAT_IDS.SUIT_CAT_ID && (
                    <ViewSuitMeasurements
                      padding={0}
                      showButton={false}
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
            </Grid>
          </Grid>
        </div>
      </Fragment>
    </AdminLayoutComponent>
  );
};

export default nonAuthenticated({
  Component: QualityViewForm,
  baseUrl: "/orders",
});
