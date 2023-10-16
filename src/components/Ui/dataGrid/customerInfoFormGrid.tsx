import React, { FC, Fragment, useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridFeatureMode,
  GridPageChangeParams,
} from "@material-ui/data-grid";
import _ from "lodash";
// Apollo
// import { authUserVar } from "../../../apollo/withApollo";

// Styles
import useStyles from "./styles";

// Ui
import { CustomerInfoFormGridRow } from "../../../utils/interfaces";
// import CustomerInfoTable from "../../Ui/tables/customerFormView";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useMutation, useLazyQuery } from "@apollo/client";
import { DialogModal } from "../../Ui/dialog/dialogModal";
import InfoDialogComponent from "../dialog/infoDialog";
import Divider from "@material-ui/core/Divider";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import CustomerViewTable from "../../Ui/tables/customerView";
import PrintIcon from "@material-ui/icons/Print";

import {
  Grid,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
interface CustomerInfoFormGridComponentProps {
  rows: CustomerInfoFormGridRow[];
  loading?: boolean;
  tabName?: string;
  onPageChange?: (nextPageSize: GridPageChangeParams) => void;
  page?: number;
  paginationMode?: GridFeatureMode;
}

const CustomerInfoFormGridComponent = ({
  rows,
  loading,
  onPageChange,
  page,
}: CustomerInfoFormGridComponentProps) => {
  const classes = useStyles();
  const router = useRouter();
  const [openDialogBox, setOpenDialog] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [openViewModel, setOpenViewModel] = useState(false);
  const grdiColumns = [
    { field: "id", headerName: "id", hide: true, width: 180, sortable: false },
    { field: "formNo", headerName: "Form No.", width: 130, sortable: false },
    {
      field: "customerId",
      headerName: "CusId",
      width: 130,
      sortable: false,
    },
    {
      field: "fullName",
      headerName: "Name",
      width: 180,
      sortable: false,
      valueGetter: (params) => {
        return `${params.row.firstName} ${params.row.lastName}`;
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      hide: false,
      width: 250,
      sortable: false,
      renderCell: (data) => {
        return (
          <React.Fragment>
            <Tooltip title="View Customer Info" aria-label="view">
              <Button
                onClick={() => {
                  console.log(data.row);
                  console.log(data?.row?.serverData);
                 setCustomerData(data?.row?.serverData);
                  setOpenViewModel(true);
                }}
                color="primary"
                style={{ marginRight: 10 }}
                size="small"
              >
                <VisibilityIcon />
              </Button>
            </Tooltip>

            <Tooltip title="Edit Customer Info Form" aria-label="edit">
              <Button
                onClick={() => {
                  router.push({
                    pathname: "/customerInfo/form",
                    query: {
                      edit: data?.row?._id,
                    },
                  });
                }}
                color="secondary"
                style={{ marginRight: 10 }}
                size="small"
              >
                <EditIcon />
              </Button>
            </Tooltip>

            <Tooltip title="Print Customer Info" aria-label="view">
              <Button
                onClick={() => {
                  router.push({
                    pathname: "/customerInfo/view",
                    query: {
                      id: data?.row?._id,
                    },
                  });
                }}
                color="primary"
                style={{ marginRight: 10 }}
                size="small"
              >
                <PrintIcon />
              </Button>
            </Tooltip>
          </React.Fragment>
        );
      },
    },

    {
      field: "phone",
      headerName: "Mobile",
      width: 150,
      sortable: false,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      width: 150,
      sortable: false,
    },
    {
      field: "stylist",
      headerName: "Stylist",
      width: 180,
      sortable: false,
    },

    {
      field: "eventDate",
      headerName: "Event Date",
      width: 180,
      sortable: false,
    },
    {
      field: "eventType",
      headerName: "Event Type ",
      width: 180,
      sortable: false,
    },

    {
      field: "lookingFor",
      headerName: "Looking For",
      width: 180,
      sortable: false,
    },

    {
      field: "customerInfoStatus",
      headerName: "Status",
      width: 150,
      sortable: false,
    },
    {
      field: "note",
      headerName: " Stylist Notes",
      width: 200,
      sortable: false,
      renderCell: (data) => {
        const handleCellClick = () => {
          setSelectedRemarks(data.row.note);
          setOpenDialog(true);
        };

        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ cursor: "pointer" }}
            onClick={handleCellClick}
          >
            <Typography variant="body2">{data.row.note}</Typography>
          </Box>
        );
      },
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <DataGrid
        loading={loading}
        columns={grdiColumns}
        rows={rows}
        pageSize={100}
        page={page}
        paginationMode="server"
        onPageChange={onPageChange}
        rowCount={5000}
        // onCellClick={(data) => {
        //   setOpenViewModel(true);
        // }}
      />
      <DialogModal
        onCloseModel={() => {
          setOpenViewModel(false);
        }}
        open={openViewModel}
      >
        <Box p={2}>
          <Typography>Customer Form Details</Typography>
        </Box>
        <Divider />
        <Box p={2}>
          {customerData && <CustomerViewTable cifInfo={customerData} />}
        </Box>
      </DialogModal>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={openDialogBox}
        onClose={handleClose}
      >
        <DialogContent className={classes.dialogContainer}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography
                variant="h6"
                align="center"
                className={classes.dialogTitle}
              >
                Stylist Notes
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                align="center"
                style={{
                  whiteSpace: "pre-line",
                  wordWrap: "break-word",
                }}
              >
                {selectedRemarks &&
                  selectedRemarks.split(". ").map((sentence, index) => (
                    <React.Fragment key={index}>
                      {sentence}
                      <br />
                    </React.Fragment>
                  ))}
              </Typography>
            </Grid>
            <div className={classes.dialogCloseIcon}>
              <IconButton onClick={() => setOpenDialog(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CustomerInfoFormGridComponent;
