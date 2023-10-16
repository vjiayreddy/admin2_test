import _ from "lodash";
import { GetAllStoreOrders } from "../../utils/interfaces";
import moment from "moment";
import { ItemStatus } from "../../utils/enumType";

const useTrackOrderData = () => {
  const getProcessedTableData = (itemData: GetAllStoreOrders) => {
    const storeOrders: GetAllStoreOrders = itemData;
    if (!_.isEmpty(storeOrders)) {
      if (!_.isEmpty(storeOrders.getAllStoreOrders)) {
        const gridData = storeOrders.getAllStoreOrders.map((parentValue) => {
          return parentValue.orderItems.map((childValue) => {
            return {
              id: childValue.itemNumber,
              orderItemId: childValue._id,
              orderId: parentValue._id,
              orderNo: parentValue.orderNo,
              customerId: parentValue.customerId,
              customerFirstName:
                parentValue.customerFirstName +
                " " +
                parentValue.customerLastName,
              itemNumber: childValue.itemNumber,
              itemName: childValue.itemName,
              itemColor: childValue.itemColor,
              fabricCode: childValue.fabricCode,
              fabricImage: childValue.fabricImage,
              styleDesignImage: childValue.styleDesignImage,
              referenceImage: childValue.referenceImage,
              styleDesignImageNote: childValue.styleDesignImageNote,
              referenceImageNote: childValue.referenceImageNote,
              fabricImageNote: childValue.fabricImageNote,
              outfitStatus: childValue.outfitStatus,
              userId: parentValue.userId,
              stylist: !_.isEmpty(parentValue.stylist)
                ? parentValue.stylist[0]["name"]
                : "-",
              orderDate:
                parentValue.orderDate &&
                moment(parentValue.orderDate.timestamp).format("DD/MM/YYYY"),
              readyDate:
                parentValue.readyDate &&
                moment(parentValue.readyDate.timestamp).format("DD/MM/YYYY"),
              trialDate:
                parentValue.trialDate &&
                moment(parentValue.trialDate.timestamp).format("DD/MM/YYYY"),
              eventDate:
                parentValue.eventDate &&
                moment(parentValue.eventDate.timestamp).format("DD/MM/YYYY"),
            };
          });
        });

        const gridDataFlatMap = _.flatMap(gridData, (value) => value);
        if (!_.isEmpty(gridDataFlatMap)) {
          return gridDataFlatMap;
        }
      } else {
        return [];
      }
    }
  };

  const filterDropdownValues = [
    {
      name: "All",
      value: "All",
    },
    {
      name: ItemStatus.ALT_DONE,
      value: ItemStatus.ALT_DONE,
    },
    {
      name: ItemStatus.CLOSED,
      value: ItemStatus.CLOSED,
    },
    {
      name: ItemStatus.CRITICAL_ISSUES,
      value: ItemStatus.CRITICAL_ISSUES,
    },
    {
      name: ItemStatus.FABRIC_ORDERED,
      value: ItemStatus.FABRIC_ORDERED,
    },
    {
      name: ItemStatus.FABRIC_RECIEVED,
      value: ItemStatus.FABRIC_RECIEVED,
    },
    {
      name: ItemStatus.ITEM_OUT_SOURCED,
      value: ItemStatus.ITEM_OUT_SOURCED,
    },
    {
      name: ItemStatus.EMB_OUTSOURCED,
      value: ItemStatus.EMB_OUTSOURCED,
    },
    {
      name: ItemStatus.EMB_RECEIEVED,
      value: ItemStatus.EMB_RECEIEVED,
    },

    {
      name: ItemStatus.NOT_STARTED,
      value: ItemStatus.NOT_STARTED,
    },
    {
      name: ItemStatus.OUTFIT_RECEIEVED,
      value: ItemStatus.OUTFIT_RECEIEVED,
    },
    {
      name: ItemStatus.QC_PENDING,
      value: ItemStatus.QC_PENDING,
    },
    {
      name: ItemStatus.READY,
      value: ItemStatus.READY,
    },
    {
      name: ItemStatus.READY_POST_TRIAL,
      value: ItemStatus.READY_POST_TRIAL,
    },
    {
      name: ItemStatus.STOCK_OUT,
      value: ItemStatus.STOCK_OUT,
    },
    {
      name: ItemStatus.TRIAL_ALT,
      value: ItemStatus.TRIAL_ALT,
    },
    {
      name: ItemStatus.TRIAL_OK,
      value: ItemStatus.TRIAL_OK,
    },
  ];

  return {
    getProcessedTableData,
    filterDropdownValues,
  };
};

export default useTrackOrderData;
