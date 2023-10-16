import React, { FC, Fragment, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import _ from "lodash";

import { UPADATE_ORDER_ITEM_STATUS } from "../../../apollo/queries/orders";
import { GET_USER_MEASURMENTS } from "../../../apollo/queries/measurments";
import { useMutation } from "@apollo/client";
import { Box, Typography, Divider } from "@material-ui/core";

// Styles
import useStyles from "./styles";
import ViewMesurments from "../../Ui/viewMeasurments/orderMeasurmentView";
import InfoDialogComponent from "../dialog/infoDialog";

// Ui
import { TrackOrderGridData } from "../../../utils/interfaces";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import SelectDropDown from "../../Ui/formFields/SelectDropdown";
import { useForm, Controller } from "react-hook-form";

interface props {
  rows: TrackOrderGridData[];
  loading?: boolean;
}

const outfitStatus = [
  {
    name: "Not Started",
    value: "not_started",
  },
  {
    name: "Fabric Ordered",
    value: "fabric_ordered",
  },
  {
    name: "Fabric Received",
    value: "fabric_received",
  },
  {
    name: "Item Outsourced",
    value: "item_outsourced",
  },
  {
    name: "Emb Outsourced",
    value: "emb_outsourced",
  },
  {
    name: "Emb Recevied",
    value: "emb_received",
  },
  {
    name: "Outfit Recevied",
    value: "outfit_received",
  },
  {
    name: "QC Pending",
    value: "qc_pending",
  },
  {
    name: "Ready",
    value: "ready",
  },
  {
    name: "Trail Ok",
    value: "trial_ok",
  },
  {
    name: "Trail Alt",
    value: "trial_alt",
  },
  {
    name: "Alt Done",
    value: "alt_done",
  },
  {
    name: "Ready Post Trial",
    value: "ready_post_trial",
  },
  {
    name: "Critical Issues",
    value: "critical_issue",
  },
  {
    name: "Stock Out",
    value: "stock_out",
  },
  {
    name: "Closed",
    value: "closed",
  },
];

const OrderTrackDataGrid: FC<props> = ({ loading, rows }) => {
  const classes = useStyles();
  const [imageType, setImageType] = useState(null);
  const [note, setNote] = useState(null);
  const [imageStatus, setImageStatus] = useState(null);
  const [viewImage, setViewImage] = useState(false);
  const [viewAllImage, setViewAllImages] = useState(false);
  const [isViewMeasurments, setIsViewMeasurments] = useState(false);
  const [catId, setCatId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [dataRow, setDateRow] = useState(null);
  const [updateStoreOrderItemStatus, { loading: loadingSOIS, data }] =
    useMutation(UPADATE_ORDER_ITEM_STATUS);

  const ImageAndNote = ({ imgUrl, note, title }) => {
    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box mb={1}>
          <Typography align="center">{title}</Typography>
        </Box>
        <Box
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            width: "250px",
            backgroundImage: `url(${imgUrl})`,
            height: 400,
          }}
        ></Box>
        <Box p={1} style={{ textAlign: "center" }}>
          {note && <b>Note: {note} </b>}
        </Box>
      </Box>
    );
  };

  const getCatid = (product) => {
    switch (product) {
      case "full_shirt":
        return {
          catId: "5da7220571762c2a58b27a65",
          subCatId: "half_shirt",
        };
        break;
      case "half_shirt":
        return {
          catId: "5da7220571762c2a58b27a65",
          subCatId: "half_shirt",
        };
        break;
      case "chinos":
        return {
          catId: "5da7220571762c2a58b27a6b",
          subCatId: "chinos",
        };
        break;
      case "trouser":
        return {
          catId: "5da7220571762c2a58b27a6b",
          subCatId: "trouser",
        };
        break;
      case "blazer":
        return {
          catId: "5da7220571762c2a58b27a68",
          subCatId: "blazer",
        };

        break;
      case "indowestern_top":
        return {
          catId: "5da7220571762c2a58b27a6f",
          subCatId: "indowestern",
        };
        break;
      case "jodhpuri_top":
        return {
          catId: "5da7220571762c2a58b27a6c",
          subCatId: "jodhpuri",
        };
        break;
      case "kurta":
        return {
          catId: "5da7220571762c2a58b27a6e",
          subCatId: "kurta",
        };
        break;
      case "sadris":
        return {
          catId: "5da7220571762c2a58b27a6d",
          subCatId: "sadri",
        };
        break;
      case "sherwani":
        return {
          catId: "5da7220571762c2a58b27a6d",
          subCatId: "sherwani",
        };
        break;
      default:
        return null;
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", hide: true, width: 180, sortable: false },
    {
      field: "orderItemId",
      headerName: "orderItemId",
      hide: true,
      width: 180,
      sortable: false,
    },
    {
      field: "fabricImageNote",
      headerName: "fabricImageNote",
      hide: true,
      width: 180,
      sortable: false,
    },
    {
      field: "referenceImageNote",
      headerName: "referenceImageNote",
      hide: true,
      width: 180,
      sortable: false,
    },
    {
      field: "styleDesignImageNote",
      headerName: "styleDesignImageNote",
      hide: true,
      width: 180,
      sortable: false,
    },
    {
      field: "userId",
      headerName: "userId",
      hide: true,
      width: 180,
      sortable: false,
    },
    { field: "orderNo", headerName: "Order No.", width: 130, sortable: false },
    {
      field: "customerId",
      headerName: "CusID",
      width: 130,
      sortable: false,
    },
    {
      field: "customerFirstName",
      headerName: "Name",
      width: 150,
      sortable: false,
    },
    {
      field: "stylist",
      headerName: "Stylist",
      width: 150,
      sortable: false,
    },
    {
      field: "itemNumber",
      headerName: "P.NO",
      width: 130,
      sortable: false,
    },
    {
      field: "itemName",
      headerName: "Product",
      width: 130,
      sortable: false,
    },
    {
      field: "itemColor",
      headerName: "Color",
      width: 130,
      sortable: false,
    },
    {
      field: "fabricCode",
      headerName: "Fab-Code",
      width: 130,
      sortable: false,
    },
    {
      field: "fabricImage",
      headerName: "Fab-Image",
      width: 130,
      sortable: false,
      renderCell: (data) => {
        return (
          <img
            width={75}
            onClick={() => {
              setImageStatus("Fabric");
              setImageType(data.row.fabricImage);
              setNote(data.row.fabricImageNote), setDateRow(data.row);
              setViewImage(true);
            }}
            src={
              !_.isEmpty(data.row.fabricImage)
                ? data.row.fabricImage
                : "/images/noImage.jpg"
            }
          />
        );
      },
    },
    {
      field: "styleDesignImage",
      headerName: "Des-Image",
      width: 130,
      sortable: false,
      renderCell: (data) => {
        return (
          <img
            onClick={() => {
              setImageStatus("Designer");
              setNote(data.row.styleDesignImageNote),
                setImageType(data.row.styleDesignImage);
              setDateRow(data.row);
              setViewImage(true);
            }}
            width={75}
            src={
              !_.isEmpty(data.row.styleDesignImage)
                ? data.row.styleDesignImage
                : "/images/noImage.jpg"
            }
          />
        );
      },
    },
    {
      field: "referenceImage",
      headerName: "Ref Image",
      width: 130,
      sortable: false,
      renderCell: (data) => {
        return (
          <img
            onClick={() => {
              setImageStatus("Reference");
              setImageType(data.row.referenceImage);
              setNote(data.row.referenceImageNote);
              setDateRow(data.row);
              setViewImage(true);
            }}
            width={75}
            src={
              !_.isEmpty(data.row.referenceImage)
                ? data.row.referenceImage
                : "/images/noImage.jpg"
            }
          />
        );
      },
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
      field: "Measurments",
      headerName: "Measurments",
      width: 200,
      sortable: false,
      renderCell: (data) => {
        return (
          <Fragment>
            <Button
              onClick={async () => {
                if (getCatid(data.row.itemName)) {
                  setDateRow(data.row);
                  setCatId(getCatid(data.row.itemName).catId);
                  setUserId(data.row.userId);
                  setIsViewMeasurments(true);
                } else {
                  alert("Measurement not found");
                }
              }}
            >
              View
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              color="secondary"
              onClick={async () => {
                setDateRow(data.row);
                setViewAllImages(true);
              }}
            >
              All Images
            </Button>
          </Fragment>
        );
      },
    },
    {
      field: "outfitStatus",
      headerName: "Outfit Status",
      width: 200,
      sortable: false,
      renderCell: (data) => {
        console.log(data.row.outfitStatus);
        return (
          <select
            style={{ height: 40 }}
            onChange={async (e) => {
              await updateStoreOrderItemStatus({
                variables: {
                  orderId: data.row.orderId,
                  orderItemId: data.row.orderItemId,
                  status: e.target.value,
                },
              });
            }}
          >
            {outfitStatus.map((item, index) => (
              <option
                selected={item.value === data.row.outfitStatus}
                key={index}
                value={item.value}
              >
                {item.name}
              </option>
            ))}
          </select>
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
        pageSize={30}
        hideFooterRowCount={true}
        loading={loading || loadingSOIS}
        columns={columns}
      />
      <Dialog
        onClose={() => setIsViewMeasurments(false)}
        fullScreen
        open={isViewMeasurments}
      >
        <DialogContent style={{ padding: 0 }}>
          <ViewMesurments
            catId={catId}
            userId={userId}
            dataRow={dataRow}
            onClose={() => setIsViewMeasurments(false)}
          />
        </DialogContent>
      </Dialog>
      <InfoDialogComponent
        onCloseModel={() => setViewAllImages(false)}
        open={viewAllImage}
        maxWidth="md"
      >
        {viewAllImage && dataRow && (
          <Fragment>
            <Box p={2}>
              <Typography variant="h6">
                {dataRow.itemName}-{dataRow.itemNumber}
              </Typography>
            </Box>
            <Divider />

            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 20,
              }}
            >
              <ImageAndNote
                title="Fabric Image"
                imgUrl={dataRow.fabricImage}
                note={dataRow.fabricImageNote}
              />
              <ImageAndNote
                title="Designer Image"
                imgUrl={dataRow.styleDesignImage}
                note={dataRow.styleDesignImageNote}
              />
              <ImageAndNote
                title="Reference Image"
                imgUrl={dataRow.referenceImage}
                note={dataRow.referenceImageNote}
              />
            </Box>
          </Fragment>
        )}
      </InfoDialogComponent>
      <InfoDialogComponent
        open={viewImage}
        onCloseModel={() => {
          setViewImage(false);
        }}
        maxWidth="sm"
      >
        {viewImage && dataRow && (
          <Box>
            <Box p={2}>
              <Typography>
                {dataRow.itemName}-{dataRow.itemNumber}({imageStatus})
              </Typography>
            </Box>
            <Divider />
            <Box p={2}>
              <Box
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "top center",
                  width: "300px",
                  backgroundImage: `url(${imageType})`,
                  height: 300,
                }}
              ></Box>
            </Box>
            <Box pl={2} pb={2} pr={2}>
              <Typography>
                <b>Note:</b> {note}
              </Typography>
            </Box>
          </Box>
        )}
      </InfoDialogComponent>
    </Fragment>
  );
};

export default OrderTrackDataGrid;
