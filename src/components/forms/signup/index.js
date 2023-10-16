import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  makeStyles,
  Button,
  FormHelperText,
  Typography,
  Box,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";
import ReCAPTCHA from "react-google-recaptcha";

import {
  checkMobileValidation,
  validate,
  emailValidation,
  passwordValidation,
  getCountryCode,
} from "../../../utils/validations";
import PhoneInputField from "../../Ui/formFields/phoneInput";
import TextInputField from "../../Ui/formFields/TextInputField";
// import PasswordInputField from "@/components/shared/inputs/PasswordInputField";
import LoadingButton from "../../Ui/formFields/LoadingButton";
//import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  formInputWrapper: {
    marginBottom: theme.spacing(1),
  },
  validationText: {
    color: `${theme.palette.error.main} !important`,
  },
  progressCircle: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  validationError: {
    border: `1px solid ${theme.palette.error.main}  !important`,
  },
  formFooter: {
    marginTop: theme.spacing(3),
  },
  infoLabel: {
    ...theme.typography.subtitle2,
    fontSize: 13,
  },
  infoLinkBtn: {
    ...theme.typography.subtitle2,
    fontSize: 13,
    color: "#E27217",
  },
  noPaddingR: {
    paddingRight: `0 !important`,
  },
  noPaddingTB: {
    paddingTop: `0 !important`,
    paddingBottom: `0 !important`,
  },
  siginButton: {
    marginTop: theme.spacing(2),
  },
}));

const key = "6LejteciAAAAAE4spWGdCB4vARaJ6OE0FJP30xOA";
const SignUpForm = ({ onClickSubmit, isSubmitting, mobileNumber, cCode }) => {
  const classes = useStyles();
  const [reCapchaError, setReCaptchaError] = useState(null);
  const captchaRef = useRef(null);

  const [countryCode, setCountryCode] = useState("91");
  const [country, setCountry] = useState("in");
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    if (captchaRef?.current) {
      if (captchaRef?.current.props.grecaptcha.getResponse()) {
        const capchaKey = captchaRef?.current.props.grecaptcha.getResponse();
        onClickSubmit({
          ...data,
          password: "Mpf@1234",
          countryCode: `+${countryCode}`,
          googleVerificationCode: capchaKey ? capchaKey : "-",
        });
      } else {
        setReCaptchaError("RE_CAPTCHA_ERROR");
      }
    } else {
      setReCaptchaError("RE_CAPTCHA_ERROR");
    }
  };

  useEffect(() => {
    if (!_.isEmpty(mobileNumber)) {
      const _contactInfo = getCountryCode(`${cCode}${mobileNumber}`);
      reset({ phone: mobileNumber });
      setCountry(_contactInfo.country);
      setCountryCode(_contactInfo.countryCode);
    }
  }, [mobileNumber, cCode]);

  async function onChange(value) {
    if (captchaRef?.current) {
      if (captchaRef?.current.props.grecaptcha.getResponse()) {
        setReCaptchaError(null);
      }
    }
  }

  return (
    <form id="login-form" noValidate autoComplete="off">
      <Grid
        container
        direction="column"
        spacing={1}
        classes={{ root: classes.formInputWrapper }}
      >
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
                value: true,
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

        <Grid xs={12} item>
          <Box mb={2}>
            {reCapchaError === "RE_CAPTCHA_ERROR" && (
              <FormHelperText error={true}>
                Please verify reCaptcha{" "}
              </FormHelperText>
            )}
          </Box>
          <ReCAPTCHA ref={captchaRef} sitekey={key} onChange={onChange} />
        </Grid>
        {/* <Grid xs={12} item>
          <TextInputField
            inputRef={register(passwordValidation)}
            placeholder="Password"
            id="input-password"
            name="password"
            errors={errors}
            showError={true}
          />
        </Grid> */}
        <Grid xs={4} item>
          <LoadingButton
            id="btn-signin"
            btnTitle="Sign up"
            color="primary"
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
