import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CATEGORY_MEASURMENTS } from "../queries/measurments";
import _ from "lodash";
import { CAT_IDS, LOCAL_STORAGE } from "./utils";
import { convertToOption } from "./service";
import useGetShirtAndTrouserMeasurements from "../../apollo/calculateMeasurments/useGetShirtAndTrouserMeasurments";
import { configData } from "../../utils/measurment_config";
export const useCalCommonMeasurements = (
  productCatId,
  authToken,
  measurementsAttributes,
  measurementsData
) => {
  const [dependentCatMeasurments, setDependentMeasurements] = useState(null);
  const [commonFormulas, setCommonFormulas] = useState(null);
  const [commonMeasurments, setCommonMeasurments] = useState(null);
  const {
    getShirtAndTrouserMeasurments,
    userShirtMeasurments,
    userTrouserMeasurments,
  } = useGetShirtAndTrouserMeasurements(authToken);

  const [getCategoryMeasurments, { data: dataUCM }] = useLazyQuery(
    GET_CATEGORY_MEASURMENTS,
    {
      fetchPolicy: "network-only",
    }
  );

  const gqlGetCategoryMeasurements = () => {
    let variables = { page: 1, limit: 3, userId: authToken };
    if (
      productCatId === CAT_IDS.SHIRT_CAT_ID ||
      productCatId === CAT_IDS.TROUSER_CAT_ID
    ) {
      return;
    } else if (productCatId === CAT_IDS.SUIT_CAT_ID) {
      getShirtAndTrouserMeasurments();
    } else {
      if (productCatId === CAT_IDS.CHINOS_CAT_ID) {
        variables["subCatId"] = "trouser";
        variables["catId"] = CAT_IDS.TROUSER_CAT_ID;
        getCategoryMeasurments({ variables: variables });
      } else {
        variables["subCatId"] = "half_shirt";
        variables["catId"] = CAT_IDS.SHIRT_CAT_ID;
        getCategoryMeasurments({ variables: variables });
      }
    }
  };

  const mapFinalCommonMeasurments = (formData) => {
    let opt_val_obj = null;
    commonFormulas.forEach((item) => {
      opt_val_obj = dependentCatMeasurments.find(
        (c) => c.name == item.input_name
      );
      if (opt_val_obj) {
        let opValue =
          item.operation === "ADD"
            ? opt_val_obj.value + item.value
            : opt_val_obj.value - item.value;
        var opStr = !_.isNull(opValue) ? opValue.toString().split(".") : "0.0"; //12.5

        if (
          measurementsData[item.name] === 0 ||
          measurementsData[item.name] === undefined ||
          measurementsData[item.name] === null ||
          measurementsData[item.name] === "0"
        ) {
          measurementsData[item.name] = Number(opStr[0]);
        }
        if (
          measurementsData[item.name + "_size"] === 0 ||
          measurementsData[item.name + "_size"] === undefined ||
          measurementsData[item.name + "_size"] === null ||
          measurementsData[item.name + "_size"] === "0"
        ) {
          measurementsData[item.name + "_size"] =
            convertToOption(Number(opStr[1])) === undefined
              ? "0"
              : convertToOption(Number(opStr[1]));
        }
      }
    });
    return {
      ...measurementsData,
    };
  };

  const commonMeasurmentsFormula = (
    _formData,
    onlineMeasurments,
    selectProduct,
    measurementsOptions
  ) => {
    const formulas = [];
    const measurementConfig = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE.CONFIG)
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
      setCommonFormulas(formulas);
    }
  };

  const commonMeasurmentsFormulaForSuit = (
    _formData,
    onlineMeasurments,
    selectProduct,
    measurementsOptions
  ) => {
    const formulas = [];
    // const measurementConfig = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE.CONFIG)
    // );

    const measurementConfig = configData;
    const witchCatIds = measurementConfig.catIdMap;
    if (witchCatIds) {
      witchCatIds.map((item) => {
        item.outputCatIds.map((itm) => {
          var cfg = measurementConfig.config.categories.find(
            (c) => c.catId == item.inputCatId
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
        });
      });
      setCommonFormulas(formulas);
    }
  };

  useEffect(() => {
    setDependentMeasurements(null);
    if (!_.isEmpty(dataUCM)) {
      const { getUserMeasurements } = dataUCM;
      if (!_.isEmpty(getUserMeasurements)) {
        const options = !_.isEmpty(getUserMeasurements[0].options)
          ? getUserMeasurements[0].options
          : getUserMeasurements[1].options;
        setDependentMeasurements(options);
      }
    }
  }, [dataUCM]);

  useEffect(() => {
    setDependentMeasurements(null);
    if (
      !_.isEmpty(userShirtMeasurments) &&
      !_.isEmpty(userTrouserMeasurments)
    ) {
      setDependentMeasurements([
        ...userShirtMeasurments,
        ...userTrouserMeasurments,
      ]);
    }
    if (!_.isEmpty(userTrouserMeasurments) && _.isEmpty(userShirtMeasurments)) {
      setDependentMeasurements([...userTrouserMeasurments]);
    }
    if (_.isEmpty(userTrouserMeasurments) && !_.isEmpty(userShirtMeasurments)) {
      setDependentMeasurements([...userShirtMeasurments]);
    }
  }, [userShirtMeasurments, userTrouserMeasurments]);

  useEffect(() => {
    if (commonFormulas) {
      setCommonMeasurments(mapFinalCommonMeasurments(measurementsData));
    }
  }, [commonFormulas]);

  useEffect(() => {
    if (dependentCatMeasurments) {
      if (productCatId === CAT_IDS.SUIT_CAT_ID) {
        commonMeasurmentsFormulaForSuit(
          measurementsData,
          dependentCatMeasurments,
          productCatId,
          measurementsAttributes
        );
      } else {
        commonMeasurmentsFormula(
          measurementsData,
          dependentCatMeasurments,
          productCatId,
          measurementsAttributes
        );
      }
    }
  }, [dependentCatMeasurments]);

  return {
    gqlGetCategoryMeasurements,
    commonMeasurments,
  };
};
