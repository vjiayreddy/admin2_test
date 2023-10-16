import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import { useForm, Controller } from "react-hook-form";
import { apiValues } from "../../../utils/types";

import {
  Button,
  CircularProgress,
  Box,
  Typography,
  Divider,
  Grid,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import _ from "lodash";
// Apollo
import {
  GET_PRODUCT_ATTRIBUTE_MASTER,
  MANAGE_RECOMMENDED_ATTRIBUTES,
} from "../../../apollo/queries/styleclub";
import {
  GET_GROOMING_RECOMMENDATIONS,
  GET_USER_GROOMING_RECOMMENDED_ATTRIBUTES,
  GET_USER_GROOMING_ATTRIBUTE_MASTER,
} from "../../../apollo/queries/grooming";
import { useLazyQuery, useMutation } from "@apollo/client";
// Styles
import useStyles from "./styles";
// Ui
import SearchBarWithButton from "../searchbar-with-button";
import InfoDialogSection from "../../Ui/dialog/infoDialog";

// Uitls
import { handleMultiCheck } from "../../../services/styleClub";

const EditGroomingRecommendations = ({ authData }) => {
  const classes = useStyles();
  const { data: currentUser } = authData;
  const [dataRow, setDataRow] = useState([]);
  const [masterNames, setMasterNames] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedData, setSelectedData] = useState<any>({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSelection, setIsSelection] = useState(false);
  const { handleSubmit, errors, control, getValues } = useForm();
  const router = useRouter();
  const [manageRecommendedAttributes, { loading: loadingMRA }] = useMutation(
    MANAGE_RECOMMENDED_ATTRIBUTES,
    {
      onError(error) {},
      onCompleted() {
        setOpenDialog(false);
        alert("Data updated successfully");
      },
      refetchQueries: [
        {
          query: GET_USER_GROOMING_RECOMMENDED_ATTRIBUTES,
          variables: {
            filter: {
              userId: currentUser._id,
              master_name: masterNames,
              catId: router.query.catId,
            },
          },
        },
      ],
    }
  );

  const [
    getUserGroominAttributeMaster,
    { loading: loadingGGAM, data: dataGGAM },
  ] = useLazyQuery(GET_USER_GROOMING_ATTRIBUTE_MASTER);

  const [
    getUserPersonalizeGroomingPageConfig,
    { loading: loadingGUPPC, data: dataUPPC },
  ] = useLazyQuery(GET_GROOMING_RECOMMENDATIONS, {});

  const [
    getUserGroomingRecommendedAttributes,
    { data: dataGUGA, loading: loadingGUGA },
  ] = useLazyQuery(GET_USER_GROOMING_RECOMMENDED_ATTRIBUTES);

  const columns: GridColDef[] = [
    { field: "catId", hide: true },
    { field: "values", hide: true },
    { field: "id", headerName: "SNO", hide: false, sortable: false },
    { field: "name", headerName: "Type", flex: 1, sortable: false },
    {
      field: "selectedValues",
      headerName: "Selected Values",
      flex: 2,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      renderCell: (data) => {
        return (
          <Button
            onClick={() => {
              setOpenDialog(true);
              setSelectedData(data.row);
              getUserGroominAttributeMaster({
                variables: {
                  filter: {
                    masterName: data.row.master_name,
                  },
                },
              });
            }}
            size="small"
          >
            Edit
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    getUserPersonalizeGroomingPageConfig({
      variables: {
        gcatId: router.query.catId,
      },
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataUPPC)) {
      let masterNames = [];
      const { attributes } = dataUPPC.getUserPersonalizeGroomingPageConfig;
      if (!_.isEmpty(attributes)) {
        attributes.map((item) => {
          masterNames.push(item.master_name);
        });
      }
      setMasterNames(masterNames);
      getUserGroomingRecommendedAttributes({
        variables: {
          filter: {
            userId: currentUser._id,
            master_name: masterNames,
            catId: router.query.catId,
          },
        },
      });
    }
  }, [dataUPPC]);

  const getIds = (productsReco) => {
    let values = [];
    productsReco.map((item) => {
      values.push(item.value);
    });
    return values;
  };

  const getListValues = (data) => {
    let values = [];
    data.map((item) => {
      if (!item.isDeletedByStylist) {
        values.push(item.name);
      }
    });
    return values.join(",");
  };

  const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase();
    return array.filter((value) => {
      return value.name.toLowerCase().match(new RegExp(searchTerm, "g"));
    });
  };

  const getTableData = () => {
    if (dataGUGA) {
      const productsReco = _.groupBy(
        dataGUGA.getUserGroomingRecommendedAttributes,
        "master_name"
      );
      const { attributes } = dataUPPC.getUserPersonalizeGroomingPageConfig;
      let items = [];
      attributes.map((attribute, index) => {
        if (!_.isEmpty(productsReco[attribute.master_name])) {
          items.push({
            catId: productsReco[attribute.master_name][0].catId,
            action: "",
            name: attribute.label,
            master_name: attribute.master_name,
            selectedValues: getListValues(productsReco[attribute.master_name]),
            values: getIds(productsReco[attribute.master_name]),
          });
        }
      });
      items.map((item, index) => (item.id = `${index}`));
      setDataRow(items);
    }
  };

  const handleSearchInput = async (e) => {
    let value = e.target.value;
    if (value.length > 2) {
      let search = await arraySearch(dataRow, value);
      setDataRow(search);
    } else {
      getTableData();
    }
  };

  useEffect(() => {
    getTableData();
  }, [dataGUGA]);

  useEffect(() => {
    if (!_.isEmpty(dataGGAM)) {
      const { getUserAttributeMaster } = dataGGAM;
      setSelectedOptions(getUserAttributeMaster);
    }
  }, [dataGGAM]);

  const onSubmit = (data) => {
    if (_.isEmpty(data.options)) {
      setIsSelection(true);
    } else {
      setIsSelection(false);
      let payload = [];

      data.options.map((item) => {
        payload.push({
          catId: router.query.catId,
          master_name: selectedData.master_name,
          value: item,
          isForMaster: true,
        });
      });
      manageRecommendedAttributes({
        variables: {
          recAttrs: payload,
          userId: currentUser._id,
          stylistId: "5de75fa5a72f8129f42bba2a",
          isTypeGrooming: true,
        },
      });
    }
  };

  return (
    <Fragment>
      <SearchBarWithButton
        onChange={handleSearchInput}
        isShowBtn={false}
        pageTitle={`Modify Recommendation Attributes`}
        btnTitle="Cancel"
      />
      <DataGrid
        classes={{ root: classes.dataGridBoxRoot }}
        rows={dataRow}
        autoPageSize={false}
        pageSize={100}
        hideFooterRowCount={true}
        loading={loadingGUGA || loadingGUPPC}
        columns={columns}
      />
      <InfoDialogSection
        open={openDialog}
        maxWidth="sm"
        onCloseModel={() => {
          setIsSelection(false);
          setOpenDialog(false);
        }}
      >
        <div className={classes.productListDialog}>
          <Box p={2}>
            <Typography variant="h6" component="h6">
              {selectedData.name}
            </Typography>
            <Box mt={1}>
              <Divider />
            </Box>
          </Box>
          {!_.isEmpty(selectedOptions) && (
            <Fragment>
              <Box p={1}>
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="flex-start"
                  spacing={1}
                  classes={{
                    root: classes.slectionRadioSection,
                  }}
                >
                  <Controller
                    rules={{
                      required: true,
                    }}
                    name="options"
                    defaultValue={selectedData.values}
                    render={(props) => (
                      <Fragment>
                        {selectedOptions.map((option, index) => (
                          <Grid
                            key={index}
                            item
                            xs={2}
                            container
                            justify="center"
                            alignItems="center"
                          >
                            <FormControlLabel
                              classes={{
                                root: classes.formControlLabelRoot,
                                label: classes.optionTitle,
                              }}
                              control={
                                <Checkbox
                                  onChange={() =>
                                    props.onChange(
                                      handleMultiCheck(
                                        "options",
                                        option._id,
                                        getValues
                                      )
                                    )
                                  }
                                  defaultChecked={selectedData.values.includes(
                                    option._id
                                  )}
                                  className={classes.radioCheckBox}
                                  checkedIcon={
                                    <div>
                                      <img
                                        className={classes.imageSelected}
                                        src={
                                          !_.isEmpty(option.personalizeImage)
                                            ? option.personalizeImage
                                            : "/images/noImage.jpg"
                                        }
                                      ></img>
                                    </div>
                                  }
                                  icon={
                                    <img
                                      src={
                                        !_.isEmpty(option.personalizeImage)
                                          ? option.personalizeImage
                                          : "/images/noImage.jpg"
                                      }
                                      className={classes.checkBoxImage}
                                    ></img>
                                  }
                                  inputProps={{
                                    "aria-label": "decorative checkbox",
                                  }}
                                  value={option._id}
                                />
                              }
                              key={option._id}
                              label={option.name}
                            />
                          </Grid>
                        ))}
                      </Fragment>
                    )}
                    control={control}
                  />
                </Grid>
              </Box>
              {isSelection && (
                <Box p={2}>
                  <FormHelperText className={classes.validationText}>
                    Please select at least one {selectedData.name} type.
                  </FormHelperText>
                </Box>
              )}
              {/* {!_.isEmpty(errors) ||
            (isSelection && (
              <Grid item xs={12}>
               
              </Grid>
            ))} */}
              <Box display="flex" justifyContent="flex-end" p={1}>
                <Box>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="primary"
                    disabled={loadingMRA}
                  >
                    Submit
                  </Button>
                </Box>
                <Box pl={1}>
                  <Button
                    onClick={() => {
                      setIsSelection(false);
                      setSelectedOptions([]);
                      setOpenDialog(false);
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Fragment>
          )}

          {loadingGGAM && (
            <div className={classes.productListLoadinIndicator}>
              <CircularProgress />
            </div>
          )}

          {loadingMRA && (
            <div className={classes.productListLoadinIndicator}>
              <CircularProgress />
            </div>
          )}
        </div>
      </InfoDialogSection>
    </Fragment>
  );
};

export default EditGroomingRecommendations;
