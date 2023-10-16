import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_PRODUCT_MEASURMENT_CONFIG,
  GET_USER_MEASURMENTS,
} from "../queries/measurments";
import _ from "lodash";

const role = "personal_stylist";

const optionToDecimal = (value) => {
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

export const getFormPayload = (
  measurementOptions,
  authToken,
  selectProduct,
  subCatId,
  formData
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
    measuredBy: "self",
    //measuredBy: !_.isEmpty(selectTailor) ? selectTailor : null,
    //noOfMeters: parseFloat(`${mtr_1}.${mtr_2}`),
    //pannaSize: selectedPannaSize ? parseFloat(selectedPannaSize) : 0,
    //note: !_.isEmpty(data.note) ? data.note : "",
    //isDyable: dyeable,
    updatedOptions: options,
    //remarks: setRemark ? setRemark : null,
  };
};

export const measurementsSorting = (_measurementsOptions, selectProduct) => {
  const measurementsConfig = JSON.parse(
    localStorage.getItem("mesurment_config")
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

export const updateMeasurementForm = (getUserMeasurements) => {
  if (!_.isEmpty(getUserMeasurements[0])) {
    const options = !_.isEmpty(getUserMeasurements[0].options)
      ? getUserMeasurements[0].options
      : getUserMeasurements[1].options;
    return mapUserMeasurements(options);
  }
};

const convertToOption = (value) => {
  let val = value < 10 ? value * 10 : value;
  if (val <= 12) return "0";
  if (val >= 13 && val <= 37) return "1/4";
  if (val >= 38 && val < 62) return "1/2";
  if (val >= 63 && val < 87) return "3/4";
  if (val >= 88) return "0";
  if (val === NaN) return "0";
};

export const useGetMeasurementsConfig = () => {
  const [subCatId, setSubCatId] = useState([]);
  const [productMeasurements, setProductMeasurements] = useState([]);
  const [getSavedUserMeasurments, { loading: loadingGSUM, data: dataGSUM }] =
    useLazyQuery(GET_USER_MEASURMENTS, {
      fetchPolicy: "network-only",
    });

  const [
    getProductMeasurements,
    { loading: loadingPM, data: { getProductMeasurementConfig } = {} },
  ] = useLazyQuery(GET_PRODUCT_MEASURMENT_CONFIG);

  useEffect(() => {
    setProductMeasurements([]);
    if (!_.isEmpty(getProductMeasurementConfig)) {
      let extractOptions = [];
      getProductMeasurementConfig.map((item) => {
        item.options.map((option) => extractOptions.push(option));
      });
      const getUniqOptions = _.uniqBy(extractOptions, "label").map((item) => {
        return {
          ...item,
          size: "0",
        };
      });
      setProductMeasurements(getUniqOptions);
      // setSubCatId(getProductMeasurementConfig[0].subCat);
    }
  }, [getProductMeasurementConfig]);

  // useEffect(async () => {
  //   if (!_.isEmpty(authToken)) {
  //     await getSavedUserMeasurments({
  //       variables: {
  //         page: 1,
  //         limit: 3,
  //         userId: authToken,
  //         subCatId: subCatId,
  //         catId: selectProduct,
  //       },
  //     });
  //   }
  // }, [authToken, subCatId, selectProduct]);

  // useEffect(() => {
  //   if (!_.isEmpty(dataGSUM)) {
  //     const { getUserMeasurements } = dataGSUM;
  //     if (!_.isEmpty(getUserMeasurements)) {
  //       reset(updateMeasurementForm(getUserMeasurements));
  //     }
  //   }
  // }, [dataGSUM]);

  // useEffect(async () => {
  //   if (
  //     selectProduct === "5da7220571762c2a58b27a65" ||
  //     selectProduct === "5da7220571762c2a58b27a67"
  //   ) {
  //     return;
  //   } else if (selectProduct === "5da7220571762c2a58b27a6b") {
  //     await getCategoryMeasurments({
  //       variables: {
  //         page: 1,
  //         limit: 3,
  //         userId: authToken,
  //         subCatId: "trouser",
  //         catId: "5da7220571762c2a58b27a67",
  //       },
  //     });
  //   }
  // }, [selectProduct]);

  const getMeasurementsByCatId = async (productId) => {
    await getProductMeasurements({
      variables: {
        role: role,
        catId: productId,
      },
    });
  };

  // const getSavedMeasurements = async () => {
  //   return getProductMeasurements({
  //     variables: {
  //       page: 1,
  //       limit: 3,
  //       userId: authToken,
  //       subCatId: subCatId,
  //       catId: selectProduct,
  //     },
  //   });
  // };

  return {
    getMeasurementsByCatId,
    loadingState: loadingGSUM,
    productMeasurements,
    // getSavedMeasurements,
    // subCatId,
  };
};
