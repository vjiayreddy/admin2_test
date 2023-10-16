import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  FormHelperText,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import {
  CAT_IDS,
  ROLE,
  dropDownOptions,
  remarks,
  pannaSize,
  meters,
} from "../../../apollo/calculateMeasurments/utils";
import {
  measurementsSorting,
  getMeasurmentLength,
  getFormPayload,
  getMeasurmentSleevLength,
  getMeasurmentBodyLength,
  renderViewButton,
} from "../../../apollo/calculateMeasurments/service";
import { useForm, Controller } from "react-hook-form";
// Apollo
import { useMutation, useQuery } from "@apollo/client";
import {
  SAVE_USER_MEASURMENTS,
  GET_ALL_TAILORS,
} from "../../../apollo/queries/measurments";
import { GET_ALL_STYLISTS } from "../../../apollo/queries/user";
import { useGetOccasions } from "../../../apollo/calculateMeasurments/useGetOccasions";
import { useGetMeasurmentsAttributes } from "../../../apollo/calculateMeasurments/useGetMeasurmentsAttrs";
import { useGetUserMeasurments } from "../../../apollo/calculateMeasurments/useGetUserMeasurments";
import { useCalCommonMeasurements } from "../../../apollo/calculateMeasurments/useCalCommonMeasurments";
import { useCalInternalFormula } from "../../../apollo/calculateMeasurments/useCalInternalFormula";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";

import _ from "lodash";

// Components
import LoadingIndicatorComponent from "../../Ui/loading";
import LoadingButton from "../../Ui/formFields/LoadingButton";
import TextInputField from "../../Ui/formFields/TextInputField";
import InfoDialogComponent from "../../Ui/dialog/infoDialog";
import ViewMesurments from "../../Ui/viewMeasurments";
import ViewSuitMeasurments from "../../Ui/viewMeasurments/suitIndex";

import MeasurementsType from "../../forms/measurments/measurment_type";
import { debounceTime } from "rxjs/operators";
import { Subject } from "rxjs";
import { useRouter } from "next/router";

// date
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import EventIcon from "@material-ui/icons/Event";
// import { wrap } from "module";

const useDebounce = (time, initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [values] = useState(() => new Subject());
  useEffect(() => {
    const sub = values.pipe(debounceTime(time)).subscribe(setValue);
    return () => sub.unsubscribe();
  }, [time, values]);
  return [value, (v) => values.next(v)];
};

const MeasurementsForm = (props) => {
  const [value, setValue] = useDebounce(500, null);
  const [approvedDate, setApprovedDate] = useState(new Date());
  const [fieldName, setFieldName] = useDebounce(null);
  const { authToken, userInfo } = props;
  const [productId, setProductId] = useState(CAT_IDS.SHIRT_CAT_ID);
  const [tailors, setAllTailors] = useState([]);
  const [note, setNote] = useState();
  const [measurments, setMeasurments] = useState();
  const [isViewMeasurments, setIsViewMeasurments] = useState(false);
  const [setRemark, setSelectRemark] = useState();
  const [selectTailor, setSelectedTailor] = useState();
  const [selectedPannaSize, setPannaSize] = useState(44);
  const [dyeable, setDyeable] = useState(false);
  const [mtr_1, setMtr_1] = useState(0);
  const [mtr_2, setMtr_2] = useState(0);
  const [_length, setLength] = useState(0);
  const [_bodyMaxLength, setBodyMaxLength] = useState(0);
  const [_sleevLength, setSleevLength] = useState(0);
  const [_fabricMesurmentinfo, setFabricMesurmentinfo] = useState();
  const [catName, setCatName] = useState("Shirts");
  const [measurmentType, setMeasurmentType] = useState("inches");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const classes = useStyles();
  const [selectRowEle, setSelectRowEle] = useState(0);
  const [selectedEle, setSelectedEle] = useState(0);
  const [stylists, setStylists] = useState([]);

  const { loading: loadingStylists } = useQuery(GET_ALL_STYLISTS, {
    onCompleted({ getAllStylists }) {
      let tempData = [];
      getAllStylists.map((item) => {
        tempData.push({ name: item.name, value: item._id });
      });
      setStylists([{ name: "", value: null }, ...tempData]);
    },
  });
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue: setFormValues,
    reset,
    getValues,
  } = useForm({
    mode: "all",
  });

  const { categories } = useGetOccasions();
  const { data: dataTailors, loading: dataLoading } = useQuery(GET_ALL_TAILORS);
  const { measurementsAttributes, getProductMeasurements, subCatId } =
    useGetMeasurmentsAttributes();
  const {
    getUserMeasurments,
    measurementsData,
    getLastSavedMeasurments,
    isInitialMeasurments,
  } = useGetUserMeasurments();
  const { gqlGetCategoryMeasurements, commonMeasurments } =
    useCalCommonMeasurements(
      productId,
      authToken,
      measurementsAttributes,
      measurementsData
    );
  const { calculateInternalFormulas, internalMeasurements, resetFormula } =
    useCalInternalFormula(measurementsAttributes, productId);
  const [saveUserMeasurmentsInfo, { loading: loadingUM }] = useMutation(
    SAVE_USER_MEASURMENTS,
    {
      onError(error) {
        alert("Something went wrong please try again...");
      },
      onCompleted() {
        setIsSubmitted(true);
      },
    }
  );

  // Initial loading

  useEffect(() => {
    if (!_.isEmpty(dataTailors)) {
      const { getAllTailors } = dataTailors;
      let data = [];
      getAllTailors.map((item) => {
        data.push({
          name: item.name,
          value: item.name,
        });
      });

      setAllTailors([
        { name: "--Select--", value: null },
        { name: "Self", value: "self" },
        ...data,
      ]);
    }
  }, [dataTailors]);

  useEffect(() => {
    if (router.query?.catId) {
      setProductId(router.query?.catId);
    }
    getProductMeasurements({
      variables: {
        role: ROLE.PERSONAL_STYLIST,
        catId: router.query?.catId || productId,
      },
    });
  }, []);

  const handleChangeDropDown = (e) => {
    setProductId(e.target.value);
    const _catName = _.find(
      categories,
      (item) => item.value === e.target.value
    );
    if (!_.isEmpty(_catName)) {
      setCatName(_catName.name);
    }
    getProductMeasurements({
      variables: {
        role: ROLE.PERSONAL_STYLIST,
        catId: e.target.value,
      },
    });
  };

  useEffect(() => {
    if (measurementsAttributes) {
      getUserMeasurments(productId, authToken, subCatId);
    }
  }, [measurementsAttributes]);

  useEffect(() => {
    if (measurementsData) {
      if (
        productId === CAT_IDS.SHIRT_CAT_ID ||
        productId === CAT_IDS.TROUSER_CAT_ID
      ) {
        reset(measurementsData);

        if (isInitialMeasurments) {
          calculateInternalFormulas(measurementsData, null);
        }
      } else {
        reset(measurementsData);
        gqlGetCategoryMeasurements();
      }
    }
  }, [measurementsData]);

  useEffect(() => {
    if (!_.isEmpty(getLastSavedMeasurments)) {
      setSelectedTailor(getLastSavedMeasurments.measuredBy);
      setSelectRemark(getLastSavedMeasurments.remarks);
      setPannaSize(getLastSavedMeasurments.pannaSize);
      let meter = getLastSavedMeasurments.noOfMeters;
      if (meter) {
        var opStr = !_.isNull(meter) ? meter.toString().split(".") : "0.0";
        setMtr_1(opStr[0]);
        setMtr_2(opStr[1]);
      }
      setDyeable(getLastSavedMeasurments.isDyable);
      setFormValues(
        "approvedDate",
        getLastSavedMeasurments?.approvedDate?.timeStamp
      );
      setLength(
        getMeasurmentLength(getLastSavedMeasurments.options, categories)
      );
      setFabricMesurmentinfo(catName);
      setSleevLength(
        getMeasurmentSleevLength(getLastSavedMeasurments.options, catName)
      );
      setBodyMaxLength(
        getMeasurmentBodyLength(getLastSavedMeasurments.options, catName)
      );
      if (!_.isEmpty(getLastSavedMeasurments?.approvedBy)) {
        setApprovedDate(
          moment(getLastSavedMeasurments?.approvedDate?.timestamp)
        );
      } else {
        setApprovedDate(moment(new Date()));
      }

      setNote(getLastSavedMeasurments.note);
    }
  }, [getLastSavedMeasurments]);

  useEffect(() => {
    if (commonMeasurments) {
      reset(commonMeasurments);

      if (isInitialMeasurments) {
        calculateInternalFormulas(commonMeasurments, null);
      }
    }
  }, [commonMeasurments]);

  useEffect(() => {
    if (!_.isEmpty(internalMeasurements)) {
      reset(internalMeasurements);
    }
  }, [internalMeasurements]);

  const onViewData = (data) => {
    const findStylist = _.find(
      stylists,
      (item) => item.value === data.approvedBy
    );

    const payload = {
      ...data,
      approvedBy: findStylist?.name,
      meters: `${mtr_1}.${mtr_2}`,
      measuredBy: `${selectTailor}`,
    };
    setMeasurments(payload);
    setIsViewMeasurments(data);
  };

  const onSubmit = async (formData) => {
    const payload = getFormPayload(
      measurementsAttributes,
      authToken,
      productId,
      subCatId,
      formData,
      selectTailor,
      mtr_1,
      mtr_2,
      selectedPannaSize,
      note,
      dyeable,
      setRemark,
      approvedDate
    );

    await saveUserMeasurmentsInfo({
      variables: {
        userMeasurements: payload,
      },
    });
  };

  useEffect(() => {
    if (value) {
      const formData = getValues();
      calculateInternalFormulas(formData, fieldName);
    }
  }, [value]);

  return (
    <Grid
      container
      direction="column"
      classes={{ root: classes.measurmentContainer }}
    >
      {categories && (
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={4} md={2}>
              <Box mb={1}>
                <label>Select Category:</label>
              </Box>
              <select
                id="category-drop-down"
                value={productId}
                style={{ width: "100%", height: "35px" }}
                onChange={handleChangeDropDown}
              >
                {categories.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Grid>
            {tailors && (
              <Grid item xs={4} md={2}>
                <Box mb={1}>
                  <label>Measured By:</label>
                </Box>
                <select
                  id="measuredby-dropdown"
                  value={selectTailor}
                  style={{ width: "100%", height: "35px" }}
                  onChange={(e) => {
                    setSelectedTailor(e.target.value);
                  }}
                >
                  {tailors.map((item, index) => (
                    <option
                      selected={selectTailor === item.value ? true : false}
                      key={index}
                      value={item.value}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </Grid>
            )}
            <Grid item xs={4} md={2}>
              <Box mb={1}>
                <label>Remark:</label>
              </Box>
              <select
                id="remark-dropdown"
                style={{ width: "100%", height: "35px" }}
                onChange={(e) => {
                  setSelectRemark(e.target.value);
                }}
              >
                {remarks.map((item, index) => (
                  <option
                    selected={setRemark === item.value ? true : false}
                    key={index}
                    value={item.value}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid xs={12} item classes={{ root: classes.measurmentTypeSection }}>
        <MeasurementsType
          value={measurmentType}
          disabled={false}
          isView={renderViewButton(productId)}
          onClickPdfbtn={() => {
            //setIsPdfUpload(true);
          }}
          onClickReset={() => {}}
          onClickView={handleSubmit(onViewData)}
          onChange={(e) => {
            setMeasurmentType(e.target.value);
          }}
        />
      </Grid>

      {measurementsAttributes && (
        <>
          {measurementsSorting(
            measurementsAttributes,
            productId
          )._groupedMeasurements.map((item, index) => (
            <Grid
              item
              xs={12}
              container
              alignItems="stretch"
              key={index}
              style={{ marginBottom: 10 }}
            >
              {item.map((value, i) => (
                <Grid
                  style={{ height: "100%" }}
                  key={i}
                  item
                  sm={4}
                  xs={4}
                  md={2}
                  lg={2}
                  xl={2}
                >
                  <Box
                    style={{
                      height: "100%",
                      backgroundColor: _.hasIn(value, "isCommonMeasurment")
                        ? "#FFF9C4"
                        : value.isRequired
                        ? "#E3F2FD"
                        : "#FFFFFF",
                    }}
                    className={
                      selectedEle === i && selectRowEle === index
                        ? classes.selectOptionsForm
                        : classes.selectOptions
                    }
                    m={0.4}
                  >
                    <Grid
                      onClick={() => {
                        setSelectRowEle(index);
                        setSelectedEle(i);
                      }}
                      container
                      spacing={1}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="h2"
                          component="h2"
                          classes={{ root: classes.optionTitle }}
                        >
                          {value.label}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <input
                          placeholder="Inch"
                          style={{ width: "100%" }}
                          name={value.name}
                          onChange={(e) => {
                            setFieldName(value.name);
                            setValue(e.target.value);
                          }}
                          type="number"
                          ref={register({
                            required: {
                              value: value.isRequired,
                              message: `Enter a valid ${value.label}`,
                            },
                          })}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Controller
                          control={control}
                          name={`${value.name}_size`}
                          defaultValue={value.size}
                          render={(props) => (
                            <select
                              value={props.value}
                              onChange={(e) => {
                                props.onChange(e);
                                setFieldName(value.name);
                                setValue(e.target.value);
                              }}
                              style={{ height: 21, width: "100%" }}
                              id="height-dropdown"
                            >
                              {dropDownOptions.map((_item, _i) => (
                                <option key={_i} value={_item.value}>
                                  {_item.name}
                                </option>
                              ))}
                            </select>
                          )}
                        ></Controller>
                      </Grid>

                      {value.isUpdateManually && (
                        <IconButton
                          onClick={() => {
                            const formData = getValues();
                            resetFormula(value.name, formData);
                          }}
                          size="small"
                          style={{
                            color: "red",
                            fontSize: 12,
                            border: "1px solid red",
                            borderRadius: "0px",
                          }}
                        >
                          Reset
                        </IconButton>
                      )}

                      {!_.isEmpty(errors) && (
                        <Grid item xs={12}>
                          <FormHelperText className={classes.validationText}>
                            {_.hasIn(errors[value.name], "message") &&
                              errors[value.name].message}
                          </FormHelperText>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ))}

          <Grid item xs={12}>
            {!_.isEmpty(measurementsAttributes) && (
              <Box style={{ marginTop: 30 }}>
                <Accordion style={{ backgroundColor: "blanchedalmond" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      Fabric Requirement
                    </Typography>
                  </AccordionSummary>
                  <Divider />
                  <AccordionDetails style={{ backgroundColor: "#E3F2FD" }}>
                    <Grid container spacing={1}>
                      <Grid item md={4}>
                        <Box mb={1}>
                          <label>Panna Size</label>
                        </Box>
                        <select
                          onChange={(e) => {
                            setPannaSize(e.target.value);
                          }}
                          name="panna-size"
                          style={{ height: 25, width: "100%" }}
                          id="panna-size-dropdown"
                        >
                          {pannaSize.map((item, index) => (
                            <option
                              selected={
                                Number(selectedPannaSize) === item.value
                                  ? true
                                  : false
                              }
                              key={index}
                              value={item.value}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </Grid>
                      <Grid item md={2}>
                        <Box mb={1}>
                          <label>Body Max</label>
                        </Box>
                        <input
                          style={{ height: 25, width: "100%" }}
                          id="body-max"
                          value={_bodyMaxLength}
                        />
                      </Grid>
                      <Grid item md={2}>
                        <Box mb={1}>
                          <label>Length</label>
                        </Box>
                        <input
                          style={{ height: 25, width: "100%" }}
                          id="body-length"
                          value={_length}
                        />
                      </Grid>
                      <Grid item md={2}>
                        <Box mb={1}>
                          <label>Sleeve Length</label>
                        </Box>
                        <input
                          style={{ height: 25, width: "100%" }}
                          id="sleeve-length"
                          value={_sleevLength}
                        />
                      </Grid>
                      <Grid item md={2}>
                        <Box mb={1}>
                          <label>Meters</label>
                        </Box>
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Grid item xs={5}>
                            <select
                              style={{ height: 25, width: "100%" }}
                              id="mtr_1"
                              onChange={(e) => {
                                setMtr_1(e.target.value);
                              }}
                            >
                              {meters.map((item, index) => (
                                <option
                                  selected={
                                    Number(mtr_1) === item.value ? true : false
                                  }
                                  key={index}
                                  value={item.value}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </Grid>
                          <Grid item xs={2}>
                            <span
                              style={{
                                fontSize: 16,
                                textAlign: "center",
                                display: "block",
                              }}
                            >
                              .
                            </span>
                          </Grid>
                          <Grid item xs={5}>
                            <select
                              style={{ height: 25, width: "100%" }}
                              id="height-dropdown"
                              onChange={(e) => {
                                setMtr_2(e.target.value);
                              }}
                            >
                              {meters.map((item, index) => (
                                <option
                                  selected={
                                    Number(mtr_2) === item.value ? true : false
                                  }
                                  key={index}
                                  value={item.value}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type="checkbox"
                            id="dyeable"
                            name="dyeable"
                            checked={dyeable}
                            onChange={(e) => {
                              setDyeable(e.target.checked);
                            }}
                          />
                          <Box ml={0.5}>
                            <label for="vehicle1"> Dyeable</label>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <input
                            placeholder=""
                            readOnly={true}
                            type="text"
                            name="info"
                            value={`${_fabricMesurmentinfo}${
                              selectedPannaSize
                                ? `(${selectedPannaSize}inches)`
                                : ""
                            }- ${mtr_1}.${mtr_2} Meters`}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            {!_.isEmpty(measurementsAttributes) && (
              <Box style={{ marginTop: 30 }}>
                <Grid container spacing={1}>
                  <Grid item md={4}>
                    <Box mb={1}>
                      <label>Loosening Approved By</label>
                    </Box>
                    <select
                      ref={register({
                        required: {
                          value: false,
                          message: "",
                        },
                      })}
                      name="approvedBy"
                      style={{
                        height: 40,
                        width: "100%",
                        border: "1px solid #DAD9E2",
                        borderRadius: "4px",
                      }}
                    >
                      {stylists.map((item, index) => (
                        <option
                          key={index}
                          selected={
                            getLastSavedMeasurments?.approvedBy === item.value
                          }
                          value={item.value}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Grid>

                  <Grid item md={4}>
                    <Box mb={1}>
                      <label>Date</label>
                    </Box>

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        clearable
                        value={approvedDate}
                        onChange={(date) => {
                          setApprovedDate(date);
                          //setFormValues(name, );
                        }}
                        format="DD/MM/YYYY"
                        keyboardIcon={
                          <EventIcon classes={{ root: classes.icon }} />
                        }
                      />
                    </MuiPickersUtilsProvider>

                    {/* <Controller
                      name={`approvedDate`}
                      control={control}
                      setValue={setFormValues}
                      defaultValue={
                        getLastSavedMeasurments?.approvedDate?.timestamp
                          ? moment(
                              getLastSavedMeasurments?.approvedDate?.timestamp
                            )
                          : moment(new Date())
                      }
                      render={({ value, name }) => (
                        
                      )}
                    ></Controller> */}
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>

          {!_.isEmpty(measurementsAttributes) && (
            <Grid item xs={6}>
              <textarea
                style={{
                  width: "100%",
                  marginTop: 30,
                  minHeight: 200,
                  padding: 20,
                 
                }}
                value={note}
                placeholder={"Add a Note "}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                type="textarea"
              ></textarea>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            classes={{ root: classes.actionbButtons }}
          >
            <LoadingButton
              id="btn-proceed-continue"
              btnTitle={"Save & Update"}
              color={"primary"}
              onClick={handleSubmit(onSubmit)}
              btnClassName={classes.btnContinue}
              disabled={loadingUM}
              spinner={loadingUM}
            />

            {renderViewButton(productId)}
          </Grid>
        </>
      )}

      <Dialog
        onClose={() => setIsViewMeasurments(false)}
        fullScreen
        open={isViewMeasurments}
      >
        <DialogContent style={{ padding: 0 }}>
          {productId === "5da7220571762c2a58b27a66" ? (
            <ViewSuitMeasurments
              note={note}
              catId={productId}
              authData={userInfo}
              userId={authToken}
              measurments={measurments}
              approvedDate={approvedDate}
              onClose={() => setIsViewMeasurments(false)}
            />
          ) : (
            <ViewMesurments
              note={note}
              catId={productId}
              authData={userInfo}
              userId={authToken}
              measurments={measurments}
              approvedDate={approvedDate}
              onClose={() => setIsViewMeasurments(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <InfoDialogComponent open={isSubmitted} onCloseModel={() => {}}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minHeight: "200px",
          }}
        >
          <Typography align="center" variant="h6" component="h6">
            Successfully Saved measurments
          </Typography>
          <Button
            onClick={async () => {
              setIsSubmitted(false);
            }}
            style={{ marginTop: 20 }}
            color="primary"
          >
            Close
          </Button>
        </Box>
      </InfoDialogComponent>
    </Grid>
  );
};

export default MeasurementsForm;
