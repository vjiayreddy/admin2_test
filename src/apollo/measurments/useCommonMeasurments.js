import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_MEASURMENTS } from "../queries/measurments";
import { updateMeasurementForm, convertToOption } from "./service";
import _ from "lodash";
export const useGetCategoryMeasurements = (authToken, selectProduct) => {
  const [dependentCatMeasurments, setDependentCatMeasurments] = useState();
  const [formulas, setFormulas] = useState(null);
  const [formData, setFormData] = useState(null);
  const [finalCommonMeasurments, setFinalCommonMeasurments] = useState(null);
  const [onlineMeasurments, setOnlineMeasurments] = useState(null);
  const [getSavedUserMeasurments, { loading: loadingGSUM, data: dataGSUM }] =
    useLazyQuery(GET_USER_MEASURMENTS, {
      fetchPolicy: "network-only",
    });

  const mapFinalCommonMeasurments = () => {
    let finalCommonMeasurments = {};
    let opt_val_obj = null;
    formulas.forEach((item) => {
      opt_val_obj = onlineMeasurments.find((c) => c.name == item.input_name);
      if (opt_val_obj) {
        let opValue =
          item.operation === "ADD"
            ? opt_val_obj.value + item.value
            : opt_val_obj.value - item.value;
        var opStr = !_.isNull(opValue) ? opValue.toString().split(".") : "0.0"; //12.5
        if (
          formData[item.name] === 0 ||
          formData[item.name] === undefined ||
          formData[item.name] === null ||
          _.isEmpty(formData[item.name])
        ) {
          finalCommonMeasurments[item.name] = Number(opStr[0]);
        }
        if (
          formData[item.name + "_size"] === 0 ||
          formData[item.name + "_size"] === undefined ||
          formData[item.name + "_size"] === null ||
          _.isEmpty(formData[item.name + "_size"]) ||
          formData[item.name + "_size"] === "0"
        ) {
          finalCommonMeasurments[item.name + "_size"] =
            convertToOption(Number(opStr[1])) === undefined
              ? "0"
              : convertToOption(Number(opStr[1]));
        }
      }
    });
    return {
      ...formData,
      ...finalCommonMeasurments,
    };
  };

  const gqlGetCategoryMeasurements = () => {
    let variables = { page: 1, limit: 3, userId: authToken };
    if (selectProduct === "5da7220571762c2a58b27a6b") {
      variables["subCatId"] = "trouser";
      variables["catId"] = "5da7220571762c2a58b27a67";
      getSavedUserMeasurments({ variables: variables });
    } else {
      variables["subCatId"] = "half_shirt";
      variables["catId"] = "5da7220571762c2a58b27a65";
      getSavedUserMeasurments({ variables: variables });
    }
  };

  const commonMeasurmentsFormula = (
    _formData,
    onlineMeasurments,
    selectProduct,
    measurementsOptions
  ) => {
    const formulas = [];
    const measurementConfig = JSON.parse(
      localStorage.getItem("mesurment_config")
    );
    if (!_.isEmpty(measurementConfig)) {
      let whichCatId = null;
      measurementConfig.catIdMap.forEach((item) => {
        item.outputCatIds.forEach((opt) => {
          if (opt === selectProduct) {
            whichCatId = item;
          }
        });
      });

      if (!_.isEmpty(whichCatId)) {
        var cfg = measurementConfig.config.categories.find(
          (c) => c.catId == whichCatId.inputCatId
        );

        if (cfg && onlineMeasurments) {
          measurementsOptions.forEach((opt) => {
            var _found_formula = null;
            cfg.inputs.forEach((inp) => {
              inp.outputs.forEach((op) => {
                if (op.name == opt.name) {
                  const findIndex = _.findIndex(
                    measurementsOptions,
                    (option) => option.name === op.name
                  );
                  if (findIndex !== -1) {
                    measurementsOptions[findIndex]["isCommonMeasurment"] =
                      "#FFF9C4";
                  }
                  _found_formula = { ...op, input_name: inp.name };
                  return false;
                }
              });
            });

            if (!_.isEmpty(_found_formula)) {
              formulas.push(_found_formula);
            }
          });
        }
      }
    }
    if (!_.isEmpty(formulas)) {
      setOnlineMeasurments(onlineMeasurments);
      setFormulas(formulas);
      setFormData(_formData);
    }
  };

  useEffect(() => {
    setDependentCatMeasurments(null);
    if (!_.isEmpty(dataGSUM)) {
      const { getUserMeasurements } = dataGSUM;
      if (!_.isEmpty(getUserMeasurements)) {
        const options = !_.isEmpty(getUserMeasurements[0].options)
          ? getUserMeasurements[0].options
          : getUserMeasurements[1].options;
        setDependentCatMeasurments(options);
      }
    }
  }, [dataGSUM]);

  useEffect(() => {
    if (formulas) {
      setFinalCommonMeasurments(mapFinalCommonMeasurments());
    }
  }, [formulas]);

  return {
    gqlGetCategoryMeasurements,
    dependentCatMeasurments,
    commonMeasurmentsFormula,
    finalCommonMeasurments,
  };
};
