import React, { useState, useEffect, Fragment } from "react";
import {
  Grid,
  Typography,
  Box,
  FormHelperText,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@material-ui/core";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";
import CloseIcon from "@material-ui/icons/Close";
import Dropzone from "react-dropzone";
// import ReactPlayer from "react-player";

import ViewMesurments from "../../Ui/viewMeasurments";
import TextInputField from "../../Ui/formFields/TextInputField";
import SelectDropDown from "../../Ui/formFields/SelectDropdown";
import LoadingButton from "../../Ui/formFields/LoadingButton";
import MeasurementsType from "../../forms/measurments/measurment_type";
import InfoDialogComponent from "../../Ui/dialog/infoDialog";

// Apollo
import { GET_ALL_OCCASIONS } from "../../../apollo/queries/navigation";
import {
  GET_PRODUCT_MEASURMENT_CONFIG,
  GET_USER_MEASURMENTS,
  SAVE_USER_MEASURMENTS,
  GET_ALL_TAILORS,
  UPLOAD_PDF,
} from "../../../apollo/queries/measurments";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  mapUserMeasurments,
  mapMeasurmentPayload,
} from "../../../services/measurments";
import {
  useMeasurmentsFormula,
  changeMeasurmentsWithField,
  _changeMeasurmentsDropDown,
  _measurmentFormulas,
  resetMeasurmentFormulas,
} from "../../../utils/hooks/userFormulaMeasurments";
import useStyles from "./styles";
import LoadingIndicatorComponent from "../../Ui/loading";
import {
  measurmentSorting,
  getMeasurmentLength,
  getMeasurmentSleevLength,
  getMeasurmentBodyLength,
} from "../../../utils/hooks/measurmentSorting";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// New Imports
import { useGetMeasurementsConfig } from "../../../apollo/measurments/useMeasurmentConfig";
import { useGetUserSavedMeasurements } from "../../../apollo/measurments/useGetUserMeasurments";
import { useGetCategoryMeasurements } from "../../../apollo/measurments/useCommonMeasurments";
import { useInternalMeasurementFormula } from "../../../apollo/measurments/useInternalMeasurments";
import {
  measurementsSorting,
  getFormPayload,
  extractDecimalValues,
  convertToOption,
} from "../../../apollo/measurments/service";

import { useMeasurementsCalculations } from "../../../apollo/measurments/useMeasurmentsCalulations";
import { useGetDependencyMeasurments } from "../../../apollo/measurments/useGetDependencyMeasurments";

const selectOptions = [
  { name: "0", value: "0" },
  { name: "1/4", value: "1/4" },
  { name: "1/2", value: "1/2" },
  { name: "3/4", value: "3/4" },
];

const remarks = [
  { name: "", value: "" },
  { name: "First Time", value: "first_time" },
  { name: "Repeat", value: "repeat" },
  { name: "Trail/Alt", value: "trial/alt" },
];

const pannaSize = [
  { name: "", value: "" },
  { name: "58 inches Panna (Bada Panna)", value: 58 },
  { name: "44 inches Panna (Medium Panna)", value: 44 },
  { name: "36 inches Panna (Small Panna)", value: 36 },
];

const meters = [
  { name: "0", value: 0 },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
];

const MeasurmentsForm = (props) => {
  const [selectProduct, setSelectedProduct] = useState(
    "5da7220571762c2a58b27a65"
  );
  const { authToken } = props;

  const { measurementsAttributes, measurementsData } =
    useMeasurementsCalculations(selectProduct, authToken);
  const { register, handleSubmit, errors, control, reset, getValues } = useForm(
    {
      mode: "onBlur",
    }
  );
  const { fetchDependencyMeasurements, dependentMeasurements } =
    useGetDependencyMeasurments(selectProduct, authToken);

  const [measurmentsOptions, setMeasurmentsOptions] = useState(null);
  const [categories, setCategories] = useState([]);
  const classes = useStyles();
  const [selectRowEle, setSelectRowEle] = useState(0);
  const [selectedEle, setSelectedEle] = useState(0);

  useEffect(() => {
    reset(measurementsData);
  }, [measurementsData]);

  // useEffect(() => {
  //   console.log("dependentMeasurements", dependentMeasurements);
  // }, [dependentMeasurements]);

  // New Apollo Imports
  // Apollo
  const {
    productMeasurements,
    getMeasurementsByCatId,
    loadingState,
    subCatId,
  } = useGetMeasurementsConfig(authToken, selectProduct, reset);

  const { gqlGetSavedMeasurements, userMeasurements } =
    useGetUserSavedMeasurements(authToken, subCatId, selectProduct);

  const {
    gqlGetCategoryMeasurements,
    dependentCatMeasurments,
    commonMeasurmentsFormula,
    finalCommonMeasurments,
  } = useGetCategoryMeasurements(authToken, selectProduct);

  const { calculateInternalFormulas, internalMeasurments, changeInputField } =
    useInternalMeasurementFormula();

  // Load Measurments
  useEffect(() => {
    getMeasurementsByCatId(selectProduct);
  }, []);

  // handle Change Categories
  const handleChangeCategories = (e) => {
    setSelectedProduct(e.target.value);
    getMeasurementsByCatId(e.target.value);
  };

  // Once get measurements options next call online measurements
  // useEffect(() => {
  //   if (!_.isEmpty(productMeasurements)) {
  //     gqlGetSavedMeasurements();
  //     if (
  //       selectProduct === "5da7220571762c2a58b27a65" ||
  //       selectProduct === "5da7220571762c2a58b27a67"
  //     ) {
  //     } else {
  //       gqlGetCategoryMeasurements();
  //     }
  //   }
  // }, [productMeasurements]);

  // useEffect(() => {
  //   if (!_.isEmpty(userMeasurements)) {
  //     reset(userMeasurements);
  //     calculateInternalFormulas(
  //       userMeasurements,
  //       selectProduct,
  //       productMeasurements
  //     );
  //   }
  // }, [userMeasurements]);

  // useEffect(() => {
  //   if (!_.isEmpty(dependentCatMeasurments)) {
  //     let formValues = getValues();
  //     commonMeasurmentsFormula(
  //       formValues,
  //       dependentCatMeasurments,
  //       selectProduct,
  //       productMeasurements
  //     );
  //   }
  // }, [dependentCatMeasurments]);

  // useEffect(() => {
  //   if (!_.isEmpty(finalCommonMeasurments)) {
  //     reset(finalCommonMeasurments);
  //     calculateInternalFormulas(
  //       finalCommonMeasurments,
  //       selectProduct,
  //       productMeasurements
  //     );
  //   }
  // }, [finalCommonMeasurments]);

  // useEffect(() => {
  //   if (!_.isEmpty(internalMeasurments)) {
  //     reset(internalMeasurments);
  //   }
  // }, [internalMeasurments]);

  // const [saveUserMeasurmentsInfo, { loading: loadingUM }] = useMutation(
  //   SAVE_USER_MEASURMENTS,
  //   {
  //     onError(error) {
  //       alert("Something went wrong please try again...");
  //     },
  //     onCompleted() {
  //       alert("Saved Successfully");
  //       // setIsSubmitted(true);
  //     },
  //   }
  // );

  const { data: occasionsData, loading: isLoadingOccasions } =
    useQuery(GET_ALL_OCCASIONS);

  useEffect(() => {
    if (!_.isEmpty(occasionsData)) {
      const { getAllOccasions } = occasionsData;
      const getAllProducts = _.filter(
        getAllOccasions,
        (item) => item.name === "products"
      );
      if (!_.isEmpty(getAllProducts)) {
        const getProductsMenu = [...getAllProducts[0].categories];
        const options = getProductsMenu.map((item) => {
          return {
            name: item.label,
            value: item._id,
          };
        });
        const otherCatrgories = [
          {
            value: "6036451627e32d7fd776a580",
            name: "Dhoti",
          },
          {
            value: "5da7220571762c2a58b27a72",
            name: "pagdi",
          },
          {
            value: "621a34485417ab1e143a5245",
            name: "patyala",
          },
          {
            value: "5da7220571762c2a58b27a73",
            name: "jootis",
          },
          {
            value: "6036446927e32d7fd776a57f",
            name: "chudidar",
          },
          {
            value: "5ebb993abcb3d23714b2ebf4",
            name: "shoes",
          },
        ];
        setCategories([...options, ...otherCatrgories]);
      }
    }
  }, [occasionsData]);

  // State Declaration
  // const { authToken, title, callBack, userInfo } = props;

  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [formData, setFormData] = useState(null);
  // const [tailors, setAllTailors] = useState([]);
  // const [note, setNote] = useState();
  // const [measurments, setMeasurments] = useState();
  // const [subCatId, setSubCatId] = useState("half_shirt");
  // const [measurmentOptions, setMeasurmentOptions] = useState([]);
  // const [selectedEle, setSelectedEle] = useState(0);
  // const [measurmentType, setMeasurmentType] = useState("inches");
  // const [isViewMeasurments, setIsViewMeasurments] = useState(false);
  // const [setRemark, setSelectRemark] = useState();
  // const [selectTailor, setSelectedTailor] = useState();

  // const [selectedPannaSize, setPannaSize] = useState(44);
  // const [dyeable, setDyeable] = useState(false);
  // const [mtr_1, setMtr_1] = useState(0);
  // const [mtr_2, setMtr_2] = useState(0);
  // const [_length, setLength] = useState(0);
  // const [_bodyMaxLength, setBodyMaxLength] = useState(0);
  // const [_sleevLength, setSleevLength] = useState(0);
  // const [_fabricMesurmentinfo, setFabricMesurmentinfo] = useState();
  // const [catName, setCatName] = useState("Shirts");

  // const {
  //   register,
  //   handleSubmit,
  //   errors,
  //   control,
  //   reset,
  //   getValues,
  //   setValue,
  // } = useForm({
  //   mode: "onBlur",
  // });
  // const {
  //   getFormulaUserMeasurments,
  //   loadingGSUM,
  //   formulas,
  //   internalFormula,
  //   calculateInternalFormulas,
  // } = useMeasurmentsFormula(reset);
  // const { data: dataTailors, loading: dataLoading } = useQuery(GET_ALL_TAILORS);
  // const [isPdfUpload, setIsPdfUpload] = useState(false);

  // // Custom Hooks

  // const [uploadUserMeasurementPdf, { loading: loadingUMP, data: dataUMP }] =
  //   useMutation(UPLOAD_PDF, {
  //     onCompleted() {
  //       alert("File uploaded Successfully...");
  //     },
  //   });

  // useEffect(() => {
  //   if (!_.isEmpty(dataTailors)) {
  //     const { getAllTailors } = dataTailors;
  //     let data = [];
  //     getAllTailors.map((item) => {
  //       data.push({
  //         name: item.name,
  //         value: item.name,
  //       });
  //     });

  //     setAllTailors(data);
  //   }
  // }, [dataTailors]);

  // const [
  //   getSavedUserMeasurments,
  //   { loading: loadingSUM, data: { getUserMeasurements } = {} },
  // ] = useLazyQuery(GET_USER_MEASURMENTS, {
  //   fetchPolicy: "network-only",
  //   onCompleted(data) {},
  // });

  // const { data: occasionsData, loading: isLoadingOccasions } =
  //   useQuery(GET_ALL_OCCASIONS);

  // const [
  //   getProductMeasurements,
  //   { loading: loadingPM, data: { getProductMeasurementConfig } = {} },
  // ] = useLazyQuery(GET_PRODUCT_MEASURMENT_CONFIG);

  const onSubmit = async (formData) => {
    const payload = getFormPayload(
      productMeasurements,
      authToken,
      selectProduct,
      subCatId,
      formData
    );
    await saveUserMeasurmentsInfo({
      variables: {
        userMeasurements: payload,
      },
    });
  };

  // const onViewData = (data) => {
  //   const payload = {
  //     ...data,
  //     meters: `${mtr_1}.${mtr_2}`,
  //     measuredBy: `${selectTailor}`,
  //   };
  //   setMeasurments(payload);
  //   setIsViewMeasurments(data);
  // };

  // useEffect(async () => {
  //   await getProductMeasurements({
  //     variables: {
  //       catId: selectProduct,
  //       role: "personal_stylist",
  //     },
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!_.isEmpty(occasionsData)) {
  //     const { getAllOccasions } = occasionsData;
  //     const getAllProducts = _.filter(
  //       getAllOccasions,
  //       (item) => item.name === "products"
  //     );
  //     if (!_.isEmpty(getAllProducts)) {
  //       const getProductsMenu = [...getAllProducts[0].categories];
  //       const options = getProductsMenu.map((item) => {
  //         return {
  //           name: item.label,
  //           value: item._id,
  //         };
  //       });
  //       const otherCatrgories = [
  //         {
  //           value: "6036451627e32d7fd776a580",
  //           name: "Dhoti",
  //         },
  //         {
  //           value: "5da7220571762c2a58b27a72",
  //           name: "pagdi",
  //         },
  //         {
  //           value: "621a34485417ab1e143a5245",
  //           name: "patyala",
  //         },
  //         {
  //           value: "5da7220571762c2a58b27a73",
  //           name: "jootis",
  //         },
  //         {
  //           value: "6036446927e32d7fd776a57f",
  //           name: "chudidar",
  //         },
  //         {
  //           value: "5ebb993abcb3d23714b2ebf4",
  //           name: "shoes",
  //         },
  //       ];
  //       setCategories([...options, ...otherCatrgories]);
  //     }
  //   }
  // }, [occasionsData]);

  // useEffect(async () => {
  //   setMeasurmentOptions([]);
  //   if (!_.isEmpty(getProductMeasurementConfig)) {
  //     let extractOptions = [];
  //     getProductMeasurementConfig.map((item) => {
  //       item.options.map((option) => extractOptions.push(option));
  //     });
  //     const getUniqOptions = _.uniqBy(extractOptions, "label").map((item) => {
  //       return {
  //         ...item,
  //         size: "0",
  //       };
  //     });
  //     setSubCatId(getProductMeasurementConfig[0].subCat);
  //     setMeasurmentOptions(getUniqOptions);
  //     await getSavedUserMeasurments({
  //       variables: {
  //         page: 1,
  //         limit: 3,
  //         userId: authToken,
  //         catId: selectProduct,
  //         subCat: getProductMeasurementConfig[0].subCat,
  //       },
  //     });
  //   }
  // }, [getProductMeasurementConfig]);

  // const calculateFormulas = (data) => {
  //   if (
  //     selectProduct === "5da7220571762c2a58b27a67" ||
  //     selectProduct === "5da7220571762c2a58b27a6b"
  //   ) {
  //     getFormulaUserMeasurments(
  //       "5da7220571762c2a58b27a67",
  //       selectProduct,
  //       measurmentOptions,
  //       measurmentType,
  //       "trouser",
  //       authToken,
  //       data
  //     );
  //   } else {
  //     getFormulaUserMeasurments(
  //       "5da7220571762c2a58b27a65",
  //       selectProduct,
  //       measurmentOptions,
  //       measurmentType,
  //       "half_shirt",
  //       authToken,
  //       data
  //     );
  //   }
  // };

  // useEffect(async () => {
  //   setNote("");
  //   setMtr_1(0);
  //   setMtr_2(0);
  //   if (!_.isEmpty(getUserMeasurements)) {
  //     if (!_.isEmpty(getUserMeasurements[0])) {
  //       const options = !_.isEmpty(getUserMeasurements[0].options)
  //         ? getUserMeasurements[0].options
  //         : getUserMeasurements[1].options;
  //       let data = mapUserMeasurments(options, measurmentType);
  //       data["note"] = !_.isEmpty(getUserMeasurements[0].options)
  //         ? getUserMeasurements[0].note
  //         : getUserMeasurements[1].note;
  //       reset(data);
  //       setFormData(options);
  //       setSelectRemark(
  //         !_.isEmpty(getUserMeasurements[0])
  //           ? getUserMeasurements[0].remarks
  //           : getUserMeasurements[1].remarks
  //       );
  //       setSelectedTailor(
  //         !_.isEmpty(getUserMeasurements[0])
  //           ? getUserMeasurements[0].measuredBy
  //           : getUserMeasurements[1].measuredBy
  //       );
  //       setPannaSize(
  //         !_.isEmpty(getUserMeasurements[0])
  //           ? getUserMeasurements[0].pannaSize
  //           : getUserMeasurements[1].pannaSize
  //       );
  //       let meter = !_.isEmpty(getUserMeasurements[0])
  //         ? getUserMeasurements[0].noOfMeters
  //         : getUserMeasurements[1].noOfMeters;

  //       if (meter) {
  //         var opStr = !_.isNull(meter) ? meter.toString().split(".") : "0.0";
  //         setMtr_1(opStr[0]);
  //         setMtr_2(opStr[1]);
  //       }

  //       setDyeable(
  //         !_.isEmpty(getUserMeasurements[0])
  //           ? getUserMeasurements[0].isDyable
  //           : getUserMeasurements[1].isDyable
  //       );
  //       setLength(getMeasurmentLength(options, catName));
  //       setSleevLength(getMeasurmentSleevLength(options, catName));
  //       setFabricMesurmentinfo(catName);
  //       setBodyMaxLength(getMeasurmentBodyLength(options, catName));
  //       setNote(data.note);

  //       if (!_.isEmpty(data)) {
  //         calculateFormulas(data);
  //       }
  //     } else {
  //       const data = mapMeasurmentPayload(measurmentOptions);
  //       if (!_.isEmpty(data)) {
  //         console.log("mapMeasurmentPayload");
  //         calculateFormulas(data);
  //       }
  //     }
  //   } else {
  //     console.log("mapMeasurmentPayload");
  //     const data = mapMeasurmentPayload(measurmentOptions);
  //     if (!_.isEmpty(data)) {
  //       calculateFormulas(data);
  //     }
  //   }
  // }, [getUserMeasurements, measurmentType]);

  // const converInchToCmHandler = async () => {
  //   await getProductMeasurements({
  //     variables: {
  //       catId: selectProduct,
  //       role: "personal_stylist",
  //     },
  //   });
  // };

  // const onDrop = async (acceptedFiles) => {
  //   setIsPdfUpload(false);
  //   await uploadUserMeasurementPdf({
  //     variables: {
  //       pdf: acceptedFiles[0],
  //       userId: authToken,
  //       catId: selectProduct,
  //       subCat: subCatId,
  //       type: "",
  //       measuredBy: "",
  //       note: "",
  //     },
  //   });
  // };

  // const renderViewButton = (catId) => {
  //   if (
  //     catId === "5da7220571762c2a58b27a68" ||
  //     catId === "5da7220571762c2a58b27a65" ||
  //     catId === "5da7220571762c2a58b27a67" ||
  //     catId === "5da7220571762c2a58b27a6b" ||
  //     catId === "5da7220571762c2a58b27a6c" ||
  //     catId === "5da7220571762c2a58b27a6e" ||
  //     catId === "5da7220571762c2a58b27a6d" ||
  //     catId === "5da7220571762c2a58b27a6a" ||
  //     catId === "5da7220571762c2a58b27a70" ||
  //     catId === "5da7220571762c2a58b27a6f" ||
  //     catId === "6036451627e32d7fd776a580" ||
  //     catId === "621a34485417ab1e143a5245" ||
  //     catId === "5da7220571762c2a58b27a73" ||
  //     catId === "5da7220571762c2a58b27a72" ||
  //     catId === "6036446927e32d7fd776a57f" ||
  //     catId === "5ebb993abcb3d23714b2ebf4" ||
  //     catId === "5da7220571762c2a58b27a66" ||
  //     catId === "5da7220571762c2a58b27a66"
  //   ) {
  //     return true;
  //   }
  // };

  // const resetFormulas = () => {
  //   measurmentOptions.map((item) => (item.isUpdateManually = false));
  //   setMeasurmentOptions(measurmentOptions);
  //   let options = [];
  //   formData.map((item) => {
  //     if (_.has(item, "isUpdateManually")) {
  //       options.push({
  //         ...item,
  //         isUpdateManually: false,
  //       });
  //       return (item = false);
  //     }
  //   });
  //   setFormData(options);
  //   const values = getValues();
  //   resetMeasurmentFormulas(
  //     selectProduct,
  //     measurmentOptions,
  //     values,
  //     measurmentType,
  //     reset,
  //     options
  //   );
  //   alert("Form reset successfully");
  // };

  return (
    <Grid
      container
      direction="column"
      classes={{ root: classes.measurmentContainer }}
    >
      {occasionsData && (
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={4} md={2}>
              <Box mb={1}>
                <label>Select Category:</label>
              </Box>
              <select
                id="category-drop-down"
                value={selectProduct}
                style={{ width: "100%", height: "35px" }}
                onChange={handleChangeCategories}
              >
                {categories.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* <Grid xs={12} item classes={{ root: classes.measurmentTypeSection }}>
        <MeasurementsType
          value={measurmentType}
          disabled={loadingUMP}
          isView={renderViewButton(selectProduct)}
          onClickPdfbtn={() => {
            setIsPdfUpload(true);
          }}
          onClickReset={() => resetFormulas()}
          onClickView={handleSubmit(onViewData)}
          onChange={(e) => {
            setMeasurmentType(e.target.value);
            converInchToCmHandler();
          }}
        />
      </Grid> */}

      {loadingState ? (
        <LoadingIndicatorComponent />
      ) : (
        <>
          {measurementsAttributes ? (
            <>
              {measurementsSorting(
                measurementsAttributes,
                selectProduct
              )._groupedMeasurements.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  container
                  alignItems="stretch"
                  key={index}
                  style={{ marginBottom: 10 }}
                >
                  {item.map((value, i) => (
                    <Grid
                      style={{ height: "100%" }}
                      key={i}
                      item
                      sm={4}
                      xs={4}
                      md={2}
                      lg={2}
                      xl={2}
                    >
                      <Box
                        style={{
                          height: "100%",
                          backgroundColor: _.hasIn(value, "isCommonMeasurment")
                            ? "#FFF9C4"
                            : value.isRequired
                            ? "#E3F2FD"
                            : "#FFFFFF",
                        }}
                        className={
                          selectedEle === i && selectRowEle === index
                            ? classes.selectOptionsForm
                            : classes.selectOptions
                        }
                        m={0.4}
                      >
                        <Grid
                          onClick={() => {
                            setSelectRowEle(index);
                            setSelectedEle(i);
                          }}
                          container
                          spacing={1}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="h2"
                              component="h2"
                              classes={{ root: classes.optionTitle }}
                            >
                              {value.label}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <input
                              placeholder="Inch"
                              style={{ width: "100%" }}
                              name={value.name}
                              onChange={(e) => {
                                const formData = getValues();
                                setTimeout(() => {
                                  changeInputField(
                                    selectProduct,
                                    productMeasurements,
                                    formData
                                  );
                                }, 300);
                              }}
                              type="number"
                              ref={register({
                                required: {
                                  value: value.isRequired,
                                  message: `Enter a valid ${value.label}`,
                                },
                              })}
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <Controller
                              control={control}
                              name={`${value.name}_size`}
                              defaultValue={value.size}
                              render={(props) => (
                                <select
                                  value={props.value}
                                  onChange={(e) => {
                                    props.onChange(e);
                                    const formData = getValues();
                                    changeInputField(
                                      selectProduct,
                                      productMeasurements,
                                      formData
                                    );
                                  }}
                                  style={{ height: 21, width: "100%" }}
                                  id="height-dropdown"
                                >
                                  {selectOptions.map((_item, _i) => (
                                    <option key={_i} value={_item.value}>
                                      {_item.name}
                                    </option>
                                  ))}
                                </select>
                              )}
                            ></Controller>
                          </Grid>

                          {!_.isEmpty(errors) && (
                            <Grid item xs={12}>
                              <FormHelperText
                                className={classes.validationText}
                              >
                                {_.hasIn(errors[value.name], "message") &&
                                  errors[value.name].message}
                              </FormHelperText>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ))}

              {!_.isEmpty(measurmentsOptions) && (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  classes={{ root: classes.actionbButtons }}
                >
                  <LoadingButton
                    id="btn-proceed-continue"
                    btnTitle={"Save & Update"}
                    color={"primary"}
                    onClick={handleSubmit(onSubmit)}
                    btnClassName={classes.btnContinue}
                    disabled={loadingUM}
                    spinner={loadingUM}
                  />
                </Grid>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </Grid>
  );
};

export default MeasurmentsForm;
