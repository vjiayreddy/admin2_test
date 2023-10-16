import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
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
  Switch,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { initialConfig } from "../../../services/_orders";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {
  checkMobileValidation,
  emailValidation,
} from "../../../utils/validations";
import { useRouter } from "next/router";
import _ from "lodash";
import AdUserForm from "../addOrderUser";

// Apollo
import { GET_USER_BY_MOBILE } from "../../../apollo/queries/user";
import {
  INITIATE_STORE_ORDERS,
  CREATE_USER_STORE_ORDER,
  SAVE_STORE_ORDER,
} from "../../../apollo/queries/orders";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  _getFinalOrderPayload,
  _handleOrderCalculation,
  _handleOtherChargesTotal,
  getProductNumbers,
  _resetBasicUserData,
} from "../../../services/orderAutoSave";
// Service
import {
  getOrderByMobileNumber,
  resetBasicUserData,
  UpdateProductTrailDates,
  handleChangeField,
  updateProductNumber,
  handleChangeOrderItemField,
  handleAddOrderFormItem,
  removeOrderItem,
  orderCalculation,
  getSingleOrderByMobile,
  getItemByIndex,
  resizeFile,
  dataURIToBlob,
  getFinalOrderPayload,
  formRest,
  getUserRegisterPayload,
  getOrderId,
  updateImageStatus,
} from "../../../services/_orders";

// UI
import LoadingIndicatorComponent from "../../Ui/loading";
import OrderHeader from "./orderHeader";
import PhoneInputField from "../../Ui/formFields/phoneInput";
import TextInputField from "../../Ui/formFields/TextInputField";
import SelectDropDown from "../../Ui/formFields/SelectDropdown";
import InfoDialogComponent from "../../Ui/dialog/infoDialog";
import AdvancePayment from "./advancePayment";
import OtherCharges from "./payments/otherCharges";
import ImageUpload from "../../Ui/upload";
import OrderConfirmTable from "../../Ui/tables/orderConfirm";
import { interval } from "rxjs";

const tableCols = ["Name", "Amount", "Note", "Action"];
const advaceTableCols = [
  "Date",
  "Amount",
  "Note",
  "Payment Type",
  "Advance",
  "Action",
];

const paymentModes = [
  {
    name: "Online",
    value: "online",
  },
  {
    name: "Google Pay",
    value: "googleplay",
  },
  {
    name: "Cash",
    value: "cash",
  },
  {
    name: "MSwipe",
    value: "mswipe",
  },
  {
    name: "Razor Pay",
    value: "razorpay",
  },
  {
    name: "Ezetap",
    value: "ezetap",
  },
 
  {
    name: "Phone pe POS",
    value: "phonepepos",
  },
  {
    name: "Phone pe QR",
    value: "phonepeqr",
  },
  {
    name: "PSB QR",
    value: "psbqr",
  },
];

const BasicOrderForm = () => {
  const {
    control,
    reset,
    getValues,
    register,
    errors,
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      orderItems: initialConfig.data.orderItems,
      otherChargesBreakdown: [
        {
          name: "",
          amount: 0,
          note: "",
        },
      ],
      deductionsBreakdown: [
        {
          name: "",
          amount: 0,
          note: "",
        },
      ],
      paymentBreakdown: [
        {
          date: moment(new Date()),
          amount: 0,
          modeOfPayment: "online",
          note: "",
          isAdvance: true,
        },
      ],
      otherCharges: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderItems",
  });

  const {
    fields: otherChargesFields,
    append: otherChargesAppend,
    remove: otherChargesRemove,
  } = useFieldArray({
    control,
    name: "otherChargesBreakdown",
  });

  const {
    fields: deductionFields,
    append: deductionAppend,
    remove: deductionRemove,
  } = useFieldArray({
    control,
    name: "deductionsBreakdown",
  });

  const {
    fields: advanceFields,
    append: advanceAppend,
    remove: advanceRemove,
  } = useFieldArray({
    control,
    name: "paymentBreakdown",
  });

  const classes = useStyles();
  let _timerService = interval(30000);
  const sub = useRef();
  const orderItem = watch(["orderItems"]);
  const otherChargesBreakdown = watch(["otherChargesBreakdown"]);
  const deductionChargesBreakdown = watch(["deductionsBreakdown"]);
  const advancePayment = watch(["paymentBreakdown"]);
  const [countryCode, setCountryCode] = useState("91");
  const [orderInfo, setOrderInfo] = useState(null);
  const [user, setUser] = useState(null);
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
  const [autoSave, setAutoSave] = useState(false);

  const [saveStoreOrder, { data: dataSUSO, loading: loadingSUSO }] =
    useMutation(SAVE_STORE_ORDER, {
      onCompleted(data) {
        console.log("Order Saved");
      },
      onError(error) {
        console.log(error);
      },
    });

  // Auto save service
  useEffect(() => {
    if (autoSave) {
      sub.current = _timerService.subscribe((res) => {
        const getFormValues = getValues();
        const orderId = orderInfo ? orderInfo.orderId : "";
        const userId = user ? user._id : "";
        const payload = _getFinalOrderPayload(getFormValues, orderId, userId);
        if (!loadingSUSO) {
          saveStoreOrder({
            variables: {
              params: payload,
            },
          });
        }
      });
    } else {
      if (sub.current) {
        sub.current.unsubscribe();
      }
    }
  }, [autoSave]);

  // Clean up when component distroy
  useEffect(() => {
    return () => {
      if (sub.current) {
        setAutoSave(false);
        sub.current.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(orderItem)) {
      _handleOrderCalculation(
        orderItem,
        otherChargesBreakdown,
        deductionChargesBreakdown,
        advancePayment,
        setValue
      );
    }
  }, [
    orderItem,
    otherChargesBreakdown,
    deductionChargesBreakdown,
    advancePayment,
  ]);

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

  const [_initiateStoreOrder, { loading: loadingSO, data: dataSO }] =
    useMutation(INITIATE_STORE_ORDERS);

  useEffect(async () => {
    if (!_.isEmpty(getSingleUserBasicData)) {
      setUser(getSingleUserBasicData);
      await _initiateStoreOrder({
        variables: {
          userId: getSingleUserBasicData._id,
        },
      });
    }
  }, [getSingleUserBasicData]);

  useEffect(() => {
    if (!_.isEmpty(dataSO)) {
      setOrderInfo(dataSO.initiateStoreOrder);
      _resetBasicUserData(
        getSingleUserBasicData,
        dataSO.initiateStoreOrder,
        setValue
      );
      setAutoSave(true);
    }
  }, [dataSO]);

  const checkError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? classes.errorInput : "";
  };

  const onSubmit = (data) => {
    // const payload = getFinalOrderPayload(
    //   getSingleOrderByMobile(data.customerPhone)
    // );
    // setSelectedOrder(payload);
    // setCheckSubmitModel(true);
    console.log(data);
  };

  useEffect(() => {
    if (!_.isEmpty(router.query.edit)) {
      if (!_.isEmpty(getOrderByMobileNumber(router.query.edit))) {
        reset(getOrderByMobileNumber(router.query.edit));
      }
    }
  }, [router]);

  const saveRefereImage = (file, imgType, orderNo, itemNumber) => {
    var formData = new FormData();
    formData.append("imageFile", file);
    setIsImageUpload(true);
    axios
      .post(
        `https://api3.myperfectfit.co.in:5679/v2/api/storeProductOrder/images/${imgType}/${orderNo}/${itemNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setTimeout(function () {
          const phone = getValues("customerPhone");
          setIsImageUpload(false);
          setReferenceImage(res.data.details.imageUrl);
          updateImageStatus(
            "referenceImage",
            orderIndex,
            res.data.details.imageUrl,
            phone
          );
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
          _formData.orderItems[orderIndex]["fabricImage"] =
            res.data.details.imageUrl;
          setValue("orderItems", _formData.orderItems);
        }, 5000);
      })
      .catch((error) => {
        setIsImageUpload(false);
        alert("Something went to wrong please try again");
      });
  };
  const saveDesignerImage = (file, imgType, orderNo, itemNumber) => {
    var formData = new FormData();
    formData.append("imageFile", file);
    setIsImageUpload(true);
    axios
      .post(
        `https://api3.myperfectfit.co.in:5679/v2/api/storeProductOrder/images/${imgType}/${orderNo}/${itemNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setTimeout(function () {
          const phone = getValues("customerPhone");
          setIsImageUpload(false);
          setDesignerImage(res.data.details.imageUrl);
          updateImageStatus(
            "styleDesignImage",
            orderIndex,
            res.data.details.imageUrl,
            phone
          );
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

  console.log(selectedOrder);

  return (
    <Fragment>
      <OrderHeader
        title={
          !_.isEmpty(router.query.edit) ? "Edit Order" : "Create New Order"
        }
        btnTitle="Share"
        onClick={() => {}}
      />
      {loading ? (
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
                  defaultValue={countryCode}
                  onChange={(value) => setCountryCode(value)}
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
              <Grid style={{ flexGrow: 1 }} item>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box>{loadingSUSO && <CircularProgress size={25} />}</Box>
                  <Box></Box>
                </Box>
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
              <p className={classes.formLabel}>Studio Id</p>
              <Controller
                control={control}
                name="studioId"
                defaultValue="HYSDO1"
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                    }}
                    options={initialConfig.data.studioCodes}
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
                className={checkError(errors, "customerFirstName")}
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
                    value: false,
                  },
                })}
                name="customerLastName"
                placeholder="Last Name"
                InputProps={{
                  disableUnderline: true,
                }}
                className={checkError(errors, "customerLastName")}
              />
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
                placeholder="Email Address"
                className={checkError(errors, "customerEmail")}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Customer Id</p>
              <TextInputField
                readOnly={false}
                inputRef={register({
                  required: {
                    value: false,
                  },
                })}
                name="customerId"
                placeholder="Customer Id"
                className={checkError(errors, "customerId")}
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
              <p className={classes.formLabel}>Source</p>
              <Controller
                render={(props) => (
                  <Autocomplete
                    {...props}
                    options={initialConfig.data.source}
                    style={{ width: "100%" }}
                    placeholder="Select Source"
                    getOptionLabel={(option) => option || ""}
                    renderOption={(option) => <span>{option}</span>}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(_, data) => {
                      props.onChange(data);
                    }}
                  />
                )}
                name={`sourceChannel`}
                control={control}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Order No</p>
              <TextInputField
                readOnly={true}
                inputRef={register({
                  required: {
                    value: false,
                  },
                })}
                name="orderNo"
                className={checkError(errors, "orderNo")}
                placeholder="Order No"
              />
              <input type="hidden" ref={register} name="_id" />
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
                defaultValue={initialConfig.data.personalStylistId}
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
                name={`personalStylistId`}
                control={control}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Persona</p>
              <Controller
                defaultValue={initialConfig.data.customerPersonaIds}
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
                defaultValue={moment(new Date())}
                render={({ value, name }) => (
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      clearable
                      onChange={(date) => {
                        setValue(name, date);
                        reset(
                          UpdateProductTrailDates(
                            getValues("customerPhone"),
                            date
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
                inputRef={register({
                  required: {
                    value: true,
                  },
                })}
                name="customerHeight"
                placeholder="Height"
                className={checkError(errors, "customerHeight")}
                onChange={(e) => {}}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Estm.Weight(Kg)</p>
              <TextInputField
                inputRef={register({
                  required: {
                    value: false,
                  },
                })}
                onChange={(e) => {}}
                className={checkError(errors, "customerWeight")}
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
                      format="DD/MM/YYYY"
                      onChange={(date) => {
                        setValue(name, date);
                      }}
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
                inputRef={register({
                  required: {
                    value: false,
                  },
                })}
                name="customerCity"
                placeholder="City"
                className={checkError(errors, "customerCity")}
                InputProps={{
                  disableUnderline: true,
                }}
              />
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
                              className={checkError(
                                errors,
                                `orderItems[${index}].itemName`
                              )}
                              options={storeProducts}
                              onChange={(e) => {
                                props.onChange(e.target.value);
                                const formData = getValues();
                                if (
                                  _.has(formData, "orderItems") &&
                                  !_.isEmpty(formData.orderItems)
                                ) {
                                  setValue(
                                    "orderItems",
                                    getProductNumbers(
                                      formData.orderItems,
                                      formData.orderNo
                                    )
                                  );
                                }
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
                          className={checkError(
                            errors,
                            `orderItems[${index}].itemNumber`
                          )}
                        ></TextInputField>
                      </td>
                      <td classes={{ root: classes.tableCellRoot }}>
                        <Controller
                          render={(props) => (
                            <Autocomplete
                              {...props}
                              options={colors}
                              style={{ width: 150 }}
                              className={checkError(
                                errors,
                                `orderItems[${index}].itemColor`
                              )}
                              placeholder="Select Color"
                              getOptionLabel={(option) =>
                                option.color || option
                              }
                              renderOption={(option) => (
                                <span>{option.color}</span>
                              )}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              onChange={(_, data) => {
                                props.onChange({
                                  colorname: data.color,
                                  color: data.color,
                                });
                              }}
                            />
                          )}
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
                          defaultValue={
                            !_.isEmpty(item.fabricCode) ? item.fabricCode : ""
                          }
                          inputRef={register({
                            required: false,
                          })}
                          className={checkError(
                            errors,
                            `orderItems[${index}].fabricCode`
                          )}
                          id="fabric-code-input"
                          placeholder="Fabric Code"
                          onChange={(e) => {}}
                        />
                      </td>

                      <td classes={{ root: classes.tableCellRoot }}>
                        <Button
                          className={classes.btnClass}
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setOrderIndex(index);
                            const formData = getValues();
                            if (
                              _.has(formData, "orderItems") &&
                              !_.isEmpty(formData.orderItems)
                            ) {
                              setSelectedItem(formData.orderItems[index]);
                              setFabricImage(
                                formData.orderItems[index].fabricImage
                              );
                              setIsUploadFabricImage(true);
                            }
                          }}
                        >
                          {_.has(item, "fabricImage")
                            ? !_.isEmpty(item.fabricImage)
                              ? "View"
                              : "Upload"
                            : " Upload"}
                        </Button>
                        <input
                          type="hidden"
                          ref={register()}
                          name={`orderItems[${index}].fabricImage`}
                        />
                        <input
                          type="hidden"
                          ref={register()}
                          name={`orderItems[${index}].fabricImageNote`}
                        />
                      </td>
                      <td classes={{ root: classes.tableCellRoot }}>
                        <Button
                          className={classes.btnClass}
                          variant="outlined"
                          size="small"
                          onClick={() => {}}
                        >
                          {_.has(item, "referenceImage")
                            ? !_.isEmpty(item.referenceImage)
                              ? "View"
                              : "Upload"
                            : " Upload"}
                        </Button>
                        <input
                          type="hidden"
                          ref={register()}
                          name={`orderItems[${index}].referenceImage`}
                        />
                        <input
                          type="hidden"
                          ref={register()}
                          name={`orderItems[${index}].referenceImageNote`}
                        />
                      </td>
                      <td classes={{ root: classes.tableCellRoot }}>
                        <Button
                          className={classes.btnClass}
                          variant="outlined"
                          size="small"
                          onClick={() => {}}
                        >
                          {_.has(item, "styleDesignImage")
                            ? !_.isEmpty(item.styleDesignImage)
                              ? "View"
                              : "Upload"
                            : " Upload"}
                        </Button>
                        <input
                          type="hidden"
                          ref={register()}
                          name={`orderItems[${index}].styleDesignImage`}
                        />
                        <input
                          type="hidden"
                          ref={register()}
                          name={`orderItems[${index}].styleDesignImageNote`}
                        />
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
                                invalidLabel=""
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
                          className={checkError(
                            errors,
                            `orderItems[${index}].itemPrice`
                          )}
                          inputRef={register({
                            required: false,
                          })}
                          id="fabric-code-input"
                          placeholder="Price"
                          onChange={(e) => {}}
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
                            const appendValue = {
                              ...initialConfig.data.orderItems,
                              trialDate: getValues("trialDate"),
                            };
                            append(appendValue);
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
                      style={{ backgroundColor: "#E0F2F1", padding: "8px" }}
                      colSpan={10}
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <span
                            style={{
                              textAlign: "right",
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            Add Other Charges
                          </span>
                        </Box>
                        <Box>
                          <Button style={{ margin: 0 }} onClick={() => {}}>
                            View/Add
                          </Button>
                        </Box>
                      </Box>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: 0, borderBottom: "none" }}
                      colSpan={10}
                    >
                      <div className="otherCharges">
                        <table className="table">
                          {tableCols.map((item, index) => (
                            <th
                              style={{ backgroundColor: "cornsilk" }}
                              key={index}
                            >
                              {item}
                            </th>
                          ))}
                          <tbody>
                            {otherChargesFields.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  <TextInputField
                                    type="text"
                                    name={`otherChargesBreakdown[${index}].name`}
                                    defaultValue={item.name}
                                    inputRef={register({
                                      required: true,
                                    })}
                                    placeholder="Name"
                                  />
                                </td>
                                <td>
                                  <TextInputField
                                    type="number"
                                    name={`otherChargesBreakdown[${index}].amount`}
                                    defaultValue={item.amount}
                                    inputRef={register({
                                      required: true,
                                    })}
                                    placeholder="Amount"
                                  />
                                </td>
                                <td>
                                  <textarea
                                    name={`otherChargesBreakdown[${index}].note`}
                                    ref={register({
                                      required: false,
                                    })}
                                    defaultValue={item.note}
                                    style={{ width: "100%", border: "none" }}
                                    placeholder="Add Note"
                                  ></textarea>
                                </td>
                                <td>
                                  <Box display="flex">
                                    {index !== 0 && (
                                      <IconButton
                                        onClick={() => {
                                          otherChargesRemove(index);
                                          otherChargesFields.splice(index, 1);
                                          otherChargesRemove(index);
                                        }}
                                        size="small"
                                      >
                                        <DeleteIcon
                                          style={{ color: "crimson" }}
                                        />
                                      </IconButton>
                                    )}

                                    <IconButton
                                      onClick={() => {
                                        const appendValue = {
                                          name: "",
                                          amount: 0,
                                          note: "",
                                        };
                                        otherChargesAppend(appendValue);
                                      }}
                                      size="small"
                                    >
                                      <AddBoxIcon
                                        style={{ color: "cadetblue" }}
                                      />
                                    </IconButton>
                                  </Box>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                      Other Charges Total
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
                            name="otherCharges"
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
                      style={{ backgroundColor: "#FFCCBC", padding: "8px" }}
                      colSpan={10}
                      className="otherCharges"
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <span
                            style={{
                              textAlign: "right",
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            Add Deduction Charges
                          </span>
                        </Box>
                        <Box>
                          <Button
                            style={{ margin: 0 }}
                            onClick={() => {
                              // if (parseFloat(getValues("orderTotal")) > 0) {
                              //   setIsOtherCharges(true);
                              // } else {
                              //   alert(
                              //     "Please add item price before add other charges"
                              //   );
                              // }
                            }}
                          >
                            View/Add
                          </Button>
                        </Box>
                      </Box>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: 0, borderBottom: "none" }}
                      colSpan={10}
                    >
                      <div className="otherCharges">
                        <table className="table">
                          {tableCols.map((item, index) => (
                            <th
                              style={{ backgroundColor: "cornsilk" }}
                              key={index}
                            >
                              {item}
                            </th>
                          ))}
                          <tbody>
                            {deductionFields.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  <TextInputField
                                    type="text"
                                    name={`deductionsBreakdown[${index}].name`}
                                    defaultValue={item.name}
                                    inputRef={register({
                                      required: true,
                                    })}
                                    placeholder="Name"
                                  />
                                </td>
                                <td>
                                  <TextInputField
                                    type="number"
                                    name={`deductionsBreakdown[${index}].amount`}
                                    defaultValue={item.amount}
                                    inputRef={register({
                                      required: true,
                                    })}
                                    placeholder="Amount"
                                  />
                                </td>
                                <td>
                                  <textarea
                                    name={`deductionsBreakdown[${index}].note`}
                                    ref={register({
                                      required: false,
                                    })}
                                    defaultValue={item.note}
                                    style={{ width: "100%", border: "none" }}
                                    placeholder="Add Note"
                                  ></textarea>
                                </td>
                                <td>
                                  <Box display="flex">
                                    {index !== 0 && (
                                      <IconButton
                                        onClick={() => {
                                          deductionRemove(index);
                                          otherChargesFields.splice(index, 1);
                                          deductionRemove(index);
                                        }}
                                        size="small"
                                      >
                                        <DeleteIcon
                                          style={{ color: "crimson" }}
                                        />
                                      </IconButton>
                                    )}

                                    <IconButton
                                      onClick={() => {
                                        const appendValue = {
                                          name: "",
                                          amount: 0,
                                          note: "",
                                        };
                                        deductionAppend(appendValue);
                                      }}
                                      size="small"
                                    >
                                      <AddBoxIcon
                                        style={{ color: "cadetblue" }}
                                      />
                                    </IconButton>
                                  </Box>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                      Deduction Charges Total
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
                            name="deductions"
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
                      style={{ backgroundColor: "#E0F2F1", padding: "8px" }}
                      colSpan={10}
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <span
                            style={{
                              textAlign: "right",
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            Advance Payment
                          </span>
                        </Box>
                        <Box>
                          <Button style={{ margin: 0 }} onClick={() => {}}>
                            View/Add
                          </Button>
                        </Box>
                      </Box>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: 0, borderBottom: "none" }}
                      colSpan={10}
                    >
                      <div className="otherCharges">
                        <table className="table">
                          {advaceTableCols.map((item, index) => (
                            <th
                              style={{ backgroundColor: "cornsilk" }}
                              key={index}
                            >
                              {item}
                            </th>
                          ))}
                          <tbody>
                            {advanceFields.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  <Controller
                                    name={`paymentBreakdown[${index}].date`}
                                    control={control}
                                    setValue={setValue}
                                    defaultValue={moment(new Date())}
                                    render={({ value, name }) => (
                                      <MuiPickersUtilsProvider
                                        utils={MomentUtils}
                                      >
                                        <KeyboardDatePicker
                                          clearable
                                          onChange={(date) => {
                                            setValue(name, date);
                                            //   handleChangeField("orderDate", date, getValues);
                                          }}
                                          format="DD/MM/YYYY"
                                          keyboardIcon={<EventIcon />}
                                          value={value}
                                        />
                                      </MuiPickersUtilsProvider>
                                    )}
                                  ></Controller>
                                </td>
                                <td>
                                  <TextInputField
                                    type="number"
                                    name={`paymentBreakdown[${index}].amount`}
                                    defaultValue={item.amount}
                                    inputRef={register({
                                      required: true,
                                    })}
                                    placeholder="Amount"
                                  />
                                </td>
                                <td>
                                  <textarea
                                    name={`paymentBreakdown[${index}].note`}
                                    ref={register({
                                      required: false,
                                    })}
                                    defaultValue={item.note}
                                    style={{
                                      width: "100%",
                                      border: "none",
                                    }}
                                    onChange={(e) => {}}
                                    placeholder="Add Note"
                                  ></textarea>
                                </td>
                                <td>
                                  <Controller
                                    control={control}
                                    name={`paymentBreakdown[${index}].modeOfPayment`}
                                    defaultValue={item.modeOfPayment}
                                    render={(props) => (
                                      <select
                                        style={{
                                          height: 40,
                                          border: "none",
                                        }}
                                      >
                                        {paymentModes.map((item, index) => (
                                          <option
                                            key={index}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </option>
                                        ))}
                                      </select>
                                    )}
                                  />
                                </td>
                                <td>
                                  <Controller
                                    name={`paymentBreakdown[${index}].isAdvance`}
                                    control={control}
                                    setValue={setValue}
                                    defaultValue={item.isAdvance}
                                    render={({ value, name }) => (
                                      <Checkbox
                                        onChange={(e) => {
                                          setValue(name, e.target.checked);
                                        }}
                                        inputRef={register({})}
                                        value={value}
                                        checked={value}
                                      />
                                    )}
                                  ></Controller>
                                </td>
                                <td>
                                  <Box display="flex">
                                    {index !== 0 && (
                                      <IconButton
                                        onClick={() => {
                                          fields.splice(index, 1);
                                          advanceRemove(index);
                                        }}
                                        size="small"
                                      >
                                        <DeleteIcon
                                          style={{ color: "crimson" }}
                                        />
                                      </IconButton>
                                    )}

                                    <IconButton
                                      onClick={() => {
                                        const appendValue = {
                                          date: moment(new Date()),
                                          amount: 0,
                                          modeOfPayment: "",
                                          note: "",
                                          isAdvance: false,
                                        };
                                        advanceAppend(appendValue);
                                      }}
                                      size="small"
                                    >
                                      <AddBoxIcon
                                        style={{ color: "cadetblue" }}
                                      />
                                    </IconButton>
                                  </Box>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                    <td style={{ textAlign: "center" }} colSpan={2}></td>
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
                        defaultValue="RUNNING"
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
          </Grid>
          <Box p={2}>
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
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
              await createUserForOrder({
                variables: {
                  userData: getUserRegisterPayload(data, countryCode),
                },
              });
            }}
            isSubmitting={loadingCUFO}
          />
        </Box>
      </InfoDialogComponent>

      <InfoDialogComponent
        open={isUploadFabricImage}
        maxWidth="xs"
        onCloseModel={() => {
          // const phone = getValues("customerPhone");
          // const getOrder = getOrderByMobileNumber(phone);
          // if (!_.isEmpty(getOrder)) {
          //   setValue("orderItems", getOrder.orderItems);
          // }
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
                  handleChangeOrderItemField(
                    "fabricImageNote",
                    e.target.value,
                    orderIndex,
                    getValues("customerPhone")
                  );
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
          const phone = getValues("customerPhone");
          const getOrder = getOrderByMobileNumber(phone);
          if (!_.isEmpty(getOrder)) {
            setValue("orderItems", getOrder.orderItems);
          }
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
                saveRefereImage(
                  file,
                  "reference",
                  getOrderId(getValues("customerPhone")),
                  selectItem.itemNumber
                );
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
                  handleChangeOrderItemField(
                    "referenceImageNote",
                    e.target.value,
                    orderIndex,
                    getValues("customerPhone")
                  );
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
          const phone = getValues("customerPhone");
          const getOrder = getOrderByMobileNumber(phone);
          if (!_.isEmpty(getOrder)) {
            setValue("orderItems", getOrder.orderItems);
          }
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
                saveDesignerImage(
                  file,
                  "style",
                  getOrderId(getValues("customerPhone")),
                  selectItem.itemNumber
                );
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
                  handleChangeOrderItemField(
                    "styleDesignImageNote",
                    e.target.value,
                    orderIndex,
                    getValues("customerPhone")
                  );
                }}
                placeholder="Add Note"
                rows="4"
                cols="50"
              ></textarea>
            </Box>
          </Box>
        )}
      </InfoDialogComponent>
      {/* <InfoDialogComponent
          onCloseModel={() => {
            const order = getSingleOrderByMobile(getValues("customerPhone"));
            if (_.isEmpty(order)) {
              formRest(setValue);
            }
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
        </InfoDialogComponent> */}
    </Fragment>
  );
};

export default BasicOrderForm;
