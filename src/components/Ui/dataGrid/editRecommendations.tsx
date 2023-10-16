import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useForm, Controller } from "react-hook-form";

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
  GET_USER_PERSONALIZE_CONFIG,
  GET_USER_PRODUCT_RECO_ATTR,
  GET_PRODUCT_ATTRIBUTE_MASTER,
  MANAGE_RECOMMENDED_ATTRIBUTES,
} from "../../../apollo/queries/styleclub";
import { useLazyQuery, useMutation } from "@apollo/client";
// Styles
import useStyles from "./styles";
// Ui
import SearchBarWithButton from "../searchbar-with-button";
import InfoDialogSection from "../../Ui/dialog/infoDialog";

// Uitls
import { handleMultiCheck } from "../../../services/styleClub";

const EditRecommendations = ({ authData }) => {
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
          query: GET_USER_PRODUCT_RECO_ATTR,
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
    getUserProductAttributeMaster,
    { loading: loadingGPAM, data: dataGUPAM },
  ] = useLazyQuery(GET_PRODUCT_ATTRIBUTE_MASTER);

  const [
    getUserPersonalizePageConfig,
    { loading: loadingGUPPC, data: dataUPPC },
  ] = useLazyQuery(GET_USER_PERSONALIZE_CONFIG, {});

  const [
    getUserProductRecommendedAttributes,
    { data: dataGUPA, loading: loadingGUPA },
  ] = useLazyQuery(GET_USER_PRODUCT_RECO_ATTR);

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
              getUserProductAttributeMaster({
                variables: {
                  filter: {
                    masterName: data.row.master_name,
                    catId: data.row.catId,
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
    getUserPersonalizePageConfig({
      variables: {
        catId: router.query.catId,
      },
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataUPPC)) {
      let masterNames = [];
      const { attributes } = dataUPPC.getUserPersonalizePageConfig;
      if (!_.isEmpty(attributes)) {
        attributes.map((item) => {
          masterNames.push(item.master_name);
        });
      }
      setMasterNames(masterNames);
      getUserProductRecommendedAttributes({
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
    if (dataGUPA) {
      const productsReco = _.groupBy(
        dataGUPA.getUserProductRecommendedAttributes,
        "master_name"
      );
      const { attributes } = dataUPPC.getUserPersonalizePageConfig;
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
  }, [dataGUPA]);

  useEffect(() => {
    if (!_.isEmpty(dataGUPAM)) {
      const { getProductAttributeMaster } = dataGUPAM;
      setSelectedOptions(getProductAttributeMaster);
    }
  }, [dataGUPAM]);

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
          isTypeGrooming: false,
        },
      });
    }
  };

  console.log("edit reco", currentUser);

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
        loading={loadingGUPA || loadingGUPPC}
        columns={columns}
      />
      <InfoDialogSection
        open={openDialog}
        maxWidth="sm"
        onCloseModel={() => {
          setIsSelection(false);
          setSelectedOptions([]);
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

          {loadingGPAM && (
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

export default EditRecommendations;
