import React, { FC, Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

import {
  handleDeleteDraft,
  getLocalDraftData,
  getOrderByMobileNumber,
} from "../../../services/_orders";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import { Typography, Box } from "@material-ui/core";

// Styles
import useStyles from "./styles";
import InfoDialogBox from "../../Ui/dialog/infoDialog";
import OrderTableView from "../../Ui/tables/orderConfirm";

// Ui

const DraftGridComponent: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [openOrderView, setOrderView] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const classes = useStyles();
  const columns = [
    { field: "id", headerName: "id", hide: true, width: 180, sortable: false },
    { field: "orderNo", headerName: "Order No.", width: 180, sortable: false },
    {
      field: "customerId",
      headerName: "Customer Id",
      width: 200,
      sortable: false,
    },
    { field: "name", headerName: "Name", width: 180, sortable: false },
    {
      field: "customerPhone",
      headerName: "Mobile Number",
      width: 200,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (data) => {
        return (
          <React.Fragment>
            <Button
              style={{ marginRight: 10 }}
              onClick={() => {
                const orderData = getOrderByMobileNumber(
                  data.row.customerPhone
                );
                if (!_.isEmpty(data.row.customerPhone)) {
                  setOrderData(orderData);
                  setOrderView(true);
                }
              }}
              size="small"
            >
              View
            </Button>
            <Button
              style={{ marginRight: 10 }}
              onClick={() => {
                console.log(data);
                handleDeleteDraft(data.row.customerPhone);
                prepareDateSet();
              }}
              size="small"
            >
              Delete
            </Button>
          </React.Fragment>
        );
      },
    },
  ];

  const prepareDateSet = () => {
    const localOrders = getLocalDraftData();
    if (!_.isEmpty(localOrders)) {
      let data: any[] = [];
      localOrders.map((item, index) => {
        const payload = {
          id: index,
          serverData: item,
          ...item,
          name: item.customerFirstName + "" + item.customerLastName,
          action: "",
        };
        data.push(payload);
      });
      setRowData(data);
    } else {
      setRowData([]);
    }
  };

  useEffect(() => {
    prepareDateSet();
  }, []);

  return (
    <Fragment>
      <DataGrid
        classes={{ root: classes.dataGridBoxRoot }}
        rows={rowData}
        autoPageSize={false}
        pageSize={100}
        hideFooterRowCount={true}
        columns={columns}
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
            showEditBtn={true}
            showEditPrnt={true}
            data={orderData}
          />
        </Box>
      </InfoDialogBox>
    </Fragment>
  );
};

export default DraftGridComponent;
