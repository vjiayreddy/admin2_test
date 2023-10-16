import { LOCAL_STORAGE } from "./utils";
import { extractDateFormate } from "../../utils/validations";

export const renderViewButton = (catId) => {
  if (
    catId === "5da7220571762c2a58b27a68" ||
    catId === "5da7220571762c2a58b27a65" ||
    catId === "5da7220571762c2a58b27a67" ||
    catId === "5da7220571762c2a58b27a6b" ||
    catId === "5da7220571762c2a58b27a6c" ||
    catId === "5da7220571762c2a58b27a6e" ||
    catId === "5da7220571762c2a58b27a6d" ||
    catId === "5da7220571762c2a58b27a6a" ||
    catId === "5da7220571762c2a58b27a70" ||
    catId === "5da7220571762c2a58b27a6f" ||
    catId === "6036451627e32d7fd776a580" ||
    catId === "621a34485417ab1e143a5245" ||
    catId === "5da7220571762c2a58b27a73" ||
    catId === "5da7220571762c2a58b27a72" ||
    catId === "6036446927e32d7fd776a57f" ||
    catId === "5ebb993abcb3d23714b2ebf4" ||
    catId === "5da7220571762c2a58b27a66" ||
    catId === "636f3012feea0816508c5c45"
  ) {
    return true;
  }
};

const categoryItems = [
  {
    name: "Shirts",
    label: "in_shirt",
    value: "shirt",
  },
  {
    name: "Trousers",
    label: "trouser",
    value: "trouser",
  },
  {
    name: "Suits",
    label: "suit",
    value: "suit",
  },
  {
    name: "Blazers",
    label: "blazer",
    value: "blazer",
  },
  {
    name: "Waistcoats",
    label: "waistcoat",
    value: "waistcoat",
  },
  {
    name: "Chinos",
    label: "chinos",
    value: "chinos",
  },
  {
    name: "Indo Western",
    label: "indowestern",
    value: "indowestern",
  },
  {
    name: "Kurta",
    label: "kurta",
    value: "kurta",
  },
  {
    name: "jodhpuris",
    label: "jodhpuri",
    value: "jodhpuri",
  },
  {
    name: "Sherwanis",
    label: "sherwani",
    value: "sherwani",
  },
  {
    name: "Sadris",
    label: "sadri",
    value: "sadri",
  },
  {
    name: "PoonaPant",
    label: "PoonaPant",
    value: "PoonaPant",
  },
];

export const getFormPayload = (
  measurementOptions,
  authToken,
  selectProduct,
  subCatId,
  formData,
  selectTailor,
  mtr_1,
  mtr_2,
  selectedPannaSize,
  note,
  dyeable,
  setRemark,
  approvedDate
) => {
  let finalOptions = [];
  finalOptions = measurementOptions.map((opt) => {
    if (_.hasIn(formData, opt.name)) {
      const value = parseFloat(
        parseInt(formData[opt.name]) +
          optionToDecimal(formData[`${opt.name}_size`])
      );
      return {
        label: opt.label,
        name: opt.name,
        attributeImageUrl: opt.attributeImageUrl,
        hightlightImageUrl: opt.hightlightImageUrl,
        isUpdateManually: opt.isUpdateManually,
        value: isNaN(value) ? 0 : value,
      };
    }
  });

  let options = [];
  finalOptions.map((item) => {
    if (!_.isEmpty(item)) {
      options.push(item);
    }
  });
  return {
    userId: authToken,
    catId: selectProduct,
    subCat: subCatId,
    isDraft: false,
    type: "",
    measuredBy: !_.isEmpty(selectTailor) ? selectTailor : "self",
    noOfMeters: parseFloat(`${mtr_1}.${mtr_2}`),
    pannaSize: selectedPannaSize ? parseFloat(selectedPannaSize) : 0,
    note: !_.isEmpty(note) ? note : "",
    isDyable: dyeable,
    updatedOptions: options,
    remarks: setRemark ? setRemark : null,
    approvedBy: formData.approvedBy,
    approvedDate: extractDateFormate(approvedDate),
  };
};

export const getSizingPayload = (
  measurementOptions,
  formData,
  authToken,
  sizeData
) => {
  let finalOptions = [];
  finalOptions = measurementOptions.map((opt) => {
    if (_.hasIn(formData, opt.name)) {
      const value = parseFloat(
        parseInt(formData[opt.name]) +
          optionToDecimal(formData[`${opt.name}_size`])
      );
      return {
        name: opt.name,
        value: isNaN(value) ? 0 : value,
      };
    }
  });

  let options = [];
  finalOptions.map((item) => {
    if (!_.isEmpty(item)) {
      options.push(item);
    }
  });

  return {
    userId: authToken,
    catId: sizeData?.getUserStandardSizing?.[0].catId,
    size: sizeData?.getUserStandardSizing?.[0].size,
    label: sizeData?.getUserStandardSizing?.[0].label,
    bodyProfileId: sizeData?.getUserStandardSizing?.[0].bodyProfileId,
    note: sizeData?.getUserStandardSizing?.[0].note,
    modifiedOptions: options,
  };
};

export const convertToOption = (value) => {
  let val = value < 10 ? value * 10 : value;
  if (val > 100) {
    val = val / 10;
  }
  if (val <= 12) return "0";
  if (val > 12 && val <= 37) return "1/4";
  if (val > 37 && val <= 62) return "1/2";
  if (val > 62 && val <= 87) return "3/4";
  if (val > 87) return "3/4";
  if (isNaN(value)) return "0";
};

export const sizingMeasurementsSorting = (
  _measurementsOptions,
  selectProduct,
  sizingOptions
) => {
  const measurementsConfig = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.CONFIG)
  );
  let _sizingOptions = sizingOptions?.getStandardSizeChart?.[0].options || [];
  let _rowSortOrder = [];
  let _finalOptions = [];
  let _groupedMeasurements = [];
  if (measurementsConfig && _measurementsOptions) {
    const _sortOptions =
      measurementsConfig.config.measurement_sort_order_config;
    if (!_.isEmpty(_sortOptions)) {
      const _findCat = _.find(
        _sortOptions,
        (item) => item.catId === selectProduct
      );
      if (!_.isEmpty(_findCat)) {
        let _configGroup = _.groupBy(_findCat.options, "sortOrderRow");
        for (const property in _configGroup) {
          _configGroup[property].map((item) => {
            _rowSortOrder.push(item);
          });
        }
        _rowSortOrder.map((item) => {
          const findItem = _.find(
            _sizingOptions,
            (itm) => itm.name === item.name
          );
          if (findItem) {
            _finalOptions.push({
              ...findItem,
              sortOrderRow: item.sortOrderRow,
              sortOrderCol: item.sortOrderCol,
            });
          }
        });

        if (!_.isEmpty(_finalOptions)) {
          let items = _.groupBy(_finalOptions, "sortOrderRow");
          for (const property in items) {
            _groupedMeasurements.push(items[property]);
          }
        } else {
          _groupedMeasurements.push(_measurementsOptions);
        }
      } else {
        _groupedMeasurements.push(_measurementsOptions);
      }
    }
  } else {
    _groupedMeasurements.push(_measurementsOptions);
  }
  return {
    _finalOptions,
    _groupedMeasurements: _groupedMeasurements,
  };
};

export const measurementsSorting = (_measurementsOptions, selectProduct) => {
  const measurementsConfig = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.CONFIG)
  );
  let _rowSortOrder = [];
  let _finalOptions = [];
  let _groupedMeasurements = [];
  if (measurementsConfig && _measurementsOptions) {
    const _sortOptions =
      measurementsConfig.config.measurement_sort_order_config;
    if (!_.isEmpty(_sortOptions)) {
      const _findCat = _.find(
        _sortOptions,
        (item) => item.catId === selectProduct
      );
      if (!_.isEmpty(_findCat)) {
        let _configGroup = _.groupBy(_findCat.options, "sortOrderRow");
        for (const property in _configGroup) {
          _configGroup[property].map((item) => {
            _rowSortOrder.push(item);
          });
        }
        _rowSortOrder.map((item) => {
          const findItem = _.find(
            _measurementsOptions,
            (itm) => itm.name === item.name
          );
          if (findItem) {
            _finalOptions.push({
              ...findItem,
              sortOrderRow: item.sortOrderRow,
              sortOrderCol: item.sortOrderCol,
            });
          }
        });

        if (!_.isEmpty(_finalOptions)) {
          let items = _.groupBy(_finalOptions, "sortOrderRow");
          for (const property in items) {
            _groupedMeasurements.push(items[property]);
          }
        } else {
          _groupedMeasurements.push(_measurementsOptions);
        }
      } else {
        _groupedMeasurements.push(_measurementsOptions);
      }
    }
  } else {
    _groupedMeasurements.push(_measurementsOptions);
  }
  return {
    _finalOptions,
    _groupedMeasurements: _groupedMeasurements,
  };
};

export const mapUserMeasurements = (options) => {
  var opts = {};
  options.forEach((op) => {
    var opStr = !_.isNull(op.value) ? op.value.toString().split(".") : "0.0"; //12.5
    opts[op.name] = Number(opStr[0]);
    opts[op.name + "_size"] = !_.isEmpty(convertToOption(Number(opStr[1])))
      ? convertToOption(Number(opStr[1]))
      : 0;
  });
  return opts;
};

export const updateMeasurementForm = (getUserMeasurements) => {
  if (!_.isEmpty(getUserMeasurements[0])) {
    const options = !_.isEmpty(getUserMeasurements[0].options)
      ? getUserMeasurements[0].options
      : getUserMeasurements[1].options;
    return {
      options: !_.isEmpty(mapUserMeasurements(options))
        ? mapUserMeasurements(options)
        : [],
      lastSavedMeasurments: !_.isEmpty(getUserMeasurements[0].options)
        ? getUserMeasurements[0]
        : getUserMeasurements[1],
    };
  }
};

export const optionToDecimal = (value) => {
  if (!_.isEmpty(value)) {
    if (value === "0") {
      return 0;
    } else if (value === "1/4") {
      return 0.25;
    } else if (value === "1/2") {
      return 0.5;
    } else if (value === "3/4") {
      return 0.75;
    } else if (value === "1") {
      return 0;
    }
  } else {
    return 0;
  }
};

export const extractDecimalValues = (value) => {
  if (value) {
    if (!_.isNull(value) || value !== undefined) {
      return value.toString().split(".");
    } else {
      return "0.0";
    }
  }
};

export const performOperation = (opr, previousValue, _options) => {
  var sum = 0;
  var attrAValue = 0;
  var attrBValue = 0;
  var savedMeasure = {
    options: _options,
  };

  if (opr.attributeA) {
    var attrA = Number(savedMeasure.options[opr.attributeA.trim()]);
    if (attrA) {
      attrAValue = attrA ? attrA : 0;
    }
  }
  if (opr.attributeB) {
    var attrB = Number(savedMeasure.options[opr.attributeB.trim()]);
    if (attrB) {
      attrBValue = attrB ? attrB : 0;
    }
  }

  switch (opr.operation) {
    case "ADD":
      sum = previousValue + (attrAValue + attrBValue + opr.hasConstant);
      break;
    case "SUB":
      if (opr.considerPerviousValue) {
        var valueToSubtract = opr.hasConstant
          ? opr.hasConstant
          : attrBValue > 0
          ? attrBValue
          : 0;
        if (valueToSubtract > 0) {
          sum = previousValue - valueToSubtract;
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue - opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue - opr.hasConstant;
          }
        } else {
          sum = attrAValue - attrBValue;
        }
      }
      break;
    case "DIVIDE":
      if (opr.considerPerviousValue) {
        var valueToDivide = opr.hasConstant
          ? opr.hasConstant
          : attrBValue > 0
          ? attrBValue
          : 0;
        if (valueToDivide > 0) {
          sum = previousValue / valueToDivide;
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue / opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue / opr.hasConstant;
          }
        } else {
          sum = attrAValue / attrBValue;
        }
      }
      break;
    case "MULTIPLY":
      if (opr.considerPerviousValue) {
        var valueToMultiply = opr.hasConstant
          ? opr.hasConstant
          : attrBValue > 0
          ? attrBValue
          : 0;
        if (valueToMultiply > 0) {
          sum = previousValue * valueToMultiply;
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue * opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue * opr.hasConstant;
          }
        } else {
          sum = attrAValue * attrBValue;
        }
      }
      break;
    case "ROUND":
      if (opr.hasConstant) {
        sum =
          Math.round(Number(previousValue) / opr.hasConstant) * opr.hasConstant;
      } else {
        sum = Math.round(previousValue);
      }
      break;
    default:
      break;
  }
  return sum;
};

export const getMeasurmentLength = (measurmentOptions, category) => {
  let value = 0;
  const findCat = _.find(categoryItems, (item) => item.name === category);
  if (!_.isEmpty(findCat)) {
    const findElm = _.find(
      measurmentOptions,
      (itm) => itm.name === `${findCat.label.toLowerCase()}_length`
    );
    if (!_.isEmpty(findElm)) {
      value = !_.isEmpty(findElm) ? findElm["value"] : "0";
    }
  }
  return value;
};

export const getMeasurmentSleevLength = (measurmentOptions, category) => {
  let value = 0;

  const findCat = _.find(categoryItems, (item) => item.name === category);
  if (!_.isEmpty(findCat)) {
    const findElm = _.find(
      measurmentOptions,
      (itm) => itm.name === `${findCat.value.toLowerCase()}_sleeve_length`
    );
    if (!_.isEmpty(findElm)) {
      value = !_.isEmpty(findElm) ? findElm["value"] : "0";
    }
  }
  return value;
};

export const getMeasurmentBodyLength = (measurmentOptions, category) => {
  let maxNumber = 0;
  const findCat = _.find(categoryItems, (item) => item.name === category);
  if (!_.isEmpty(findCat)) {
    let _optionOne = _.find(
      measurmentOptions,
      (item) => item.name === `${findCat.value.toLowerCase()}_chest_ready`
    );
    let _optionTwo = _.find(
      measurmentOptions,
      (item) => item.name === `${findCat.value.toLowerCase()}_waist_ready`
    );
    let _optionThree = _.find(
      measurmentOptions,
      (item) => item.name === `${findCat.value.toLowerCase()}_seat_ready`
    );
    if (
      !_.isEmpty(_optionOne) &&
      !_.isEmpty(_optionTwo) &&
      !_.isEmpty(_optionThree)
    ) {
      let num1 = _optionOne["value"];
      let num2 = _optionTwo["value"];
      let num3 = _optionThree["value"];
      if (num1 >= num2 && num1 >= num3) {
        maxNumber = num1;
      } else if (num2 >= num1 && num2 >= num3) {
        maxNumber = num2;
      } else {
        maxNumber = num3;
      }
    }
  }
  return maxNumber;
};
