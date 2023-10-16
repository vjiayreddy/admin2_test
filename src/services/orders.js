import Resizer from "react-image-file-resizer";
import _ from "lodash";
import moment from "moment";

const LOCAL_ORDER_KEY = "draftOrders";

export const studioCodes = [
  {
    name: "HYSDO1",
    value: "HYSDO1",
  },
  {
    name: "HYONO1",
    value: "HYONO1",
  },
];

export const categoried = [
  {
    name: "Full Shirt",
    value: "full_shirt",
  },
  {
    name: "Half Shirt",
    value: "half_shirt",
  },
  {
    name: "Blazer",
    value: "blazer",
  },
  {
    name: "Chinos",
    value: "chinos",
  },
  {
    name: "Trouser",
    value: "trouser ",
  },
  {
    name: "Suit",
    value: "suit",
  },
  {
    name: "Waist Coat",
    value: "waistCoat",
  },
  {
    name: "Sherwani",
    value: "sherwani",
  },
  {
    name: "Kurta",
    value: "kurta",
  },
  {
    name: "Jodhpuri Top",
    value: "jodhpuri_top",
  },
  {
    name: "Indowestern Top",
    value: "indowestern_top",
  },
  {
    name: "Ethnic Botton",
    value: "ethnic_botton",
  },
  {
    name: "Sadari",
    value: "sadari",
  },
  {
    name: "Puna Pant",
    value: "puna_pant",
  },
  {
    name: "Dhoti",
    value: "dhoti",
  },
  {
    name: "Patiyala",
    value: "patiyala",
  },
  {
    name: "Shacket",
    value: "shacket",
  },
  {
    name: "Shoes",
    value: "shoes",
  },
  {
    name: "Belts",
    value: "belts",
  },
  {
    name: "Tie/Bows",
    value: "tie_bows",
  },
  {
    name: "Others",
    value: "others",
  },
];
1;
export const source = [
  "Reference",
  "BNI",
  "Cold Calling",
  "Walk-in",
  "Google Search",
  "Quora",
  "News Article",
  "Radio",
  "Visiting Card",
];

export const tableRows = [
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
];

export const orderStatus = [
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
];
var catMap = [
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
    name: "waistcoat",
    code: "W",
  },
  {
    name: "kurta",
    code: "K",
  },
  {
    name: "sadri",
    code: "S",
  },
  {
    name: "jodhpur",
    code: "J",
  },
  {
    name: "suit",
    code: "SU",
  },
];

export const extractDateFormate = (date) => {
  var extractDate = moment(date, "YYYY/MM/DD");
  var month = extractDate.format("M");
  var day = extractDate.format("D");
  var year = extractDate.format("YYYY");
  var hour = Number(moment(date).format("h"));
  var minitues = Number(moment(date).format("m"));

  return {
    day: Number(day),
    month: Number(month),
    year: Number(year),
    hour: Number(hour),
    minute: Number(minitues),
    timestamp: date,
    datestamp:
      year -
      2000 +
      "" +
      ((month < 10 ? "0" : "") + month) +
      "" +
      ((day < 10 ? "0" : "") + day) +
      "" +
      ((hour < 10 ? "0" : "") + hour) +
      "" +
      ((minitues < 10 ? "0" : "") + minitues),
  };
};

export const setFromWithUserBasicDetails = (getSingleUserBasicData) => {
  const resetFormData = {
    customerPhone: getSingleUserBasicData.phone,
    customerFirstName: getSingleUserBasicData.firstName,
    customerLastName: getSingleUserBasicData.lastName,
    customerEmail: getSingleUserBasicData.email,
    customerHeight: getSingleUserBasicData.height,
    customerWeight: getSingleUserBasicData.weight,
    customerId: getSingleUserBasicData.customerId,
    personalStylistId: !_.isEmpty(getSingleUserBasicData.stylist)
      ? {
          name: getSingleUserBasicData.stylist[0].name,
          value: getSingleUserBasicData.stylist[0]._id,
        }
      : {
          name: "Sushil Kumar",
          value: "5de75fa5a72f8129f42bba2a",
        },
    orderItems: [
      {
        itemName: "full_shirt",
        //trialDate: moment(new Date()),
        itemPrice: 0,
        fabricCode: "",
      },
    ],
    customerPersonaId: {
      name: "a Groom",
      value: "60546796e0646e2994cfb7b0",
    },
  };
  return resetFormData;
};

export const orderCalculation = (mobileNumber) => {
  let orderTotal = 0;
  let grandTotal = 0;
  let netAmount = 0;
  let balanceAmount = 0;
  let advancePaid = 0;
  let otherCharges = 0;
  let deductions = 0;
  let getLocalDraftOrders = getLocalDraftItems();
  if (!_.isEmpty(getLocalDraftOrders)) {
    const findIndex = _.findIndex(
      getLocalDraftOrders,
      (item) => item.customerPhone === mobileNumber
    );
    if (findIndex !== -1) {
      orderTotal = getLocalDraftOrders[findIndex]["orderItems"].reduce(
        (sum, x) => (sum += parseFloat(x.itemPrice)),
        0
      );
      otherCharges = _.has(getLocalDraftOrders[findIndex], "otherCharges")
        ? parseFloat(getLocalDraftOrders[findIndex]["otherCharges"])
        : 0;
      deductions = _.has(getLocalDraftOrders[findIndex], "deductions")
        ? parseFloat(getLocalDraftOrders[findIndex]["deductions"])
        : 0;
      advancePaid = _.has(
        getLocalDraftOrders[findIndex],
        "paymentBreakdownTotal"
      )
        ? parseFloat(getLocalDraftOrders[findIndex]["paymentBreakdownTotal"])
        : 0;

      grandTotal = orderTotal + otherCharges;
      netAmount = grandTotal - deductions;
      balanceAmount = netAmount - advancePaid;
      getLocalDraftOrders[findIndex]["orderTotal"] = orderTotal;
      getLocalDraftOrders[findIndex]["deductions"] = deductions;
      getLocalDraftOrders[findIndex]["otherCharges"] = otherCharges;
      getLocalDraftOrders[findIndex]["paymentBreakdownTotal"] = advancePaid;
      getLocalDraftOrders[findIndex]["afterChargesTotal"] = grandTotal;
      getLocalDraftOrders[findIndex]["afterDeductionsTotal"] = netAmount;
      getLocalDraftOrders[findIndex]["balanceAmount"] = balanceAmount;
      setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
    }
  }
  return {
    orderTotal,
    grandTotal,
    netAmount,
    balanceAmount,
    advancePaid,
    otherCharges,
    deductions,
  };
};

export const getProductCode = (_category, orderNo) => {
  var proCat = _category;
  var proCode = catMap.find((cat) => cat.name === proCat);
  if (proCode) {
    return orderNo + proCode.code;
  }
};

export const checkDraftItemViaMobile = (getValues) => {
  const formValues = getValues();
  const getLocalDraftOrders = getLocalDraftItems();
  if (!_.isEmpty(getLocalDraftOrders)) {
    const findIndex = _.findIndex(
      getLocalDraftOrders,
      (item) => item.customerPhone === formValues.customerPhone
    );
    return {
      findIndex,
      getLocalDraftOrders,
    };
  } else {
    return {
      findIndex: -1,
      getLocalDraftOrders,
    };
  }
};

export const getLocalStoredOrders = () => {
  if (typeof window !== "undefined") {
    let draftOrders = JSON.parse(localStorage.getItem("draftOrders"));
    return draftOrders;
  }
};

export const setOrderIntoLocalStorage = (fieldName, data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(fieldName, JSON.stringify(data));
  }
};

export const isLocalDraftOrders = () => {
  if (typeof window !== "undefined") {
    const draftOrders = JSON.parse(localStorage.getItem("draftOrders"));
    if (!_.isEmpty(draftOrders)) {
      return true;
    } else {
      return false;
    }
  }
};

export const getLocalDraftItems = () => {
  if (typeof window !== "undefined") {
    const draftOrders = JSON.parse(localStorage.getItem("draftOrders"));
    if (!_.isEmpty(draftOrders)) {
      return draftOrders;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const handleDeleteDraft = (mobilenumber) => {
  const draftOrders = JSON.parse(localStorage.getItem("draftOrders"));
  const index = _.findIndex(
    draftOrders,
    (item) => item.customerPhone === mobilenumber
  );
  if (index !== -1) {
    draftOrders.splice(index, 1);
    localStorage.setItem("draftOrders", JSON.stringify(draftOrders));
  }
};

export const localStoreInitialOrderData = (getValues) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  const getAllFormValues = getValues();
  if (!_.isEmpty(getAllFormValues.customerPhone)) {
    if (!_.isEmpty(getLocalDraftOrders)) {
      if (findIndex !== -1) {
        getLocalDraftOrders[findIndex] = getAllFormValues;
        setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
      } else {
        const data = [...getLocalDraftOrders, { ...getAllFormValues }];
        setOrderIntoLocalStorage(LOCAL_ORDER_KEY, data);
      }
    } else {
      const data = [{ ...getAllFormValues }];
      setOrderIntoLocalStorage(LOCAL_ORDER_KEY, data);
    }
  }
};

export const handleAddOrderFormItem = (getValues, appendValue) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (!_.isEmpty(getLocalDraftOrders)) {
    if (findIndex !== -1) {
      let items = [...getLocalDraftOrders[findIndex].orderItems, appendValue];
      getLocalDraftOrders[findIndex]["orderItems"] = items;
      setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
    }
  }
};

export const handleChangeField = (fieldName, value, getValues) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (!_.isEmpty(getLocalDraftOrders)) {
    if (findIndex !== -1) {
      getLocalDraftOrders[findIndex][fieldName] = value;
      setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
    }
  }
};

export const handleChangeOrderItemField = (
  fieldName,
  value,
  index,
  getValues
) => {
  console.log(value);
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (!_.isEmpty(getLocalDraftOrders)) {
    if (findIndex !== -1) {
      getLocalDraftOrders[findIndex]["orderItems"][index][fieldName] = value;
      setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
    }
  }
};

export const updateImageStatus = (action, orderIndex, imgUrl, getValues) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (!_.isEmpty(getLocalDraftOrders)) {
    if (findIndex !== -1) {
      getLocalDraftOrders[findIndex]["orderItems"][orderIndex][
        "isImageUpladed"
      ] = true;
      getLocalDraftOrders[findIndex]["orderItems"][orderIndex][action] = imgUrl;
      setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
    }
  }
};

export const calculateOrder = (getValues) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  let orderTotal = 0;
  if (!_.isEmpty(getLocalDraftOrders)) {
    if (findIndex !== -1) {
      orderTotal = getLocalDraftOrders[findIndex]["orderItems"].reduce(
        (sum, x) => (sum += Number(x.itemPrice)),
        0
      );
    }

    const otherCharges = getLocalDraftOrders[findIndex]["otherCharges"];
    const deductions = getLocalDraftOrders[findIndex]["deductions"];
    let paymentBreakdownTotal = 0;
    if (_.has(getLocalDraftOrders[findIndex], "paymentBreakdownTotal")) {
      paymentBreakdownTotal =
        getLocalDraftOrders[findIndex]["paymentBreakdownTotal"];
    }
    getLocalDraftOrders[findIndex]["orderTotal"] = orderTotal;
    getLocalDraftOrders[findIndex]["afterChargesTotal"] =
      Number(orderTotal) + Number(otherCharges);
    getLocalDraftOrders[findIndex]["afterDeductionsTotal"] =
      Number(orderTotal) + Number(otherCharges) - Number(deductions);
    getLocalDraftOrders[findIndex]["afterDeductionsTotal"] =
      Number(orderTotal) + Number(otherCharges) - Number(deductions);
    getLocalDraftOrders[findIndex]["balanceAmount"] =
      Number(orderTotal) +
      Number(otherCharges) -
      Number(deductions) -
      Number(paymentBreakdownTotal);

    setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
  }

  return orderTotal;
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

export const getItemByIndex = (index, getValues) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (!_.isEmpty(getLocalDraftOrders)) {
    if (findIndex !== -1) {
      const item = getLocalDraftOrders[findIndex]["orderItems"][index];
      if (!_.isEmpty(item)) {
        return item;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};

export const removeOrderItem = (index, getValues) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (!_.isEmpty(getLocalDraftOrders)) {
    if (findIndex !== -1) {
      getLocalDraftOrders[findIndex]["orderItems"].splice(index, 1);
      setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
    }
  }
};

export const uploadProductNumbers = (getValues) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (findIndex !== -1) {
    const orderNumber = getLocalDraftOrders[findIndex]["orderNo"];
    if (!_.isEmpty(getLocalDraftOrders[findIndex]["orderItems"])) {
      var productNumbers = _(getLocalDraftOrders[findIndex]["orderItems"])
        .groupBy("itemName")
        .map(function (items, category) {
          return {
            itemName: category,
            items: items,
          };
        })
        .value();
    }
    if (!_.isEmpty(productNumbers)) {
      productNumbers.map((order) => {
        order.items.map(
          (item, index) =>
            (item["itemNumber"] =
              getProductCode(item.itemName, orderNumber) + (index + 1))
        );
      });
    }
  }
  setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
};


export const UpdateLocalOrderInfo = (getValues, orderInfo) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (findIndex !== -1) {
    getLocalDraftOrders[findIndex]["orderNo"] = orderInfo.orderNo;
    getLocalDraftOrders[findIndex]["orderId"] = orderInfo.orderId;
    if (!_.isEmpty(getLocalDraftOrders[findIndex]["orderItems"])) {
      var result = _(getLocalDraftOrders[findIndex]["orderItems"])
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
                getProductCode(itm.itemName, orderInfo.orderNo) + (idx + 1))
          );
        });
      }
    }
    setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
    return getLocalDraftOrders[findIndex];
  }
};

export const updateProductNumber = (getValues) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (findIndex !== -1) {
    const orderNo = getLocalDraftOrders[findIndex]["orderNo"];
    if (!_.isEmpty(getLocalDraftOrders[findIndex]["orderItems"])) {
      var result = _(getLocalDraftOrders[findIndex]["orderItems"])
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
    setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
    return getLocalDraftOrders[findIndex];
  }
};

export const getOrderId = (getValues) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (findIndex !== -1) {
    const orderId = getLocalDraftOrders[findIndex]["orderId"];
    return orderId;
  }
};

export const getStoreOrderPayload = (getValues) => {
  // const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  // if (findIndex !== -1) {
  //   const _item = getLocalDraftOrders[findIndex];
  //   if (!_.isEmpty(_item)) {
  //     const { orderItems } = _item;
  //     const orderItems = [];
  //     orderItems.map((item) => {
  //       orderItems.push({
  //         itemName: item.category,
  //         itemPrice: Number(item.price),
  //         itemNumber: item.productNo,
  //         itemColor: item.color.colorname,
  //         fabricCode: item.fabricCode,
  //         trialDate: extractDateFormate(item.trailDate),
  //         fabricImage: "",
  //         styleDesignImage: "",
  //         referenceImage: "",
  //         outfitStatus: "",
  //       });
  //     });
  //     const payload = {
  //       ..._item,
  //       _id: _item.orderId,
  //       userId: "",
  //       customerPhone: _item.phone,
  //       customerEmail: _item.email,
  //       customerFirstName: _item.firstName,
  //       customerLastName: _item.lastName,
  //       customerHeight: _item.height,
  //       customerWeight: parseFloat(_item.weight),
  //       customerPersonaId: _item.persona.value,
  //       personalStylistId: _item.personalStylist.value,
  //       orderNo: _item.orderNo,
  //       sourceChannel: _item.source,
  //       studioId: _item.studioId,
  //       deliveryDate: extractDateFormate(_item.deliveryDate),
  //       orderDate: extractDateFormate(_item.orderDate),
  //       eventDate: extractDateFormate(_item.eventDate),
  //       trialDate: extractDateFormate(_item.trialDate),
  //       readyDate: extractDateFormate(_item.readyDate),
  //       orderStatus: "Ready",
  //       orderItems: orderItems,
  //       orderTotal: 0,
  //       otherCharges: 0,
  //       otherChargesBreakdown: [],
  //       afterChargesTotal: 0,
  //       deductions: 0,
  //       deductionsBreakdown: [],
  //       afterDeductionsTotal: 0,
  //       payment: 0,
  //       paymentBreakdown: [],
  //       balanceAmount: 0,
  //       note: "",
  //     };
  //     return payload;
  //   }
  // }
};

export const getSingleOrder = (getValues) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (findIndex !== -1) {
    const item = getLocalDraftOrders[findIndex];
    return item;
  } else {
    return null;
  }
};

export const checkFieldEmpty = (getValues, field) => {
  const { findIndex, getLocalDraftOrders } = checkDraftItemViaMobile(getValues);
  if (findIndex !== -1) {
    const item = getLocalDraftOrders[findIndex];
    if (_.has(item, field) && !_.isEmpty(item[field])) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const getOrderByMobileNumber = (mobileNumber) => {
  const getLocalDraftOrders = getLocalDraftItems();
  if (!_.isEmpty(getLocalDraftOrders)) {
    const findIndex = _.findIndex(
      getLocalDraftOrders,
      (item) => item.customerPhone === mobileNumber
    );
    if (findIndex !== -1) {
      return getLocalDraftOrders[findIndex];
    } else {
      return null;
    }
  } else {
    return null;
  }
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
      itemColor: item.itemColor.colorname,
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

  if ((_.has(data), "paymentBreakdown")) {
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
    customerWeight: parseFloat(data.customerWeight),
    // customerAddress: {
    //   _id: data.userId,
    //   city: data.customerCity,
    //   email: data.customerEmail,
    //   firstName: data.customerFirstName,
    //   lastName: data.customerLastName,
    //   phone: data.customerPhone,
    //   postalCode: "NA",
    //   countryCode: "NA",
    //   address1: "NA",
    //   address2: "NA",
    //   landmark: "NA",
    //   country: "NA",
    //   state: "NA",
    // },
    customerPersonaIds: [data.customerPersonaId.value],
    personalStylistId: data.personalStylistId.value,
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
    afterChargesTotal: parseFloat(data.otherCharges),
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

export const getIndexByMobileNumber = (mobileNumber) => {
  const getLocalDraftOrders = getLocalDraftItems();
  if (!_.isEmpty(getLocalDraftOrders)) {
    const findIndex = _.findIndex(
      getLocalDraftOrders,
      (item) => item.customerPhone === mobileNumber
    );
    return {
      findIndex,
      getLocalDraftOrders,
    };
  } else {
    return {
      findIndex: -1,
      getLocalDraftOrders,
    };
  }
};

export const calculatePaymentModes = (mobileNumber) => {
  const localOrder = getOrderByMobileNumber(mobileNumber);
  const { findIndex, getLocalDraftOrders } =
    getIndexByMobileNumber(mobileNumber);
  if (localOrder) {
    const getTotal = localOrder.paymentBreakdown.reduce(
      (sum, x) => (sum += Number(x.amount)),
      0
    );
    if (findIndex !== -1) {
      getLocalDraftOrders[findIndex]["paymentBreakdownTotal"] = getTotal;
    }
    setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
  }
};
export const calculateCharges = (mobileNumber, formFields) => {
  const localOrder = getOrderByMobileNumber(mobileNumber);
  const { findIndex, getLocalDraftOrders } =
    getIndexByMobileNumber(mobileNumber);
  if (localOrder) {
    const getTotal = localOrder[formFields.field_1].reduce(
      (sum, x) => (sum += parseFloat(x.amount)),
      0
    );
    getLocalDraftOrders[findIndex][formFields.field_2] = getTotal;
    setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
  }
};

export const getTotalPaymentBreakdownTotal = (getValues) => {
  const formValues = getValues();
  let getTotal = 0;
  if (!_.isEmpty(formValues)) {
    if (_.has(formValues, "paymentBreakdown")) {
      if (!_.isEmpty(formValues.paymentBreakdown)) {
        getTotal = formValues.paymentBreakdown.reduce(
          (sum, x) => (sum += parseFloat(x.amount)),
          0
        );
      }
    }
  }
  return getTotal;
};

export const getTotalOtherChargesBreakdown = (getValues, formFields) => {
  const formValues = getValues();
  let getTotal = 0;
  if (!_.isEmpty(formValues)) {
    getTotal = formValues[formFields.field_1].reduce(
      (sum, x) => (sum += parseFloat(x.amount)),
      0
    );
  }
  return getTotal;
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

export const updateTrailDate = (mobileNumber, date) => {
  const getLocalDraftOrders = getLocalDraftItems();
  if (!_.isEmpty(getLocalDraftOrders)) {
    const findIndex = _.findIndex(
      getLocalDraftOrders,
      (item) => item.customerPhone === mobileNumber
    );
    if (findIndex !== -1) {
      if (!_.isEmpty(getLocalDraftOrders[findIndex]["orderItems"])) {
        getLocalDraftOrders[findIndex]["orderItems"].map((item) => {
          console.log(item, date);
          item.trialDate = date;
        });
      }
      setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
    }
  }
};

export const setLocalOrder = (data) => {
  const payload = {
    customerPhone: data.customerPhone,
    customerFirstName: data.customerFirstName,
    customerLastName: data.customerLastName,
    customerEmail: data.customerEmail,
    customerId: data.customerId,
    orderNo: data.orderNo,
    customerHeight: data.customerHeight,
    customerWeight: data.customerWeight,
    customerCity: null,
    orderItems: data._orderItems,
    orderTotal: data._orderTotal,
    otherCharges: data.otherCharges,
    afterChargesTotal: data.afterChargesTotal,
    deductions: data.deductions,
    afterDeductionsTotal: data.afterDeductionsTotal,
    paymentBreakdownTotal: data.payment,
    balanceAmount: data._balanceAmount,
    studioId: data.studioId,
    orderDate: data._orderDate,
    eventDate: data._eventDate,
    sourceChannel: data.sourceChannel,
    readyDate: data._readyDate,
    personalStylistId: {
      name: data.stylist,
      value: data.personalStylistId,
    },
    customerPersonaId: { name: null },
    trialDate: data._trialDate,
    deliveryDate: data._deliveryDate,
    orderStatus: data.orderStatus,
    userId: data.userId,
    orderId: data.orderId,
    paymentBreakdown: data.paymentBreakdown,
    deductionsBreakdown: data.deductionsBreakdown,
    otherChargesBreakdown: data.otherChargesBreakdown,
  };
  const getLocalDraftOrders = getLocalDraftItems();
  if (!_.isEmpty(getLocalDraftOrders)) {
    const findIndex = _.findIndex(
      getLocalDraftOrders,
      (item) => item.customerPhone === data.customerPhone
    );
    if (findIndex !== -1) {
      (getLocalDraftOrders[findIndex] = payload),
        setOrderIntoLocalStorage(LOCAL_ORDER_KEY, getLocalDraftOrders);
    } else {
      const draftData = [...getLocalDraftOrders, payload];
      setOrderIntoLocalStorage(LOCAL_ORDER_KEY, draftData);
    }
  } else {
    const draftData = [payload];
    setOrderIntoLocalStorage(LOCAL_ORDER_KEY, draftData);
  }
  return payload;
};
