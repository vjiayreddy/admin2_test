import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  Button,
  makeStyles,
  Dialog,
  DialogActions,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import { useRouter } from "next/router";
import _ from "lodash";
// import UpdateLeadStatusForm from "../../forms/leads/leadStatus";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GET_ALL_OCCASIONS,
  GET_BODYPROFILE,
  GET_USER_MEASURMENTS,
  GET_USER_STANDARD_SIZING,
} from "../../../apollo/queries/measurments";
import ViewShirtMeasurements from "../../forms/standardMeasurementForm/measurments/shirt";
import ViewTrouserMeasurements from "../../forms/standardMeasurementForm/measurments/trouser";
import ViewBlazerMeasurements from "../../forms/standardMeasurementForm/measurments/blazer";
import ViewSuitMeasurements from "../../forms/standardMeasurementForm/measurments/suit";
import ViewChinosMeasurements from "../../forms/standardMeasurementForm/measurments/chinos";
import ViewWaistcoatMeasurements from "../../forms/standardMeasurementForm/measurments/waistcoat";
import ViewIndowesternMeasurements from "../../forms/standardMeasurementForm/measurments/indowestern";
import ViewKurtaMeasurements from "../../forms/standardMeasurementForm/measurments/kurta";
import ViewJodhpuriMeasurements from "../../forms/standardMeasurementForm/measurments/jodhpuri";
import ViewSherwaniMeasurements from "../../forms/standardMeasurementForm/measurments/sherwani";
import ViewSadariMeasurements from "../../forms/standardMeasurementForm/measurments/sadari";
import ViewPunaPantMeasurements from "../../forms/standardMeasurementForm/measurments/punaPant";

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
  startIcon: {
    margin: `0px !important`,
  },
  dialogPaper: {
    minwidth: 100,
    minHeight: 180,
    background: "#ffff",
  },
  dialogContainer: {
    height: "100%",
    position: "relative",
    width: 500,
    padding: 30,
    paddingTop: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: theme.palette.common.black,
    marginBottom: 15,
    fontFamily: "MPF_HEAVY",
  },
  dialogSubTitle: {
    fontSize: 14,
    marginBottom: 25,
    lineHeight: "22px",
  },
  dialogCloseIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

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

const StandardSizeGridDataComponent = (props) => {
  const classes = useStyles();
  const [viewBodyProfile, setViewBodyProfile] = useState(false);
  const [isViewMeasurments, setIsViewMeasurments] = useState(false);

  const [viewSizeChart, setViewSizeChart] = useState(false);
  const [viewChart, setViewChart] = useState(false);
  const [measurments, setMeasurments] = useState(null);
  const [catId, setCatId] = useState(null);
  const [catName, setCatName] = useState(null);

  const { data: { getAllOccasions } = {}, loading } =
    useQuery(GET_ALL_OCCASIONS);
  const [getGetUserBodyProfile, { data }] = useLazyQuery(GET_BODYPROFILE, {
    onCompleted() {
      setViewBodyProfile(true);
    },
  });

  const [getSavedUserMeasurments, { data: dataGSUM, variables }] = useLazyQuery(
    GET_USER_MEASURMENTS,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (
          data?.getUserMeasurements[0] !== null &&
          data?.getUserMeasurements
        ) {
          const { getUserMeasurements } = dataGSUM;
          const options = getUserMeasurements[0]?.options
            ? getUserMeasurements[0].options
            : getUserMeasurements[1].options;
          setMeasurments(options);
          setViewSizeChart(true);
        }
      },
    }
  );

  const [GetUserStandardSizing, { data: dataUserChart }] = useLazyQuery(
    GET_USER_STANDARD_SIZING,
    {
      onCompleted() {
        if (dataUserChart?.getUserStandardSizing?.length > 0) {
          console.log(dataUserChart?.getUserStandardSizing);
          if (isViewMeasurments) {
            router.push({
              pathname: "/standardsize/sizingmeasurement",
              query: {
                ...router.query,
                tabIndex: 0,
                catId: dataUserChart?.getUserStandardSizing?.[0]["catId"],
              },
            });
          } else {
            setViewChart(true);
          }
        } else {
          alert("No Sizing Chart found please select the size");
        }
      },
    }
  );

  const [dataRow, setDataRow] = useState(null);

  const router = useRouter();

  // Standard Size Data payload
  const grdiColumns = [
    {
      field: "categoryId",
      headerName: "categoryId",
      hide: true,
      width: 150,
      sortable: false,
    },
    {
      field: "outfit",
      headerName: "OutFit",
      hide: false,
      width: 150,
      sortable: false,
    },
    {
      field: "profile",
      headerName: "Profile",
      hide: false,
      width: 150,
      sortable: false,
      renderCell: (data) => {
        return (
          <React.Fragment>
            <Button
              onClick={() => {
                getGetUserBodyProfile({
                  variables: {
                    userId: router?.query?.uid,
                  },
                });
              }}
            >
              View Body Profile
            </Button>
          </React.Fragment>
        );
      },
    },

    {
      field: "sizeChart ",
      headerName: "Size Chart",
      hide: false,
      width: 180,
      sortable: false,

      renderCell: (data) => {
        return (
          <React.Fragment>
            <Button
              onClick={() => {
                getSavedUserMeasurments({
                  variables: {
                    page: 1,
                    limit: 3,
                    userId: router?.query?.uid,
                    catId: data.id,
                  },
                });
                setCatId(data?.id);
              }}
            >
              View Size Chart
            </Button>
          </React.Fragment>
        );
      },
    },
    {
      field: "measurement",
      headerName: "Measurement",
      hide: false,
      width: 180,
      sortable: false,
      renderCell: (data) => {
        return (
          <React.Fragment>
            <Button
              onClick={() => {
                setIsViewMeasurments(true);
                GetUserStandardSizing({
                  variables: {
                    userId: router?.query?.uid,
                    catIds: [data.id],
                    limit: 1,
                    page: 1,
                  },
                });
              }}
            >
              {" "}
              View Measurement
            </Button>
          </React.Fragment>
        );
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      hide: false,
      width: 400,
      sortable: false,
      renderCell: (data) => {
        return (
          <React.Fragment>
            <Tooltip title="View " aria-label="view">
              <Button
                classes={{
                  startIcon: classes.startIcon,
                }}
                onClick={() => {
                  setCatName(data.row.outfit);
                  GetUserStandardSizing({
                    variables: {
                      userId: router?.query?.uid,
                      catIds: [data.id],
                      limit: 1,
                      page: 1,
                    },
                  });
                }}
                color="primary"
                style={{ marginRight: 10 }}
                size="small"
                startIcon={<RemoveRedEyeIcon />}
              ></Button>
            </Tooltip>

            <Tooltip title="Edit " aria-label="edit">
              <Button
                classes={{
                  startIcon: classes.startIcon,
                }}
                startIcon={<EditIcon />}
                color="secondary"
                style={{ marginRight: 10 }}
                size="small"
                onClick={() => {
                  router.push({
                    pathname: "/standardsize/standard-size-form",
                    query: {
                      ...router.query,
                      catId: data.row.categoryId,
                      category: data?.row.outfit,
                    },
                  });
                }}
              ></Button>
            </Tooltip>
          </React.Fragment>
        );
      },
    },
  ];

  useEffect(() => {
    if (getAllOccasions?.length > 0) {
      const categories = [];
      const occasion = _.find(
        getAllOccasions,
        (item) => item.name === "products"
      );
      if (occasion) {
        occasion?.categories.map((cat) => {
          const payload = {
            id: cat._id,
            categoryId: cat._id,
            outfit: cat.label,
            profile: "",
            sizeChart: "",
            measurement: "",
            notes: "",
            updatedon: "",
          };
          categories.push(payload);
        });
        setDataRow(categories);
      }
    }
  }, [getAllOccasions]);

  const findFitType = (fitTypeId: string) => {
    const _fitType = _.find(fitOptions, (item) => item?._id === fitTypeId);
    if (_fitType) {
      return _fitType?.name;
    }
  };

  return (
    <Fragment>
      {dataRow?.length > 0 && (
        <DataGrid
          loading={loading}
          columns={grdiColumns}
          rows={dataRow}
          pageSize={100}
          page={props.page}
          paginationMode="server"
          onPageChange={props.onPageChange}
          rowCount={5000}
        />
      )}
      <Dialog open={viewBodyProfile}>
        <DialogActions className={classes.dialogContainer}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.dialogTitle}>
                Body Profile Data
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <div className="orderFormTable">
                <table className="table">
                  <tr style={{ backgroundColor: "cornsilk" }}>
                    <td style={{ backgroundColor: "#B3E5FC" }}>Fit Type</td>
                    <td>
                      <b>
                        {findFitType(data?.getBodyProfile?.[0].fitPreferenceId)}
                      </b>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "cornsilk" }}>
                    <td style={{ backgroundColor: "#B3E5FC" }}>Height</td>
                    <td>
                      <b>{data?.getBodyProfile?.[0].height} cm</b>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "cornsilk" }}>
                    <td style={{ backgroundColor: "#B3E5FC" }}>Weight</td>
                    <td>
                      <b>{data?.getBodyProfile?.[0].weight} Kg</b>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "cornsilk" }}>
                    <td style={{ backgroundColor: "#B3E5FC" }}>Age</td>
                    <td>
                      <b>{data?.getBodyProfile?.[0].age} Yrs</b>
                    </td>
                  </tr>
                </table>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  setViewBodyProfile(false);
                }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog open={viewSizeChart}>
        <DialogActions className={classes.dialogContainer}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.dialogTitle}>
                Size Chart
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              {catId === "5da7220571762c2a58b27a65" && (
                <ViewShirtMeasurements data={measurments} />
              )}
              {catId === "5da7220571762c2a58b27a67" && (
                <ViewTrouserMeasurements data={measurments} />
              )}
              {catId === "5da7220571762c2a58b27a68" && (
                <ViewBlazerMeasurements data={measurments} />
              )}
              {catId === "5da7220571762c2a58b27a66" && (
                <ViewSuitMeasurements data={measurments} />
              )}
              {catId === "5da7220571762c2a58b27a6b" && (
                <ViewChinosMeasurements data={measurments} />
              )}
              {catId === "5da7220571762c2a58b27a6a" && (
                <ViewWaistcoatMeasurements data={measurments} />
              )}

              {catId === "5da7220571762c2a58b27a6f" && (
                <ViewIndowesternMeasurements data={measurments} />
              )}

              {catId === "5da7220571762c2a58b27a6e" && (
                <ViewKurtaMeasurements data={measurments} />
              )}
              {catId === "5da7220571762c2a58b27a6c" && (
                <ViewJodhpuriMeasurements data={measurments} />
              )}

              {catId === "5da7220571762c2a58b27a70" && (
                <ViewSherwaniMeasurements data={measurments} />
              )}

              {catId === "5da7220571762c2a58b27a6d" && (
                <ViewSadariMeasurements data={measurments} />
              )}
              {catId === "636f3012feea0816508c5c45" && (
                <ViewPunaPantMeasurements data={measurments} />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  setViewSizeChart(false);
                }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog open={viewChart}>
        <DialogActions className={classes.dialogContainer}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.dialogTitle}>
                Size Chart Data
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {dataUserChart?.getUserStandardSizing?.length > 0 ? (
              <Grid item xs={12}>
                <div className="orderFormTable">
                  <table className="table">
                    <tr style={{ backgroundColor: "cornsilk" }}>
                      <td style={{ backgroundColor: "#B3E5FC" }}>Category</td>
                      <td>
                        <b>{catName}</b>
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: "cornsilk" }}>
                      <td style={{ backgroundColor: "#B3E5FC" }}>Size</td>
                      <td>
                        <b>
                          {dataUserChart?.getUserStandardSizing?.[0]["size"]}
                        </b>
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: "cornsilk" }}>
                      <td style={{ backgroundColor: "#B3E5FC" }}>Note</td>
                      <td>
                        <b>
                          {dataUserChart?.getUserStandardSizing?.[0]["note"]}
                        </b>
                      </td>
                    </tr>
                  </table>
                </div>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography className={classes.dialogTitle}>
                  No Data Found
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                onClick={() => {
                  setViewChart(false);
                }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default StandardSizeGridDataComponent;
