import React, { useState, useEffect, Fragment } from "react";

import {
  Grid,
  Button,
  makeStyles,
  FormControlLabel,
  Box,
  Typography,
  Checkbox,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";
import { useRouter } from "next/router";
//Styles
import useStyles from "./style";
// Components
import TextInputField from "../../Ui/formFields/TextInputField";
import LoadingButton from "../../Ui/formFields/LoadingButton";
import PhoneInputField from "../../Ui/formFields/phoneInput";
import SelectDropDown from "../../Ui/formFields/SelectDropdown";
import LoadingIndicatorComponent from "../../Ui/loading";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { TextField, InputLabel } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import EventIcon from "@material-ui/icons/Event";
import { extractDateFormate } from "../../../utils/validations";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

// Apollo
import {
  GET_ALL_STYLISTS,
  UPDATE_USER_PROFILE,
  GET_SINGLE_USER,
  SEARCH_CITY_BY_NAME,
} from "../../../apollo/queries/user";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";

// Utils
import {
  checkMobileValidation,
  getCountryCode,
} from "../../../utils/validations";

const UserInfoFormComponent = ({ authData }) => {
  const [countryCode, setCountryCode] = useState("91");
  const [dob, setDob] = useState(null);
  const [ccDate, setCCDate] = useState(null);
  const [country, setCountry] = useState("in");
  const [stylists, setStylists] = useState([]);
  const [clubMember, setClubMember] = React.useState();
  const [getUser, { data: dataUser, loading: loadingUser }] =
    useLazyQuery(GET_SINGLE_USER);
  const router = useRouter();
  const classes = useStyles();

  const userStatuses = [
    {
      name: "ACTIVE",
      value: "ACTIVE",
    },

    {
      name: "PASSIVE",
      value: "PASSIVE",
    },

    {
      name: "INACTIVE",
      value: "INACTIVE",
    },
  ];

  const customerType = [
    {
      name: "DAILY WEAR",
      value: "DAILY_WEAR",
    },

    {
      name: "OCCASIONAL",
      value: "OCCASIONAL",
    },

    {
      name: "STAR CLIENT",
      value: "STAR_CLIENT",
    },
  ];

  const styleClubMember = [
    {
      name: "YES",
      value: "YES",
    },
    {
      name: "NO",
      value: "NO",
    },
  ];

  const customerSegment = [
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
  ];

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    control,
    reset,
    getValues,
  } = useForm({
    mode: "onBlur",
    //   defaultValues: {
    //     ...authData.data,
    //   },
  });

  const { data: { getAllStylists } = {}, loading: loadingStylists } = useQuery(
    GET_ALL_STYLISTS,
    {
      onCompleted() {
        let tempData = [];
        getAllStylists.map((item) => {
          tempData.push({ name: item.name, value: item._id });
        });
        setStylists(tempData);
      },
    }
  );
  const [GetCityBySearchTerm, { data: dataGCBST, loading: loadingGCBST }] =
    useLazyQuery(SEARCH_CITY_BY_NAME);

  const [updateUserProfileData, { loading: loadingUP }] = useMutation(
    UPDATE_USER_PROFILE,
    {
      onCompleted() {
        alert("User details updated successfully...");
      },
      refetchQueries: [
        {
          query: GET_SINGLE_USER,
          variables: {
            id: router.query.uid,
          },
        },
      ],
    }
  );

  const checkError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? classes.errorInput : "";
  };

  const onSubmit = async (data) => {
    const dob = data.dateOfBirth
      ? extractDateFormate(new Date(data.dateOfBirth).toISOString())
      : null;
    const ccDate = data.ccDueDate
      ? extractDateFormate(new Date(data.ccDueDate).toISOString())
      : null;
    const secondaryStylistIds = [];
    if (data?.secondaryStylistIds?.length > 0) {
      data?.secondaryStylistIds.map((item) => {
        secondaryStylistIds.push(item?.value);
      });
    }
    const payload = {
      ...data,
      customerSrNo: Number(data.customerSrNo),
      countryCode: countryCode,
      secondaryStylistIds,
      cityId: !_.isEmpty(data?.cityId) ? data?.cityId : null,
    };

    if (!_.isEmpty(dob)) {
      payload["dateOfBirth"] = {
        day: dob["day"],
        month: dob["month"],
        year: dob["year"],
        hour: dob["hour"],
        minute: dob["minute"],
        datestamp: dob["datestamp"],
        timestamp: dob["timestamp"],
      };
    }
    if (!_.isEmpty(ccDate)) {
      payload["ccDueDate"] = {
        day: ccDate["day"],
        month: ccDate["month"],
        year: ccDate["year"],
        hour: ccDate["hour"],
        minute: ccDate["minute"],
        datestamp: ccDate["datestamp"],
        timestamp: ccDate["timestamp"],
      };
    }
    await updateUserProfileData({
      variables: {
        userId: router.query.uid,
        updateData: payload,
      },
    });
  };

  useEffect(() => {
    if (!_.isEmpty(authData)) {
      const { data } = authData;
      if (!_.isEmpty(data)) {
        let _countryCode = data?.countryCode.replace("+", "");
        const _contactInfo = getCountryCode(`${_countryCode}${data.phone}`);
        setCountry(_contactInfo.country);
        setCountryCode(_contactInfo.countryCode);
        getUser({
          variables: {
            id: data._id,
          },
        });
      }
    }
  }, [authData]);

  useEffect(() => {
    if (dataUser) {
      const { user } = dataUser;
      let secondaryStylistIds = [];

      if (user) {
        if (user?.secondaryStylists?.length > 0) {
          user?.secondaryStylists.map((item) => {
            secondaryStylistIds.push({
              name: item.name,
              value: item._id,
            });
          });
        }

        const payload = {
          ...user,
          dateOfBirth: user?.dateOfBirth?.timestamp,
          userStatus: user?.userStatus,
          isStyleClubMember: user?.isStyleClubMember,
          customerType: user?.customerType,
          secondaryStylistIds: secondaryStylistIds,
          ccDueDate: user?.ccDueDate?.timestamp,
        };
        if (user?.dateOfBirth?.timestamp) {
          setDob(user?.dateOfBirth?.timestamp);
        }
        if (!user?.ccDueDate?.timestamp) {
          payload["ccDueDate"] = moment(
            dataUser?.user?.lastUpdatedAt?.timestamp
          ).add(1, "M");
          setCCDate(
            moment(dataUser?.user?.lastUpdatedAt?.timestamp).add(1, "M")
          );
        }
        reset(payload);
        setClubMember(user.isStyleClubMember);
      }
    }
  }, [dataUser]);

  return (
    <Box p={2}>
      {authData.loading || loadingStylists ? (
        <LoadingIndicatorComponent height={null} />
      ) : (
        <Fragment>
          <Typography variant="h6">Modify User Basic Details</Typography>
          <Box mt={3}>
            <Grid container direction="column" spacing={1}>
              <Grid item container spacing={2} md={8} lg={8}>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <TextInputField
                    inputRef={register({
                      required: {
                        value: true,
                        message: "Enter a valid First Name",
                      },
                    })}
                    name="firstName"
                    placeholder="Firstname"
                    className={checkError(errors, "firstName")}
                    errors={errors}
                    showError={true}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <TextInputField
                    inputRef={register({
                      required: {
                        value: true,
                        message: "Enter a valid Last Name",
                      },
                    })}
                    name="lastName"
                    placeholder="Lastname"
                    className={checkError(errors, "lastName")}
                    errors={errors}
                    showError={true}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </Grid>
                <Grid container item xs={6} md={6} lg={6} xl={6}>
                  <Grid item>
                    <PhoneInputField
                      country={country}
                      onChange={(value) => setCountryCode(value)}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextInputField
                      inputRef={register({
                        required: {
                          value: true,
                          message: "Enter a valid mobile number",
                        },
                        validate: (value) =>
                          checkMobileValidation(`${countryCode}${value}`),
                      })}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      placeholder="Mobile No"
                      id="input-phone"
                      name="phone"
                      errors={errors}
                      showError={true}
                      className={checkError(errors, "phone")}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <Controller
                    name={`dateOfBirth`}
                    control={control}
                    defaultValue={dob}
                    setValue={setValue}
                    render={({ value, name }) => (
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          clearable
                          onChange={(date) => {
                            setValue(name, date);
                          }}
                          format="DD/MM/YYYY"
                          placeholder="Date of Birth"
                          keyboardIcon={
                            <EventIcon classes={{ root: classes.icon }} />
                          }
                          value={value}
                        />
                      </MuiPickersUtilsProvider>
                    )}
                  ></Controller>
                </Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <TextInputField
                    inputRef={register({
                      required: {
                        value: false,
                        message: "",
                      },
                    })}
                    placeholder="Email ID"
                    name="email"
                    id="input-email"
                    errors={errors}
                    showError={true}
                    className={checkError(errors, "email")}
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <TextInputField
                    inputRef={register({
                      required: {
                        value: false,
                        message: "Enter a Customer Id",
                      },
                    })}
                    type="number"
                    name="customerSrNo"
                    placeholder="Customer Id"
                    className={checkError(errors, "customerSrNo")}
                    errors={errors}
                    showError={true}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel style={{ fontWeight: 500, marginBottom: 10 }}>
                    Personal Stylist
                  </InputLabel>
                  <Controller
                    control={control}
                    name={`stylistId`}
                    defaultValue={
                      !_.isEmpty(authData.data)
                        ? !_.isEmpty(authData.data.stylist)
                          ? authData.data.stylist[0]._id
                          : "5de75fa5a72f8129f42bba29"
                        : "5de75fa5a72f8129f42bba29"
                    }
                    as={<SelectDropDown options={stylists} />}
                  ></Controller>
                </Grid>

                <Grid item xs={12}>
                  <InputLabel style={{ fontWeight: 500, marginBottom: 10 }}>
                    Secondary Stylists
                  </InputLabel>
                  <Controller
                    render={(props) => {
                      return (
                        <Autocomplete
                          {...props}
                          multiple
                          options={stylists ? stylists : []}
                          style={{ width: "100%" }}
                          placeholder="Search for Stylist"
                          getOptionLabel={(option) => option.name || ""}
                          renderOption={(option) => <span>{option.name}</span>}
                          renderInput={(params) => <TextField {...params} />}
                          onChange={(_, data) => {
                            props.onChange(data);
                            return data;
                          }}
                        />
                      );
                    }}
                    defaultValue={authData?.data?.secondaryStylists || []}
                    name={`secondaryStylistIds`}
                    control={control}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel style={{ fontWeight: 500, marginBottom: 10 }}>
                    Search For City:
                  </InputLabel>
                  <Autocomplete
                    role="list-box"
                    options={dataGCBST?.getCityBySearchTerm || []}
                    loading={loadingGCBST}
                    //style={{ width: "100%" }}
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    }
                    getOptionLabel={(option) => option.searchName || ""}
                    renderOption={(option) => <span>{option.searchName}</span>}
                    renderInput={(params) => (
                      <TextField
                        style={{ width: "100%" }}
                        placeholder="Search For City"
                        {...params}
                      />
                    )}
                    onChange={(e, data) => {
                      if (!_.isEmpty(data)) {
                        const splitString = data?.searchName.split("-");

                        setValue("cityName", data?.name);
                        setValue("stateName", splitString[1]);
                        setValue("countryName", splitString[2]);
                        setValue("cityId", data?.id);
                      }
                    }}
                    onInputChange={(e) => {
                      if (!_.isEmpty(e.target.value)) {
                        GetCityBySearchTerm({
                          variables: {
                            searchTerm: e.target.value,
                          },
                        });
                      }
                      console.log(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <input type="hidden" ref={register()} name="cityId" />
                  <TextInputField
                    inputRef={register()}
                    type="text"
                    name="cityName"
                    placeholder="Current City"
                    readOnly={true}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <TextInputField
                    inputRef={register()}
                    type="text"
                    name="stateName"
                    placeholder="Current State"
                    readOnly={true}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <TextInputField
                    inputRef={register()}
                    type="text"
                    name="countryName"
                    placeholder="Current Country"
                    readOnly={true}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel style={{ fontWeight: 500, marginBottom: 10 }}>
                    Status
                  </InputLabel>
                  <Controller
                    control={control}
                    name={`userStatus`}
                    as={<SelectDropDown options={userStatuses} />}
                  ></Controller>
                </Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <InputLabel style={{ fontWeight: 500, marginBottom: 10 }}>
                    Customer Type
                  </InputLabel>
                  <Controller
                    control={control}
                    name={`customerType`}
                    as={<SelectDropDown options={customerType} />}
                  ></Controller>
                </Grid>

                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <InputLabel style={{ fontWeight: 500, marginBottom: 10 }}>
                    Are you Style Club Member ?
                  </InputLabel>
                  <Controller
                    control={control}
                    name={`isStyleClubMember`}
                    as={<SelectDropDown options={styleClubMember} />}
                  ></Controller>
                </Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <InputLabel style={{ fontWeight: 500, marginBottom: 10 }}>
                    Segment
                  </InputLabel>
                  <Controller
                    control={control}
                    name={`customerSegment`}
                    as={<SelectDropDown options={customerSegment} />}
                  ></Controller>
                </Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <InputLabel style={{ fontWeight: 500, marginBottom: 10 }}>
                    CC Due Date
                  </InputLabel>
                  <Controller
                    name={`ccDueDate`}
                    control={control}
                    defaultValue={ccDate}
                    setValue={setValue}
                    render={({ value, name }) => (
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          clearable
                          onChange={(date) => {
                            setValue(name, date);
                          }}
                          format="DD/MM/YYYY"
                          placeholder="Follow Up Date"
                          keyboardIcon={
                            <EventIcon classes={{ root: classes.icon }} />
                          }
                          value={value ? value : null}
                          // value={value}
                        />
                      </MuiPickersUtilsProvider>
                    )}
                  ></Controller>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel style={{ fontWeight: 500, marginBottom: 10 }}>
                    Remark
                  </InputLabel>
                  <textarea
                    ref={register({})}
                    name="remarks"
                    style={{
                      width: "100%",
                      padding: "10px",
                      whiteSpace: "pre-line",
                      wordWrap: "break-word",
                    }}
                    placeholder="Remark"
                    rows="4"
                    cols="50"
                  ></textarea>
                </Grid>
              </Grid>
              <Grid item md={3} lg={3}>
                <LoadingButton
                  btnTitle="Update"
                  disabled={loadingUP}
                  spinner={loadingUP}
                  onClick={handleSubmit(onSubmit)}
                />
              </Grid>
            </Grid>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

export default UserInfoFormComponent;
