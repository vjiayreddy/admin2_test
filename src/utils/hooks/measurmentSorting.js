import _ from "lodash";

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
];

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

export const measurmentSorting = (_measurmentOptions, selectProduct) => {
  const measurmentConfig = JSON.parse(localStorage.getItem("mesurment_config"));
  let _rowSortOrder = [];
  let _finalOptions = [];
  let _gropuMeasurments = [];
  if (measurmentConfig && _measurmentOptions) {
    const _sortOptions = measurmentConfig.config.measurement_sort_order_config;
    if (!_.isEmpty(_sortOptions)) {
      const _findCat = _.find(
        _sortOptions,
        (item) => item.catId === selectProduct
      );
      if (!_.isEmpty(_findCat)) {
        let _configGroup = _.groupBy(_findCat.options, "sortOrderRow");
        for (const property in _configGroup) {
          _configGroup[property].map((item, index) => {
            _rowSortOrder.push(item);
          });
        }
        _rowSortOrder.map((item) => {
          const findItem = _.find(
            _measurmentOptions,
            (itm) => itm.name === item.name
          );
          if (findItem) {
            _finalOptions.push({
              ...findItem,
              sortOrderRow: item.sortOrderRow,
              sortOrderCol: item.sortOrderCol,
            });
          } else {
          }
        });

        if (!_.isEmpty(_finalOptions)) {
          let items = _.groupBy(_finalOptions, "sortOrderRow");
          for (const property in items) {
            _gropuMeasurments.push(items[property]);
          }
        } else {
          _gropuMeasurments.push(_measurmentOptions);
        }
      } else {
        _gropuMeasurments.push(_measurmentOptions);
      }
    }
  } else {
    _gropuMeasurments.push(_measurmentOptions);
  }
  return {
    _finalOptions,
    _gropuMeasurments,
  };
};
