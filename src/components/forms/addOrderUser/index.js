import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Button,
  FormHelperText,
  Typography,
  TextField,
} from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";
import _ from "lodash";
import {
  checkMobileValidation,
  validate,
  emailValidation,
  getCountryCode,
} from "../../../utils/validations";
import PhoneInputField from "../../Ui/formFields/phoneInput";
import TextInputField from "../../Ui/formFields/TextInputField";
import SelectDropDown from "../../Ui/formFields/SelectDropdown";
import useStyles from "./styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

// import PasswordInputField from "@/components/shared/inputs/PasswordInputField";
import LoadingButton from "../../Ui/formFields/LoadingButton";
//import Link from "next/link";
import clxs from "clsx";

const options = [
  { name: "cm", value: "cm" },
  { name: "feet", value: "feet" },
];

const SignUpForm = ({ onClickSubmit, isSubmitting, mobileNumber, cCode }) => {
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState("91");
  const [country, setCountry] = useState("in");

  const { register, handleSubmit, errors, reset, control } = useForm();

  const onSubmit = (data) => {
    onClickSubmit({
      ...data,
      password: "Mpf@1234",
      countryCode: `+${countryCode}`,
    });
  };

  useEffect(() => {
    if (!_.isEmpty(mobileNumber)) {
      const _contactInfo = getCountryCode(`${cCode}${mobileNumber}`);
      reset({ phone: mobileNumber });
      setCountry(_contactInfo.country);
      setCountryCode(_contactInfo.countryCode);
    }
  }, [mobileNumber, cCode]);

  return (
    <form id="login-form" noValidate autoComplete="off">
      <Grid container spacing={1} classes={{ root: classes.formInputWrapper }}>
        <Grid
          item
          xs={12}
          container
          spacing={1}
          classes={{ root: classes.noPaddingR }}
        >
          <Grid item xs>
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
              errors={errors}
              showError={true}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
          <Grid item xs classes={{ root: classes.noPaddingR }}>
            <TextInputField
              inputRef={register({
                required: {
                  value: true,
                  message: "Enter a valid Last Name",
                },
              })}
              name="lastName"
              id="input-lastname"
              placeholder="Lastname"
              errors={errors}
              showError={true}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          container
          spacing={1}
          classes={{ root: classes.noPaddingR }}
        >
          <Grid item>
            <PhoneInputField
              country={country}
              onChange={(value) => setCountryCode(value)}
            />
          </Grid>
          <Grid item xs container classes={{ root: classes.noPaddingR }}>
            <Grid item xs={12}>
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                    message: "Enter a valid Mobile Number.",
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
                className={
                  !_.isEmpty(errors) && _.has(errors, "phone")
                    ? classes.validationError
                    : ""
                }
              />
            </Grid>
          </Grid>
        </Grid>
        {validate(errors, "phone") ? (
          <Grid item xs={12} classes={{ root: classes.noPaddingTB }}>
            <FormHelperText className={classes.validationText}>
              {errors["phone"].message}
            </FormHelperText>
          </Grid>
        ) : (
          <Grid item xs={12} classes={{ root: classes.noPaddingTB }}>
            <FormHelperText>
              OTP will be sent to your number for verification.
            </FormHelperText>
          </Grid>
        )}
        <Grid xs={12} item>
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
            showError={true}
            errors={errors}
          />
        </Grid>

        {/* <Grid item md={6}>
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
                        message: "Enter a valid Feet",
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
                        message: "Enter a valid Inch",
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
        </Grid> */}
        {/* <Grid item md={6}>
          <TextInputField
            inputRef={register({
              required: true,
              message: "Enter a valid weight",
            })}
            placeholder="Weight"
            name="weight"
            type="number"
            id="input-weight"
            showError={true}
            errors={errors}
          />
        </Grid> */}

        {/* <Grid item md={6}>
          <Controller
            render={(props) => {
              return (
                <Autocomplete
                  {...props}
                  options={stylists}
                  style={{ width: "100%" }}
                  placeholder="Select Stylist"
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
        </Grid> */}
        {/* <Grid item md={6}>
          <Controller
            render={(props) => {
              return (
                <Autocomplete
                  {...props}
                  options={masterPersona}
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
            name={`customerPersonaId`}
            control={control}
          />
        </Grid> */}

        {/* <Grid xs={4} item>
          <LoadingButton
            id="btn-close"
            btnTitle="Close"
            color="primary"
            onClick={onClose}
            disabled={isSubmitting}
            classes={{ root: classes.siginButton }}
          ></LoadingButton>
        </Grid> */}
        <Grid xs={4} item>
          <LoadingButton
            id="btn-signin"
            btnTitle="Sign up"
            color="secondary"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            classes={{ root: classes.siginButton }}
            spinner={isSubmitting}
          ></LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
