import React, { Fragment, useEffect, useState } from "react";
import useStyles from "../orderForm/styles";
import {
  Grid,
  Button,
  Box,
  Typography,
  TableRow,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import OrderHeader from "../orderForm/orderHeader";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_BODYPROFILE,
  GET_SAVEBODY_PROFILE,
  GET_STANDARD_SIZE_CHART,
  SAVE_SIZING_CHART,
  GET_USER_STANDARD_SIZING,
} from "../../../apollo/queries/measurments";

// import SelectDropDown from "../../Ui/formFields/SelectDropdown";
import _ from "lodash";
// Apollo
// import { GET_SINGLE_STORE_ORDERBY_ID } from "../../../apollo/queries/orders";

const StandardSizingForm = (props) => {
  const classes = useStyles();
  const [note, setNote] = useState();
  const [selectedSize, setSelectedSize] = useState("select");
  const [selectHeight, setHeight] = useState("cm");
  const [sizes, setSizes] = useState([]);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [getGetUserBodyProfile, { data: { getBodyProfile } = {} }] =
    useLazyQuery(GET_BODYPROFILE);
  const [GetStandardSizeChart, { data: { getStandardSizeChart } = {} }] =
    useLazyQuery(GET_STANDARD_SIZE_CHART);

  const [GetUserStandardSizing, { data: { getUserStandardSizing } = {} }] =
    useLazyQuery(GET_USER_STANDARD_SIZING, {
      fetchPolicy: "network-only",
    });

  const [getSaveBodyProfile, { loading: loadingSBP }] = useMutation(
    GET_SAVEBODY_PROFILE,
    {
      onCompleted({ saveBodyProfile }) {
        const getFormData = getValues();
        const getSize = _.find(
          getStandardSizeChart,
          (item) => item.size === getFormData.size
        );
        if (getFormData.size === "select") {
          alert("Data Saved Successfully");
        } else {
          SaveUserStandardSizing({
            variables: {
              body: [
                {
                  userId: router?.query?.uid,
                  catId: router?.query?.catId,
                  size: getFormData?.size,
                  bodyProfileId: saveBodyProfile?._id,
                  label: getSize?.label,
                  modifiedOptions: [],
                  note: getFormData.note,
                },
              ],
            },
          });
        }
      },
    }
  );

  const [SaveUserStandardSizing, { loading: loadingSUSS }] = useMutation(
    SAVE_SIZING_CHART,
    {
      onCompleted() {
        alert("Data saved successfully");
      },
    }
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    reset,
    getValues,
    register,
    setValue,
    handleSubmit,
    errors,
  } = useForm({});

  const fitOptions = [
    {
      name: "Tight",
      _id: "5ebf70cc8883f7112c0346be",
      image:
        "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/fitPreference/tight.jpg",
    },
    {
      name: "Slim",
      _id: "5ebf71208883f7112c0346bf",
      image:
        "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/fitPreference/slim.png",
    },
    {
      name: "Regular",
      _id: "5ebf71448883f7112c0346c1",
      image:
        "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/fitPreference/normal.png",
    },
    {
      name: "Loose",
      _id: "5ebf712f8883f7112c0346c0",
      image:
        "https://mpf-public-data.s3.ap-south-1.amazonaws.com/Images/MPFTypeImages/fitPreference/loose.png",
    },
  ];

  useEffect(() => {
    if (router?.query?.uid) {
      getGetUserBodyProfile({
        variables: {
          userId: router?.query?.uid,
        },
      });
      GetStandardSizeChart({
        variables: {
          catIds: [router?.query?.catId],
        },
      });
      GetUserStandardSizing({
        variables: {
          userId: router?.query?.uid,
          catIds: [router?.query?.catId],
          limit: 20,
          page: 1,
        },
      });
    }
  }, [router]);

  useEffect(() => {
    if (getBodyProfile?.length > 0) {
      reset(getBodyProfile[0]);
    }
  }, [getBodyProfile]);

  useEffect(() => {
    if (getStandardSizeChart?.length > 0) {
      setSizes(getStandardSizeChart);
    }
  }, [getStandardSizeChart]);

  useEffect(() => {
    if (getUserStandardSizing?.length > 0) {
      setValue("size", getUserStandardSizing[0]?.["size"]);
      setValue("note", getUserStandardSizing[0]?.["note"]);
    }
  }, [getUserStandardSizing]);

  const handleChangeHeight = (e) => {
    const formValues = getValues();
    if (e.target.value == "feet") {
      var realFeet = (Number(formValues.height) * 0.3937) / 12;
      var feet = Math.floor(realFeet);
      var inches = Math.round((realFeet - feet) * 12);
      const payload = {
        ...formValues,
        feet: feet,
        inch: inches,
      };
      reset(payload);
    } else {
      if (!_.isEmpty(formValues.feet) && !_.isEmpty(formValues.inch)) {
        var value1 = parseInt(formValues.feet) * 12;
        var value2 = value1 + parseInt(formValues.inch);
        var cm = value2 * 2.54;
        const payload = {
          ...formValues,
          height: Math.round(cm),
        };
        reset(payload);
      }
    }
  };

  const onSubmit = async (data) => {
    let payload = {};
    if (getBodyProfile?.length > 0) {
      const { frontPicture, sidePicture, backPicture, ...rest } =
        getBodyProfile[0];
      payload = {
        ...rest,
        userId: router?.query?.uid,
        age: Number(data?.age),
        fitPreferenceId: data?.fitPreferenceId,
        weight: Number(data?.weight),
      };
    } else {
      payload = {
        userId: router?.uid,
        age: Number(data?.age),
        fitPreferenceId: data?.fitPreferenceId,
        weight: Number(data?.weight),
        firstName: props?.user?.data?.firstName,
        lastName: props?.user?.data?.lastName,
        phone: props?.user?.data?.phone,
        email: props?.user?.data?.email,
        countryCode: "91",
        shoulderTypeId: "",
        bodyPostureId: "",
        bodyShapeId: "",
      };
    }
    if (!_.isEmpty(data.feet) && !_.isEmpty(data.inch)) {
      var value1 = parseInt(data.feet) * 12;
      var value2 = value1 + parseInt(data.inch);
      payload["height"] = Number(value2 * 2.54);
    } else {
      payload["height"] = Number(data?.height);
    }

    await getSaveBodyProfile({
      variables: {
        basicInfo: payload,
      },
    });
  };

  return (
    <Fragment>
      <OrderHeader
        title={"Standard Sizing Form"}
        btnTitle="Print"
        onClick={() => {}}
      />

      <Fragment>
        <Grid
          container
          spacing={1}
          className={classes.orderFormGrid}
          direction="row"
        >
          <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
            <p className={classes.formLabel}> OutFit Category</p>
            <input
              readOnly
              value={router?.query?.category}
              type="text"
              style={{ width: "100%", height: "35px" }}
              placeholder="Category"
            />
          </Grid>
          <Grid item xs={6} md={4} lg={4} sm={4} xl={4}>
            <p className={classes.formLabel}>Size</p>
            <select
              id="out-size-option"
              name="size"
              ref={register({})}
              style={{ width: "100%", height: "35px" }}
            >
              <option value="select">-- Select Size ---</option>
              {sizes?.length > 0 && (
                <>
                  {sizes.map((size, index) => (
                    <option key={index} value={size.size}>
                      {size.size}
                    </option>
                  ))}
                </>
              )}
            </select>
          </Grid>

          <Grid item xs={12} style={{ paddingTop: 20 }}>
            <p className={classes.formLabel}>Profile :</p>
          </Grid>
          <Grid item md={6}>
            <Grid container spacing={1} alignItems="center">
              {selectHeight === "cm" ? (
                <Grid item xs={8}>
                  <input
                    type="number"
                    name="height"
                    ref={register({})}
                    style={{ width: "100%", height: "35px" }}
                    placeholder="Enter Height(cm)"
                  />
                </Grid>
              ) : (
                <Grid item xs={8} container alignItems="center">
                  <Grid item xs={6}>
                    <input
                      type="number"
                      name="feet"
                      ref={register({})}
                      style={{ width: "95%", height: "35px" }}
                      placeholder="Feet"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <input
                      name="inch"
                      ref={register({})}
                      type="number"
                      style={{ width: "100%", height: "35px" }}
                      placeholder="Inch"
                    />
                  </Grid>
                </Grid>
              )}
              <Grid item xs={4}>
                <select
                  style={{ width: "100%", height: "35px" }}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    handleChangeHeight(e);
                  }}
                >
                  <option value="cm">Cm</option>
                  <option value="feet">Feet</option>
                </select>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="number"
                  style={{ width: "100%", height: "35px" }}
                  placeholder="Enter Weight"
                  name="weight"
                  ref={register({})}
                />
              </Grid>
              <Grid item xs={4}>
                <select style={{ width: "100%", height: "35px" }}>
                  <option value="kg">Kg</option>
                  <option value="lb">Lb</option>
                </select>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="number"
                  name="age"
                  ref={register({})}
                  style={{ width: "100%", height: "35px" }}
                  placeholder="Age"
                />
              </Grid>
              <Grid item xs={4}>
                <select style={{ width: "100%", height: "35px" }}>
                  <option value="Yrs">Yrs</option>
                </select>
              </Grid>
              <Grid item xs={12}>
                <select
                  name="fitPreferenceId"
                  ref={register({})}
                  style={{ width: "100%", height: "35px" }}
                >
                  <option value="select">---Select Fit Type--</option>
                  {fitOptions.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <p className={classes.formLabel}>Notes:</p>
          </Grid>
          <Grid item xs={12}>
            <textarea
              style={{
                width: "100%",
                minHeight: 100,
                padding: 20,
              }}
              multiline={true}
              rowsMax={5}
              name="note"
              ref={register()}
              placeholder={""}
            ></textarea>
          </Grid>
          <Box p={2}>
            <Button color="secondary" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </Box>

          <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={open}
            onClose={handleClose}
          >
            <DialogContent className={classes.dialogContainer}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography align="center" className={classes.dialogTitle}>
                    Shirt Measurement
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="orderFormTable" style={{ width: "%" }}>
                      <table className="table">
                        <tr style={{ backgroundColor: "cornsilk" }}>
                          <td style={{ paddingLeft: 10, textAlign: "center" }}>
                            Size
                          </td>
                          <td style={{ paddingLeft: 10, textAlign: "center" }}>
                            Chest
                          </td>
                          <td style={{ paddingLeft: 10, textAlign: "center" }}>
                            Length
                          </td>
                          <td style={{ paddingLeft: 10, textAlign: "center" }}>
                            Sleeve
                          </td>
                          <td style={{ paddingLeft: 10, textAlign: "center" }}>
                            Shoulder
                          </td>
                        </tr>

                        <tbody>
                          <TableRow>
                            <td width={150}>S-38</td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                            <td width={150}></td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                          </TableRow>
                          <TableRow>
                            <td width={150}>M-40</td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                            <td width={150}></td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                          </TableRow>
                          <TableRow>
                            <td width={150}>L-42</td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                            <td width={150}></td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                          </TableRow>
                          <TableRow>
                            <td width={150}>XL-44</td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                            <td width={150}></td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                          </TableRow>
                          <TableRow>
                            <td width={150}>2XL-46</td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                            <td width={150}></td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                          </TableRow>
                          <TableRow>
                            <td width={150}>3XL-48</td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                            <td width={150}></td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                            <td classes={{ root: classes.tableCellRoot }}></td>
                          </TableRow>
                        </tbody>
                      </table>
                    </div>
                  </Box>
                </Grid>
              </Grid>

              {/* <div className={classes.dialogCloseIcon}>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon style={{ color: "black" }} />
            </IconButton>
          </div> */}
              <div>
                <Button
                  onClick={() => {
                    console.log(router.query);
                    router.push({
                      pathname: "/standardsize/sizingmeasurement",
                      query: {
                        ...router.query,
                      },
                    });
                  }}
                >
                  Edit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </Grid>
      </Fragment>
    </Fragment>
  );
};

export default StandardSizingForm;
