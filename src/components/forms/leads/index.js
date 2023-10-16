import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Button,
  Divider,
  makeStyles,
  Box,
  Typography,
} from "@material-ui/core";
import PhoneInputField from "../../Ui/formFields/phoneInput";
import TextInputField from "../../Ui/formFields/TextInputField";
import SelectDropDown from "../../Ui/formFields/SelectDropdown";
import EventIcon from "@material-ui/icons/Event";
import InfoDialogComponent from "../../Ui/dialog/infoDialog";
import LoadingIndicatorComponent from "../../Ui/loading";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";
import {
  checkMobileValidation,
  extractDateFormate,
  getCountryCode,
} from "../../../utils/validations";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Rating from "@material-ui/lab/Rating";

// Apollo
import {
  GET_LATEST_LEAD_ID,
  GET_SALES_TEAMS,
  GET_ALL_SOURCE_CATEGORIES,
  GET_ALL_STUDIOS,
  SAVE_LEADS,
  GET_SINGLE_LEAD,
  GET_LEAD_USER,
  CREATE_LEAD_USER,
} from "../../../apollo/queries/leads";

import { GET_USER_WITH_OUT_CNO } from "../../../apollo/queries/user";

import { GET_MASTER_PERSONA } from "../../../apollo/queries/orders";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import moment from "moment";
import AdUserForm from "../addOrderUser";

import { getUserRegisterPayload } from "../../../services/_orders";

const useStyles = makeStyles((theme) => ({
  errorInput: {
    border: `1px solid red`,
  },
  orderFormGrid: {
    margin: 0,
    width: "100%",
  },
  actionButton: {
    marginTop: 50,
  },
}));

const estimated = [
  {
    name: "Upto 10K",
    value: "upto-10K",
  },
  {
    name: "10-20k",
    value: "10-20k",
  },
  {
    name: "20-50k",
    value: "20-50K",
  },
  {
    name: "50-100k",
    value: "50-100K",
  },
  {
    name: "Above 100k",
    value: "above-100K",
  },
  {
    name: "Style Club (4k)",
    value: "Style Club (4k)",
  },
];

const LeadForm = (session) => {
  const [countryCode, setCountryCode] = useState("91");
  const [country, setCountry] = useState("in");
  const [leadId, setLeadId] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const [openModel, setOpenModel] = useState(false);
  const [signupUser, setSignupUser] = useState(null);
  const [source, setSource] = useState([]);
  const [categories, setCategories] = useState([]);
  const [salesTeam, setSalesTeam] = useState([]);
  const classes = useStyles();
  const [rating, setRating] = useState(0);
  const [_date, setDate] = useState(moment(new Date()));
  const [persona, setPersona] = useState([]);
  const [studios, setStudios] = useState([
    {
      name: "HY01",
      value: "61c55048429a4414e8755e69",
    },
    {
      name: "HY02",
      value: "61d3ef5a2aa36c23004375ec",
    },
    {
      name: "HY03",
      value: "61d3ef622aa36c23004375ed",
    },
  ]);

  const {
    register,
    errors,
    handleSubmit,
    setValue,
    control,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      _personaIds: [],
    },
  });

  const [getSingleLead, { data: dataGSL, loading: loadingGSL }] =
    useLazyQuery(GET_SINGLE_LEAD);

  const [saveLead, { loading: loadingSL }] = useMutation(SAVE_LEADS, {
    onCompleted({ saveLead }) {
      if (!_.isEmpty(saveLead)) {
        alert("Lead saved successfully");
        router.push("/leads");
      }
    },
  });

  const [getMasterPersona, { loading: loadingMP, data: dataMP }] =
    useLazyQuery(GET_MASTER_PERSONA);

  const [getAllSalesTeam, { loading: loadingST, data: dataST }] =
    useLazyQuery(GET_SALES_TEAMS);

  const [getAllSourceCategories, { loading: loadingSC, data: dataSC }] =
    useLazyQuery(GET_ALL_SOURCE_CATEGORIES);
  const [getAllStudios, { loading: loadingSD, data: dataSD }] =
    useLazyQuery(GET_ALL_STUDIOS);

  const [
    getUserLatestLeadId,
    { data: { getLatestLeadId } = {}, loading: loadingGLLI },
  ] = useLazyQuery(GET_LATEST_LEAD_ID, {
    onCompleted() {
      setLeadId(getLatestLeadId);
    },
  });
  const [
    getSingleUserBasicDataForLeadDetails,
    {
      data: { getSingleUserBasicDataForLead } = "",
      loading: loadingSUBD,
      variables,
    },
  ] = useLazyQuery(GET_USER_WITH_OUT_CNO, {
    fetchPolicy: "network-only",
    onCompleted() {
      if (_.isEmpty(getSingleUserBasicDataForLead)) {
        setOpenModel(true);
      }
    },
  });

  const [createUserForLead, { loading: loadingCUFO }] = useMutation(
    CREATE_LEAD_USER,
    {
      onCompleted: async ({ createUserForLead }) => {
        if (!_.isEmpty(createUserForLead)) {
          setOpenModel(false);
          await getSingleUserBasicDataForLeadDetails({
            variables: {
              phone: signupUser.phone,
            },
          });
        } else {
          alert("Email/Mobile already exist please try again...");
        }
      },
      onError(error) {
        alert("Something went to wrong please try again...");
      },
    }
  );

  const onSubmit = async (data) => {
    const payload = {
      _id: data._id,
      leadId: Number(data.leadId),
      userId: userData._id,
      studioId: data.studioId,
      firstName: data.firstName,
      lastName: data.lastName,
      leadDate: extractDateFormate(new Date(data.leadDate).toISOString()),
      countryCode: countryCode,
      cityName: data.cityName,
      phone: data.phone,
      email: userData.email,
      sourceCatId: data.sourceCatId,
      sourceSubCatId: data.sourceSubCatId,
      generatedBySalesTeamId: data.generatedBySalesTeamId,
      creditToSalesTeamId: data.creditToSalesTeamId,
      rating: Number(data.rating),
      expClosureDate: extractDateFormate(data.expClosureDate),
      estimatedValue: data.estimatedValue,
      eventDate: extractDateFormate(data.eventDate),
      remarks: data.remarks,
      personaIds: [data.personaIds],
    };
    await saveLead({
      variables: {
        body: payload,
      },
    });
  };

  const checkError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? classes.errorInput : "";
  };

  const checkFieldError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? true : false;
  };

  useEffect(async () => {
    if (!_.isEmpty(getSingleUserBasicDataForLead)) {
      setUserData(getSingleUserBasicDataForLead);
      setValue("firstName", getSingleUserBasicDataForLead.firstName);
      setValue("lastName", getSingleUserBasicDataForLead.lastName);
      const _contactDetails = getCountryCode(
        `${getSingleUserBasicDataForLead.countryCode}${getSingleUserBasicDataForLead.phone}`
      );
      setCountry(_contactDetails.country);
      setCountryCode(_contactDetails.countryCode);
      await getUserLatestLeadId();
    }
  }, [getSingleUserBasicDataForLead]);

  useEffect(async () => {
    await getMasterPersona({
      variables: {
        filter: {
          masterName: "master_persona",
        },
      },
    });
    await getAllSourceCategories();
    await getAllSalesTeam();
    await getAllStudios();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataMP)) {
      const { getUserAttributeMaster } = dataMP;
      if (!_.isEmpty(getUserAttributeMaster)) {
        let data = [];
        if (!_.isEmpty(getUserAttributeMaster)) {
          getUserAttributeMaster.map((item) => {
            data.push({ name: item.name, value: item._id });
          });
        }
        setPersona(data);
      }
    }
  }, [dataMP]);

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
        // if (!_.isEmpty(data)) {
        //   if (!_.isEmpty(data[0].subCategory)) {
        //     data[0].subCategory.map((item) => {
        //       categories.push({
        //         name: item.name,
        //         value: item._id,
        //       });
        //     });
        //   }
        // }
        setSource(data);
        //setCategories(categories);
      }
    }
  }, [dataSC]);

  useEffect(() => {
    if (!_.isEmpty(dataST)) {
      const { getAllSalesTeam } = dataST;
      if (!_.isEmpty(getAllSalesTeam)) {
        let data = [];
        if (!_.isEmpty(getAllSalesTeam)) {
          getAllSalesTeam.map((item) => {
            data.push({ name: item.name, value: item._id });
          });
        }
        setSalesTeam(data);
      }
    }
  }, [dataST]);

  useEffect(async () => {
    if (!_.isEmpty(router.query.leadId)) {
      await getSingleLead({
        variables: {
          leadId: router.query.leadId,
        },
      });
    }
  }, [router]);

  useEffect(() => {
    if (!_.isEmpty(dataGSL)) {
      const { getSingleLead } = dataGSL;
      if (!_.isEmpty(getSingleLead)) {
        setUserData({ _id: getSingleLead.userId, email: getSingleLead.email });
        setLeadId(getSingleLead.leadId);
        const sourceItem = _.find(source, { value: getSingleLead.sourceCatId });
        let categories = [];
        if (!_.isEmpty(sourceItem)) {
          sourceItem.subCategory.map((item, index) => {
            categories.push({ name: item.name, value: item._id });
          });
        }
        setCategories(categories);
        const _contactDetails = getCountryCode(
          `${getSingleLead.countryCode}${getSingleLead.phone}`
        );
        setCountry(_contactDetails.country);
        setCountryCode(_contactDetails.countryCode);
        setRating(getSingleLead.rating);
        const payload = {
          _id: getSingleLead._id,
          studioId: getSingleLead.studioId,
          firstName: getSingleLead.firstName,
          lastName: getSingleLead.lastName,
          phone: getSingleLead.phone,
          cityName: getSingleLead.cityName,
          email: getSingleLead.email,
          sourceCatId: getSingleLead.sourceCatId,
          sourceSubCatId: getSingleLead.sourceSubCatId,
          generatedBySalesTeamId: getSingleLead.generatedBySalesTeamId,
          creditToSalesTeamId: getSingleLead.creditToSalesTeamId,
          estimatedValue: getSingleLead.estimatedValue,
          remarks: getSingleLead.remarks,
          personaIds: !_.isEmpty(getSingleLead.personaIds)
            ? getSingleLead.personaIds[0]
            : null,
          eventDate: !_.isEmpty(getSingleLead.eventDate)
            ? getSingleLead.eventDate.timestamp
            : null,
          leadDate: !_.isEmpty(getSingleLead.leadDate)
            ? getSingleLead.leadDate.timestamp
            : null,
          expClosureDate: !_.isEmpty(getSingleLead.expClosureDate)
            ? getSingleLead.expClosureDate.timestamp
            : null,
          rating: getSingleLead.rating,
        };

        reset(payload);
      }
    }
  }, [dataGSL]);

  const selectSalesTeamMember = () => {
    if (session) {
      const salesPerson = _.find(
        session.session.user.teams,
        (item) => item.roleIdentifier === "sales_person"
      );
      if (salesPerson) {
        return salesPerson._id;
      }
    }
  };

  return (
    <Fragment>
      <p>Search by mobile Number:</p>
      <Grid container>
        <Grid item>
          <PhoneInputField
            onChange={(value) => {
              setCountryCode(value);
            }}
            country={country}
          />
        </Grid>
        <Grid item xs>
          <TextInputField
            className={checkError(errors, "phone")}
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
          />
          <Button
            onClick={async () => {
              const phone = getValues("phone");
              if (
                checkMobileValidation(`${countryCode}${phone}`) === undefined
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
            style={{ marginLeft: 10, height: 39, marginTop: 0 }}
            color="secondary"
            disabled={loadingSUBD}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Divider />

      {loadingMP ||
      loadingSC ||
      loadingSD ||
      loadingSUBD ||
      loadingST ||
      loadingGSL ? (
        <LoadingIndicatorComponent />
      ) : (
        <Fragment>
          <Grid spacing={1} container>
            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>Lead Id:</p>
              <input type="hidden" ref={register()} name="_id" />
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                  },
                })}
                readOnly={true}
                name="leadId"
                value={leadId}
                placeholder="Lead Id"
                className={checkError(errors, "leadId")}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>

            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>Lead Date:</p>
              <Controller
                name={`leadDate`}
                control={control}
                setValue={setValue}
                rules={{
                  required: {
                    value: true,
                    message: "",
                  },
                }}
                defaultValue={null}
                render={({ value, name }) => (
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      clearable
                      minDate={_date}
                      onChange={(date) => {
                        setDate(date);
                        setValue(name, date);
                      }}
                      className={checkError(errors, "leadDate")}
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

            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>Studio Id:</p>
              <Controller
                control={control}
                name="studioId"
                defaultValue="61c55048429a4414e8755e69"
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    options={studios}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>Generated By:</p>
              <Controller
                control={control}
                defaultValue={selectSalesTeamMember()}
                rules={{
                  required: {
                    value: true,
                    message: "",
                  },
                }}
                name="generatedBySalesTeamId"
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    isError={checkFieldError(errors, "generatedBySalesTeamId")}
                    options={salesTeam}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>First Name:</p>
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                    message: "",
                  },
                })}
                name="firstName"
                placeholder="First Name"
                className={checkError(errors, "firstName")}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>Last Name:</p>
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                    message: "",
                  },
                })}
                name="lastName"
                placeholder="Last Name"
                className={checkError(errors, "lastName")}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p>Persona:</p>
              <Controller
                control={control}
                name="personaIds"
                rules={{
                  required: {
                    value: true,
                    message: "",
                  },
                }}
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    isError={checkFieldError(errors, "sourceCatId")}
                    options={persona}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p>City:</p>
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                    message: "",
                  },
                })}
                name="cityName"
                placeholder="City"
                className={checkError(errors, "cityName")}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>

            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>Source (Main Category):</p>
              <Controller
                control={control}
                name="sourceCatId"
                rules={{
                  required: {
                    value: true,
                    message: "",
                  },
                }}
                render={(props) => (
                  <SelectDropDown
                    isError={checkFieldError(errors, "sourceCatId")}
                    value={props.value}
                    options={source}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      const data = _.find(source, {
                        value: e.target.value,
                      });
                      let categories = [];
                      if (!_.isEmpty(data)) {
                        data.subCategory.map((item) => {
                          categories.push({
                            name: item.name,
                            value: item._id,
                          });
                        });
                      }
                      setCategories(categories);
                    }}
                  />
                )}
              />
            </Grid>

            {!_.isEmpty(categories) && (
              <Grid item xs={6} md={4} lg={4} sm={4}>
                <p>Source (Sub-Category):</p>
                <Controller
                  control={control}
                  name="sourceSubCatId"
                  rules={{
                    required: {
                      value: true,
                      message: "",
                    },
                  }}
                  render={(props) => (
                    <SelectDropDown
                      isError={checkFieldError(errors, "sourceSubCatId")}
                      value={props.value}
                      options={categories}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>Credit To:</p>
              <Controller
                control={control}
                name="creditToSalesTeamId"
                rules={{
                  required: {
                    value: true,
                    message: "",
                  },
                }}
                defaultValue={null}
                render={(props) => (
                  <SelectDropDown
                    value={props.value}
                    isError={checkFieldError(errors, "creditToSalesTeamId")}
                    options={salesTeam}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>Exp Closure Date:</p>
              <Controller
                name={`expClosureDate`}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "",
                  },
                }}
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
                      className={checkError(errors, "expClosureDate")}
                      minDate={_date}
                      keyboardIcon={
                        <EventIcon classes={{ root: classes.icon }} />
                      }
                      value={value}
                    />
                  </MuiPickersUtilsProvider>
                )}
              ></Controller>
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>Event Date:</p>
              <Controller
                name={`eventDate`}
                control={control}
                setValue={setValue}
                rules={{
                  required: {
                    value: true,
                    message: "",
                  },
                }}
                defaultValue={null}
                render={({ value, name }) => (
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      clearable
                      minDate={_date}
                      onChange={(date) => {
                        setValue(name, date);
                      }}
                      className={checkError(errors, "eventDate")}
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
            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>Estimated Value:</p>
              <Controller
                control={control}
                name="estimatedValue"
                rules={{
                  required: {
                    value: true,
                    message: "",
                  },
                }}
                render={(props) => (
                  <SelectDropDown
                    isError={checkFieldError(errors, "estimatedValue")}
                    value={props.value}
                    options={estimated}
                    onChange={(e) => {
                      props.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={4} lg={4} sm={4}>
              <p>Lead Rating:</p>
              <Box
                style={{
                  display: "flex",
                  aliginItem: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Controller
                  control={control}
                  name="rating"
                  render={(props) => (
                    <Rating
                      value={props.value}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setRating(e.target.value);
                      }}
                    />
                  )}
                />
                <Box mt={0.4} ml={1}>
                  {rating}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
              <p>Remarks:</p>
              <textarea
                ref={register({
                  required: {
                    value: true,
                    message: "",
                  },
                })}
                style={{
                  width: "100%",
                  height: "100px",
                }}
                multiline={true}
                rowsMax={5}
                name="remarks"
                placeholder="Remarks"
                className={checkError(errors, "remarks")}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
          </Grid>
          <Button
            disabled={loadingSL}
            onClick={handleSubmit(onSubmit)}
            className={classes.actionButton}
          >
            Submit
          </Button>
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
              const findStylist = _.find(
                session.session.user.teams,
                (item) =>
                  item.roleIdentifier === "personal_stylist" ||
                  item.roleIdentifier === "head_stylist"
              );
              await createUserForLead({
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
    </Fragment>
  );
};

export default LeadForm;
