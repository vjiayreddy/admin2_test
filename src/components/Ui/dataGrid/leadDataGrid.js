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
import {
  UPDATE_LEAD_STATUS,
  GET_ALL_LEADS,
} from "../../../apollo/queries/leads";
import { useMutation, useLazyQuery } from "@apollo/client";
import { DialogModal } from "../../Ui/dialog/dialogModal";
import LeadViewTable from "../../Ui/tables/leadView";
import { useRouter } from "next/router";
import _ from "lodash";
import UpdateLeadStatusForm from "../../forms/leads/leadStatus";
import { extractDateFormate } from "../../../utils/validations";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import AppointmentForm from "../../forms/addAppointment";
import moment from "moment";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const leadStatus = [
  {
    name: "Created",
    value: "created",
  },
  {
    name: "Follow Up",
    value: "follow_up",
  },

  {
    name: "Appointment ",
    value: "appointment",
  },
  {
    name: "Order Closed",
    value: "order_closed",
  },

  {
    name: " Unsuccessful",
    value: "unsuccessful",
  },
];

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

const LeadDataGridComponent = (props) => {
  const classes = useStyles();
  const [updateLeadStatus, { data, loading }] = useMutation(
    UPDATE_LEAD_STATUS,
    {
      onCompleted() {
        alert("Successfully updated lead status");
        props.onLoadLeadsData();
        setOpenUpdateLeadModel(false);
        setOpenViewModel(false);
      },
    }
  );
  const [openViewModel, setOpenViewModel] = useState(false);
  const [leadData, setLeadData] = useState(null);
  const router = useRouter();
  const [openUpDateLead, setOpenUpdateLeadModel] = useState(false);
  const [openAppointmentForm, setOpenAppointmentForm] = useState(false);

  // Lead Data payload


  const handleOpenWhatsApp = (phoneNumber) => {
    const formattedPhoneNumber = phoneNumber.replace(/\s/g, ""); // Remove all whitespace characters
    console.log(formattedPhoneNumber);
    const whatsappURL = `https://wa.me/${formattedPhoneNumber}`;
    window.open(whatsappURL, "_blank");
  };

  const grdiColumns = [
    {
      field: "generatedBy",
      headerName: "generatedBy",
      hide: true,
      width: 180,
      sortable: false,
    },
    {
      field: "_status",
      headerName: "_status",
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
      field: "leadId",
      headerName: "Lead Id",
      hide: false,
      width: 120,
      sortable: false,
    },
    {
      field: "leadDate",
      headerName: "Date",
      hide: false,
      width: 120,
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
                  setLeadData(data.row);
                  setOpenViewModel(true);
                }}
              ></Button>
            </Tooltip>

            <Tooltip title="Edit Lead Status" aria-label="edit">
              <Button
                onClick={() => {
                  setLeadData(data.row);
                  setOpenViewModel(false);
                  setOpenUpdateLeadModel(true);
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
            <Tooltip title="Book an appointments" aria-label="appointments">
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
                  setLeadData(data.row);
                  setOpenAppointmentForm(true);
                  
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
      headerName: "Mobile",
      hide: false,
      width: 180,
      sortable: false,
    },
    {
      field: "source",
      headerName: "Source",
      hide: false,
      width: 100,
      sortable: false,
    },
    {
      field: "creditTo",
      headerName: "Credit To",
      hide: false,
      width: 180,
      sortable: false,
    },
    // {
    //   field: "handleby",
    //   headerName: "HandledBy",
    //   hide: false,
    //   width: 180,
    //   sortable: false,
    // },
    {
      field: "persona",
      headerName: "Persona",
      hide: false,
      width: 180,
      sortable: false,
    },
    // {
    //   field: "lookingfor",
    //   headerName: "Looking For",
    //   hide: false,
    //   width: 180,
    //   sortable: false,
    // },
    {
      field: "estimatedValue",
      headerName: "Expected Business",
      hide: false,
      width: 180,
      sortable: false,
    },
    // {
    //   field: "closedAmount",
    //   headerName: "Closed Amount",
    //   hide: false,
    //   width: 180,
    //   sortable: false,
    // },

    {
      field: "status",
      headerName: "Status",
      hide: false,
      width: 120,
      sortable: false,
    },
    // {
    //   field: "lastDateOfCall",
    //   headerName: "Last Date Of Call",
    //   hide: false,
    //   width: 180,
    //   sortable: false,
    // },
    {
      field: "followUpDate",
      headerName: "FollowUp Date",
      hide: false,
      width: 160,
      sortable: false,
    },
    {
      field: "expClosureDate",
      headerName: "Expected Clouser Date",
      hide: false,
      width: 220,
      sortable: false,
    },
    // {
    //   field: "eventDate",
    //   headerName: "Event Date",
    //   hide: false,
    //   width: 180,
    //   sortable: false,
    // },
    {
      field: "remarks",
      headerName: "Remarks",
      hide: false,
      width: 180,
      sortable: false,
    },
   
  ];

  return (
    <Fragment>
      <DataGrid
        loading={props.loading || loading}
        columns={grdiColumns}
        rows={props.dataRow}
        pageSize={100}
        page={props.page}
        paginationMode="server"
        onPageChange={props.onPageChange}
        rowCount={5000}
        onCellClick={(data) => {
          setLeadData(data.row);
          setOpenViewModel(true);
        }}
      />
      <DialogModal
        onCloseModel={() => {
          setOpenViewModel(false);
        }}
        open={openViewModel}
      >
        <Box p={2}>
          <Typography>Lead Details</Typography>
        </Box>
        <Divider />
        <Box p={2}>{leadData && <LeadViewTable data={leadData} />}</Box>
      </DialogModal>
      <DialogModal
        open={openUpDateLead}
        onCloseModel={() => {
          setOpenViewModel(false);
          setOpenUpdateLeadModel(false);
        }}
      >
        <UpdateLeadStatusForm
          loading={loading}
          formData={leadData}
          onSubmitForm={async (data) => {
            const payload = {
              leadId: leadData.id,
              reason: data.reason,
              status: data.status,
              date: data.date ? extractDateFormate(data.date) : null,
            };
            await updateLeadStatus({
              variables: {
                ...payload,
              },
            });
          }}
        />
      </DialogModal>
      <DialogModal
        open={openAppointmentForm}
        onCloseModel={() => {
          setOpenViewModel(false);
          setOpenAppointmentForm(false);
        }}
      >
        <Box p={2}>
          <Typography>Book an Appointment</Typography>
        </Box>
        <Divider />
        <AppointmentForm
          onAutoClose={() => {
            setOpenViewModel(false);
            setOpenAppointmentForm(false);
          }}
          leadData={leadData}
        />
      </DialogModal>
    </Fragment>
  );
};

export default LeadDataGridComponent;
