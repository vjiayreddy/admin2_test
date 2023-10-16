import Resizer from "react-image-file-resizer";
import _ from "lodash";
import moment from "moment";
import { extractDateFormate } from "../../src/utils/validations";

const LOCAL_DRAFT_KEY = "ORDER_DRAFT";

export const initialConfig = {
  data: {
    source: [
      "Reference",
      "BNI",
      "Cold Calling",
      "Walk-in",
      "Google Search",
      "Quora",
      "News Article",
      "Radio",
      "Visiting Card",
    ],
    tableRows: [
      "Product",
      "P.No",
      "Color",
      "Fabric Code",
      "Fabric Pic",
      "Ref-Pic",
      "Designer-Pic",
      "Trail Date",
      "Price",
      "Action",
    ],
    studioCodes: [
      {
        name: "HYSDO1",
        value: "HYSDO1",
      },
      {
        name: "HYONO1",
        value: "HYONO1",
      },
    ],
    personalStylistId: {
      name: "Sushil Kumar",
      value: "5de75fa5a72f8129f42bba2a",
    },
    customerPersonaIds: {
      name: "a Groom",
      value: "60546796e0646e2994cfb7b0",
    },
    orderItems: [
      {
        itemName: "full_shirt",
        itemPrice: 0,
        fabricCode: "",
        trialDate: moment(new Date()),
        fabricImage: "",
        fabricImageNote: "",
        referenceImage: "",
        referenceImageNote: "",
        styleDesignImage: "",
        styleDesignImageNote: "",
      },
    ],
    catMap: [
      {
        name: "full_shirt",
        code: "F",
      },
      {
        name: "half_shirt",
        code: "H",
      },
      {
        name: "blazer",
        code: "B",
      },
      {
        name: "chinos",
        code: "C",
      },
      {
        name: "trouser",
        code: "T",
      },
      {
        name: "suit",
        code: "S",
      },
      {
        name: "sherwani",
        code: "R",
      },
      {
        name: "waistcoat",
        code: "W",
      },
      {
        name: "kurta",
        code: "K",
      },
      {
        name: "sadri",
        code: "N",
      },
      {
        name: "jodhpuri_top",
        code: "J",
      },
      {
        name: "indowestern_top",
        code: "D",
      },
      {
        name: "ethnic_bottom",
        code: "P",
      },
      {
        name: "puna_pant",
        code: "U",
      },
      {
        name: "patiyala",
        code: "L",
      },
      {
        name: "dhoti",
        code: "Z",
      },
      {
        name: "shacket",
        code: "K",
      },
      {
        name: "shoes",
        code: "G",
      },
      {
        name: "belts",
        code: "L",
      },
      {
        name: "tie/bows",
        code: "K",
      },
      {
        name: "others",
        code: "M",
      },
    ],
    orderStatus: [
      {
        name: "RUNNING",
        value: "RUNNING",
      },
      {
        name: "UNCONFIRMED",
        value: "UNCONFIRMED",
      },
      {
        name: "HOLD",
        value: "HOLD",
      },
      {
        name: "ALTERATIONS",
        value: "ALTERATIONS",
      },
      {
        name: "DELIVERED",
        value: "DELIVERED",
      },
      {
        name: "CLOSED",
        value: "CLOSED",
      },
      {
        name: "DRAFT",
        value: "DRAFT",
      },
    ],
    otherChargesBreakdown: [
      {
        name: "",
        amount: 0,
        note: "",
      },
    ],
    deductionsBreakdown: [
      {
        name: "",
        amount: 0,
        note: "",
      },
    ],
    paymentBreakdown: [
      {
        date: moment(new Date()),
        amount: 0,
        modeOfPayment: "",
        note: "",
        isAdvance: true,
      },
    ],
  },
};

export const getProductCode = (_category, orderNo) => {
  var proCat = _category;
  var proCode = initialConfig.data.catMap.find((cat) => cat.name === proCat);
  if (proCode) {
    return orderNo + proCode.code;
  }
};

export const setLocalDraftOrderData = (data) => {
  localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(data));
};
export const getLocalDraftData = () => {
  return JSON.parse(localStorage.getItem(LOCAL_DRAFT_KEY));
};

export const getDraftIndex = (mobileNumber) => {
  let localOrderItems = getLocalDraftData();
  const findIndex = _.findIndex(
    localOrderItems,
    (order) => order.customerPhone === mobileNumber
  );
  return {
    findIndex,
    localOrderItems,
  };
};

export const addOrderDataIntoDraft = (mobileNumber, payload) => {
  const data = [payload];

  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (!_.isEmpty(localOrderItems)) {
    if (findIndex !== -1) {
      localOrderItems[findIndex] = payload;
      setLocalDraftOrderData(localOrderItems);
    } else {
      const data = [...localOrderItems, payload];
      setLocalDraftOrderData(data);
    }
  } else {
    const data = [payload];
    setLocalDraftOrderData(data);
  }
};

export const getOrderByMobileNumber = (mobileNumber) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (findIndex !== -1) {
    const order = localOrderItems[findIndex];
    return order;
  } else {
    return null;
  }
};

export const resetBasicUserData = (data, order) => {
  const resetFormData = {
    customerPhone: data.phone,
    customerFirstName: data.firstName,
    customerLastName: data.lastName,
    customerEmail: data.email,
    customerHeight: data.height,
    customerWeight: data.weight,
    customerId: data.customerId,
    studioId: "HYSDO1",
    orderNo: order.orderNo,
    orderDate: moment(new Date()),
    trialDate: moment(new Date()),
    sourceChannel: "BNI",
    personalStylistId: !_.isEmpty(data.stylist)
      ? {
          name: data.stylist[0].name,
          value: data.stylist[0]._id,
        }
      : initialConfig.data.personalStylistId,
    orderItems: initialConfig.data.orderItems,
    customerPersonaIds: initialConfig.data.customerPersonaIds,
  };
  resetFormData.orderItems[0]["itemNumber"] = `${order.orderNo}F1`;
  resetFormData["userId"] = data._id;
  resetFormData["orderStatus"] = "RUNNING";
  resetFormData["orderId"] = order.orderId;

  addOrderDataIntoDraft(data.phone, resetFormData);
  return resetFormData;
};

export const UpdatedProductNumber = (localOrderItems, findIndex, orderNo) => {
  if (!_.isEmpty(localOrderItems[findIndex]["orderItems"])) {
    var result = _(localOrderItems[findIndex]["orderItems"])
      .groupBy("itemName")
      .map(function (items, category) {
        return {
          itemName: category,
          items: items,
        };
      })
      .value();

    if (!_.isEmpty(result)) {
      result.map((it) => {
        it.items.map(
          (itm, idx) =>
            (itm["itemNumber"] =
              getProductCode(itm.itemName, orderNo) + (idx + 1))
        );
      });
    }
  }
};

export const UpdateProductTrailDates = (mobileNumber, trailDate) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (findIndex !== -1) {
    let orderItems = localOrderItems[findIndex]["orderItems"];
    if (!_.isEmpty(orderItems)) {
      orderItems.map((item) => {
        item["trialDate"] = trailDate;
      });
    }
    localOrderItems[findIndex]["trialDate"] = trailDate;
    localOrderItems[findIndex]["orderItems"] = orderItems;
    setLocalDraftOrderData(localOrderItems);
    return localOrderItems[findIndex];
  } else {
    return null;
  }
};

export const handleChangeField = (fieldName, value, mobileNumber) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (!_.isEmpty(localOrderItems)) {
    if (findIndex !== -1) {
      localOrderItems[findIndex][fieldName] = value;
      setLocalDraftOrderData(localOrderItems);
    }
  }
};

export const updateProductNumber = (mobileNumber) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (findIndex !== -1) {
    const orderNo = localOrderItems[findIndex]["orderNo"];
    if (!_.isEmpty(localOrderItems[findIndex]["orderItems"])) {
      UpdatedProductNumber(localOrderItems, findIndex, orderNo);
    }
    setLocalDraftOrderData(localOrderItems);
    return localOrderItems[findIndex];
  }
};

export const handleChangeOrderItemField = (
  fieldName,
  value,
  index,
  mobileNumber
) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);

  if (findIndex !== -1) {
    localOrderItems[findIndex]["orderItems"][index][fieldName] = value;
    setLocalDraftOrderData(localOrderItems);
  }
};

export const handleAddOrderFormItem = (mobileNumber, appendValue) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (findIndex !== -1) {
    let items = [...localOrderItems[findIndex].orderItems, appendValue];
    localOrderItems[findIndex]["orderItems"] = items;
    setLocalDraftOrderData(localOrderItems);
  }
};

export const removeOrderItem = (index, mobileNumber) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (findIndex !== -1) {
    localOrderItems[findIndex]["orderItems"].splice(index, 1);
    setLocalDraftOrderData(localOrderItems);
  }
};

export const handleOrderCalculation = (mobileNumber) => {
  let orderTotal = 0;
  let grandTotal = 0;
  let netAmount = 0;
  let balanceAmount = 0;
  let advancePaid = 0;
  let otherCharges = 0;
  let deductions = 0;
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);

  if (findIndex !== -1) {
    orderTotal = localOrderItems[findIndex]["orderItems"].reduce(
      (sum, x) => (sum += parseFloat(x.itemPrice)),
      0
    );
    otherCharges = _.has(localOrderItems[findIndex], "otherCharges")
      ? parseFloat(localOrderItems[findIndex]["otherCharges"])
      : 0;
    deductions = _.has(localOrderItems[findIndex], "deductions")
      ? parseFloat(localOrderItems[findIndex]["deductions"])
      : 0;
    advancePaid = _.has(localOrderItems[findIndex], "paymentBreakdownTotal")
      ? parseFloat(localOrderItems[findIndex]["paymentBreakdownTotal"])
      : 0;

    grandTotal = orderTotal + otherCharges;
    netAmount = grandTotal - deductions;
    balanceAmount = netAmount - advancePaid;
    localOrderItems[findIndex]["orderTotal"] = orderTotal;
    localOrderItems[findIndex]["deductions"] = deductions;
    localOrderItems[findIndex]["otherCharges"] = otherCharges;
    localOrderItems[findIndex]["paymentBreakdownTotal"] = advancePaid;
    localOrderItems[findIndex]["afterChargesTotal"] = grandTotal;
    localOrderItems[findIndex]["afterDeductionsTotal"] = netAmount;
    localOrderItems[findIndex]["balanceAmount"] = balanceAmount;
    setLocalDraftOrderData(localOrderItems);
    return {
      orderTotal,
      grandTotal,
      netAmount,
      balanceAmount,
      advancePaid,
      otherCharges,
      deductions,
    };
  }
};

export const orderCalculation = (mobileNumber, setValue) => {
  const {
    orderTotal,
    grandTotal,
    netAmount,
    balanceAmount,
    advancePaid,
    otherCharges,
    deductions,
  } = handleOrderCalculation(mobileNumber);

  setValue("orderTotal", orderTotal);
  setValue("deductions", deductions);
  setValue("otherCharges", otherCharges);
  setValue("afterChargesTotal", grandTotal);
  setValue("paymentBreakdownTotal", advancePaid);
  setValue("afterDeductionsTotal", netAmount);
  setValue("balanceAmount", balanceAmount);
};

export const getSingleOrderByMobile = (mobileNumber) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (findIndex !== -1) {
    const item = localOrderItems[findIndex];
    return item;
  } else {
    return null;
  }
};

export const calculateAdvancePaymentModes = (getValues) => {
  let orderTotal = 0;
  const advanceForm = getValues();
  orderTotal = advanceForm.paymentBreakdown.reduce(
    (sum, x) => (sum += parseFloat(x.amount)),
    0
  );
  return orderTotal;
};

export const calculateOtherPaymentModes = (getValues, formFields) => {
  let orderTotal = 0;
  const otherCharges = getValues();
  orderTotal = otherCharges[formFields.field_1].reduce(
    (sum, x) => (sum += parseFloat(x.amount)),
    0
  );
  return orderTotal;
};

export const calculateAfterRemoveItems = (fields) => {
  let orderTotal = 0;
  orderTotal = fields.reduce((sum, x) => (sum += parseFloat(x.amount)), 0);
  return orderTotal;
};

export const calculatePaymentModes = (mobileNumber) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (findIndex !== -1) {
    const getTotal = localOrderItems[findIndex].paymentBreakdown.reduce(
      (sum, x) => (sum += Number(x.amount)),
      0
    );
    localOrderItems[findIndex]["paymentBreakdownTotal"] = getTotal;
    setLocalDraftOrderData(localOrderItems);
    handleOrderCalculation(mobileNumber);
  }
};

export const calculateOtherCharges = (mobileNumber, formFields) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (findIndex !== -1) {
    const getTotal = localOrderItems[findIndex][formFields.field_1].reduce(
      (sum, x) => (sum += parseFloat(x.amount)),
      0
    );
    localOrderItems[findIndex][formFields.field_2] = getTotal;
    setLocalDraftOrderData(localOrderItems);
    handleOrderCalculation(mobileNumber);
  }
};

export const getItemByIndex = (index, mobileNumber) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (findIndex !== -1) {
    const item = localOrderItems[findIndex]["orderItems"][index];
    if (!_.isEmpty(item)) {
      return item;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      400,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export const dataURIToBlob = (dataURI) => {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ia], { type: mimeString });
};

export const getFinalOrderPayload = (data) => {
  const { orderItems } = data;
  const _orderItems = [];
  const _paymentBreakdown = [];
  const _otherChargesBreakdown = [];
  const _deductionsBreakdown = [];
  orderItems.map((item) => {
    _orderItems.push({
      itemName: item.itemName,
      itemPrice: parseFloat(item.itemPrice),
      itemNumber: item.itemNumber,
      itemCatId: "NA",
      itemColor: _.has(item.itemColor, "colorname")
        ? item.itemColor.colorname
        : item.itemColor,
      fabricCode: item.fabricCode,
      trialDate: extractDateFormate(item.trialDate),
      fabricImage: _.has(item, "fabricImage") ? item.fabricImage : "",
      fabricImageNote: _.has(item, "fabricImageNote")
        ? item.fabricImageNote
        : "",
      styleDesignImage: _.has(item, "styleDesignImage")
        ? item.styleDesignImage
        : "",
      styleDesignImageNote: _.has(item, "styleDesignImageNote")
        ? item.styleDesignImageNote
        : "",
      referenceImage: _.has(item, "referenceImage") ? item.referenceImage : "",
      referenceImageNote: _.has(item, "referenceImageNote")
        ? item.referenceImageNote
        : "",
      outfitStatus: "",
    });
  });

  if (_.has(data, "paymentBreakdown")) {
    if (!_.isEmpty(data.paymentBreakdown)) {
      data.paymentBreakdown.map((item) => {
        _paymentBreakdown.push({
          date: extractDateFormate(item.date),
          amount: parseFloat(item.amount),
          modeOfPayment: item.modeOfPayment,
          note: item.note,
        });
      });
    }
  }

  if ((_.has(data), "otherChargesBreakdown")) {
    if (!_.isEmpty(data.otherChargesBreakdown)) {
      data.otherChargesBreakdown.map((item) => {
        _otherChargesBreakdown.push({
          name: item.name,
          amount: parseFloat(item.amount),
          note: item.note,
        });
      });
    }
  }
  if ((_.has(data), "deductionsBreakdown")) {
    if (!_.isEmpty(data.deductionsBreakdown)) {
      data.deductionsBreakdown.map((item) => {
        _deductionsBreakdown.push({
          name: item.name,
          amount: parseFloat(item.amount),
          note: item.note,
        });
      });
    }
  }

  const payload = {
    _id: data.orderId,
    userId: data.userId,
    customerId: data.customerId,
    customerPhone: data.customerPhone,
    customerEmail: data.customerEmail,
    customerFirstName: data.customerFirstName,
    customerLastName: data.customerLastName,
    customerHeight: parseFloat(data.customerHeight),
    customerCity: data.customerCity,
    customerWeight: parseFloat(data.customerWeight),
    // customerPersonaIds: _.has(data.customerPersonaIds, "name")
    //   ? data.customerPersonaIds.name
    //   : "-",
    customerPersonaIds: data.customerPersonaIds,
    personalStylistId: data.personalStylistId,
    orderNo: Number(data.orderNo),
    sourceChannel: data.sourceChannel,
    studioId: data.studioId,
    deliveryDate: !_.isEmpty(data.deliveryDate)
      ? extractDateFormate(data.deliveryDate)
      : null,
    orderDate: extractDateFormate(data.orderDate),
    eventDate: !_.isEmpty(data.eventDate)
      ? extractDateFormate(data.eventDate)
      : null,
    trialDate: !_.isEmpty(data.trialDate)
      ? extractDateFormate(data.trialDate)
      : null,
    readyDate: !_.isEmpty(data.readyDate)
      ? extractDateFormate(data.readyDate)
      : null,
    orderStatus: data.orderStatus,
    orderItems: _orderItems,
    orderTotal: parseFloat(data.orderTotal),
    otherCharges: parseFloat(data.otherCharges),
    otherChargesBreakdown: _otherChargesBreakdown,
    afterChargesTotal: parseFloat(data.afterChargesTotal),
    deductions: parseFloat(data.deductions),
    deductionsBreakdown: _deductionsBreakdown,
    afterDeductionsTotal: parseFloat(data.afterDeductionsTotal),
    payment: parseFloat(data.paymentBreakdownTotal),
    paymentBreakdown: _paymentBreakdown,
    balanceAmount: parseFloat(data.balanceAmount),
    note: "",
  };
  return payload;
};

export const handleDeleteDraft = (mobilenumber) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobilenumber);
  if (findIndex !== -1) {
    console.log(findIndex);
    localOrderItems.splice(findIndex, 1);
    setLocalDraftOrderData(localOrderItems);
  }
};

export const formRest = (setValue) => {
  setValue("customerPhone", null);
  setValue("customerFirstName", null);
  setValue("customerLastName", null);
  setValue("customerEmail", null);
  setValue("customerHeight", null);
  setValue("customerWeight", null);
  setValue("customerId", null);
  setValue("personalStylistId", initialConfig.data.personalStylistId);
  setValue("orderItems", initialConfig.data.orderItems);
  setValue("customerPersonaIds", initialConfig.data.customerPersonaIds);
  setValue("orderNo", null);
  setValue("studioId", null);
  setValue("sourceChannel", "BNI");
  setValue("customerCity", null);
  setValue("trialDate", moment(new Date()));
  setValue("orderDate", moment(new Date()));
  setValue("orderTotal", 0);
  setValue("orderStatus", "RUNNING");
  setValue("deliveryDate", null);
  setValue("eventDate", null);
  setValue("readyDate", null);
  setValue("deductions", 0);
  setValue("paymentBreakdownTotal", 0);
  setValue("afterChargesTotal", 0);
  setValue("afterDeductionsTotal", 0);
  setValue("balanceAmount", 0);
};
export const setStoreOrder = (data) => {
  let _orderItems = [];
  let _deductionsBreakdown = [];
  let _paymentBreakdown = [];
  let _otherChargesBreakdown = [];
  if (!_.isEmpty(data.orderItems)) {
    data.orderItems.map((item) => {
      const payload = {
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemColor: item.itemColor,
        itemNumber: item.itemNumber,
        trialDate: item.trialDate.timestamp,
        fabricCode: item.fabricCode,
        fabricImage: item.fabricImage,
        fabricImageNote: item.fabricImageNote,
        styleDesignImage: item.styleDesignImage,
        styleDesignImageNote: item.styleDesignImageNote,
        referenceImage: item.referenceImage,
        referenceImageNote: item.referenceImageNote,
      };
      _orderItems.push(payload);
    });
  }

  if (!_.isEmpty(data.deductionsBreakdown)) {
    data.deductionsBreakdown.map((item) => {
      const payload = {
        amount: item.amount,
        name: item.name,
        note: item.note,
      };
      _deductionsBreakdown.push(payload);
    });
  }

  if (!_.isEmpty(data.paymentBreakdown)) {
    data.paymentBreakdown.map((item) => {
      const payload = {
        amount: item.amount,
        note: item.note,
        date: item.date.timestamp,
        isAdvance: item.isAdvance ? true : false,
        modeOfPayment: item.modeOfPayment,
      };
      _paymentBreakdown.push(payload);
    });
  }

  if (!_.isEmpty(data.otherChargesBreakdown)) {
    data.otherChargesBreakdown.map((item) => {
      const payload = {
        amount: item.amount,
        name: item.name,
        note: item.note,
      };
      _otherChargesBreakdown.push(payload);
    });
  }

  const payload = {
    orderId: data._id,
    userId: data.userId,
    studioId: !_.isEmpty(data.studioId) ? data.studioId : "HYSDO1",
    customerId: data.customerId,
    customerPhone: data.customerPhone,
    customerLastName: data.customerLastName,
    customerFirstName: data.customerFirstName,
    orderStatus: data.orderStatus,
    customerCity: data.customerCity,
    customerEmail: data.customerEmail,
    customerHeight: data.customerHeight,
    customerWeight: data.customerWeight,
    orderItems: !_.isEmpty(_orderItems)
      ? _orderItems
      : initialConfig.data.orderItems,
    customerPersonaIds: !_.isEmpty(data.persona)
      ? {
          name: data.persona[0].name,
          value: data.persona[0]._id,
        }
      : initialConfig.data.customerPersonaIds,
    personalStylistId: !_.isEmpty(data.stylist)
      ? {
          name: data.stylist[0].name,
          value: data.stylist[0]._id,
        }
      : initialConfig.data.personalStylistId,
    sourceChannel: !_.isEmpty(data.sourceChannel) ? data.sourceChannel : "BNI",
    orderTotal: data.orderTotal ? data.orderTotal : 0,
    afterChargesTotal: data.afterChargesTotal ? data.orderTotal : 0,
    afterDeductionsTotal: data.afterDeductionsTotal
      ? data.afterDeductionsTotal
      : 0,
    deductions: data.deductions ? data.deductions : 0,
    deductionsBreakdown: !_.isEmpty(_deductionsBreakdown)
      ? _deductionsBreakdown
      : initialConfig.data.deductionsBreakdown,
    orderNo: data.orderNo,
    payment: data.payment ? data.payment : 0,
    paymentBreakdown: !_.isEmpty(_paymentBreakdown)
      ? _paymentBreakdown
      : initialConfig.data.paymentBreakdown,
    otherCharges: data.otherCharges ? data.otherCharges : 0,
    paymentBreakdownTotal: data.payment ? data.payment : 0,
    balanceAmount: data.balanceAmount ? data.balanceAmount : 0,
    otherChargesBreakdown: !_.isEmpty(_otherChargesBreakdown)
      ? _otherChargesBreakdown
      : initialConfig.data.otherChargesBreakdown,
    orderDate: !_.isEmpty(data.orderDate)
      ? data.orderDate.timestamp
      : moment(new Date()),
    readyDate: !_.isEmpty(data.readyDate) ? data.readyDate.timestamp : null,
    eventDate: !_.isEmpty(data.eventDate) ? data.eventDate.timestamp : null,
    deliveryDate: !_.isEmpty(data.deliveryDate)
      ? data.deliveryDate.timestamp
      : null,
    trialDate: !_.isEmpty(data.trialDate)
      ? data.trialDate.timestamp
      : moment(new Date()),
    note: data.note,
  };

  addOrderDataIntoDraft(data.customerPhone, payload);
  return payload;
};

export const getUserRegisterPayload = (data, countryCode) => {
  let payload = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    countryCode: countryCode,
    height: 0,
    weight: 0,
    phone: data.phone,
    password: data.password,
    customerPersonaIds: ["60546796e0646e2994cfb7b0"],
    stylistId: "5de75fa5a72f8129f42bba2a",
  };
  return payload;
};

export const getOrderId = (mobileNumber) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);
  if (findIndex !== -1) {
    const orderId = localOrderItems[findIndex]["orderId"];
    return orderId;
  }
};

export const updateImageStatus = (action, orderIndex, imgUrl, mobileNumber) => {
  const { findIndex, localOrderItems } = getDraftIndex(mobileNumber);

  if (findIndex !== -1) {
    localOrderItems[findIndex]["orderItems"][orderIndex][
      "isImageUpladed"
    ] = true;
    localOrderItems[findIndex]["orderItems"][orderIndex][action] = imgUrl;
    setLocalDraftOrderData(localOrderItems);
  }
};
