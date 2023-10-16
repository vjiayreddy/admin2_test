import React, { useState, useEffect, Fragment } from "react";
import { Grid, FormHelperText, Typography, Box } from "@material-ui/core";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { useRouter } from "next/router";
import {
  checkMobileValidation,
  validate,
  emailValidation,
  getCountryCode,
} from "../../../utils/validations";
import PhoneInputField from "../../Ui/formFields/phoneInput";
import TextInputField from "../../Ui/formFields/TextInputField";
import LoadingButton from "../../Ui/formFields/LoadingButton";
import LoadingIndicatorComponent from "../../Ui/loading";

// Apollo

import {
  GET_USER_ADDRESSES,
  ADD_USER_ADDRESS,
} from "../../../apollo/queries/user";
import { useQuery, useMutation } from "@apollo/client";

// Styles
import useStyles from "./style";

const AddressForm = ({ authData }) => {
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState("91");
  const [country, setCountry] = useState("in");

  const router = useRouter();
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      ...authData.data,
    },
  });
  const { data: { getUserAddresses } = {}, loading: loadingUA } = useQuery(
    GET_USER_ADDRESSES,
    {
      onCompleted() {
        if (!_.isEmpty(getUserAddresses)) {
          reset(getUserAddresses.slice(-1)[0]);
          setCountryCode(getUserAddresses[0].countryCode);
        }
      },
      variables: {
        userId: router.query.uid,
      },
    }
  );

  const [saveAddress, { loading: loadingAUA }] = useMutation(ADD_USER_ADDRESS, {
    onCompleted() {
      alert("Data saved successfully");
    },
    refetchQueries: [
      {
        query: GET_USER_ADDRESSES,
        variables: {
          userId: router.query.uid,
        },
      },
    ],
  });

  useEffect(() => {
    if (!_.isEmpty(authData.data)) {
      setCountryCode(authData.data.countryCode);
    }
  }, []);

  const onSubmit = async (data) => {
    await saveAddress({
      variables: {
        address: {
          ...data,
          userId: router.query.uid,
          countryCode: countryCode,
        },
      },
    });
  };

  useEffect(() => {
    if (!_.isEmpty(authData.data)) {
      const { data } = authData;
      if (!_.isEmpty(data)) {
        const _contactInfo = getCountryCode(`${data.countryCode}${data.phone}`);
        setCountry(_contactInfo.country);
        setCountryCode(_contactInfo.countryCode);
      }
    }
  }, [authData]);

  return (
    <Fragment>
      {loadingUA ? (
        <LoadingIndicatorComponent height={null} />
      ) : (
        <form id="address-form" noValidate autoComplete="off">
          <Box pl={2} pt={2}>
            <Typography variant="h6">Modify User Address Details</Typography>
          </Box>

          <Grid
            container
            direction="column"
            spacing={1}
            classes={{ root: classes.formInputWrapper }}
          >
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sm={6}
              xl={6}
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
              md={6}
              lg={6}
              sm={6}
              xl={6}
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
                <Grid item xs>
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
            {validate(errors, "phone") && (
              <Grid item xs={12} classes={{ root: classes.noPaddingTB }}>
                <FormHelperText className={classes.validationText}>
                  {errors["phone"].message}
                </FormHelperText>
              </Grid>
            )}
            <Grid xs={12} md={6} lg={6} sm={6} xl={6} item>
              <TextInputField
                inputRef={register(emailValidation)}
                placeholder="Email ID"
                name="email"
                id="input-email"
                showError={true}
                errors={errors}
              />
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} xl={6} item>
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                    message: "Enter a valid address",
                  },
                })}
                placeholder="Address Line 1"
                name="address1"
                id="input-address-1"
                showError={true}
                errors={errors}
              />
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} xl={6} item>
              <TextInputField
                inputRef={register({
                  required: {
                    value: true,
                    message: "Enter a valid address",
                  },
                })}
                placeholder="Address Line 2"
                name="address2"
                id="input-address-2"
                showError={true}
                errors={errors}
              />
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} xl={6} item>
              <TextInputField
                inputRef={register}
                placeholder="Landmark (Optional)"
                name="landmark"
                id="input-landmart"
                showError={true}
                errors={errors}
              />
            </Grid>

            <Grid
              xs={12}
              md={6}
              lg={6}
              sm={6}
              xl={6}
              item
              container
              spacing={1}
              classes={{ root: classes.noPaddingR }}
            >
              <Grid xs item>
                <TextInputField
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Enter a valid City",
                    },
                  })}
                  placeholder="City"
                  name="city"
                  id="input-city"
                  showError={true}
                  errors={errors}
                />
              </Grid>
              <Grid xs item classes={{ root: classes.noPaddingR }}>
                <TextInputField
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Enter a valid State",
                    },
                  })}
                  placeholder="State"
                  name="state"
                  id="input-state"
                  showError={true}
                  errors={errors}
                />
              </Grid>
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={6}
              sm={6}
              xl={6}
              item
              container
              spacing={1}
              classes={{ root: classes.noPaddingR }}
            >
              <Grid xs item>
                <TextInputField
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Enter a valid Country",
                    },
                  })}
                  placeholder="Country"
                  name="country"
                  id="input-country"
                  showError={true}
                  errors={errors}
                />
              </Grid>
              <Grid xs item classes={{ root: classes.noPaddingR }}>
                <TextInputField
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Enter a valid Postal Code",
                    },
                  })}
                  placeholder="Postal Code"
                  name="postalCode"
                  id="input-postal"
                  showError={true}
                  errors={errors}
                />
              </Grid>
            </Grid>
            <Grid
              classes={{ root: classes.siginButton }}
              xs={12}
              md={6}
              lg={6}
              sm={6}
              xl={6}
              item
            >
              <LoadingButton
                id="btn-address-action"
                btnTitle="Save Address"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                disabled={loadingAUA}
                classes={{ root: classes.siginButton }}
                spinner={loadingAUA}
              ></LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Fragment>
  );
};

export default AddressForm;
