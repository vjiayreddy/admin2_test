import { useState } from "react";
import { LOCAL_STORAGE } from "./utils";
import {
  extractDecimalValues,
  convertToOption,
  optionToDecimal,
  performOperation,
} from "./service";
import { useGetMeasurmentsAttributes } from "./useGetMeasurmentsAttrs";

export const useCalInternalFormula = (measurementsOptions, selectedCatId) => {
  const [internalMeasurements, setInternalMeasurements] = useState();
  let measurementConfig = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.CONFIG)
  );

  const getFinalFormOptions = (formData) => {
    let _finalOption = { ...formData };
    if (formData) {
      for (const key in formData) {
        let extractedValues = extractDecimalValues(formData[key]);
        if (extractedValues) {
          if (extractedValues.length >= 2) {
            _finalOption[key] = Number(extractedValues[0]);
            _finalOption[key + "_size"] = convertToOption(
              Number(extractedValues[1])
            );
          }
        }
      }
    }
    return _finalOption;
  };

  const excuteFormula = (singleFormula, formData) => {
    let sum = 0;
    singleFormula.operations.forEach((opration) => {
      sum = performOperation(opration, sum, formData);
    });
    return sum;
  };

  const convertToDecimalValues = (formData) => {
    let values = { ...formData };
    for (let [key, value] of Object.entries(values)) {
      if (key.includes("_size")) {
        const subString = key.replace("_size", "");
        values[subString] = Number(values[subString]) + optionToDecimal(value);
        values[key] = "0";
      }
    }
    return values;
  };

  const calculateInternalFormulas = (formData, fieldName) => {
    debugger;
    let initialFormValues = { ...convertToDecimalValues(formData) };
    var _found_formula_category =
      measurementConfig.config.internal_measurement.find(
        (x) => x.catId.toString() == selectedCatId
      );

    if (!_.isEmpty(_found_formula_category)) {
      if (fieldName) {
        const itCanBeEdited = _found_formula_category.measurement_formulas.some(
          (f) => f.output_attribute === fieldName && f.canBeEdited
        );
        console.log(itCanBeEdited);
        if (itCanBeEdited) {
          let index = measurementsOptions.findIndex(
            (item) => item.name === fieldName
          );
          if (index !== -1) {
            measurementsOptions[index]["isUpdateManually"] = true;
          }
          let startExcueting = false;
          _found_formula_category.measurement_formulas.forEach(
            (singleFormula) => {
              if (startExcueting) {
                let formula_output = excuteFormula(
                  singleFormula,
                  initialFormValues
                );
                initialFormValues[singleFormula.output_attribute] =
                  formula_output;
              } else {
                if (fieldName === singleFormula.output_attribute) {
                  startExcueting = true;
                }
              }
            }
          );
        } else {
          _found_formula_category.measurement_formulas.forEach(
            (singleFormula) => {
              if (
                !measurementsOptions.some(
                  (item) =>
                    item.name === singleFormula.output_attribute &&
                    item.isUpdateManually
                )
              ) {
                let formula_output = excuteFormula(
                  singleFormula,
                  initialFormValues
                );
                initialFormValues[singleFormula.output_attribute] =
                  formula_output;
              }
            }
          );
        }
      } else {
        _found_formula_category.measurement_formulas.forEach(
          (singleFormula) => {
            if (
              !measurementsOptions.some(
                (item) =>
                  item.name === singleFormula.output_attribute &&
                  item.isUpdateManually
              )
            ) {
              let formula_output = excuteFormula(
                singleFormula,
                initialFormValues
              );
              initialFormValues[singleFormula.output_attribute] =
                formula_output;
            }
          }
        );
      }
    }

    // Final Output

    for (let [key, value] of Object.entries(initialFormValues)) {
      let extractedValues = extractDecimalValues(Number(value));
      if (extractedValues) {
        if (extractedValues.length >= 2) {
          initialFormValues[key] = Number(extractedValues[0]);
          initialFormValues[key + "_size"] = convertToOption(
            Number(extractedValues[1])
          );
        } else {
          initialFormValues[key] = extractedValues[0];
        }
      }
    }
    setInternalMeasurements(initialFormValues);
  };

  const resetFormula = (fieldName, formData) => {
    var _found_formula_category =
      measurementConfig.config.internal_measurement.find(
        (x) => x.catId.toString() == selectedCatId
      );
    if (!_.isEmpty(_found_formula_category)) {
      let index = measurementsOptions.findIndex(
        (item) => item.name === fieldName
      );
      if (index !== -1) {
        measurementsOptions[index]["isUpdateManually"] = false;
      }
      calculateInternalFormulas(formData, null);
    }
  };

  return {
    calculateInternalFormulas,
    internalMeasurements,
    resetFormula,
  };
};
