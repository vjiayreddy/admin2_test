import { extractDateFormate } from "../../src/utils/validations";
import { initialConfig } from "../../src/services/_orders";
import moment from "moment";

export const getProductCode = (_category, orderNo) => {
  var proCat = _category;
  var proCode = initialConfig.data.catMap.find((cat) => cat.name === proCat);
  if (proCode) {
    return orderNo + proCode.code;
  }
};

export const _getFinalOrderPayload = (data) => {
  const _orderItems = [];
  const _paymentBreakdown = [];
  const _otherChargesBreakdown = [];
  const _deductionsBreakdown = [];
  const _secondaryStylistIds = [];

  if (_.has(data, "orderItems")) {
    if (!_.isEmpty(data.orderItems)) {
      data.orderItems.map((item) => {
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
          referenceImage: _.has(item, "referenceImage")
            ? item.referenceImage
            : "",
          referenceImageNote: _.has(item, "referenceImageNote")
            ? item.referenceImageNote
            : "",
          outfitStatus: "",
          styleDesign: !_.isEmpty(item.styleDesign)
            ? JSON.parse(item.styleDesign)
            : null,
        });
      });
    }
  }

  if (data?.secondaryStylistIds?.length > 0) {
    data?.secondaryStylistIds.map((item) => {
      _secondaryStylistIds.push(item.value);
    });
  }

  if (_.has(data, "paymentBreakdown")) {
    if (!_.isEmpty(data.paymentBreakdown)) {
      data.paymentBreakdown.map((item) => {
        _paymentBreakdown.push({
          date: extractDateFormate(item.date),
          amount: parseFloat(item.amount),
          modeOfPayment: item.modeOfPayment,
          note: item.note,
          isAdvance: item.isAdvance,
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
    _id: data._id,
    userId: data.userId,
    customerId: data.customerId,
    customerPhone: data.customerPhone,
    customerEmail: data.customerEmail,
    customerFirstName: data.customerFirstName,
    customerLastName: data.customerLastName,
    customerDateOfBirth: extractDateFormate(data.customerDateOfBirth),
    customerIsStyleClubMember: data.customerIsStyleClubMember,
    customerHeight: !_.isEmpty(data.customerHeight)
      ? parseFloat(data.customerHeight)
      : 0,
    customerCity: data.customerCity,
    customerWeight: !_.isEmpty(data.customerWeight)
      ? parseFloat(data.customerWeight)
      : 0,
    customerDateOfBirth: !_.isEmpty(data.customerDateOfBirth)
      ? extractDateFormate(data.customerDateOfBirth)
      : null,
    customerIsStyleClubMember: data?.customerIsStyleClubMember,
    customerPersonaIds: !_.isEmpty(data.customerPersonaIds)
      ? [data.customerPersonaIds.value]
      : null,
    personalStylistId: !_.isEmpty(data.personalStylistId)
      ? data.personalStylistId.value
      : null,
    secondaryStylistIds: _secondaryStylistIds,
    orderNo: Number(data.orderNo),
    sourceChannel: data.sourceChannel,
    sourceSubChannel: data.sourceSubChannel,
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
    afterDeductionsTotal: parseInt(data.afterDeductionsTotal),
    payment: parseFloat(data.paymentBreakdownTotal),
    paymentBreakdown: _paymentBreakdown,
    balanceAmount: parseFloat(data.balanceAmount),
    note: "",
  };
  return payload;
};

export const _handleOtherChargesTotal = (items) => {
  let total = 0;
  total = items.reduce((sum, x) => (sum += parseFloat(x.amount)), 0);
  return total;
};

export const _handleOrderCalculation = (
  items,
  otherChargesBreakdown,
  deductionsBreakdown,
  paymentBreakdown,
  setValue
) => {
  let otherCharges = 0;
  let deductions = 0;
  let orderTotal = 0;
  let grandTotal = 0;
  let netAmount = 0;
  let advancePayment = 0;
  let balanceAmount = 0;
  const { orderItems } = items;

  if (!_.isEmpty(orderItems)) {
    orderTotal = orderItems.reduce(
      (sum, x) => (sum += parseFloat(x.itemPrice)),
      0
    );
  }
  if (!_.isEmpty(otherChargesBreakdown)) {
    otherCharges = otherChargesBreakdown.reduce(
      (sum, x) => (sum += parseFloat(x.amount)),
      0
    );
  }
  if (!_.isEmpty(deductionsBreakdown)) {
    deductions = deductionsBreakdown.reduce(
      (sum, x) => (sum += parseFloat(x.amount)),
      0
    );
  }
  if (!_.isEmpty(paymentBreakdown)) {
    advancePayment = paymentBreakdown.reduce(
      (sum, x) => (sum += parseFloat(x.amount)),
      0
    );
  }

  grandTotal = parseFloat(orderTotal) + parseFloat(otherCharges);
  netAmount = parseFloat(grandTotal) - parseFloat(deductions);
  balanceAmount = parseFloat(netAmount) - parseFloat(advancePayment);

  // setValue("orderItems", productNumbers);
  setValue("orderTotal", orderTotal);
  setValue("afterChargesTotal", grandTotal);
  setValue("afterDeductionsTotal", netAmount);
  setValue("balanceAmount", balanceAmount);
  setValue("otherCharges", otherCharges);
  setValue("deductions", deductions);
  setValue("paymentBreakdownTotal", advancePayment);
  setValue("balanceAmount", balanceAmount);
};

export const getProductNumbers = (orderItems, orderNo) => {
  let orderItemWithNumber = [];
  if (!_.isEmpty(orderItems)) {
    var productNumbers = _(orderItems)
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
      order.items.map((item, index) => {
        item["itemNumber"] =
          getProductCode(item.itemName, orderNo) + (index + 1);
      });
    });
    productNumbers.map((order) => {
      orderItemWithNumber.push(...order.items);
    });
  }

  return orderItems;
  // return orderItemWithNumber
};

export const _resetBasicUserData = (data, order, orderItems, reset) => {
  const payload = {
    _id: order.orderId,
    userId: data._id,
    countryCode: data.countryCode,
    customerPhone: data.phone,
    customerFirstName: data.firstName,
    customerLastName: data.lastName,
    customerHeight: data.height,
    customerWeight: data.weight,
    customerEmail: data.email,
    customerId: data.customerId,
    customerDateOfBirth: data?.dateOfBirth?.timestamp,
    customerIsStyleClubMember: data?.isStyleClubMember,
    orderNo: order.orderNo,
    orderDate: moment(new Date()),
    orderItems: getProductNumbers(orderItems, order.orderNo),
  };
  reset(payload);
  return payload;
};

export const _resetOrderPayload = (data) => {
  let _orderItems = [];
  let _paymentBrakeDown = [];
  let secondaryStylistIds = [];

  if (!_.isEmpty(data.orderItems)) {
    data.orderItems.map((item) => {
      _orderItems.push({
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemNumber: item.itemNumber,
        itemCatId: "NA",
        itemColor: _.has(item.itemColor, "colorname")
          ? item.itemColor.colorname
          : item.itemColor,
        fabricCode: item.fabricCode,
        trialDate: !_.isEmpty(item.trialDate)
          ? item.trialDate.timestamp
          : moment(new Date()),
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
        referenceImage: _.has(item, "referenceImage")
          ? item.referenceImage
          : "",
        referenceImageNote: _.has(item, "referenceImageNote")
          ? item.referenceImageNote
          : "",
        outfitStatus: "",
        styleDesign: !_.isEmpty(item.styleDesign)
          ? JSON.stringify(item.styleDesign)
          : "",
      });
    });
  }
  if (!_.isEmpty(data.paymentBreakdown)) {
    data.paymentBreakdown.map((item) => {
      _paymentBrakeDown.push({
        note: item.note,
        amount: item.amount,
        date: !_.isEmpty(item.date) ? item.date.timestamp : moment(new Date()),
        modeOfPayment: item.modeOfPayment,
        isAdvance: item.isAdvance,
      });
    });
  }

  if (data?.secondaryStylists?.length > 0) {
    data?.secondaryStylists.map((item) => {
      secondaryStylistIds.push({
        name: item.name,
        value: item._id,
      });
    });
  }

  const payload = {
    _id: data._id,
    userId: data.userId,
    orderNo: data.orderNo,
    studioId: data.studioId,
    customerCountryCode: data.customerCountryCode,
    customerId: data.customerId,
    customerPhone: data.customerPhone,
    customerEmail: data.customerEmail,
    customerHeight: data.customerHeight,
    customerWeight: data.customerWeight,
    customerLastName: data.customerLastName,
    customerDateOfBirth: data?.customerDateOfBirth?.timestamp,
    customerIsStyleClubMember: data?.customerIsStyleClubMember,
    customerFirstName: data.customerFirstName,
    orderStatus: data.orderStatus,
    customerCity: data.customerCity,
    personalStylistId: !_.isEmpty(data.stylist)
      ? {
          name: data.stylist[0].name,
          value: data?.stylist[0]._id,
        }
      : null,
    secondaryStylistIds,
    sourceChannel: data.sourceChannel,
    sourceSubChannel: data.sourceSubChannel,
    orderTotal: data.orderTotal,
    afterChargesTotal: data.afterChargesTotal,
    afterDeductionsTotal: data.afterDeductionsTotal,
    otherCharges: data.otherCharges,
    deductions: data.deductions,
    paymentBreakdownTotal: data.payment,
    balanceAmount: data.balanceAmount,
    customerSegment: data?.customerSegment,
    customerPersonaIds: !_.isEmpty(data.persona)
      ? { name: data.persona[0].name, value: data.persona[0]._id }
      : null,
    orderDate: !_.isEmpty(data.orderDate)
      ? data.orderDate.timestamp
      : moment(new Date()),
    eventDate: !_.isEmpty(data.eventDate) ? data.eventDate.timestamp : null,
    readyDate: !_.isEmpty(data.readyDate) ? data.readyDate.timestamp : null,
    trialDate: !_.isEmpty(data.trialDate) ? data.trialDate.timestamp : null,
    deliveryDate: !_.isEmpty(data.deliveryDate)
      ? data.deliveryDate.timestamp
      : null,

    orderItems: !_.isEmpty(_orderItems)
      ? _orderItems
      : initialConfig.data.orderItems,
  };
  const otherChargesBreakdown = !_.isEmpty(data.otherChargesBreakdown)
    ? data.otherChargesBreakdown
    : [];
  const deductionsBreakdown = !_.isEmpty(data.deductionsBreakdown)
    ? data.deductionsBreakdown
    : [];
  const paymentBreakdown = _paymentBrakeDown;

  return {
    payload,
    otherChargesBreakdown,
    deductionsBreakdown,
    paymentBreakdown,
  };
};

export const _updateProductTrailDates = (trailDate, _orderItems) => {
  let orderItems = _orderItems;
  console.log(orderItems);
  if (!_.isEmpty(orderItems)) {
    orderItems.map((item) => {
      item["trialDate"] = trailDate;
    });
  }
  return orderItems;
};
