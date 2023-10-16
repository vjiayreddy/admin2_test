import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT_MEASURMENT_CONFIG } from "../queries/measurments";
import { GET_USER_MEASURMENTS } from "../queries/measurments";
import { updateMeasurementForm } from "./service";
import { useGetDependencyMeasurments } from "./useGetDependencyMeasurments";

import _ from "lodash";

export const useMeasurementsCalculations = (productCatId, authToken) => {
  const [measurementsAttributes, setMeasurementsAttributes] = useState(null);
  const [measurementsData, setMeasurementsData] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [commonFormulas, setCommonFormulas] = useState([]);
  const { dependentMeasurements, fetchDependencyMeasurements } =
    useGetDependencyMeasurments(productCatId, authToken);

  const role = "personal_stylist";

  //Apollo
  const [getProductMeasurements, { data: dataMA }] = useLazyQuery(
    GET_PRODUCT_MEASURMENT_CONFIG
  );

  const [getSavedUserMeasurments, { data: dataGSUM }] =
    useLazyQuery(GET_USER_MEASURMENTS);

  // Load initial Measurements attributes
  useEffect(() => {
    getProductMeasurements({
      variables: {
        role: role,
        catId: productCatId,
      },
    });
  }, [productCatId]);

  useEffect(() => {
    setMeasurementsAttributes(null);
    if (!_.isEmpty(dataMA)) {
      const { getProductMeasurementConfig } = dataMA;
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
      setMeasurementsAttributes(getUniqOptions);
      setSubCategory(getProductMeasurementConfig[0].subCat);
    }
  }, [dataMA]);

  useEffect(() => {
    if (measurementsAttributes) {
      getSavedUserMeasurments({
        variables: {
          page: 1,
          limit: 3,
          userId: authToken,
          subCatId: subCategory,
          catId: productCatId,
        },
      });
    }
  }, [measurementsAttributes]);

  useEffect(() => {
    setMeasurementsData(null);
    if (dataGSUM) {
      const { getUserMeasurements } = dataGSUM;
      setMeasurementsData(updateMeasurementForm(getUserMeasurements));
    }
  }, [dataGSUM]);

  useEffect(async () => {
    if (!_.isEmpty(measurementsData)) {
      fetchDependencyMeasurements();
    }
  }, [measurementsData]);

  useEffect(() => {
    console.log("dependentMeasurements", dependentMeasurements);
    // commonMeasurmentsFormula(
    //   measurementsData,
    //   dependentMeasurements,
    //   productCatId,
    //   measurementsAttributes
    // );
  }, [dependentMeasurements]);

  useEffect(() => {
    if (!_.isEmpty(commonFormulas)) {
      console.log("commonFormulas", commonFormulas);
    }
  }, [commonFormulas]);

  function commonMeasurmentsFormula(
    _formData,
    onlineMeasurments,
    selectProduct,
    measurementsOptions
  ) {
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
      setCommonFormulas(formulas);
    }
  }

  // Return Data
  return {
    subCategory,
    measurementsAttributes,
    measurementsData,
  };
};
