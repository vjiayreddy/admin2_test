import React, { FC, Fragment, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridFeatureMode,
  GridPageChangeParams,
} from "@material-ui/data-grid";
import _ from "lodash";
import TrialViewTable from "../tables/softTrialView";
import InfoDialogBox from "../dialog/infoDialog";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

// Apollo
//import { authUserVar } from "../../../apollo/withApollo";
import { useMutation } from "@apollo/client";
import { initialConfig } from "../../../services/_trail";

// Styles
import useStyles from "./styles";
import {
  UPDATE_ORDER_TRIAL_STATUS,
  UPDATE_ORDER_TRIAL_RATING_STATUS,
  UPDATE_ORDER_TRIAL_MEASUREMENTS_STATUS,
  UPDATE_ORDER_TRIAL_DECISION_STATUS,
} from "../../../apollo/queries/trialForm";

// Ui
import { TrialGridRow } from "../../../utils/interfaces";
import { useRouter } from "next/router";

interface props {
  rows: TrialGridRow[];
  loading?: boolean;
  tabName?: string;
  onPageChange?: (nextPageSize: GridPageChangeParams) => void;
  page?: number;
  paginationMode?: GridFeatureMode;
}

const trialStatus = [
  {
    name: "NA",
    value: "NA",
  },
  {
    name: "PENDING",
    value: "PENDING",
  },
  {
    name: "FIRST TRIAL DONE",
    value: "FIRST_TRIAL_DONE",
  },
  {
    name: "SECOND TRIAL DONE",
    value: "SECOND_TRIAL_DONE",
  },
  {
    name: "THIRD TRIAL DONE",
    value: "THIRD TRIAL DONE",
  },
  {
    name: "DELIVERED",
    value: "DELIVERED",
  },
];

const trialRating = [
  {
    name: "NA",
    value: "NA",
  },
  {
    name: "EXCELLENT",
    value: "EXCELLENT",
  },
  {
    name: "GOOD",
    value: "GOOD",
  },
  {
    name: "NOT BAD",
    value: "NOT_BAD",
  },
  {
    name: "BAD",
    value: "BAD",
  },
  {
    name: "WORST",
    value: "WORST",
  },
];

const trialDecision = [
  {
    name: "NA",
    value: "NA",
  },
  {
    name: "APPROVED",
    value: "APPROVED",
  },
  {
    name: "ALTERATIONS",
    value: "ALTERATIONS",
  },
  {
    name: "DISCUSSION",
    value: "DISCUSSION",
  },
  {
    name: "REJECTED",
    value: "REJECTED",
  },
];

const updateMeasurement = [
  {
    name: "NA",
    value: "NA",
  },
  {
    name: "UPDATED",
    value: "UPDATED",
  },
  {
    name: "PENDING",
    value: "PENDING",
  },
  {
    name: "DONE",
    value: "DONE",
  },
];

const TrialDataGridComponent: FC<props> = ({
  loading,
  rows,
  onPageChange,
  page,
  paginationMode = "client",
}) => {
  const [openTrialView, setTrialView] = useState(false);
  const [trailData, setTrialData] = useState(null);
  const [updateOrderTrialStatus] = useMutation(UPDATE_ORDER_TRIAL_STATUS);
  const [updateOrderTrialRatingStatus] = useMutation(
    UPDATE_ORDER_TRIAL_RATING_STATUS
  );
  const [updateOrderTrialMeasurementStatus] = useMutation(
    UPDATE_ORDER_TRIAL_MEASUREMENTS_STATUS
  );
  const [UpdateOrderTrialDecisionStatus] = useMutation(
    UPDATE_ORDER_TRIAL_DECISION_STATUS
  );
  const classes = useStyles();
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", hide: true, width: 180, sortable: false },
    {
      field: "_id",
      headerName: "_id",
      hide: true,
      width: 180,
      sortable: false,
    },
    { field: "orderNo", headerName: "Order No.", width: 130, sortable: false },
    {
      field: "customerId",
      headerName: "CusId",
      width: 130,
      sortable: false,
    },
    { field: "name", headerName: "Name", width: 180, sortable: false },

    {
      field: "stylist",
      headerName: "Stylist",
      width: 130,
      sortable: false,
    },
    // {
    //   field: "orderDate",
    //   headerName: "Order Trial",
    //   width: 130,
    //   sortable: false,
    // },

    {
      field: "trialDate",
      headerName: "Order Trial Date",
      width: 200,
      sortable: false,
    },

    {
      field: "actualTrialDate",
      headerName: "Actual Trial Date",
      width: 200,
      sortable: false,
    },

    {
      field: "finalDeliveryDate",
      headerName: "Final Delivery Date",
      width: 200,
      sortable: false,
    },

    {
      field: "trialform",
      headerName: " Trial Form",
      width: 180,
      sortable: false,
      renderCell: (data) => {
        console.log(rows);
        return (
          <React.Fragment>
            <Button
              color={data.row.serverData.orderTrial ? "secondary" : "primary"}
              style={{ marginRight: 10 }}
              onClick={(e) => {
                setTrialData(data.row);
                setTrialView(true);
              }}
              size="small"
            >
              View
            </Button>
          </React.Fragment>
        );
      },
    },
    {
      field: "trialStatus",
      headerName: "Trial Status",
      width: 180,
      sortable: false,
      renderCell: (data) => {
        console.log(data);
        return (
          <>
            {data.row.trialStatus && (
              <select
                style={{ height: 40 }}
                onChange={async (e) => {
                  if (e.target.value !== "NA") {
                    await updateOrderTrialStatus({
                      variables: {
                        orderTrialId: data.row._id,
                        orderTrialStatus: e.target.value,
                      },
                    });
                  }
                }}
              >
                {initialConfig.status.map((item, index) => (
                  <option
                    selected={item.value === data.row.trialStatus}
                    key={index}
                    value={item.value}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </>
        );
      },
    },
    {
      field: "trialRating",
      headerName: "Trial Rating",
      width: 180,
      sortable: false,
      renderCell: (data) => {
        return (
          <>
            {data.row && (
              <select
                style={{ height: 40 }}
                onChange={async (e) => {
                  if (data.row.trialRating == null) {
                    alert("Trial Data not found please enter trail data...");
                  } else {
                    if (e.target.value !== "NA") {
                      await updateOrderTrialRatingStatus({
                        variables: {
                          orderTrialId: data.row._id,
                          orderTrialRatingStatus: e.target.value,
                        },
                      });
                    }
                  }
                }}
              >
                {initialConfig.trailRating.map((item, index) => (
                  <option
                    selected={item.value === data.row.trialRating}
                    key={index}
                    value={item.value}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </>
        );
      },
    },

    {
      field: "trialDecision",
      headerName: " Trial Decision",
      width: 180,
      sortable: false,
      renderCell: (data) => {
        return (
          <>
            {data.row && (
              <select
                style={{ height: 40 }}
                onChange={async (e) => {
                  if (data.row.trialDecision == null) {
                    alert("Trial Data not found please enter trail data...");
                  } else {
                    if (e.target.value !== "NA") {
                      await UpdateOrderTrialDecisionStatus({
                        variables: {
                          orderTrialId: data.row._id,
                          orderTrialDecisionStatus: e.target.value,
                        },
                      });
                    }
                  }
                }}
              >
                {initialConfig.trailDecision.map((item, index) => (
                  <option
                    selected={item.value === data.row.trialDecision}
                    key={index}
                    value={item.value}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </>
        );
      },
    },

    {
      field: "notes",
      headerName: "Notes",
      width: 180,
      sortable: false,
      renderCell: (data) => {
        console.log(data.row);
        return (
          <>
            {data.row && (
              <Tooltip placement="left-start" title={data.row.notes}>
                <p>{data.row.notes}</p>
              </Tooltip>
            )}
          </>
        );
      },
    },
    {
      field: "measurementStatus",
      headerName: "Measurement",
      width: 180,
      sortable: false,
      renderCell: (data) => {
        return (
          <>
            {data.row.measurementStatus && (
              <select
                style={{ height: 40 }}
                onChange={async (e) => {
                  if (data.row.measurementStatus == null) {
                    alert("Trial Data not found please enter trail data...");
                  } else {
                    if (e.target.value !== "NA") {
                      await updateOrderTrialMeasurementStatus({
                        variables: {
                          orderTrialId: data.row._id,
                          orderTrialMeasurementStatus: e.target.value,
                        },
                      });
                    }
                  }
                }}
              >
                {initialConfig.measurementsUpdated.map((item, index) => (
                  <option
                    selected={item.value === data.row.measurementStatus}
                    key={index}
                    value={item.value}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </>
        );
      },
    },
  ];

  return (
    <Fragment>
      <DataGrid
        classes={{ root: classes.dataGridBoxRoot }}
        rows={rows}
        autoPageSize={false}
        pageSize={100}
        hideFooterRowCount={true}
        loading={loading}
        columns={columns}
        onPageChange={onPageChange}
        page={page}
        paginationMode={paginationMode}
        rowCount={5000}
      />
      <InfoDialogBox
        open={openTrialView}
        onCloseModel={() => setTrialView(false)}
        maxWidth="md"
      >
        <Box p={1}>
          <Typography variant="h6">Trial Details</Typography>
        </Box>
        <Box p={1}>
          <TrialViewTable
            onClick={() => setTrialView(false)}
            data={trailData}
          />
        </Box>
      </InfoDialogBox>
    </Fragment>
  );
};

export default TrialDataGridComponent;
