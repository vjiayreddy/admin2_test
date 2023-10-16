import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  IconButton,
  RadioGroup,
  FormHelperText,
  Button,
  Box,
} from "@material-ui/core";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import { useForm, Controller } from "react-hook-form";
import clxs from "clsx";

import _ from "lodash";
import {
  checkMobileValidation,
  validate,
  emailValidation,
  getCountryCode,
} from "../../../../utils/validations";
import InfoDialogComponent from "../../../Ui/dialog/infoDialog";

// Apollo
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_SHOULDER_TYPES,
  GET_BODYPOSTURE_TYPES,
  GET_BODYSHAPE_TYPES,
  GET_FITPREFRENCE_TYPES,
  GET_BODYPROFILE,
  GET_SAVEBODY_PROFILE,
} from "../../../../apollo/queries/measurments";

// Ui Components
import TextInputField from "../../../Ui/formFields/TextInputField";
import PhoneInputField from "../../../Ui/formFields/phoneInput";
import SelectDropDown from "../../../Ui/formFields/SelectDropdown";
import CustomImageRadioButton from "../../../Ui/formFields/ImageRadioInput";
import LoadingIndicator from "../../../Ui/loading";
import LoadingButton from "../../../Ui/formFields/LoadingButton";

import InputAdornment from "@material-ui/core/InputAdornment";

// Styles
import useStyles from "./styles";

const options = [
  { name: "cm", value: "cm" },
  { name: "feet", value: "feet" },
];

const weightOptions = [{ name: "kg", value: "kg" }];

const BodyProfile = ({ currentUser }) => {
  const classes = useStyles();
  const [openModel, setOpenModel] = useState(false);
  const [bodyProfileData, setBodyProfileData] = useState({});
  const {
    register,
    handleSubmit,
    errors,
    control,
    reset,
    getValues,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      ...currentUser,
    },
  });
  const [countryCode, setCountryCode] = useState("91");
  const [country, setCountry] = useState("in");
  const [shoulderValue, setShoulderValue] = useState(null);
  const [dataShoulder, setDataShoulder] = useState([]);
  const [selectHeight, setHeight] = useState("feet");
  const formStatus = (status) => {
    //steoOneStatus(status);
  };

  const [getGetUserBodyProfile, { data: { getBodyProfile } = {} }] =
    useLazyQuery(GET_BODYPROFILE);

  const [getShoulderTypes, { loading: loadingST }] = useLazyQuery(
    GET_SHOULDER_TYPES,
    {
      onCompleted: ({ getUserAttributeMaster }) => {
        setDataShoulder(getUserAttributeMaster);
      },
    }
  );
  const [bodyPostureValue, setBodyPostureValue] = useState(null);
  const [dataBodyPosture, setDataBodyPosture] = useState([]);
  const [getBodyPostureTypes, { loading: loadingBPT }] = useLazyQuery(
    GET_BODYPOSTURE_TYPES,
    {
      onCompleted: ({ getUserAttributeMaster }) => {
        setDataBodyPosture(getUserAttributeMaster);
      },
    }
  );
  const [bodyShapeValue, setBodyShapeValue] = useState(null);
  const [dataBodyShape, setDataBodyShape] = useState([]);
  const [getBodyShapeTypes, { loading: loadingSPT }] = useLazyQuery(
    GET_BODYSHAPE_TYPES,
    {
      onCompleted: ({ getUserAttributeMaster }) => {
        setDataBodyShape(getUserAttributeMaster);
      },
    }
  );
  const [fitPreferenceValue, setfitPreferenceValue] = useState(null);
  const [dataFitPreference, setDataFitPreference] = useState([]);
  const [getFitPreferenceTypes, { loading: loadingFPT }] = useLazyQuery(
    GET_FITPREFRENCE_TYPES,
    {
      onCompleted: ({ getUserAttributeMaster }) => {
        setDataFitPreference(getUserAttributeMaster);
      },
    }
  );

  const [getSaveBodyProfile, { loading: loadingSBP }] = useMutation(
    GET_SAVEBODY_PROFILE,
    {
      onCompleted() {
        alert("Data saved successfully");
      },
      refetchQueries: [
        {
          query: GET_BODYPROFILE,
          variables: { userId: currentUser._id },
        },
      ],
    }
  );

  const SectionTitle = ({ title }) => {
    const classes = useStyles();
    return (
      <Box mt={1} mb={3}>
        <Typography
          variant="h2"
          component="h2"
          classes={{ root: classes.sectionTitle }}
        >
          {title}{" "}
          <span>
            <IconButton>
              <HelpOutlineOutlinedIcon />
            </IconButton>
          </span>
        </Typography>
      </Box>
    );
  };

  const BodyProfileInfo = ({ title, subTitle }) => {
    return (
      <Box>
        <Typography>
          <b>{title}</b>
        </Typography>
        <Typography classes={{ root: classes.infoLabel }} variant="caption">
          {subTitle}
        </Typography>
      </Box>
    );
  };

  const onSubmit = async (data) => {
    let payload = {};
    if (!_.isEmpty(data.feet) && !_.isEmpty(data.inch)) {
      var value1 = parseInt(data.feet) * 12;
      var value2 = value1 + parseInt(data.inch);
      var cm = value2 * 2.54;
      payload = {
        userId: currentUser._id,
        ...data,
        countryCode: countryCode,
        height: Math.round(cm),
        weight: parseInt(data.weight),
        age: parseInt(data.age),
      };
      delete payload.feet;
      delete payload.inch;
    } else {
      payload = {
        userId: currentUser._id,
        ...data,
        countryCode: countryCode,
        height: parseInt(data.height),
        weight: parseInt(data.weight),
        age: parseInt(data.age),
      };
    }
    await getSaveBodyProfile({
      variables: {
        basicInfo: payload,
      },
    });
  };

  // Initial Data Loading

  useEffect(async () => {
    await getShoulderTypes({
      variables: {
        filter: {
          masterName: "master_shouldertype",
        },
      },
    });
    await getBodyPostureTypes({
      variables: {
        filter: {
          masterName: "master_bodyposture",
        },
      },
    });
    await getBodyShapeTypes({
      variables: {
        filter: {
          masterName: "master_bodyshape",
        },
      },
    });
    await getFitPreferenceTypes({
      variables: {
        filter: {
          masterName: "master_fitpreference",
        },
      },
    });
    await getGetUserBodyProfile({
      variables: {
        userId: currentUser._id,
      },
      skip: currentUser === undefined || currentUser === null,
    });
  }, []);

  const checkError = (errors, field) => {
    return !_.isEmpty(errors) && _.has(errors, field) ? classes.errorInput : "";
  };

  useEffect(() => {
    if (!_.isEmpty(getBodyProfile)) {
      formStatus(false);
      handleChangeHeight();
      setBodyProfileData(getBodyProfile[0]);
    }
  }, [getBodyProfile]);

  useEffect(() => {
    if (!_.isEmpty(currentUser)) {
      const _contactInfo = getCountryCode(
        `${currentUser.countryCode}${currentUser.phone}`
      );
      setCountry(_contactInfo.country);
      setCountryCode(_contactInfo.countryCode);
    }
  }, [currentUser]);

  const handleChangeHeight = () => {
    if (!_.isEmpty(getBodyProfile[0])) {
      var realFeet = (getBodyProfile[0].height * 0.3937) / 12;
      var feet = Math.floor(realFeet);
      var inches = Math.round((realFeet - feet) * 12);
      const data = {
        ...getBodyProfile[0],
        feet: feet,
        inch: inches,
      };
      reset(data);
    }
  };

  const convertCmTOFeet = () => {};

  const getSelectedAttibuteType = (name, data) => {
    if (!_.isEmpty(data)) {
      const value = getValues(name);
      const getValue = _.find(data, (val) => val._id === value);
      if (!_.isEmpty(getValue)) {
        return getValue.name;
      }
    } else {
      return "-";
    }
  };

  return (
    <React.Fragment>
      {loadingST || loadingBPT || loadingSPT || loadingFPT ? (
        <LoadingIndicator />
      ) : (
        <Grid
          id="body-profile-section"
          classes={{ root: classes.bodyProfileMain }}
          container
        >
          <Grid
            spacing={2}
            item
            container
            sm={12}
            xs={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid
              container
              justify="space-between"
              alignItems="center"
              item
              xs={12}
            >
              <SectionTitle title="Basic Information" />
              <Box mb={3}>
                <Button
                  onClick={() => {
                    setOpenModel(true);
                  }}
                  color="secondary"
                  variant="contained"
                >
                  View
                </Button>
              </Box>
            </Grid>
            <Grid item md={3}>
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                    message: "Enter a valid First Name",
                  },
                })}
                name="firstName"
                id="input-firstname"
                placeholder="Firstname"
                className={checkError(errors, "firstName")}
                errors={errors}
                showError={true}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item md={3}>
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                    message: "Enter a valid Last Name",
                  },
                })}
                name="lastName"
                id="input-lastName"
                placeholder="Lastname"
                errors={errors}
                showError={true}
                className={checkError(errors, "lastName")}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Grid>
            <Grid item spacing={1} md={6} container>
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
            <Grid item md={3}>
              <TextInputField
                inputRef={register(emailValidation)}
                placeholder="Email ID"
                name="email"
                id="input-email"
                errors={errors}
                showError={true}
                className={checkError(errors, "email")}
              />
            </Grid>
            <Grid item md={3}>
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                    message: "Enter a valid age",
                  },
                })}
                placeholder="Age"
                name="age"
                type="number"
                id="input-age"
                errors={errors}
                className={checkError(errors, "age")}
                endAdornment={<>Yrs</>}
              />
            </Grid>
            <Grid item md={6}>
              <Grid container spacing={1}>
                {selectHeight === "cm" && (
                  <Grid item xs>
                    <TextInputField
                      inputRef={register({
                        required: {
                          value: true,
                          message: "Enter a valid height",
                        },
                      })}
                      placeholder="Height"
                      name="height"
                      type="number"
                      id="input-hight"
                      showError={true}
                      errors={errors}
                      className={clxs(
                        classes.inputText,
                        checkError(errors, "height")
                      )}
                    />
                  </Grid>
                )}
                {selectHeight === "feet" && (
                  <React.Fragment>
                    <Grid item xs>
                      <TextInputField
                        inputRef={register({
                          required: {
                            value: true,
                            message: "",
                          },
                        })}
                        placeholder="Feet"
                        name="feet"
                        type="number"
                        id="input-feet"
                        showError={true}
                        errors={errors}
                        className={clxs(
                          classes.inputText,
                          checkError(errors, "feet")
                        )}
                      />
                    </Grid>
                    <Grid item xs>
                      <TextInputField
                        inputRef={register({
                          required: {
                            value: true,
                            message: "",
                          },
                        })}
                        placeholder="Inch"
                        name="inch"
                        type="number"
                        id="input-inch"
                        showError={true}
                        errors={errors}
                        className={clxs(
                          classes.inputText,
                          checkError(errors, "Inch")
                        )}
                      />
                    </Grid>
                  </React.Fragment>
                )}

                <Grid item>
                  <SelectDropDown
                    options={options}
                    id="height-dropdown"
                    value={selectHeight}
                    onChange={(e) => {
                      handleChangeHeight();
                      setHeight(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs>
                  <TextInputField
                    inputRef={register({
                      required: {
                        value: true,
                        message: "Enter a vaild weight",
                      },
                    })}
                    placeholder="Weight"
                    name="weight"
                    type="number"
                    id="input-weight"
                    showError={true}
                    errors={errors}
                    className={clxs(
                      classes.inputText,
                      checkError(errors, "weight")
                    )}
                  />
                </Grid>
                <Grid item>
                  <SelectDropDown
                    options={weightOptions}
                    id="weight-dropdown"
                    value="kg"
                    onChange={() => {}}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <SectionTitle title="Select your Shoulder Type" />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please select your shoulder type",
                },
              }}
              defaultValue={shoulderValue}
              name="shoulderTypeId"
              as={
                <RadioGroup
                  row={true}
                  aria-label="shoulderTypeId"
                  value={shoulderValue}
                  classes={{ row: classes.radioGroup }}
                  onChange={(event) => {
                    setShoulderValue(event.target.value);
                  }}
                >
                  {dataShoulder.map((item, index) => (
                    <CustomImageRadioButton
                      key={item._id}
                      value={item._id}
                      label={item.name}
                      src={item.image}
                    />
                  ))}
                </RadioGroup>
              }
            ></Controller>
          </Grid>
          {validate(errors, "shoulderTypeId") && (
            <Grid item xs={12} classes={{ root: classes.noPaddingTB }}>
              <FormHelperText className={classes.validationText}>
                {errors["shoulderTypeId"].message}
              </FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <SectionTitle title="Select your Body Posture" />
          </Grid>
          <Grid item xs={12}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Please select your body posture type",
                },
              }}
              defaultValue={bodyPostureValue}
              control={control}
              name="bodyPostureId"
              as={
                <RadioGroup
                  row={true}
                  aria-label="bodyPostureId"
                  classes={{ row: classes.radioGroup }}
                  //value={bodyPostureValue}
                  onChange={(event) => {
                    setBodyPostureValue(event.target.value);
                  }}
                >
                  {dataBodyPosture.map((item, index) => (
                    <CustomImageRadioButton
                      key={item._id}
                      value={item._id}
                      label={item.name}
                      src={item.image}
                    />
                  ))}
                </RadioGroup>
              }
            />
          </Grid>
          {validate(errors, "bodyPostureId") && (
            <Grid item xs={12} classes={{ root: classes.noPaddingTB }}>
              <FormHelperText className={classes.validationText}>
                {errors["bodyPostureId"].message}
              </FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <SectionTitle title="Select your Body Shape" />
          </Grid>
          <Grid item xs={12}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Please select your body shape type",
                },
              }}
              control={control}
              defaultValue={bodyShapeValue}
              name="bodyShapeId"
              as={
                <RadioGroup
                  row={true}
                  aria-label="bodyShapeId"
                  classes={{ row: classes.radioGroup }}
                  value={bodyShapeValue}
                  onChange={(event) => {
                    setBodyShapeValue(event.target.value);
                  }}
                >
                  {dataBodyShape.map((item, index) => (
                    <CustomImageRadioButton
                      key={item._id}
                      value={item._id}
                      label={item.name}
                      src={item.image}
                      percent={"60%"}
                    />
                  ))}
                </RadioGroup>
              }
            ></Controller>
          </Grid>
          {validate(errors, "bodyShapeId") && (
            <Grid item xs={12} classes={{ root: classes.noPaddingTB }}>
              <FormHelperText className={classes.validationText}>
                {errors["bodyShapeId"].message}
              </FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <SectionTitle title="Select your Fit Preference" />
          </Grid>
          <Grid item xs={12}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Please select your fit preference type",
                },
              }}
              control={control}
              defaultValue={fitPreferenceValue}
              name="fitPreferenceId"
              as={
                <RadioGroup
                  row={true}
                  aria-label="fitPreferenceId"
                  classes={{ row: classes.radioGroup }}
                  value={fitPreferenceValue}
                  onChange={(event) => {
                    setfitPreferenceValue(event.target.value);
                  }}
                >
                  {dataFitPreference.map((item, index) => (
                    <CustomImageRadioButton
                      key={item._id}
                      value={item._id}
                      label={item.name}
                      src={item.image}
                      percent={"60%"}
                    />
                  ))}
                </RadioGroup>
              }
            ></Controller>
          </Grid>
          {validate(errors, "fitPreferenceId") && (
            <Grid item xs={12} classes={{ root: classes.noPaddingTB }}>
              <FormHelperText className={classes.validationText}>
                {errors["fitPreferenceId"].message}
              </FormHelperText>
            </Grid>
          )}

          <Grid item xs={12}>
            <LoadingButton
              btnTitle="Submit"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              btnClassName={classes.btnButton}
              disabled={loadingSBP}
              spinner={loadingSBP}
            ></LoadingButton>
          </Grid>
        </Grid>
      )}
      <InfoDialogComponent
        open={openModel}
        onCloseModel={() => setOpenModel(false)}
      >
        <Box style={{ borderBottom: `1px solid gainsboro` }} p={2}>
          <Typography variant="h6">Body Profile Info</Typography>
        </Box>
        <Box display="flex">
          <Box flex="1" p={3}>
            {!_.isEmpty(bodyProfileData) ? (
              <BodyProfileInfo
                title="First Name"
                subTitle={bodyProfileData.firstName}
              />
            ) : (
              <BodyProfileInfo
                title="First Name"
                subTitle={currentUser.firstName}
              />
            )}

            {!_.isEmpty(bodyProfileData) ? (
              <BodyProfileInfo
                title="Last Name"
                subTitle={bodyProfileData.lastName}
              />
            ) : (
              <BodyProfileInfo
                title="Last Name"
                subTitle={currentUser.lastName}
              />
            )}
            {!_.isEmpty(bodyProfileData) && (
              <BodyProfileInfo
                title="Age"
                subTitle={`${bodyProfileData.age} years`}
              />
            )}
            {!_.isEmpty(bodyProfileData) && (
              <BodyProfileInfo
                title="Height"
                subTitle={`${bodyProfileData.height}cm`}
              />
            )}
            {!_.isEmpty(bodyProfileData) && (
              <BodyProfileInfo
                title="Weight"
                subTitle={`${bodyProfileData.weight} Kg`}
              />
            )}
            {!_.isEmpty(bodyProfileData) ? (
              <BodyProfileInfo
                title="Mobile"
                subTitle={bodyProfileData.phone}
              />
            ) : (
              <BodyProfileInfo title="Mobile" subTitle={currentUser.phone} />
            )}
          </Box>
          <Box flex="1" p={3}>
            {!_.isEmpty(bodyProfileData) ? (
              <BodyProfileInfo title="Email" subTitle={bodyProfileData.email} />
            ) : (
              <BodyProfileInfo title="Email" subTitle={currentUser.email} />
            )}
            {!_.isEmpty(dataShoulder) && (
              <BodyProfileInfo
                title="Shoulder"
                subTitle={getSelectedAttibuteType(
                  "shoulderTypeId",
                  dataShoulder
                )}
              />
            )}
            {!_.isEmpty(dataBodyPosture) && (
              <BodyProfileInfo
                title="Body Posture"
                subTitle={getSelectedAttibuteType(
                  "bodyPostureId",
                  dataBodyPosture
                )}
              />
            )}
            {!_.isEmpty(dataBodyShape) && (
              <BodyProfileInfo
                title="Body Shape"
                subTitle={getSelectedAttibuteType("bodyShapeId", dataBodyShape)}
              />
            )}
            {!_.isEmpty(dataFitPreference) && (
              <BodyProfileInfo
                title="Fit Preference"
                subTitle={getSelectedAttibuteType(
                  "fitPreferenceId",
                  dataFitPreference
                )}
              />
            )}
          </Box>
        </Box>
      </InfoDialogComponent>
    </React.Fragment>
  );
};

export default BodyProfile;
