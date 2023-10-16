import React, { FC, Fragment, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridFeatureMode,
  GridPageChangeParams,
} from "@material-ui/data-grid";
import _ from "lodash";
import ProductTableView from "../tables/viewProducts";
import InfoDialogBox from "../dialog/infoDialog";
import {
  setStoreOrder,
  getSingleOrderByMobile,
} from "../../../services/_orders";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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

const QualityDataGridComponent: FC<props> = ({
  loading,
  rows,
  onPageChange,
  page,
  paginationMode = "client",
}) => {
  const [openViewProducts, setViewProducts] = useState(false);
  const [productData, setProductData] = useState(null);
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
    { field: "orderNo", headerName: "Order No.", width: 130, sortable: false },
    {
      field: "customerId",
      headerName: "CusId",
      width: 130,
      sortable: false,
    },
    {
      field: "stylist",
      headerName: "Stylist",
      width: 130,
      sortable: false,
    },
    { field: "name", headerName: "Name", width: 180, sortable: false },
    {
      field: "trialDate",
      headerName: "Trial Date",
      width: 130,
      sortable: false,
    },

    {
      field: "trialform",
      headerName: "Products",
      width: 180,
      sortable: false,
      renderCell: (data) => {
        return (
          <React.Fragment>
            <Button
              color={
                data.row.serverData?.orderQualityChecks?.length > 0
                  ? "secondary"
                  : "primary"
              }
              style={{ marginRight: 10 }}
              onClick={(e) => {
                setProductData(data.row.serverData);
                setViewProducts(true);
              }}
              size="small"
            >
              {"View Products"}
            </Button>
          </React.Fragment>
        );
      },
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 130,
      sortable: false,
    },

    // {
    //   field: "trialStatus",
    //   headerName: "Status",
    //   width: 180,
    //   sortable: false,
    //   renderCell: (data) => {
    //     return (
    //       <>
    //         <select style={{ height: 40 }} onChange={async (e) => {}}>
    //           {initialConfig.trailDecision.map((item, index) => (
    //             <option key={index} value={item.value}>
    //               {item.name}
    //             </option>
    //           ))}
    //         </select>
    //       </>
    //     );
    //   },
    // },
    // {
    //   field: "notes",
    //   headerName: "Notes",
    //   width: 180,
    //   sortable: false,
    // },
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
        open={openViewProducts}
        onCloseModel={() => setViewProducts(false)}
        maxWidth="md"
      >
        <Box p={1}>
          <Typography variant="h6">Product Details</Typography>
        </Box>
        <Box p={1}>
          <ProductTableView
            onClick={(itemId, isEdit, itemNumber, _qc_item_id) => {
              if (isEdit) {
                router.push({
                  pathname: "/qualitycheck/form/edit",
                  query: {
                    itemId: _qc_item_id,
                    itemNumber: itemNumber,
                  },
                });
              } else {
                router.push({
                  pathname: "/qualitycheck/form",
                  query: {
                    orderId: productData._id,
                    itemId: itemId,
                  },
                });
              }
            }}
            data={productData}
          />
        </Box>
      </InfoDialogBox>
    </Fragment>
  );
};

export default QualityDataGridComponent;
