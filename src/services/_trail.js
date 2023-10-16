import { categories } from "../utils/utils";
import _ from "lodash";
export const initialConfig = {
  status: [
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
      name: "DELIVERED",
      value: "DELIVERED",
    },
  ],
  types: [
    {
      name: "Pending",
      value: "Pending",
    },
    {
      name: "First Trial Done",
      value: "FIRST",
    },
    {
      name: "Second Trail Done",
      value: "SECOND",
    },
    {
      name: "Third Trial Done",
      value: "THIRD",
    },
    {
      name: "Delivered",
      value: "Delivered",
    },
  ],
  trailTable: [
    "Product",
    "PRODUCT ID",
    "FABRIC_IMAGE",
    "TRIAL NOTE",
    "TRIAL IMAGE",
    "TRAIL VIDEO",
    "MEASUREMENTS",
  ],
  trailRating: [
    {
      name: "EXCELLENT",
      value: "EXCELLENT",
    },
    {
      name: "GOOD",
      value: "GOOD",
    },
    {
      name: "NOT_BAD",
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
  ],
  trailDecision: [
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
      name: "REJECTED ",
      value: "REJECTED ",
    },
  ],
  measurementsUpdated: [
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
  ],
};

export const setTrialFormPayload = (data) => {
  let _orderItems = [];
  const { orderItems } = data;

  orderItems.map((item) => {
    const findCartId = _.find(categories, (itm) => itm.name === item.itemName);
    _orderItems.push({
      name: item.itemName,
      itemNumber: item.itemNumber,
      catId: findCartId ? findCartId.catId : null,
      fabricImageLink: !_.isEmpty(item?.fabricImage) ? item.fabricImage : null,
      trialNote: "",
      trialVideoLink: null,
      trialImageLinks: null,
    });
  });
  return {
    orderItems: _orderItems,
  };
};

export const resetTrailFormData = (data) => {
  let _orderItems = [];
  const { products } = data;
  console.log(products);
  products.map((item) => {
    _orderItems.push({
      name: item.name,
      itemNumber: item.itemNumber,
      catId: item.catId,
      trialNote: item.trialNote,
      trialVideoLink: !_.isEmpty(item?.trialVideoLink)
        ? item?.trialVideoLink
        : null,
      fabricImageLink: !_.isEmpty(item?.fabricImageLink)
        ? item?.fabricImageLink
        : null,
      trialImageLinks: !_.isEmpty(item.trialImageLinks)
        ? JSON.stringify(item.trialImageLinks)
        : null,
    });
  });
  return {
    orderItems: _orderItems,
  };
};
