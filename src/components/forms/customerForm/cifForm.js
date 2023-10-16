import React, { Fragment, useState, useEffect } from "react";
import { useGetOrderInitData } from "../../../utils/hooks/useGetInitialOrderData";
import useStyles from "./styles";
import Alert from "@material-ui/lab/Alert";

import {
  Grid,
  TextField,
  Box,
  Button,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import InfoDialogComponent from "../../Ui/dialog/infoDialog";
import AdUserForm from "../addOrderUser";
import { getUserRegisterPayload } from "../../../services/_orders";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  _resetBasicUserData,
  _getFinalOrderPayload,
  _resetOrderPayload,
  _updateProductTrailDates,
} from "../../../services/orderAutoSave";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { checkMobileValidation } from "../../../utils/validations";
import { useRouter } from "next/router";
import _ from "lodash";

// Apollo
import {
  GET_USER_WITH_OUT_CNO,
  CREATE_USER_FOR_CIF,
} from "../../../apollo/queries/user";
import { GET_SINGLE_STORE_ORDERBY_ID } from "../../../apollo/queries/orders";
import {
  SAVE_CUSTOMER_INFO,
  GET_SINGLE_CUSTOMER_INFO,
} from "../../../apollo/queries/customerinfo";
import { GET_ALL_SOURCE_CATEGORIES } from "../../../apollo/queries/leads";
import { useLazyQuery, useMutation } from "@apollo/client";

// UI
import LoadingIndicatorComponent from "../../Ui/loading";
import CustomerHeader from "./customerHeader";
import PhoneInputField from "../../Ui/formFields/phoneInput";
import TextInputField from "../../Ui/formFields/TextInputField";
import SelectDropDown from "../../Ui/formFields/SelectDropdown";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloseIcon from "@material-ui/icons/Close";
import EventIcon from "@material-ui/icons/Event";
import Typography from "@material-ui/core/Typography";
import { extractDateFormate } from "../../../utils/validations";

//import UppyFileUpload from "../../Ui/uppy";
const UppyUpload = dynamic(() => import("../../Ui/uppy"), { ssr: false });
import dynamic from "next/dynamic";

const initialOccasionDetails = [
  {
    occasion: "",
    budget: "",
    outfitsNote: "",
    refImage: "",
    priceQuote: 0,
  },
];

const studioCodes = [
  {
    name: "GROOM2B",
    label: "HYD1",
    value: "61c55048429a4414e8755e69",
  },
  {
    name: " My Perfect Fit",
    label: "HYD2",
    value: "61d3ef5a2aa36c23004375ec",
  },
  {
    name: "BLUTAILOR",
    label: "HYD3",
    value: "61d3ef622aa36c23004375ed",
  },
  {
    name: "MPF STYLE CLUB",
    label: "HYD4",
    value: "6502dd6bf765d205044dbdf8",
  },
];

const BasicCustomerForm = (props) => {
  const classes = useStyles();
  const { session } = props;
  const [openModel, setOpenModel] = useState(false);
  const [source, setSource] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uploadType, setUploadType] = useState("IMAGES");
  const [showUppy, setShowUppy] = useState(false);
  const [uploadedImages, setUploadImages] = useState([]);
  const [occasionIndex, setOccasionDetailsIndex] = useState(0);
  const [signupUser, setSignupUser] = useState(null);

  const {
    control,
    reset,
    getValues,
    register,
    errors,
    setValue,
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      occasionDetails: initialOccasionDetails,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "occasionDetails",
  });

  const [countryCode, setCountryCode] = useState("91");
  const [country, setCountry] = useState("in");
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);

  const budgetOptions = [
    {
      name: "10-20k",
      value: "FROM_10_TO_20K",
    },
    {
      name: "20-30k",
      value: "FROM_20_TO_30K",
    },
    {
      name: " 30-40k",
      value: "FROM_30_TO_40K",
    },
    {
      name: " 40-50k",
      value: "FROM_40_TO_50K",
    },
    {
      name: " 50-60k",
      value: "FROM_50_TO_60K",
    },
    {
      name: " 60-70k",
      value: "FROM_60_TO_70K",
    },
    {
      name: " 70-80k",
      value: "FROM_70_TO_80K",
    },
    {
      name: " 80-90k",
      value: "FROM_80_TO_90K",
    },

    {
      name: " 90-100k",
      value: "FROM_90_TO_100K",
    },
    {
      name: " Above 100k",
      value: "ABOVE_100K",
    },
  ];

  const eventType = [
    {
      name: "ENGAGEMENT",
      value: "ENGAGEMENT",
    },
    {
      name: "WEDDING",
      value: "WEDDING",
    },

    {
      name: "RECEPTION",
      value: "RECEPTION",
    },
    {
      name: "SANGEET",
      value: "SANGEET",
    },
    {
      name: "MEHNDI",
      value: "MEHNDI",
    },
    {
      name: "HALDI",
      value: "HALDI",
    },
    {
      name: "BIRTHDAY",
      value: "BIRTHDAY",
    },
    {
      name: "ANNIVERSARY",
      value: "ANNIVERSARY",
    },
    {
      name: "FRIEND_OR_RELATIVE_WEDDING",
      value: "FRIEND_OR_RELATIVE_WEDDING",
    },
    {
      name: "OTHERS",
      value: "OTHERS",
    },
  ];

  const customerInfoStatus = [
    {
      name: "CONFIRMED",
      value: "CONFIRMED",
    },

    {
      name: "UNCONFIRMED",
      value: "UNCONFIRMED",
    },
    {
      name: "BACKED OUT",
      value: "BACKED_OUT",
    },
  ];

  const [getAllSourceCategories, { loading: loadingSC, data: dataSC }] =
    useLazyQuery(GET_ALL_SOURCE_CATEGORIES, {});

  const [
    getSingleCustomerInformation,
    { loading: loadingGSCI, data: dataGSCI },
  ] = useLazyQuery(GET_SINGLE_CUSTOMER_INFO);

  const [saveCustomerInformationForm, { loading: loadingSCI, error }] =
    useMutation(SAVE_CUSTOMER_INFO, {
      onError: () => {
        alert(
          "Something went to wrong due to missing input fields so please fill all input and try again..."
        );
      },
      onCompleted: ({ saveCustomerInformationForm }) => {
        if (saveCustomerInformationForm) {
          alert("Data Saved successfully");
          router.push("/customerInfo");
        }
      },
    });

  const [createUserForCIF, { loading: loadingCUCIF }] = useMutation(
    CREATE_USER_FOR_CIF,
    {
      onCompleted: async ({ createUserForCIF }) => {
        if (!_.isEmpty(createUserForCIF)) {
          setOpenModel(false);
          await getSingleUserBasicDataForLeadDetails({
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

  const { loading, stylists } = useGetOrderInitData();

  const [
    getSingleUserBasicDataForLeadDetails,
    {
      loading: loadingGUBM,
      data: { getSingleUserBasicDataForLead } = {},
      variables,
    },
  ] = useLazyQuery(GET_USER_WITH_OUT_CNO, {
    onCompleted() {
      if (_.isEmpty(getSingleUserBasicDataForLead)) {
        setOpenModel(true);
      }
    },
  });

  useEffect(async () => {
    if (!_.isEmpty(getSingleUserBasicDataForLead)) {
      const formData = getValues();
      const payload = {
        ...formData,
        firstName: getSingleUserBasicDataForLead.firstName,
        lastName: getSingleUserBasicDataForLead.lastName,
        email: getSingleUserBasicDataForLead.email,
        customerSerialNo: getSingleUserBasicDataForLead.customerId,
      };
      reset(payload);
    }
  }, [getSingleUserBasicDataForLead]);

  const checkError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? classes.errorInput : "";
  };

  const onSubmit = async (data) => {
    let occasionDetails = [];

    if (data?.occasionDetails.length > 0) {
      data?.occasionDetails.map((item) => {
        occasionDetails.push({
          ...item,
          priceQuote: item?.priceQuote ? Number(item?.priceQuote) : 0,
        });
      });
    }

    const payload = {
      ...data,
      eventDate: data?.eventDate ? extractDateFormate(data?.eventDate) : null,
      createdDate: data?.createdDate
        ? extractDateFormate(data?.createdDate)
        : null,
      sourceCatId: data?.sourceCatId ? data.sourceCatId.value : "",
      sourceSubCatId: data?.sourceSubCatId ? data.sourceSubCatId._id : "",
      stylistId: data?.stylistId ? data?.stylistId.value : "",
      customerSerialNo: data?.customerSerialNo
        ? Number(data.customerSerialNo)
        : null,
      countryCode: countryCode,
      occasionDetails: occasionDetails,
    };

    if (router?.query?.edit) {
      await saveCustomerInformationForm({
        variables: {
          customerInfo: payload,
          customerInfoId: router?.query?.edit,
        },
      });
    } else {
      await saveCustomerInformationForm({
        variables: {
          customerInfo: payload,
        },
      });
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

  const handleDeleteS3Image = (imageUrl) => {
    const _remainingImages = uploadedImages.filter(function (item) {
      return item !== imageUrl;
    });
    const formValues = getValues();
    const _occasionDetails = [...formValues.occasionDetails];
    const imagePath = !_.isEmpty(_remainingImages)
      ? JSON.stringify(_remainingImages)
      : null;
    _occasionDetails[occasionIndex]["refImage"] = imagePath;
    setValue("occasionDetails", _occasionDetails);
  };

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

  useEffect(async () => {
    await getAllSourceCategories();
  }, []);

  useEffect(async () => {
    if (router?.query?.edit) {
      await getSingleCustomerInformation({
        variables: {
          id: router?.query?.edit,
        },
      });
    }
  }, [router]);

  useEffect(() => {
    if (dataGSCI) {
      const { getSingleCustomerInformation } = dataGSCI;
      let sourceCatId = {};
      let sourceSubCatId = {};
      let stylistId = {};
      if (getSingleCustomerInformation?.source?.length > 0) {
        sourceCatId = {
          name: getSingleCustomerInformation?.source[0].name,
          value: getSingleCustomerInformation?.source[0]._id,
        };
        if (getSingleCustomerInformation?.source[0].subCategory?.length > 0) {
          const findItem = _.find(
            getSingleCustomerInformation?.source[0].subCategory,
            (item) => item?._id === getSingleCustomerInformation?.sourceSubCatId
          );
          if (findItem) {
            sourceSubCatId = {
              name: findItem?.name,
              value: findItem?._id,
            };
          }
          setCategories(getSingleCustomerInformation?.source[0].subCategory);
        }
      }
      if (getSingleCustomerInformation?.stylist?.length > 0) {
        stylistId = {
          name: getSingleCustomerInformation?.stylist[0]?.name,
          value: getSingleCustomerInformation?.stylist[0]?._id,
        };
      }
      const payload = {
        firstName: getSingleCustomerInformation?.firstName,
        lastName: getSingleCustomerInformation?.lastName,
        phone: getSingleCustomerInformation?.phone,
        studioId: getSingleCustomerInformation?.studioId,
        email: getSingleCustomerInformation?.email,
        customerInfoStatus: getSingleCustomerInformation?.customerInfoStatus,
        eventType: getSingleCustomerInformation?.eventType,
        eventDate: getSingleCustomerInformation?.eventDate?.timestamp,
        createdDate: getSingleCustomerInformation?.createdDate?.timestamp,
        lookingFor: getSingleCustomerInformation?.lookingFor,
        note: getSingleCustomerInformation?.note,
        sourceCatId: sourceCatId,
        sourceSubCatId: sourceSubCatId,
        stylistId: stylistId,
        customerSerialNo: getSingleCustomerInformation?.customerSerialNo,
        occasionDetails: getSingleCustomerInformation?.occasionDetails.map(
          (data) => ({
            occasion: data.occasion,
            budget: data.budget,
            refImage: data.refImage,
            outfitsNote: data.outfitsNote,
            priceQuote: data.priceQuote,
          })
        ),
      };
      reset(payload);
    }
  }, [dataGSCI]);

  return (
    <Fragment>
      <CustomerHeader
        title={
          !_.isEmpty(router.query.edit)
            ? "Edit Customer Information Form"
            : " Customer Information Form"
        }
        btnTitle="Share"
        onClick={() => {}}
      />
      <Box p={2} mt={1}>
        <Alert severity="info">
          Note: Please fill all the details before going to submit the form.
        </Alert>
      </Box>

      {loading || loadingSC || loadingGSCI ? (
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
                  name="phone"
                  style={{ width: 250 }}
                  className={checkError(errors, "phone")}
                />
              </Grid>
              <Grid item>
                <Button
                  style={{ marginLeft: 10, height: 39, marginTop: 0 }}
                  disabled={loadingGUBM}
                  color="secondary"
                  onClick={async () => {
                    const phone = getValues("phone");
                    if (
                      checkMobileValidation(`${countryCode}${phone}`) ===
                      undefined
                    ) {
                      await getSingleUserBasicDataForLeadDetails({
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
              <p className={classes.formLabel}>Studio Id</p>
              <Controller
                control={control}
                name="studioId"
                defaultValue="61c55048429a4414e8755e69"
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    options={studioCodes}
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
                name="firstName"
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
                    value: false,
                    message: "",
                  },
                })}
                name="lastName"
                placeholder="Last Name"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Email Address</p>
              <TextInputField
                inputRef={register({
                  required: {
                    value: false,
                    message: "",
                  },
                })}
                name="email"
                placeholder="Email Address"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>

            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Customer Serial No</p>
              <TextInputField
                inputRef={register({
                  required: {
                    value: false,
                    message: "",
                  },
                })}
                name="customerSerialNo"
                type="number"
                readOnly={true}
                placeholder="CustomerSerialNo"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>

            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Created Date</p>
              <Controller
                name={`createdDate`}
                control={control}
                defaultValue={new Date()}
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
              <p className={classes.formLabel}>Event Type</p>
              <Controller
                control={control}
                name={`eventType`}
                as={<SelectDropDown options={eventType} />}
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
                      props.onChange(data);
                      setCategories(data.subCategory);
                    }}
                  />
                )}
                name={`sourceCatId`}
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
                      props.onChange(data);
                      //props.onChange(data.name);
                    }}
                  />
                )}
                name={`sourceSubCatId`}
                control={control}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Looking For</p>
              <TextInputField
                inputRef={register({
                  required: {
                    value: false,
                    message: "",
                  },
                })}
                name="lookingFor"
                placeholder="Looking For"
                InputProps={{
                  disableUnderline: true,
                }}
              />
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
                name={`stylistId`}
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <div className="orderFormTable" style={{ marginTop: 30 }}>
                <table className="table">
                  <thead>
                    <tr style={{ backgroundColor: "#E0F7FA" }}>
                      <th
                        colSpan="6"
                        style={{ textAlign: "center", fontSize: "18px" }}
                      >
                        Occasion Details
                      </th>
                    </tr>
                    <tr style={{ backgroundColor: "cornsilk" }}>
                      <th style={{ paddingLeft: 10, textAlign: "center" }}>
                        Occasion
                      </th>
                      <th style={{ paddingLeft: 10, textAlign: "center" }}>
                        Outfits
                      </th>
                      <th style={{ paddingLeft: 10, textAlign: "center" }}>
                        Ref.Image
                      </th>
                      <th style={{ paddingLeft: 10, textAlign: "center" }}>
                        Budget
                      </th>
                      <th style={{ paddingLeft: 10, textAlign: "center" }}>
                        Price Quote
                      </th>
                      <th style={{ paddingLeft: 10, textAlign: "center" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {fields.map((item, index) => (
                      <tr key={index}>
                        <td classes={{ root: classes.tableCellRoot }}>
                          <Controller
                            control={control}
                            name={`occasionDetails[${index}].occasion`}
                            as={<SelectDropDown options={eventType} />}
                          ></Controller>
                        </td>
                        {/* Outfits */}
                        <td classes={{ root: classes.tableCellRoot }}>
                          <textarea
                            ref={register({
                              required: {
                                value: false,
                                message: "",
                              },
                            })}
                            name={`occasionDetails[${index}].outfitsNote`}
                            style={{ width: "100%" }}
                            rows={5}
                            defaultValue={item?.outfitsNote}
                            placeholder="Notes"
                            //className={checkError(errors, "outfitsNote")}
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        </td>
                        <td
                          style={{ display: "flex", alignItems: "center" }}
                          classes={{ root: classes.tableCellRoot }}
                        >
                          <input
                            type="hidden"
                            ref={register()}
                            name={`occasionDetails[${index}].refImage`}
                            value={item.refImage}
                          />
                          {item.refImage && (
                            <img
                              style={{ marginRight: 10 }}
                              width={75}
                              src={item.refImage}
                            />
                          )}
                          <Button
                            onClick={() => {
                              setOccasionDetailsIndex(index);
                              setUploadType("IMAGES");
                              if (!_.isEmpty(item.refImage)) {
                                if (!_.isEmpty(JSON.parse(item.refImage))) {
                                  setUploadImages([
                                    ...JSON.parse(item.refImage),
                                  ]);
                                }
                              }
                              setShowUppy(true);
                            }}
                          >
                            <CloudUploadIcon />
                          </Button>
                        </td>
                        {/* Budget */}
                        <td classes={{ root: classes.tableCellRoot }}>
                          <Controller
                            control={control}
                            name={`occasionDetails[${index}].budget`}
                            as={<SelectDropDown options={budgetOptions} />}
                          ></Controller>
                        </td>
                        {/* Price Quote */}
                        <td
                          classes={{ root: classes.tableCellRoot }}
                          style={{ width: "150px", padding: "8px" }}
                        >
                          <TextInputField
                            style={{ width: "150px" }}
                            inputRef={register({
                              required: {
                                value: false,
                                message: "",
                              },
                            })}
                            defaultValue={item?.priceQuote}
                            name={`occasionDetails[${index}].priceQuote`}
                            type="number"
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        </td>

                        <td classes={{ root: classes.tableCellRoot }}>
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
                              setOccasionDetailsIndex(index);
                              const appendValue = {
                                ...initialOccasionDetails[0],
                              };
                              append(appendValue);
                            }}
                            size="small"
                          >
                            <AddBoxIcon style={{ color: "cadetblue" }} />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Grid>

            <Grid xs={12}>
              <p className={classes.formLabel}>Stylist Notes</p>
              <textarea
                ref={register({
                  required: {
                    value: false,
                    message: "",
                  },
                })}
                name="note"
                style={{ width: "100%" }}
                rows={5}
                placeholder="Notes"
                className={checkError(errors, "note")}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p className={classes.formLabel}>Status</p>
              <Controller
                control={control}
                name={`customerInfoStatus`}
                as={<SelectDropDown options={customerInfoStatus} />}
              ></Controller>
            </Grid>
          </Grid>
          <Box p={2}>
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
              path={`Images/cifModule`}
              onComplete={(result) => {
                if (result?.successful) {
                  const formValues = getValues();
                  const _occasionDetails = [...formValues.occasionDetails];
                  _occasionDetails[occasionIndex]["refImage"] =
                    result?.successful[0]?.uploadURL;
                  setValue("occasionDetails", _occasionDetails);
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

              await createUserForCIF({
                variables: {
                  userData: getUserRegisterPayload(
                    data,
                    countryCode,
                    findStylist
                  ),
                },
              });
            }}
            isSubmitting={loadingCUCIF}
          />
        </Box>
      </InfoDialogComponent>
    </Fragment>
  );
};

export default BasicCustomerForm;
