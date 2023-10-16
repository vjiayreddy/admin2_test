import React, { Fragment, useState, useEffect } from "react";
import { useGetOrderInitData } from "../../../utils/hooks/useGetInitialOrderData";
import useStyles from "./styles";
import {
  Grid,
  TextField,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
} from "../../../apollo/queries/orders";
import { useLazyQuery, useMutation } from "@apollo/client";
import axios from "axios";

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
  updateImageStatus,
  getOrderId,
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

const BasicOrderForm = () => {
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState("91");
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
  const {
    control,
    reset,
    getValues,
    register,
    errors,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      orderItems: initialConfig.data.orderItems,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderItems",
  });

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
      await _initiateStoreOrder({
        variables: {
          userId: getSingleUserBasicData._id,
        },
      });
    }
  }, [getSingleUserBasicData]);

  useEffect(() => {
    if (!_.isEmpty(dataSO)) {
      reset(
        resetBasicUserData(getSingleUserBasicData, dataSO.initiateStoreOrder)
      );
    }
  }, [dataSO]);

  const checkError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? classes.errorInput : "";
  };

  const onSubmit = (data) => {
    const payload = getFinalOrderPayload(
      getSingleOrderByMobile(data.customerPhone)
    );
    setSelectedOrder(payload);
    setCheckSubmitModel(true);
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
            getValues("customerPhone")
          );
        }, 5000);
      })
      .catch((error) => {
        setIsImageUpload(false);
        alert("Something went to wrong please try again");
      });
  };
  const saveFabricImage = (file, imgType, orderNo, itemNumber) => {
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
          setFabricImage(res.data.details.imageUrl);
          updateImageStatus(
            "fabricImage",
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
                  defaultValue="+91"
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
                      if (!_.isEmpty(getOrderByMobileNumber(phone))) {
                        const order = getOrderByMobileNumber(phone);
                        console.log(order);
                        setValue("orderItems", order.orderItems);
                        // reset(getOrderByMobileNumber(phone));
                      } else {
                        await getSingleUserBasicDetails({
                          variables: {
                            phone: phone,
                          },
                        });
                      }
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
              <p className={classes.formLabel}>Studio Id</p>
              <Controller
                control={control}
                name="studioId"
                defaultValue="HYSDO1"
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    options={initialConfig.data.studioCodes}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      handleChangeField(
                        "studioId",
                        e.target.value,
                        getValues("customerPhone")
                      );
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>First Name</p>
              <TextInputField
                onChange={(e) => {
                  handleChangeField(
                    "customerFirstName",
                    e.target.value,
                    getValues("customerPhone")
                  );
                }}
                inputRef={register({
                  required: {
                    value: true,
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
                    value: true,
                  },
                })}
                name="customerLastName"
                onChange={(e) => {
                  handleChangeField(
                    "customerLastName",
                    e.target.value,
                    getValues("customerPhone")
                  );
                }}
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
                        handleChangeField(
                          "orderDate",
                          date,
                          getValues("customerPhone")
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
              <p className={classes.formLabel}>Email</p>
              <TextInputField
                inputRef={register(emailValidation)}
                name="customerEmail"
                onChange={(e) => {
                  handleChangeField(
                    "customerEmail",
                    e.target.value,
                    getValues("customerPhone")
                  );
                }}
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
                readOnly={true}
                inputRef={register({
                  required: {
                    value: true,
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
                        handleChangeField(
                          "eventDate",
                          date,
                          getValues("customerPhone")
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
              <p className={classes.formLabel}>Source</p>
              <Controller
                render={(props) => (
                  <Autocomplete
                    {...props}
                    options={initialConfig.data.source}
                    style={{ width: "100%" }}
                    placeholder="Select Source"
                    className={checkError(errors, "sourceChannel")}
                    getOptionLabel={(option) => option || ""}
                    renderOption={(option) => <span>{option}</span>}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(_, data) => {
                      props.onChange(data);

                      handleChangeField(
                        "sourceChannel",
                        data,
                        getValues("customerPhone")
                      );
                    }}
                  />
                )}
                rules={{
                  required: true,
                }}
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
                    value: true,
                  },
                })}
                name="orderNo"
                className={checkError(errors, "orderNo")}
                placeholder="Order No"
              />
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
                        handleChangeField(
                          "readyDate",
                          date,
                          getValues("customerPhone")
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
              <p className={classes.formLabel}>Personal Stylist</p>
              <Controller
                render={(props) => {
                  return (
                    <Autocomplete
                      {...props}
                      options={stylists}
                      style={{ width: "100%" }}
                      className={checkError(errors, "customerPhone")}
                      placeholder="Search for Stylist"
                      getOptionLabel={(option) => option.name || ""}
                      renderOption={(option) => <span>{option.name}</span>}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(_, data) => {
                        props.onChange(data);
                        handleChangeField(
                          "personalStylistId",
                          data,
                          getValues("customerPhone")
                        );
                      }}
                    />
                  );
                }}
                rules={{
                  required: true,
                }}
                name={`personalStylistId`}
                control={control}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Persona</p>
              <Controller
                rules={{}}
                render={(props) => {
                  return (
                    <Autocomplete
                      {...props}
                      options={persona}
                      className={checkError(errors, `customerPersonaIds`)}
                      style={{ width: "100%" }}
                      placeholder="Select persona"
                      getOptionLabel={(option) => option.name || ""}
                      renderOption={(option) => <span>{option.name}</span>}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(_, data) => {
                        props.onChange(data);
                        handleChangeField(
                          "customerPersonaIds",
                          data,
                          getValues("customerPhone")
                        );
                      }}
                    />
                  );
                }}
                rules={{
                  required: true,
                }}
                name={`customerPersonaIds`}
                control={control}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Trial Date</p>
              <Controller
                name={`trialDate`}
                defaultValue={null}
                control={control}
                setValue={setValue}
                defaultValue={null}
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
                onChange={(e) => {
                  handleChangeField(
                    "customerHeight",
                    e.target.value,
                    getValues("customerPhone")
                  );
                }}
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
                    value: true,
                  },
                })}
                onChange={(e) => {
                  handleChangeField(
                    "customerWeight",
                    e.target.value,
                    getValues("customerPhone")
                  );
                }}
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
                      onChange={(date) => {
                        setValue(name, date);
                        handleChangeField(
                          "deliveryDate",
                          date,
                          getValues("customerPhone")
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
              <p className={classes.formLabel}>City</p>
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                  },
                })}
                onChange={(e) => {
                  handleChangeField(
                    "customerCity",
                    e.target.value,
                    getValues("customerPhone")
                  );
                }}
                name="customerCity"
                placeholder="City"
                className={checkError(errors, "customerCity")}
                InputProps={{
                  disableUnderline: true,
                }}
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
                  <tr>
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
                              handleChangeOrderItemField(
                                "itemName",
                                e.target.value,
                                index,
                                getValues("customerPhone")
                              );
                              reset(
                                updateProductNumber(getValues("customerPhone"))
                              );
                            }}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <TextInputField
                        inputRef={register({
                          required: true,
                        })}
                        name={`orderItems[${index}].itemNumber`}
                        value={item.itemNumber}
                        readOnly
                        className={checkError(
                          errors,
                          `orderItems[${index}].itemNumber`
                        )}
                        onBlur={(e) => {
                          handleChangeOrderItemField(
                            "itemNumber",
                            e.target.value,
                            index,
                            getValues("customerPhone")
                          );
                        }}
                      ></TextInputField>
                    </td>
                    <td>
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
                              handleChangeOrderItemField(
                                "itemColor",
                                {
                                  colorname: data.color,
                                  color: data.color,
                                },
                                index,
                                getValues("customerPhone")
                              );
                            }}
                          />
                        )}
                        name={`orderItems[${index}].itemColor`}
                        control={control}
                        rules={{
                          required: true,
                        }}
                      />
                    </td>
                    <td>
                      <TextInputField
                        name={`orderItems[${index}].fabricCode`}
                        defaultValue={
                          !_.isEmpty(item.fabricCode) ? item.fabricCode : ""
                        }
                        inputRef={register({
                          required: true,
                        })}
                        className={checkError(
                          errors,
                          `orderItems[${index}].fabricCode`
                        )}
                        id="fabric-code-input"
                        placeholder="Fabric Code"
                        onChange={(e) => {
                          handleChangeOrderItemField(
                            "fabricCode",
                            e.target.value,
                            index,
                            getValues("customerPhone")
                          );
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        className={classes.btnClass}
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          const phone = getValues("customerPhone");
                          const orderItem = getItemByIndex(index, phone);
                          if (
                            !_.isEmpty(orderItem) &&
                            !_.isEmpty(orderItem.itemNumber)
                          ) {
                            setOrderIndex(index);
                            setSelectedItem(orderItem);
                            setFabricImage(orderItem.fabricImage);
                            setIsUploadFabricImage(true);
                          } else {
                            alert("Please select product number");
                          }
                        }}
                      >
                        {_.has(item, "fabricImage")
                          ? !_.isEmpty(item.fabricImage)
                            ? "View"
                            : "Upload"
                          : " Upload"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        className={classes.btnClass}
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          const phone = getValues("customerPhone");
                          const orderItem = getItemByIndex(index, phone);
                          if (
                            !_.isEmpty(orderItem) &&
                            !_.isEmpty(orderItem.itemNumber)
                          ) {
                            setOrderIndex(index);
                            setSelectedItem(orderItem);
                            setReferenceImage(orderItem.referenceImage);
                            setIsUploadRefImage(true);
                          } else {
                            alert("Please select product number");
                          }
                        }}
                      >
                        {_.has(item, "referenceImage")
                          ? !_.isEmpty(item.referenceImage)
                            ? "View"
                            : "Upload"
                          : " Upload"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        className={classes.btnClass}
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          const getOrder = getSingleOrderByMobile(
                            getValues("customerPhone")
                          );

                          if (_.has(getOrder, "orderNo")) {
                            const orderItem = getItemByIndex(
                              index,
                              getValues("customerPhone")
                            );
                            if (!_.isEmpty(orderItem)) {
                              setOrderIndex(index);
                              setSelectedItem(orderItem);
                              setDesignerImage(
                                _.has(orderItem, "styleDesignImage")
                                  ? orderItem.styleDesignImage
                                  : null
                              );
                              setIsUploadDesignerImage(true);
                            }
                          }
                        }}
                      >
                        {_.has(item, "styleDesignImage")
                          ? !_.isEmpty(item.styleDesignImage)
                            ? "View"
                            : "Upload"
                          : " Upload"}
                      </Button>
                    </td>
                    <td>
                      <Controller
                        name={`orderItems[${index}].trialDate`}
                        control={control}
                        rules={{
                          required: true,
                        }}
                        setValue={setValue}
                        defaultValue={item.trialDate ? item.trialDate : null}
                        render={({ value, name }) => (
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                              invalidLabel=""
                              clearable
                              className={checkError(
                                errors,
                                `orderItems[${index}].trialDate`
                              )}
                              onChange={(date) => {
                                setValue(name, date);
                                handleChangeOrderItemField(
                                  "trialDate",
                                  date,
                                  index,
                                  getValues("customerPhone")
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
                    </td>
                    <td>
                      <TextInputField
                        type="number"
                        name={`orderItems[${index}].itemPrice`}
                        defaultValue={item.itemPrice}
                        className={checkError(
                          errors,
                          `orderItems[${index}].itemPrice`
                        )}
                        inputRef={register({
                          required: true,
                        })}
                        id="fabric-code-input"
                        placeholder="Price"
                        onChange={(e) => {
                          handleChangeOrderItemField(
                            "itemPrice",
                            e.target.value,
                            index,
                            getValues("customerPhone")
                          );
                          orderCalculation(
                            getValues("customerPhone"),
                            setValue
                          );
                        }}
                      />
                    </td>
                    <td>
                      {index !== 0 && (
                        <IconButton
                          onClick={() => {
                            remove(index);
                            removeOrderItem(index, getValues("customerPhone"));
                            orderCalculation(
                              getValues("customerPhone"),
                              setValue
                            );
                          }}
                          size="small"
                        >
                          <DeleteIcon style={{ color: "crimson" }} />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() => {
                          const appendValue = {
                            itemName: "full_shirt",
                            itemPrice: 0,
                            itemNumber: "",
                            fabricCode: "",
                            trialDate: getValues("trialDate"),
                          };
                          append(appendValue);
                          handleAddOrderFormItem(
                            getValues("customerPhone"),
                            appendValue
                          );
                          reset(
                            updateProductNumber(getValues("customerPhone"))
                          );
                        }}
                        size="small"
                      >
                        <AddBoxIcon style={{ color: "cadetblue" }} />
                      </IconButton>
                    </td>
                  </tr>
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
                        const getOrder = getSingleOrderByMobile(
                          getValues("customerPhone")
                        );
                        if (!_.isEmpty(getOrder)) {
                          if (getOrder.orderNo && getOrder.orderTotal > 0) {
                            setIsOtherCharges(true);
                          }
                        }
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
                        const getOrder = getSingleOrderByMobile(
                          getValues("customerPhone")
                        );
                        if (!_.isEmpty(getOrder)) {
                          if (getOrder.orderNo && getOrder.orderTotal > 0) {
                            setIsDeductionsPayment(true);
                          }
                        }
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
                        const getOrder = getSingleOrderByMobile(
                          getValues("customerPhone")
                        );
                        if (!_.isEmpty(getOrder)) {
                          if (getOrder.orderNo) {
                            setIsAdvancePayment(true);
                          }
                        }
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
                    Order Status
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
                    Balance Amount
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
                            handleChangeField(
                              "orderStatus",
                              e.target.value,
                              getValues("customerPhone")
                            );
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
        open={isAdvancePayment}
        maxWidth="md"
        onCloseModel={() => {
          const getOrder = getSingleOrderByMobile(getValues("customerPhone"));
          if (!_.isEmpty(getOrder)) {
            reset(getOrder);
          }
          setIsAdvancePayment(false);
        }}
      >
        <Box p={1}>
          <Typography variant="h6">Add Payment</Typography>
        </Box>
        <Divider />
        <AdvancePayment
          onCloseModel={() => {
            const getOrder = getSingleOrderByMobile(getValues("customerPhone"));
            if (!_.isEmpty(getOrder)) {
              reset(getOrder);
            }
            setIsAdvancePayment(false);
          }}
          getFomValues={getValues}
        />
      </InfoDialogComponent>
      <InfoDialogComponent
        open={isOtherCharges}
        maxWidth="md"
        onCloseModel={() => {
          const getOrder = getSingleOrderByMobile(getValues("customerPhone"));
          if (!_.isEmpty(getOrder)) {
            reset(getOrder);
          }
          setIsOtherCharges(false);
        }}
      >
        <Box p={1}>
          <Typography variant="h6">Add Other Charges</Typography>
        </Box>
        <Divider />
        <OtherCharges
          getFomValues={getValues}
          onCloseModel={() => {
            const getOrder = getSingleOrderByMobile(getValues("customerPhone"));
            if (!_.isEmpty(getOrder)) {
              reset(getOrder);
            }
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
          const getOrder = getSingleOrderByMobile(getValues("customerPhone"));
          if (!_.isEmpty(getOrder)) {
            reset(getOrder);
          }
          setIsDeductionsPayment(false);
        }}
      >
        <Box p={1}>
          <Typography variant="h6">Add Deductions Charges</Typography>
        </Box>
        <Divider />
        <OtherCharges
          onCloseModel={() => {
            const getOrder = getSingleOrderByMobile(getValues("customerPhone"));
            if (!_.isEmpty(getOrder)) {
              reset(getOrder);
            }
            setIsDeductionsPayment(false);
          }}
          getFomValues={getValues}
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
          const phone = getValues("customerPhone");
          const getOrder = getOrderByMobileNumber(phone);
          if (!_.isEmpty(getOrder)) {
            setValue("orderItems", getOrder.orderItems);
          }
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
                saveFabricImage(
                  file,
                  "fabric",
                  getOrderId(getValues("customerPhone")),
                  selectItem.itemNumber
                );
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
                style={{ whiteSpace: "pre-line", wordWrap: "break-word"}}
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
      <InfoDialogComponent
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
      </InfoDialogComponent>
    </Fragment>
  );
};

export default BasicOrderForm;
