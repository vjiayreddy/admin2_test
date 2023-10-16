import React, { Fragment, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  Button,
  Box,
  Typography,
  Divider,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { UPDATE_APPOINTMENT_STATUS } from "../../../apollo/queries/appointment";
import { useMutation, useLazyQuery } from "@apollo/client";
import { DialogModal } from "../dialog/dialogModal";
import AppointmentViewTable from "../tables/appointmentView";
import { useRouter } from "next/router";
import _ from "lodash";
import UpdateAppointmentStatusForm from "../../forms/addAppointment/appointmentStatus";
import { extractDateFormate } from "../../../utils/validations";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import AppointmentForm from "../../forms/addAppointment/edit";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

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
}));

const AppointmentDataGridComponent = (props) => {
  const classes = useStyles();
  const [openViewModel, setOpenViewModel] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [appointmentModel, setOpenUpdateAppoinetmentModel] = useState(false);
  const [editAppointment, setEditAppointment] = useState(false);
  const [updateAppointmentStatus, { data, loading }] = useMutation(
    UPDATE_APPOINTMENT_STATUS,
    {
      onCompleted() {
        alert("Successfully updated Appointment status");
        props.onLoadAppointsData();
        setOpenUpdateAppoinetmentModel(false);
      },
    }
  );
  const handleOpenWhatsApp = (phoneNumber) => {
    const formattedPhoneNumber = phoneNumber.replace(/\s/g, ""); // Remove all whitespace characters
    console.log(formattedPhoneNumber);
    const whatsappURL = `https://wa.me/${formattedPhoneNumber}`;
    window.open(whatsappURL, "_blank");
  };

  // Lead Data payload

  const gridColumns = [
    {
      field: "lead",
      headerName: "_lead",
      hide: true,
      width: 180,
      sortable: false,
    },
    {
      field: "id",
      headerName: "id",
      hide: true,
      width: 180,
      sortable: false,
    },
    {
      field: "userId",
      headerName: "_userId",
      hide: true,
      width: 180,
      sortable: false,
    },
    {
      field: "appointmentId",
      headerName: "Appointment ID",
      hide: false,
      width: 180,
      sortable: false,
    },
    {
      field: "appointmentType",
      headerName: "Appointment Type",
      hide: false,
      width: 180,
      sortable: false,
    },
    {
      field: "dateRecorded",
      headerName: "Created Date",
      hide: false,
      width: 180,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Name",
      hide: false,
      width: 180,
      sortable: false,
    },
    {
      field: "Actions",
      headerName: "Actions",
      hide: false,
      width: 310,
      sortable: false,
      renderCell: (data) => {
        return (
          <React.Fragment>
            <Tooltip title="View Lead" aria-label="view">
              <Button
                aria-label="view"
                size="small"
                style={{ marginRight: 10 }}
                color="primary"
                varient="contained"
                startIcon={<RemoveRedEyeIcon />}
                classes={{
                  startIcon: classes.startIcon,
                }}
                onClick={() => {
                  setAppointmentData(data.row);
                  setOpenViewModel(true);
                }}
              ></Button>
            </Tooltip>

            <Tooltip title="Update Appointment Status" aria-label="edit">
              <Button
                onClick={async () => {
                  setAppointmentData(data.row);
                  setOpenUpdateAppoinetmentModel(true);
                }}
                classes={{
                  startIcon: classes.startIcon,
                }}
                startIcon={<EditIcon />}
                color="secondary"
                style={{ marginRight: 10 }}
                size="small"
              ></Button>
            </Tooltip>
            <Tooltip title="Edit an appointments" aria-label="appointments">
              <Button
                aria-label="appointments"
                size="small"
                color="primary"
                varient="contained"
                style={{ marginRight: 10 }}
                startIcon={<EventAvailableIcon />}
                classes={{
                  startIcon: classes.startIcon,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setAppointmentData(data.row);
                  setEditAppointment(true);
                }}
              ></Button>
            </Tooltip>
            <Tooltip title="Whtsapp" aria-label="whtsapp">
              <Button
                aria-label="whtsapp"
                size="small"
                color="primary"
                varient="contained"
                style={{ marginRight: 10 , backgroundColor: "rgb(37, 211, 102)"}}
                startIcon={ <WhatsAppIcon /> }
                classes={{
                  startIcon: classes.startIcon,
                }}
                onClick={() => handleOpenWhatsApp(data.row.phone)}
                
              ></Button>
            </Tooltip>
          </React.Fragment>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      hide: false,
      width: 180,
      sortable: false,
      
    },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      hide: false,
      width: 180,
      sortable: false,
    },
    {
      field: "appointmentTime",
      headerName: "Appointment Time",
      hide: false,
      width: 180,
      sortable: false,
    },
    {
      field: "source",
      headerName: "Source",
      hide: false,
      width: 180,
      sortable: false,
    },
    {
      field: "stylist",
      headerName: "Handled By",
      hide: false,
      width: 180,
      sortable: false,
    },
    {
      field: "persona",
      headerName: "Persona",
      hide: false,
      width: 180,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      hide: false,
      width: 120,
      sortable: false,
    },
    {
      field: "followUpDate",
      headerName: "FollowUp Date",
      hide: false,
      width: 160,
      sortable: false,
    },
    {
      field: "reason",
      headerName: "Reason",
      hide: false,
      width: 180,
      sortable: false,
    },
    
  ];

  return (
    <Fragment>
      <DataGrid
        loading={props.loading || loading}
        columns={gridColumns}
        rows={props.dataRow}
        pageSize={100}
        page={props.page}
        paginationMode="server"
        onPageChange={props.onPageChange}
        rowCount={5000}
      />

      <DialogModal
        onCloseModel={() => {
          setOpenViewModel(false);
        }}
        open={openViewModel}
      >
        <Box p={2}>
          <Typography>Appointment and Lead Details</Typography>
        </Box>
        <Divider />
        <Box p={2}>
          {appointmentData && (
            <AppointmentViewTable
              onClose={() => {
                setOpenViewModel(false);
              }}
              appointment={appointmentData}
            />
          )}
        </Box>
      </DialogModal>
      <DialogModal
        open={appointmentModel}
        onCloseModel={() => {
          setOpenUpdateAppoinetmentModel(false);
        }}
      >
        <UpdateAppointmentStatusForm
          loading={loading}
          formData={appointmentData}
          onSubmitForm={async (data) => {
            console.log(data);
            const payload = {
              appointmentId: appointmentData.id,
              reason: data.reason,
              status: data.status,
              date: data.date ? extractDateFormate(data.date) : null,
              orderValue: data.orderValue ? data.orderValue : null,
            };
            await updateAppointmentStatus({
              variables: {
                ...payload,
              },
            });
          }}
        />
      </DialogModal>
      <DialogModal
        open={editAppointment}
        onCloseModel={() => {
          setEditAppointment(false);
        }}
      >
        <AppointmentForm
          onFormData={appointmentData}
          onAutoClose={() => {
            props.onLoadAppointsData();
            setEditAppointment(false);
          }}
        />
      </DialogModal>
    </Fragment>
  );
};

export default AppointmentDataGridComponent;
