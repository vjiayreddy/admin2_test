import { useState } from "react";
export const useInputChangeDetection = () => {
  const [changedFieldValues, setchangedFieldValues] = useState();

  const changeInputField = (selectedCatId, measurmentOptions, formData) => {
    const selectedFromData = { ...formData };
    var _found_formula_category =
      measurementConfig.config.internal_measurement.find(
        (x) => x.catId.toString() == selectedCatId
      );

    if (!_.isEmpty(_found_formula_category)) {
      measurmentOptions.map((item) => {
        if (_.has(item, "foundFormula")) {
          if (item.foundFormula) {
            if (!_.isEmpty(item.foundFormula.operations)) {
              var sum = 0;
              var operations = item.foundFormula.operations;
              operations.sort((a, b) =>
                a.sortOrder > b.sortOrder
                  ? 1
                  : b.sortOrder > a.sortOrder
                  ? -1
                  : 0
              );

              operations.forEach((option) => {
                let valueA = 0;
                let valueB = 0;
                if (!_.isEmpty(option.attributeA.trim())) {
                  valueA =
                    Number(formData[option.attributeA.trim()]) +
                    optionToDecimal(
                      formData[option.attributeA.trim() + "_size"]
                    );
                }
                if (!_.isEmpty(option.attributeB.trim())) {
                  valueB =
                    Number(formData[option.attributeB.trim()]) +
                    optionToDecimal(
                      formData[option.attributeB.trim() + "_size"]
                    );
                }

                if (option.operation === "ADD") {
                  if (option.considerPerviousValue) {
                    formData[item.foundFormula.output_attribute] =
                      Number(formData[item.foundFormula.output_attribute]) +
                      valueA +
                      valueB +
                      option.hasConstant;
                  } else {
                    formData[item.foundFormula.output_attribute] =
                      valueA + valueB + option.hasConstant;
                  }

                  setFinalValues(selectedFromData, item.foundFormula, formData);
                } else if (option.operation === "SUB") {
                  if (option.considerPerviousValue) {
                    let valueToSubtract = 0;
                    if (option.hasConstant) {
                      valueToSubtract = option.hasConstant;
                    } else {
                      if (valueA > 0) {
                        valueToSubtract = valueA;
                      } else if (valueB > 0) {
                        valueToSubtract = valueB;
                      }
                    }
                    if (valueToSubtract > 0) {
                      formData[item.foundFormula.output_attribute] =
                        Number(formData[item.foundFormula.output_attribute]) -
                        valueToSubtract;
                    }
                  } else {
                    if (option.hasConstant) {
                      if (valueA) {
                        formData[item.foundFormula.output_attribute] =
                          valueA - option.hasConstant;
                      } else if (valueB) {
                        formData[item.foundFormula.output_attribute] =
                          valueB - option.hasConstant;
                      }
                    } else {
                      formData[item.foundFormula.output_attribute] =
                        valueA - valueB;
                    }
                  }
                  setFinalValues(selectedFromData, item.foundFormula, formData);
                } else if (option.operation === "DIVIDE") {
                  if (option.considerPerviousValue) {
                    let valueToSubtract = 0;
                    if (option.hasConstant) {
                      valueToSubtract = option.hasConstant;
                    } else {
                      if (valueA > 0) {
                        valueToSubtract = valueA;
                      } else if (valueB > 0) {
                        valueToSubtract = valueB;
                      }
                    }
                    if (valueToSubtract > 0) {
                      formData[item.foundFormula.output_attribute] =
                        Number(formData[item.foundFormula.output_attribute]) /
                        valueToSubtract;
                    }
                  } else {
                    if (option.hasConstant) {
                      if (valueA) {
                        formData[item.foundFormula.output_attribute] =
                          valueA / option.hasConstant;
                      } else if (valueB) {
                        formData[item.foundFormula.output_attribute] =
                          valueA / option.hasConstant;
                      }
                    } else {
                      formData[item.foundFormula.output_attribute] =
                        valueA / valueB;
                    }
                  }
                  setFinalValues(selectedFromData, item.foundFormula, formData);
                } else if (option.operation === "MULTIPLY") {
                  if (option.considerPerviousValue) {
                    let valueToSubtract = 0;
                    if (option.hasConstant) {
                      valueToSubtract = option.hasConstant;
                    } else {
                      if (valueA > 0) {
                        valueToSubtract = valueA;
                      } else if (valueB > 0) {
                        valueToSubtract = valueB;
                      }
                    }
                    if (valueToSubtract > 0) {
                      formData[item.foundFormula.output_attribute] =
                        Number(formData[item.foundFormula.output_attribute]) *
                        valueToSubtract;
                    }
                  } else {
                    if (option.hasConstant) {
                      if (valueA) {
                        formData[item.foundFormula.output_attribute] =
                          valueA * option.hasConstant;
                      } else if (valueB) {
                        formData[item.foundFormula.output_attribute] =
                          valueB * option.hasConstant;
                      }
                    } else {
                      formData[item.foundFormula.output_attribute] =
                        valueA * valueB;
                    }
                  }
                  setFinalValues(selectedFromData, item.foundFormula, formData);
                } else if (option.operation === "ROUND") {
                  if (option.hasConstant) {
                    formData[item.foundFormula.output_attribute] =
                      Math.ceil(
                        formData[item.foundFormula.output_attribute] /
                          option.hasConstant
                      ) * option.hasConstant;
                  }
                  setFinalValues(selectedFromData, item.foundFormula, formData);
                }
              });
            }
          }
        }
      });
    }
    console.log(selectedFromData);
  };
};
