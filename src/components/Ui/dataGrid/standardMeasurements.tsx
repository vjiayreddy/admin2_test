import React, { FC, Fragment, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import _ from "lodash";
import Link from "next/link";
import CloseIcon from "@material-ui/icons/Close";

// Apollo
import {
  DELETE_USER_MEASURMENTS,
  GET_USER_MEASURMENTS,
} from "../../../apollo/queries/measurments";
import { useMutation } from "@apollo/client";

// Styles
import useStyles from "./styles";

// Ui
import InfoDialogComponent from "../dialog/infoDialog";
import {
  Dialog,
  IconButton,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core";
import { DialogContent } from "@material-ui/core";

interface props {
  rows: GridRowsProp;
  loading?: boolean;
  user: any;
}

const StandardMeasurmentsDataGridComponent: FC<props> = ({ rows, loading, user }) => {
  const [showMeasurmens, setShowMeasurments] = useState(false);
  const [dataRow, setDataRow] = useState<any>(null);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const classes = useStyles();
  const columns: GridColDef[] = [
    { field: "options", hide: true },
    { field: "id", hide: true },
    { field: "name", hide: false, flex: 1, headerName: "Product" },
    {
      field: "date",
      headerName: "Date",
      flex: 2,
      hide: false,
      sortable: false,
    },
    {
      field: "standardsize",
      headerName: "Standard Size",
      flex: 2,
      hide: false,
      sortable: false,
    },
    {
      field: "pdf",
      headerName: "PDF",
      width: 80,
      renderCell: (data) => {
        if (!_.isEmpty(data.row.pdf)) {
          return (
            <Link passHref href={data.row.pdf}>
              <Button color="primary" variant="text">
                View PDF
              </Button>
            </Link>
          );
        }
      },
      sortable: false,
    },
    { field: "remark", headerName: "Remark", flex: 1, sortable: false },
    {
      field: "measuredBy",
      headerName: "Measured By",
      flex: 1,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (data) => {
        return (
          <Box>
            <Button
              style={{ marginRight: 10 }}
              onClick={() => {
                setDataRow(data.row);
                setShowMeasurments(true);
              }}
              size="small"
            >
              View
            </Button>
            <Button
              onClick={async () => {
                await deleteUserMeasurement({
                  variables: {
                    measurementId: data.row.id,
                  },
                });
              }}
              size="small"
              color="secondary"
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const [deleteUserMeasurement, { loading: loadingDUM }] = useMutation(
    DELETE_USER_MEASURMENTS,
    {
      onCompleted() {
        alert("Successfully deleted selected record");
      },
    }
  );

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Fragment>
      <DataGrid
        classes={{ root: classes.dataGridBoxRoot }}
        rows={rows}
        autoPageSize={false}
        pageSize={100}
        hideFooterRowCount={true}
        loading={loading || loadingDUM}
        columns={columns}
      />
      <InfoDialogComponent
        open={openModel}
        onCloseModel={() => setOpenModel(false)}
      ></InfoDialogComponent>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={showMeasurmens}
        onClose={() => setShowMeasurments(false)}
      >
        {dataRow && (
          <DialogContent classes={{ root: classes.modelContent }}>
            <Box pb={1}>
              <Typography classes={{ root: classes.modelTitle }}>
                {capitalizeFirstLetter(dataRow.name)} Measurement Details (Inch)
              </Typography>
              <span style={{ marginRight: 10 }}>
                User:{" "}
                <span style={{ color: "#757575" }}>
                  {user.firstName}
                  {user.lastName}
                </span>
              </span>
              <span>
                Date : <span style={{ color: "#757575" }}>{dataRow.date}</span>
              </span>
            </Box>
            <Box pb={2}>
              <Divider />
            </Box>

            <Grid container spacing={1}>
              {dataRow.options.map((item, index) => (
                <Fragment>
                  {item.value !== 0 && (
                    <Grid key={index} xs={6} item>
                      <Box
                        p={1}
                        style={{
                          border: "1px solid gray",
                        }}
                      >
                        <Typography>
                          {item.name} :{" "}
                          <span className={classes.span}>
                            {item.value} Inch
                          </span>
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Fragment>
              ))}
            </Grid>

            <div className={classes.modelCloseIcon}>
              <IconButton onClick={() => setShowMeasurments(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </Fragment>
  );
};

export default StandardMeasurmentsDataGridComponent;
