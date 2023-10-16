import React, { Fragment, useState, useEffect } from "react";
import { useGetOrderInitData } from "../../../utils/hooks/useGetInitialOrderData";
import axios from "axios";
import useStyles from "./styles";
import {
  Grid,
  TextField,
  Box,
  Button,
  Divider,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  IconButton,
  TableBody,
  Typography,
  RadioGroup,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { initialConfig } from "../../../services/_orders";
import {
  getProductNumbers,
  _resetBasicUserData,
  _handleOrderCalculation,
  _getFinalOrderPayload,
  _resetOrderPayload,
  _updateProductTrailDates,
} from "../../../services/orderAutoSave";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {
  checkMobileValidation,
  getCountryCode,
} from "../../../utils/validations";
import { useRouter } from "next/router";
import _ from "lodash";
import AdUserForm from "../addOrderUser";
import CustomImageRadioButton from "../../Ui/formFields/CustomImageRadioInput";
import StyleFormComponent from "./styleForm";
import { checkStylingForm, changeButtonLabel } from "../../../utils/utils";

// Apollo
import { GET_USER_BY_MOBILE } from "../../../apollo/queries/user";
import {
  INITIATE_STORE_ORDERS,
  CREATE_USER_STORE_ORDER,
  SAVE_STORE_ORDER,
  GET_SINGLE_STORE_ORDERBY_ID,
  GET_STYLING_CONFIG,
} from "../../../apollo/queries/orders";
import { UPDATE_USER_PROFILE } from "../../../apollo/queries/user";
import { GET_ALL_SOURCE_CATEGORIES } from "../../../apollo/queries/leads";
import { useLazyQuery, useMutation } from "@apollo/client";

// Service
import {
  resizeFile,
  dataURIToBlob,
  getUserRegisterPayload,
} from "../../../services/_orders";

// UI
import LoadingIndicatorComponent from "../../Ui/loading";
import OrderHeader from "./orderHeader";
import PhoneInputField from "../../Ui/formFields/phoneInput";
import TextInputField from "../../Ui/formFields/TextInputField";
import SelectDropDown from "../../Ui/formFields/SelectDropdown";
import InfoDialogComponent from "../../Ui/dialog/infoDialog";
import AdvancePayment from "./advancePayment";
import OtherCharges from "./otherCharges";
import ImageUpload from "../../Ui/upload";
import OrderConfirmTable from "../../Ui/tables/orderConfirm";
import StyleFormPdf from "./styleFormPdf";
import SuitStyleFormPdf from "./suitStylingFormPdf";

const BasicOrderForm = (props) => {
  const classes = useStyles();
  const { session } = props;
  const [otherChargesBreakdown, setOtherChargesBreakdown] = useState([]);
  const [deductionsBreakdown, setDeductionsBreakdown] = useState([]);
  const [paymentBreakdown, setPaymentBreakdown] = useState([]);
  const [source, setSource] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    control,
    reset,
    getValues,
    register,
    errors,
    setValue,
    watch,
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      orderItems: initialConfig.data.orderItems,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderItems",
  });
  const _watchOrderItems = watch(["orderItems"]);

  useEffect(() => {
    if (!_.isEmpty(_watchOrderItems.orderItems)) {
      _handleOrderCalculation(
        _watchOrderItems,
        otherChargesBreakdown,
        deductionsBreakdown,
        paymentBreakdown,
        setValue
      );
    }
  }, [
    _watchOrderItems,
    otherChargesBreakdown,
    deductionsBreakdown,
    paymentBreakdown,
  ]);

  const [countryCode, setCountryCode] = useState("91");
  const [country, setCountry] = useState("in");
  const [isAdvancePayment, setIsAdvancePayment] = useState(false);
  const [isDeductionsPayment, setIsDeductionsPayment] = useState(false);
  const [isOtherCharges, setIsOtherCharges] = useState(false);
  const [isUploadFabricImage, setIsUploadFabricImage] = useState(false);
  const [isUploadRefImage, setIsUploadRefImage] = useState(false);
  const [isUploadDesignerImage, setIsUploadDesignerImage] = useState(false);
  const [orderIndex, setOrderIndex] = useState(null);
  const [selectItem, setSelectedItem] = React.useState();
  const [fabricImage, setFabricImage] = React.useState();
  const [referenceImage, setReferenceImage] = React.useState();
  const [designerImage, setDesignerImage] = React.useState();
  const [checkSubmitModel, setCheckSubmitModel] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const router = useRouter();
  const [signupUser, setSignupUser] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isStylingForm, setIsStylingForm] = useState(false);
  const [viewPdf, setViewPdf] = useState(false);
  const [catId, setCatId] = useState(null);

  const [updateUserProfileData, { loading: loadingUP }] =
    useMutation(UPDATE_USER_PROFILE);

  const [saveStoreOrder, { loading: loadingSUSO }] = useMutation(
    SAVE_STORE_ORDER,
    {
      onCompleted(data) {
        alert("Order Saved Successfully");
        if (isSubmit) {
          setIsSubmit(false);
          router.push("/orders");
        }
      },
      onError(error) {
        setIsSubmit(false);
        alert("Something went wrong please try again");
      },
    }
  );

  const [
    getUserStoreOrderById,
    { loading: loadingUSSO, data: { getStoreOrderById } = {} },
  ] = useLazyQuery(GET_SINGLE_STORE_ORDERBY_ID, {
    onError(error) {
      alert("Something went wrong please try again");
    },
  });

  const [getAllSourceCategories, { loading: loadingSC, data: dataSC }] =
    useLazyQuery(GET_ALL_SOURCE_CATEGORIES);

  const [createUserForOrder, { loading: loadingCUFO }] = useMutation(
    CREATE_USER_STORE_ORDER,
    {
      onCompleted: async ({ createUserForOrder }) => {
        if (!_.isEmpty(createUserForOrder)) {
          setOpenModel(false);
          await getSingleUserBasicDetails({
            variables: {
              phone: signupUser.phone,
            },
          });
        } else {
          alert("Email/Mobile already exists please try again.. ");
        }
      },
      onError(error) {
        alert("Something went to wrong please try again...");
      },
    }
  );

  const { loading, colors, storeProducts, persona, stylists } =
    useGetOrderInitData();

  const [
    getSingleUserBasicDetails,
    { loading: loadingGUBM, data: { getSingleUserBasicData } = {}, variables },
  ] = useLazyQuery(GET_USER_BY_MOBILE, {
    onCompleted() {
      if (_.isEmpty(getSingleUserBasicData)) {
        setOpenModel(true);
      }
    },
  });

  useEffect(() => {
    if (!_.isEmpty(dataSC)) {
      const { getAllSourceCategories } = dataSC;
      if (!_.isEmpty(getAllSourceCategories)) {
        let data = [];
        let categories = [];
        if (!_.isEmpty(getAllSourceCategories)) {
          getAllSourceCategories.map((item) => {
            data.push({
              name: item.name,
              value: item._id,
              subCategory: item.subCategory,
            });
          });
        }
        if (!_.isEmpty(data)) {
          if (!_.isEmpty(data[0].subCategory)) {
            data[0].subCategory.map((item) => {
              categories.push({
                name: item.name,
                value: item._id,
              });
            });
          }
        }
        setSource(data);
        setCategories(categories);
      }
    }
  }, [dataSC]);

  const [_initiateStoreOrder, { loading: loadingSO, data: dataSO }] =
    useMutation(INITIATE_STORE_ORDERS);
  useEffect(async () => {
    if (!_.isEmpty(getSingleUserBasicData)) {
      await _initiateStoreOrder({
        variables: {
          userId: getSingleUserBasicData._id,
        },
      });
    }
  }, [getSingleUserBasicData]);

  useEffect(() => {
    if (!_.isEmpty(dataSO)) {
      const formData = getValues();
      const payload = _resetBasicUserData(
        getSingleUserBasicData,
        dataSO.initiateStoreOrder,
        formData.orderItems,
        reset
      );
      const _contactInfo = getCountryCode(
        `${payload.countryCode}${payload.customerPhone}`
      );
      setCountry(_contactInfo.country);
      setCountryCode(_contactInfo.countryCode);
    }
  }, [dataSO]);

  const checkError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? classes.errorInput : "";
  };

  const handleUserUpdate = async (data) => {
    const payload = {
      firstName: data?.customerFirstName,
      lastName: data?.customerLastName,
      phone: data?.phone,
      dateOfBirth: data?.customerDateOfBirth,
      email: data?.customerEmail,
      customerSrNo: Number(data.customerId),
      stylistId: data?.personalStylistId,
      secondaryStylistIds: data?.secondaryStylistIds,
      isStyleClubMember: data?.customerIsStyleClubMember,
      customerSegment: data?.customerSegment,
      ccDueDate: data?.ccDueDate,
      countryCode: data?.customerCountryCode,
    };

    await updateUserProfileData({
      variables: {
        userId: data.userId,
        updateData: payload,
      },
    });
  };

  const onSubmit = (data) => {
    setIsSubmit(true);
    const _formData = {
      ...data,
      otherChargesBreakdown,
      paymentBreakdown,
      deductionsBreakdown,
    };
    if (_.isEmpty(data._id)) {
      alert("Please generate order id before create order");
    } else {
      let payload = _getFinalOrderPayload(_formData);
      payload.customerCountryCode = countryCode;
      handleUserUpdate(payload);
      saveStoreOrder({
        variables: {
          params: payload,
        },
      });
    }
  };

  const onSaveDraft = (data) => {
    const _formData = {
      ...data,
      otherChargesBreakdown,
      paymentBreakdown,
      deductionsBreakdown,
    };

    if (_.isEmpty(data._id)) {
      alert("Please generate order id before create order");
    } else {
      const payload = _getFinalOrderPayload(_formData);
      payload.customerCountryCode = countryCode;
      saveStoreOrder({
        variables: {
          params: payload,
        },
      });
    }
  };

  useEffect(async () => {
    await getAllSourceCategories();
  }, []);

  useEffect(async () => {
    if (!_.isEmpty(router.query.id)) {
      await getUserStoreOrderById({
        variables: {
          orderId: router.query.id,
        },
      });
    }
  }, [router]);

  useEffect(() => {
    if (!_.isEmpty(getStoreOrderById)) {
      const {
        payload,
        otherChargesBreakdown,
        deductionsBreakdown,
        paymentBreakdown,
      } = _resetOrderPayload(getStoreOrderById);
      const _contactInfo = getCountryCode(
        `${payload.customerCountryCode}${payload.customerPhone}`
      );
      if (_contactInfo) {
        setCountry(_contactInfo.country);
        setCountryCode(_contactInfo.countryCode);
      }
      setOtherChargesBreakdown(otherChargesBreakdown);
      setDeductionsBreakdown(deductionsBreakdown);
      setPaymentBreakdown(paymentBreakdown);

      if (!_.isEmpty(dataSC)) {
        const { getAllSourceCategories } = dataSC;
        if (!_.isEmpty(getAllSourceCategories)) {
          const findSubCats = _.find(
            getAllSourceCategories,
            (item) => item.name === getStoreOrderById.sourceChannel
          );

          if (findSubCats) {
            setCategories(findSubCats.subCategory);
          }
        }
      }
      reset(payload);
    }
  }, [getStoreOrderById, dataSC]);

  const saveRefereImage = (file, imgType, itemNumber) => {
    var formData = new FormData();
    formData.append("imageFile", file);
    const _formData = getValues();
    setIsImageUpload(true);
    axios
      .post(
        `https://api3.myperfectfit.co.in:5679/v2/api/storeProductOrder/images/${imgType}/${_formData.orderNo}/${itemNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setTimeout(function () {
          setIsImageUpload(false);
          setReferenceImage(res.data.details.imageUrl);
          selectItem.referenceImage = res.data.details.imageUrl;
          setSelectedItem(selectItem);
        }, 5000);
      })
      .catch((error) => {
        setIsImageUpload(false);
        alert("Something went to wrong please try again");
      });
  };

  const saveFabricImage = (file, imgType, itemNumber) => {
    var formData = new FormData();
    formData.append("imageFile", file);
    const _formData = getValues();
    setIsImageUpload(true);
    axios
      .post(
        `https://api3.myperfectfit.co.in:5679/v2/api/storeProductOrder/images/${imgType}/${_formData.orderNo}/${itemNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setTimeout(function () {
          setIsImageUpload(false);
          setFabricImage(res.data.details.imageUrl);
          selectItem.fabricImage = res.data.details.imageUrl;
          setSelectedItem(selectItem);
        }, 5000);
      })
      .catch((error) => {
        setIsImageUpload(false);
        alert("Something went to wrong please try again");
      });
  };
  const saveDesignerImage = (file, imgType, itemNumber) => {
    var formData = new FormData();
    formData.append("imageFile", file);
    const _formData = getValues();

    setIsImageUpload(true);
    axios
      .post(
        `https://api3.myperfectfit.co.in:5679/v2/api/storeProductOrder/images/${imgType}/${_formData.orderNo}/${itemNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setTimeout(function () {
          setIsImageUpload(false);
          setDesignerImage(res.data.details.imageUrl);
          selectItem.styleDesignImage = res.data.details.imageUrl;
          setSelectedItem(selectItem);
        }, 5000);
      })
      .catch((error) => {
        setIsImageUpload(false);
        alert("Something went to wrong please try again");
      });
  };

  const checkIsImagesUpload = (item) => {
    if (_.has(item, "fabricImage") && !_.isEmpty(item.fabricImage)) {
      return true;
    } else if (
      _.has(item, "referenceImage") &&
      !_.isEmpty(item.referenceImage)
    ) {
      return true;
    } else if (
      _.has(item, "styleDesignImage") &&
      !_.isEmpty(item.styleDesignImage)
    ) {
      return true;
    } else {
      false;
    }
  };

  const setProductOrderNumber = (_orderItems, isSelect) => {
    const getFormValues = getValues();
    const orderNo = getFormValues.orderNo;
    if (isSelect) {
      const orderItems = [...getFormValues.orderItems];
      setValue("orderItems", getProductNumbers(orderItems, orderNo));
    } else {
      const orderItems = [...getFormValues.orderItems, _orderItems];
      setValue("orderItems", getProductNumbers(orderItems, orderNo));
    }
  };

  const getDefaultStylist = () => {
    if (session) {
      if (stylists.length > 0) {
        const getStylistId = _.find(
          session.user.teams,
          (item) => item.roleIdentifier === "personal_stylist"
        );
        if (!_.isEmpty(getStylistId)) {
          const getStylist = _.find(
            stylists,
            (item) => item.value === getStylistId._id
          );
          if (!_.isEmpty(getStylist)) {
            return getStylist;
          }
        }
      }
    }
    return {};
  };

  return (
    <Fragment>
      <OrderHeader
        title={!_.isEmpty(router.query.id) ? "Edit Order" : "Create New Order"}
        btnTitle="Share"
        onClick={() => {}}
      />
      {loading || loadingUSSO || loadingSC ? (
        <LoadingIndicatorComponent height={500} />
      ) : (
        <Fragment>
          <Box pl={2} pr={2} pt={3}>
            <Box mb={1}>
              <p className={classes.formLabel}>Search User By Mobile</p>
            </Box>
            <Grid container>
              <Grid item>
                <PhoneInputField
                  country={country}
                  onChange={(value) => {
                    setCountryCode(value);
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextInputField
                  inputRef={register({
                    required: {
                      value: true,
                    },
                    validate: (value) =>
                      checkMobileValidation(`${countryCode}${value}`),
                  })}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  placeholder="Mobile No"
                  name="customerPhone"
                  style={{ width: 250 }}
                  className={checkError(errors, "customerPhone")}
                />
              </Grid>
              <Grid item>
                <Button
                  style={{ marginLeft: 10, height: 39, marginTop: 0 }}
                  disabled={loadingGUBM | loadingSO}
                  color="secondary"
                  onClick={async () => {
                    const phone = getValues("customerPhone");
                    if (
                      checkMobileValidation(`${countryCode}${phone}`) ===
                      undefined
                    ) {
                      await getSingleUserBasicDetails({
                        variables: {
                          phone: phone,
                        },
                      });
                    } else {
                      alert("Please enter valid mobile number");
                    }
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
            <Divider />
          </Box>
          <Grid
            container
            spacing={1}
            className={classes.orderFormGrid}
            direction="row"
          >
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <input type="hidden" ref={register()} name="userId" />
              <p className={classes.formLabel}>Studio Id</p>
              <Controller
                control={control}
                name="studioId"
                defaultValue="61c55048429a4414e8755e69"
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    options={initialConfig.data.studioCodes}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>First Name</p>
              <TextInputField
                inputRef={register({
                  required: {
                    value: false,
                    message: "",
                  },
                })}
                name="customerFirstName"
                placeholder="First Name"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Last Name</p>
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                  },
                })}
                name="customerLastName"
                placeholder="Last Name"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Date of Birth</p>
              <Controller
                name={`customerDateOfBirth`}
                control={control}
                defaultValue={null}
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
              <p className={classes.formLabel}>Order Date</p>
              <Controller
                name={`orderDate`}
                control={control}
                setValue={setValue}
                defaultValue={moment(new Date())}
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
              <p className={classes.formLabel}>Email</p>
              <TextInputField
                inputRef={register()}
                name="customerEmail"
                onChange={(e) => {}}
                placeholder="Email Address"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Customer Id</p>
              <TextInputField
                inputRef={register({
                  required: {
                    value: false,
                  },
                })}
                name="customerId"
                placeholder="Customer Id"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Event Date</p>
              <Controller
                name={`eventDate`}
                control={control}
                defaultValue={null}
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
              <p className={classes.formLabel}>Source (Main Category)</p>
              <Controller
                render={(props) => (
                  <Autocomplete
                    {...props}
                    options={source}
                    style={{ width: "100%" }}
                    placeholder="Select Source"
                    getOptionLabel={(option) => option?.name || option}
                    renderOption={(option) => <span>{option.name}</span>}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(_, data) => {
                      props.onChange(data.name);
                      setCategories(data.subCategory);
                    }}
                  />
                )}
                name={`sourceChannel`}
                control={control}
              />
            </Grid>

            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Source (Sub Category)</p>
              <Controller
                render={(props) => (
                  <Autocomplete
                    {...props}
                    options={categories}
                    style={{ width: "100%" }}
                    placeholder="Source (Sub Category)"
                    getOptionLabel={(option) => option?.name || option}
                    renderOption={(option) => <span>{option.name}</span>}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(_, data) => {
                      // props.onChange(data);
                      props.onChange(data.name);
                    }}
                  />
                )}
                name={`sourceSubChannel`}
                control={control}
              />
            </Grid>

            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Order No</p>
              <TextInputField
                readOnly={true}
                inputRef={register()}
                name="orderNo"
                className={checkError(errors, "orderNo")}
                placeholder="Order No"
              />
              <input type="hidden" ref={register()} name="_id" />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Ready Date</p>
              <Controller
                name={`readyDate`}
                control={control}
                defaultValue={null}
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
              <p className={classes.formLabel}>Personal Stylist</p>
              <Controller
                render={(props) => {
                  return (
                    <Autocomplete
                      {...props}
                      options={stylists}
                      style={{ width: "100%" }}
                      placeholder="Search for Stylist"
                      getOptionLabel={(option) => option.name || ""}
                      renderOption={(option) => <span>{option.name}</span>}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(_, data) => {
                        props.onChange(data);
                      }}
                    />
                  );
                }}
                defaultValue={getDefaultStylist()}
                name={`personalStylistId`}
                control={control}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Persona</p>
              <Controller
                render={(props) => {
                  return (
                    <Autocomplete
                      {...props}
                      options={persona}
                      style={{ width: "100%" }}
                      placeholder="Select persona"
                      getOptionLabel={(option) => option.name || ""}
                      renderOption={(option) => <span>{option.name}</span>}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(_, data) => {
                        props.onChange(data);
                      }}
                    />
                  );
                }}
                name={`customerPersonaIds`}
                control={control}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Trial Date</p>
              <Controller
                name={`trialDate`}
                control={control}
                setValue={setValue}
                defaultValue={null}
                render={({ value, name }) => (
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      clearable
                      onChange={(date) => {
                        setValue(name, date);
                        const getFormValues = getValues();
                        setValue(
                          "orderItems",
                          _updateProductTrailDates(
                            date,
                            getFormValues.orderItems
                          )
                        );
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
              <p className={classes.formLabel}>Estm.Height(cm)</p>
              <TextInputField
                inputRef={register()}
                name="customerHeight"
                placeholder="Height"
                onChange={(e) => {}}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Estm.Weight(Kg)</p>
              <TextInputField
                inputRef={register()}
                name="customerWeight"
                placeholder="Weight"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Delivery Date</p>
              <Controller
                name={`deliveryDate`}
                control={control}
                setValue={setValue}
                defaultValue={null}
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
              <p className={classes.formLabel}>City</p>
              <TextInputField
                inputRef={register()}
                onChange={(e) => {}}
                name="customerCity"
                placeholder="City"
                className={checkError(errors, "customerCity")}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>StyleClub Member</p>
              <Controller
                control={control}
                name={`customerIsStyleClubMember`}
                defaultValue={null}
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    options={[
                      {
                        value: "YES",
                        name: "Yes",
                      },
                      {
                        value: "NO",
                        name: "No",
                      },
                    ]}
                    onChange={async (e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Segment</p>
              <Controller
                control={control}
                name={`customerSegment`}
                defaultValue={null}
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    options={[
                      {
                        name: "PREMIUM",
                        value: "PREMIUM",
                      },
                      {
                        name: "SUPER PREMIUM",
                        value: "SUPER_PREMIUM",
                      },
                      {
                        name: "LUXURY",
                        value: "LUXURY",
                      },
                      {
                        name: "SUPER LUXURY",
                        value: "SUPER_LUXURY",
                      },
                    ]}
                    onChange={async (e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <p className={classes.formLabel}>Secondary Stylists</p>
              <Controller
                render={(props) => {
                  return (
                    <Autocomplete
                      {...props}
                      multiple={true}
                      options={stylists}
                      style={{ width: "100%" }}
                      placeholder="Search for Stylist"
                      getOptionLabel={(option) => option.name || ""}
                      renderOption={(option) => <span>{option.name}</span>}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(_, data) => {
                        props.onChange(data);
                      }}
                    />
                  );
                }}
                defaultValue={[]}
                name={`secondaryStylistIds`}
                control={control}
              />
            </Grid>
          </Grid>
          <div className="orderFormTable">
            <table className="table">
              <tr style={{ backgroundColor: "cornsilk" }}>
                {initialConfig.data.tableRows.map((item, index) => (
                  <td style={{ paddingLeft: 10 }} key={index}>
                    {item}
                  </td>
                ))}
              </tr>

              <tbody>
                {fields.map((item, index) => (
                  <TableRow key={item.id}>
                    <td>
                      <Controller
                        control={control}
                        name={`orderItems[${index}].itemName`}
                        defaultValue={`${item.itemName}`}
                        render={(props) => (
                          <SelectDropDown
                            disabled={checkIsImagesUpload(item)}
                            value={props.value}
                            options={storeProducts}
                            onChange={async (e) => {
                              setOrderIndex(index);
                              setCatId(null);
                              props.onChange(e.target.value);
                              setProductOrderNumber([], true);
                            }}
                          />
                        )}
                      />
                    </td>
                    <td classes={{ root: classes.tableCellRoot }}>
                      <TextInputField
                        inputRef={register({
                          required: false,
                        })}
                        name={`orderItems[${index}].itemNumber`}
                        value={item.itemNumber}
                        readOnly
                      ></TextInputField>
                    </td>
                    <td classes={{ root: classes.tableCellRoot }}>
                      <Controller
                        render={(props) => (
                          <Autocomplete
                            disabled={item.itemName === "style_club"}
                            {...props}
                            options={colors}
                            style={{ width: 150 }}
                            placeholder="Select Color"
                            getOptionLabel={(option) => option.color || option}
                            renderOption={(option) => (
                              <span>{option.color}</span>
                            )}
                            renderInput={(params) => <TextField {...params} />}
                            onChange={(_, data) => {
                              props.onChange({
                                colorname: data.color,
                                color: data.color,
                              });
                            }}
                          />
                        )}
                        defaultValue={item.itemColor}
                        name={`orderItems[${index}].itemColor`}
                        control={control}
                        rules={{
                          required: false,
                        }}
                      />
                    </td>
                    <td classes={{ root: classes.tableCellRoot }}>
                      <TextInputField
                        name={`orderItems[${index}].fabricCode`}
                        readOnly={item.itemName === "style_club"}
                        defaultValue={item.fabricCode}
                        inputRef={register({
                          required: false,
                        })}
                        placeholder="Fabric Code"
                      />
                    </td>

                    <td classes={{ root: classes.tableCellRoot }}>
                      <input
                        type="hidden"
                        ref={register()}
                        name={`orderItems[${index}].fabricImage`}
                        value={item.fabricImage}
                      />
                      <input
                        type="hidden"
                        ref={register()}
                        value={item.fabricImageNote}
                        name={`orderItems[${index}].fabricImageNote`}
                      />
                      <Button
                        className={classes.btnClass}
                        variant="outlined"
                        size="small"
                        disabled={item.itemName === "style_club"}
                        onClick={() => {
                          setOrderIndex(index);
                          setSelectedItem(item);
                          setFabricImage(item.fabricImage);
                          setIsUploadFabricImage(true);
                        }}
                      >
                        {_.has(item, "fabricImage")
                          ? !_.isEmpty(item.fabricImage)
                            ? "View"
                            : "Upload"
                          : " Upload"}
                      </Button>
                    </td>
                    <td classes={{ root: classes.tableCellRoot }}>
                      <input
                        type="hidden"
                        ref={register()}
                        value={item.referenceImage}
                        name={`orderItems[${index}].referenceImage`}
                      />
                      <input
                        type="hidden"
                        ref={register()}
                        value={item.referenceImageNote}
                        name={`orderItems[${index}].referenceImageNote`}
                      />

                      <Button
                        className={classes.btnClass}
                        variant="outlined"
                        size="small"
                        disabled={item.itemName === "style_club"}
                        onClick={() => {
                          setOrderIndex(index);
                          setSelectedItem(item);
                          setReferenceImage(item.referenceImage);
                          setIsUploadRefImage(true);
                        }}
                      >
                        {_.has(item, "referenceImage")
                          ? !_.isEmpty(item.referenceImage)
                            ? "View"
                            : "Upload"
                          : " Upload"}
                      </Button>
                    </td>
                    <td classes={{ root: classes.tableCellRoot }}>
                      <input
                        type="hidden"
                        ref={register()}
                        value={item.styleDesignImage}
                        name={`orderItems[${index}].styleDesignImage`}
                      />
                      <input
                        type="hidden"
                        ref={register()}
                        value={item.styleDesignImageNote}
                        name={`orderItems[${index}].styleDesignImageNote`}
                      />
                      <input
                        type="hidden"
                        ref={register()}
                        value={item.styleDesign}
                        name={`orderItems[${index}].styleDesign`}
                      />
                      <Box style={{ display: "flex" }}>
                        <Button
                          className={classes.btnClass}
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setOrderIndex(index);
                            setSelectedItem(item);
                            setDesignerImage(item.styleDesignImage);
                            const _catId = checkStylingForm(
                              storeProducts,
                              item.itemName
                            );
                            if (_catId) {
                              setCatId(_catId);
                              setIsStylingForm(true);
                            } else {
                              setCatId(null);
                              setIsUploadDesignerImage(true);
                            }
                          }}
                        >
                          {changeButtonLabel(
                            item.itemName,
                            item.styleDesignImage
                          )}
                        </Button>
                        {!_.isEmpty(item.styleDesign) && (
                          <IconButton
                            onClick={() => {
                              const _catId = checkStylingForm(
                                storeProducts,
                                item.itemName
                              );
                              if (_catId) {
                                setCatId(_catId);
                                setSelectedItem(item);
                                setViewPdf(true);
                              }
                            }}
                            style={{ padding: 0 }}
                          >
                            <img width={30} src="/icons/pdfIcon.png" />
                          </IconButton>
                        )}
                      </Box>
                    </td>

                    <td classes={{ root: classes.tableCellRoot }}>
                      <Controller
                        name={`orderItems[${index}].trialDate`}
                        control={control}
                        rules={{
                          required: false,
                        }}
                        setValue={setValue}
                        defaultValue={item.trialDate || moment(new Date())}
                        render={({ value, name }) => (
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                              clearable
                              className={checkError(errors, name)}
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
                    </td>

                    <td classes={{ root: classes.tableCellRoot }}>
                      <TextInputField
                        type="number"
                        name={`orderItems[${index}].itemPrice`}
                        defaultValue={item.itemPrice}
                        inputRef={register({
                          required: false,
                        })}
                        id="fabric-code-input"
                        placeholder="Price"
                      />
                    </td>
                    <td classes={{ root: classes.tableActionButtons }}>
                      {index !== 0 && (
                        <IconButton
                          onClick={() => {
                            remove(index);
                          }}
                          size="small"
                        >
                          <DeleteIcon style={{ color: "crimson" }} />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() => {
                          setOrderIndex(index);
                          const appendValue = {
                            ...initialConfig.data.orderItems[0],
                          };
                          append(appendValue);
                          setProductOrderNumber(appendValue, false);
                        }}
                        size="small"
                      >
                        <AddBoxIcon style={{ color: "cadetblue" }} />
                      </IconButton>
                    </td>
                  </TableRow>
                ))}

                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    colSpan={6}
                  >
                    Total
                  </td>
                  <td colSpan={2}></td>
                  <td colSpan={2}>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <span style={{ fontWeight: "bold" }}> र</span>
                      </Box>
                      <Box>
                        <TextInputField
                          type="number"
                          name="orderTotal"
                          readOnly={true}
                          defaultValue={0}
                          inputRef={register()}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            paddingTop: 0,
                            paddingBottom: 0,
                            height: "auto",
                            fontWeight: "bold",
                          }}
                        />
                      </Box>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    colSpan={6}
                  >
                    Other Charges
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    <Button
                      style={{ marginTop: 5, marginBottom: 5 }}
                      onClick={() => {
                        setIsOtherCharges(true);
                      }}
                    >
                      View/Add
                    </Button>
                  </td>
                  <td colSpan={2}>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <TextInputField
                          type="number"
                          name="otherCharges"
                          readOnly={true}
                          defaultValue={0}
                          inputRef={register()}
                        />
                      </Box>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    colSpan={6}
                  >
                    Grand Total
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}></td>
                  <td colSpan={2}>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <span style={{ fontWeight: "bold" }}> र</span>
                      </Box>
                      <Box>
                        <TextInputField
                          type="number"
                          name="afterChargesTotal"
                          readOnly={true}
                          defaultValue={0}
                          inputRef={register()}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            paddingTop: 0,
                            paddingBottom: 0,
                            height: "auto",
                            fontWeight: "bold",
                          }}
                        />
                      </Box>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    colSpan={6}
                  >
                    Deductions
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    <Button
                      style={{ marginTop: 5, marginBottom: 5 }}
                      onClick={() => {
                        setIsDeductionsPayment(true);
                      }}
                    >
                      View/Add
                    </Button>
                  </td>
                  <td colSpan={2}>
                    <TextInputField
                      type="number"
                      name="deductions"
                      readOnly={true}
                      defaultValue={0}
                      inputRef={register()}
                    />
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    colSpan={6}
                  >
                    Net Amount
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}></td>
                  <td colSpan={2}>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <span style={{ fontWeight: "bold" }}> र</span>
                      </Box>
                      <Box>
                        <TextInputField
                          type="number"
                          name="afterDeductionsTotal"
                          readOnly={true}
                          defaultValue={0}
                          inputRef={register()}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            paddingTop: 0,
                            paddingBottom: 0,
                            height: "auto",
                            fontWeight: "bold",
                          }}
                        />
                      </Box>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    colSpan={6}
                  >
                    Advance payment
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}>
                    <Button
                      onClick={() => {
                        setIsAdvancePayment(true);
                      }}
                    >
                      View/Add
                    </Button>
                  </td>
                  <td colSpan={2}>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <span style={{ fontWeight: "bold" }}> र</span>
                      </Box>
                      <Box>
                        <TextInputField
                          type="number"
                          name="paymentBreakdownTotal"
                          readOnly={true}
                          defaultValue={0}
                          inputRef={register()}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            paddingTop: 0,
                            paddingBottom: 0,
                            height: "auto",
                            fontWeight: "bold",
                          }}
                        />
                      </Box>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    colSpan={6}
                  >
                    Balance Amount
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}></td>
                  <td colSpan={2}>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <span style={{ fontWeight: "bold" }}> र</span>
                      </Box>
                      <Box>
                        <TextInputField
                          type="number"
                          name="balanceAmount"
                          readOnly={true}
                          defaultValue={0}
                          inputRef={register()}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            paddingTop: 0,
                            paddingBottom: 0,
                            height: "auto",
                            fontWeight: "bold",
                          }}
                        />
                      </Box>
                    </Box>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      textAlign: "right",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    colSpan={6}
                  >
                    Order Status
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={2}></td>
                  <td colSpan={2}>
                    <Controller
                      control={control}
                      name="orderStatus"
                      defaultValue="DRAFT"
                      render={(props) => (
                        <SelectDropDown
                          value={props.value}
                          options={initialConfig.data.orderStatus}
                          onChange={(e) => {
                            props.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Box p={2}>
            <Button
              style={{ marginRight: 10 }}
              disabled={loadingSUSO}
              onClick={() => {
                const formData = getValues();
                onSaveDraft(formData);
              }}
            >
              Save Draft
            </Button>
            <Button
              disabled={isSubmit}
              color="secondary"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Box>
        </Fragment>
      )}

      <InfoDialogComponent
        onCloseModel={() => {
          setOpenModel(false);
        }}
        open={openModel}
      >
        <Box pt={3} pl={3} pr={3} pb={2}>
          <Typography variant="h6" component="h6">
            Create a New User
          </Typography>
        </Box>
        <Divider />
        <Box p={3}>
          <AdUserForm
            mobileNumber={variables?.phone}
            cCode={countryCode}
            onClickSubmit={async (data) => {
              setSignupUser(data);
              const { user } = session;
              const findStylist = _.find(
                user.teams,
                (item) =>
                  item.roleIdentifier === "personal_stylist" ||
                  item.roleIdentifier === "head_stylist"
              );

              await createUserForOrder({
                variables: {
                  userData: getUserRegisterPayload(
                    data,
                    countryCode,
                    findStylist
                  ),
                },
              });
            }}
            isSubmitting={loadingCUFO}
          />
        </Box>
      </InfoDialogComponent>

      <InfoDialogComponent
        open={isAdvancePayment}
        maxWidth="md"
        onCloseModel={() => {
          setIsAdvancePayment(false);
        }}
      >
        <Box p={1}>
          <Typography variant="h6">Add Payment</Typography>
        </Box>
        <Divider />
        <AdvancePayment
          onCloseModel={(data) => {
            setPaymentBreakdown(data.paymentBreakdown);
            setIsAdvancePayment(false);
          }}
          formData={paymentBreakdown}
        />
      </InfoDialogComponent>

      <InfoDialogComponent
        open={isOtherCharges}
        maxWidth="md"
        onCloseModel={() => {
          setIsOtherCharges(false);
        }}
      >
        <Box p={1}>
          <Typography variant="h6">Add Other Charges</Typography>
        </Box>
        <Divider />
        <OtherCharges
          data={otherChargesBreakdown}
          onCloseModel={(data) => {
            setOtherChargesBreakdown(data.otherChargesBreakdown);
            setIsOtherCharges(false);
          }}
          formfields={{
            field_1: "otherChargesBreakdown",
            field_2: "otherCharges",
          }}
        />
      </InfoDialogComponent>
      <InfoDialogComponent
        open={isDeductionsPayment}
        maxWidth="md"
        onCloseModel={() => {
          setIsDeductionsPayment(false);
        }}
      >
        <Box p={1}>
          <Typography variant="h6">Add Deductions Charges</Typography>
        </Box>
        <Divider />
        <OtherCharges
          data={deductionsBreakdown}
          onCloseModel={(data) => {
            setDeductionsBreakdown(data.deductionsBreakdown);
            setIsDeductionsPayment(false);
          }}
          formfields={{
            field_1: "deductionsBreakdown",
            field_2: "deductions",
          }}
        />
      </InfoDialogComponent>

      <InfoDialogComponent
        open={isUploadFabricImage}
        maxWidth="xs"
        onCloseModel={() => {
          const getFormValues = getValues();
          const orderItems = getFormValues.orderItems;
          orderItems[orderIndex]["fabricImageNote"] =
            selectItem.fabricImageNote;
          orderItems[orderIndex]["fabricImage"] = selectItem.fabricImage;
          setValue("orderItems", orderItems);
          setIsUploadFabricImage(false);
        }}
      >
        <Box p={1}>
          <Typography variant="h6">
            Upload Fabric Image
            {selectItem && `(${selectItem.itemName}-${selectItem.itemNumber})`}
          </Typography>
        </Box>
        <Divider />
        {selectItem && (
          <Box p={0}>
            <ImageUpload
              onChange={async (imageList) => {
                const file = imageList[0].file;
                const image = await resizeFile(file);
                const newFile = dataURIToBlob(image);
                saveFabricImage(file, "fabric", selectItem.itemNumber);
              }}
              imgUrl={fabricImage ? fabricImage : "/images/upload.png"}
              imgWidth={"100%"}
              imgHeight={"100%"}
              server={fabricImage ? true : false}
              btnTitle={`Upload Fabric Image`}
              loading={isImageUpload}
              onDelete={() => setFabricImage(null)}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={1}
            >
              <textarea
                name="fabricImageNote"
                defaultValue={
                  _.has(selectItem, "fabricImageNote")
                    ? selectItem.fabricImageNote
                    : ""
                }
                onChange={(e) => {
                  selectItem.fabricImageNote = e.target.value;
                }}
                placeholder="Add Note"
                rows="4"
                cols="50"
              ></textarea>
            </Box>
          </Box>
        )}
      </InfoDialogComponent>

      <InfoDialogComponent
        open={isUploadRefImage}
        maxWidth="xs"
        onCloseModel={() => {
          const getFormValues = getValues();
          const orderItems = getFormValues.orderItems;
          orderItems[orderIndex]["referenceImage"] = selectItem.referenceImage;
          orderItems[orderIndex]["referenceImageNote"] =
            selectItem.referenceImageNote;
          setValue("orderItems", orderItems);
          setIsUploadRefImage(false);
        }}
      >
        <Box p={1}>
          <Typography variant="h6">
            Upload Reference Image
            {selectItem && `(${selectItem.itemName}-${selectItem.itemNumber})`}
          </Typography>
        </Box>
        <Divider />
        {selectItem && (
          <Box p={0}>
            <ImageUpload
              onChange={async (imageList) => {
                const file = imageList[0].file;
                // const image = await resizeFile(file);
                saveRefereImage(file, "reference", selectItem.itemNumber);
              }}
              imgUrl={referenceImage ? referenceImage : "/images/upload.png"}
              imgWidth={"100%"}
              imgHeight={"100%"}
              server={referenceImage ? true : false}
              btnTitle={`Upload Reference Image`}
              loading={isImageUpload}
              onDelete={() => setReferenceImage(null)}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={1}
            >
              <textarea
                name="referenceImageNote"
                defaultValue={
                  _.has(selectItem, "referenceImageNote")
                    ? selectItem.referenceImageNote
                    : ""
                }
                onChange={(e) => {
                  selectItem.referenceImageNote = e.target.value;
                }}
                placeholder="Add Note"
                rows="4"
                cols="50"
              ></textarea>
            </Box>
          </Box>
        )}
      </InfoDialogComponent>
      <InfoDialogComponent
        open={isUploadDesignerImage}
        maxWidth="xs"
        onCloseModel={() => {
          const getFormValues = getValues();
          const orderItems = getFormValues.orderItems;
          orderItems[orderIndex]["styleDesignImageNote"] =
            selectItem.styleDesignImageNote;
          orderItems[orderIndex]["styleDesignImage"] =
            selectItem.styleDesignImage;
          setValue("orderItems", orderItems);
          setIsUploadDesignerImage(false);
        }}
      >
        <Box p={1}>
          <Typography variant="h6">
            Upload Designer Image
            {selectItem && `(${selectItem.itemName}-${selectItem.itemNumber})`}
          </Typography>
        </Box>
        <Divider />
        {selectItem && (
          <Box p={0}>
            <ImageUpload
              onChange={async (imageList) => {
                const file = imageList[0].file;
                const image = await resizeFile(file);
                const newFile = dataURIToBlob(image);
                saveDesignerImage(file, "style", selectItem.itemNumber);
              }}
              imgUrl={designerImage ? designerImage : "/images/upload.png"}
              imgWidth={"100%"}
              imgHeight={"100%"}
              server={designerImage ? true : false}
              btnTitle={`Upload Designer Image`}
              loading={isImageUpload}
              onDelete={() => setFabricImage(null)}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={1}
            >
              <textarea
                name="styleDesignImageNote"
                defaultValue={
                  _.has(selectItem, "styleDesignImageNote")
                    ? selectItem.styleDesignImageNote
                    : ""
                }
                onChange={(e) => {
                  selectItem.styleDesignImageNote = e.target.value;
                }}
                placeholder="Add Note"
                rows="4"
                cols="50"
              ></textarea>
            </Box>
          </Box>
        )}
      </InfoDialogComponent>

      <InfoDialogComponent
        onCloseModel={() => {
          setCheckSubmitModel(false);
        }}
        open={checkSubmitModel}
        maxWidth="lg"
      >
        <Box p={1}>
          <Typography variant="h6">Order Details</Typography>
        </Box>
        <Divider />
        <Box p={1}>
          <OrderConfirmTable
            data={selectedOrder}
            showsubmitbtn={true}
            showEditPrnt={true}
          />
        </Box>
      </InfoDialogComponent>

      <InfoDialogComponent
        onCloseModel={() => {
          setIsStylingForm(false);
        }}
        open={isStylingForm}
        maxWidth="lg"
      >
        <StyleFormComponent
          catId={catId}
          selectedFormData={selectItem}
          onSubmit={(data, note) => {
            const getFormValues = getValues();
            const orderItems = getFormValues.orderItems;
            orderItems[orderIndex]["styleDesign"] = JSON.stringify({
              note: note,
              monogramLetter: "",
              handDesign: "",
              styleAttributes: data,
            });
            setValue("orderItems", orderItems);
            setIsStylingForm(false);
          }}
        />
      </InfoDialogComponent>
      <Dialog onClose={() => setViewPdf(false)} fullScreen open={viewPdf}>
        <DialogContent style={{ padding: 0 }}>
          {catId === "5da7220571762c2a58b27a66" ? (
            <SuitStyleFormPdf
              catId={catId}
              data={selectItem}
              orderData={getValues()}
              onClose={() => {
                setViewPdf(false);
              }}
            />
          ) : (
            <StyleFormPdf
              catId={catId}
              data={selectItem}
              orderData={getValues()}
              onClose={() => {
                setViewPdf(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default BasicOrderForm;
