import React, { FC, Fragment, useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridFeatureMode,
  GridPageChangeParams,
} from "@material-ui/data-grid";
import _ from "lodash";
import OrderTableView from "../../Ui/tables/orderConfirm";
import InfoDialogBox from "../../Ui/dialog/infoDialog";
import {
  setStoreOrder,
  getFinalOrderPayload,
  getSingleOrderByMobile,
} from "../../../services/_orders";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Apollo
//import { authUserVar } from "../../../apollo/withApollo";

// Styles
import useStyles from "./styles";

// Ui
import { OrderGridRow } from "../../../utils/interfaces";
import { OrderStatus, RowTypeIndex } from "../../../utils/enumType";
import { setLocalOrder } from "../../../services/orders";
import { useRouter } from "next/router";

interface props {
  rows: OrderGridRow[];
  loading?: boolean;
  tabName?: string;
  onPageChange?: (nextPageSize: GridPageChangeParams) => void;
  page?: number;
  paginationMode?: GridFeatureMode;
  buttonStatus?: "EDIT" | "VIEW";
}

const OrderataGridComponent: FC<props> = ({
  loading,
  rows,
  onPageChange,
  page,
  paginationMode = "client",
  buttonStatus = "EDIT",
}) => {
  const [openOrderView, setOrderView] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [resetOrder, setResetOrder] = useState(null);
  const [isLocalOrder, setIsLocalOrder] = useState(false);
  const classes = useStyles();
  const router = useRouter();

  const getDataFromDraft = (data, isEdit) => {
    const localOrder = getSingleOrderByMobile(data.row.customerPhone);
    if (_.isEmpty(localOrder)) {
      setStoreOrder(data.row.serverData);
    }
    if (isEdit) {
      router.push(`/orders/new-orders-form?edit=${data.row.customerPhone}`);
    } else {
      router.push(`/orders/pdf?mobile=${data.row.customerPhone}`);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", hide: true, width: 180, sortable: false },
    { field: "orderNo", headerName: "Order No.", width: 130, sortable: false },
    {
      field: "customerId",
      headerName: "CusId",
      width: 130,
      sortable: false,
    },
    { field: "name", headerName: "Name", width: 180, sortable: false },
    {
      field: "customerPhone",
      headerName: "Mobile",
      width: 150,
      sortable: false,
    },
    {
      field: "orderItems",
      headerName: "Products",
      width: 130,
      sortable: false,
    },
    {
      field: "orderTotal",
      headerName: "Net Total",
      width: 130,
      sortable: false,
    },
    {
      field: "balanceAmount",
      headerName: "Balance",
      width: 180,
      sortable: false,
    },
    {
      field: "stylist",
      headerName: "Stylist",
      width: 130,
      sortable: false,
    },

    {
      field: "studioId",
      headerName: "Studio",
      width: 180,
      sortable: false,
    },

    {
      field: "orderDate",
      headerName: "Order Date",
      width: 130,
      sortable: false,
    },

    {
      field: "readyDate",
      headerName: "Ready Date",
      width: 130,
      sortable: false,
    },
    {
      field: "trialDate",
      headerName: "Trial Date",
      width: 130,
      sortable: false,
    },
    {
      field: "deliveryDate",
      headerName: "Delivery Date",
      width: 130,
      sortable: false,
    },
    {
      field: "eventDate",
      headerName: "Event Date",
      width: 180,
      sortable: false,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 180,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (data) => {
        return (
          <React.Fragment>
            {buttonStatus === "EDIT" && (
              <Button
                style={{ marginRight: 10 }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(
                    `/orders/new-orders-form?id=${data.row.serverData._id}`
                  );
                }}
                size="small"
              >
                Edit
              </Button>
            )}
            {buttonStatus === "VIEW" && (
              <Button
                style={{ marginRight: 10 }}
                onClick={(e) => {
                  e.preventDefault();
                  setOrderView(true);
                }}
                size="small"
              >
                View
              </Button>
            )}

            <Button
              color="secondary"
              style={{ marginRight: 10 }}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/orders/pdf?id=${data.row.serverData._id}`);
              }}
              size="small"
            >
              Print
            </Button>
          </React.Fragment>
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
        onCellClick={(data, e) => {
          e.preventDefault();
          setOrderData(data.row.serverData);
          setOrderView(true);
        }}
      />
      <InfoDialogBox
        open={openOrderView}
        onCloseModel={() => setOrderView(false)}
        maxWidth="lg"
      >
        <Box p={1}>
          <Typography variant="h6">Order Details</Typography>
        </Box>
        <Box p={1}>
          <OrderTableView
            showsubmitbtn={false}
            showEditBtn={buttonStatus === "EDIT" ? true : false}
            showEditPrnt={true}
            data={orderData}
          />
        </Box>
      </InfoDialogBox>
      <InfoDialogBox
        open={isLocalOrder}
        onCloseModel={() => setIsLocalOrder(false)}
        maxWidth="sm"
      >
        {orderData && (
          <Fragment>
            <Box p={1}>
              <Typography variant="h6">Order No:{orderData.orderNo}</Typography>
            </Box>
            <Box p={1}>
              <Typography>
                This order edited previously in draft mode you want to continue
                with draft changes?{" "}
              </Typography>
              <Button
                onClick={() => {
                  // setOrderData(resetOrder);
                  // setOrderData(getFinalOrderPayload(setStoreOrder(resetOrder)));
                  // setIsLocalOrder(false);
                  // setOrderView(true);
                }}
              >
                NO
              </Button>
              <Button
                onClick={() => {
                  setIsLocalOrder(false);
                  setOrderView(true);
                }}
              >
                YES
              </Button>
            </Box>
          </Fragment>
        )}
      </InfoDialogBox>
    </Fragment>
  );
};

export default OrderataGridComponent;
