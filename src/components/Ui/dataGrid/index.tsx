import React, { FC, Fragment, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridPageChangeParams,
} from "@material-ui/data-grid";
import VisibilityIcon from "@material-ui/icons/Visibility";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import Tooltip from "@material-ui/core/Tooltip";
import { NextRouter, useRouter } from "next/router";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import EventIcon from "@material-ui/icons/Event";

import {
  Grid,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Box,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
// Apollo
//import { authUserVar } from "../../../apollo/withApollo";

// Styles
import useStyles from "./styles";

// Ui
import InfoDialogComponent from "../dialog/infoDialog";
import UserInfoComponent from "../cards/userInfo";

interface props {
  rows: GridRowsProp;
  loading?: boolean;
  onPageChange?: (nextPageSize: GridPageChangeParams) => void;
  page?: number;
}

const handleOpenWhatsApp = (phoneNumber) => {
  const formattedPhoneNumber = phoneNumber.replace(/\s/g, ""); // Remove all whitespace characters
  console.log(formattedPhoneNumber);
  const whatsappURL = `https://wa.me/${formattedPhoneNumber}`;
  window.open(whatsappURL, "_blank");
};

const DataGridComponent: FC<props> = ({
  rows,
  loading,
  onPageChange,
  page,
  
}) => {
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [openDialogBox, setOpenDialog] = useState(false);
  // const [openDialogBox1, setOpenDialog1] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const classes = useStyles();
  // const router: NextRouter = useRouter();
  // const [gridRows, setGridRows] = useState(rows);
  


 
  const columns: GridColDef[] = [
    { field: "fullName", headerName: "Name", width: 200, sortable: false },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      sortable: false,

      renderCell: (data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setUser(data.row);
                handleSaveUserInfo(data.row);
              }}
              size="small"
              style={{ marginRight: 10, borderRadius: 25 }}
            >
              <VisibilityIcon />
            </Button>

            <Button
              onClick={() => handleOpenWhatsApp(data.row.phone)}
              size="small"
              style={{
                marginRight: 10,
                borderRadius: 25,
                backgroundColor: "rgb(37, 211, 102)",
              }}
            >
              <WhatsAppIcon />
            </Button>

            <Button
              onClick={() => {
                window.open(`tel:${data.row.phone}`);
              }}
              size="small"
              style={{ marginRight: 10, borderRadius: 25 }}
            >
              <PhoneIcon />
            </Button>
          </div>
        );
      },
    },
    { field: "userId", hide: true },
    { field: "id", hide: true },
    { field: "cno", headerName: "C.Id", width: 120, sortable: false },

    {
      field: "registred",
      headerName: "Registered",
      width: 150,
      sortable: false,
    },
    { field: "stylist", headerName: "Stylist", width: 150, sortable: false },
    {
      field: "secondaryStylists",
      headerName: "Secondary Stylist",
      renderCell: (data) => (
        <Tooltip title={data.row.secondaryStylists}>
          <span>{data.row.secondaryStylists}</span>
        </Tooltip>
      ),
      width: 150,
      sortable: false,
    },
    {
      field: "lastUpdatedAt",
      headerName: "Last Updated",
      width: 150,
      sortable: false,
    },

    {
      field: "ccDueDate",
      headerName: "CC Due Date",
      width: 150,
      sortable: false,
     
    },
  
    { field: "cityName", headerName: "City", width: 150, sortable: false },
    { field: "stateName", headerName: "State", width: 150, sortable: false },
    {
      field: "countryName",
      headerName: "Country",
      width: 150,
      sortable: false,
    },
    { field: "phone", headerName: "Mobile", width: 150, sortable: false },
    {
      field: "isStyleClubMember",
      headerName: "Styleclub Member",
      width: 180,
      sortable: false,
    },
    { field: "userStatus", headerName: "Status", width: 150, sortable: false },
    {
      field: "customerType",
      headerName: "Customer Type",
      width: 180,
      sortable: false,
    },
    {
      field: "customerSegment",
      headerName: "Segment",
      width: 150,
      sortable: false,
    },
    {
      field: "remarks",
      headerName: "Remark",
      width: 200,
      sortable: false,
      renderCell: (data) => {
        const handleCellClick = () => {
          setSelectedRemarks(data.row.remarks);
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
            <Typography variant="body2">{data.row.remarks}</Typography>
          </Box>
        );
      },
    },
  
    {
      field: "email",
      hide: true,
      headerName: "Email",
      flex: 1,
      sortable: false,
    },
  ];

  const handleSaveUserInfo = (user) => {
    localStorage.setItem("selctedUser", user.userId);
    localStorage.removeItem("trouser_measurments");
    localStorage.removeItem("shirt_measurments");
    window.open(`/userInfo?uid=${user.userId}`, "_blank");
    setOpenModel(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <DataGrid
        classes={{ root: classes.dataGridBoxRoot }}
        rows={rows}
        autoPageSize={false}
        onPageChange={onPageChange}
        pageSize={100}
        hideFooterRowCount={true}
        loading={loading}
        rowCount={6000}
        columns={columns}
        paginationMode="server"
        page={page}
        onCellClick={(data, e) => {
          e.preventDefault();
        }}
        
      />
      <InfoDialogComponent
        open={openModel}
        onCloseModel={() => setOpenModel(false)}
      >
        <UserInfoComponent onClick={handleSaveUserInfo} data={user} />
      </InfoDialogComponent>

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
                Remark
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

export default DataGridComponent;
