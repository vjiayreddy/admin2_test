import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_MEASURMENTS } from "../../apollo/queries/measurments";
import _ from "lodash";

const convertToOption = (value) => {
  let val = value < 10 ? value * 10 : value;
  if (val <= 12) return "0";
  if (val >= 13 && val <= 37) return "1/4";
  if (val >= 38 && val < 62) return "1/2";
  if (val >= 63 && val < 87) return "3/4";
  if (val >= 88) return "0";
  if (val === NaN) return "0";
};

const converInchToCm = (inchValue) => {
  let valCm = Math.round(inchValue * 2.54);
  return valCm;
};

export function useMeasurmentsFormula(reset: any) {
  const [selectedCatId, setSelectedCatId] = useState<string>();
  const [formulas, setFormlas] = useState(null);
  const [internalFormula, setInternalFormula] = useState(null);

  const [
    getSavedUserMeasurments,
    { loading: loadingGSUM, data: dataGSUM, variables },
  ] = useLazyQuery(GET_USER_MEASURMENTS, {
    fetchPolicy: "network-only",
    onCompleted(data) {},
  });

  const measurmentConfig = JSON.parse(localStorage.getItem("mesurment_config"));

  const getFormulaUserMeasurments = async (
    depCatId: string,
    selCatId: string, // blazer
    measurmentOptions: any,
    measurmentType: any,
    subcatId: string,
    userId: string,
    selectedData
  ) => {
    setSelectedCatId(selCatId);
    await getSavedUserMeasurments({
      variables: {
        page: 1,
        limit: 3,
        userId: userId,
        catId: depCatId, //shirt
        subCat: subcatId, // half-shirt
        measurmentOptions: measurmentOptions, //all defult options by role
        measurmentType: measurmentType, // inch or cm
        selectedData: selectedData, // remote data
      },
    });
  };

  useEffect(() => {
    if (!_.isEmpty(measurmentConfig) && !_.isEmpty(dataGSUM)) {
      const { getUserMeasurements } = dataGSUM;
      if (!_.isEmpty(getUserMeasurements)) {
        let whichCatId: any;
        measurmentConfig.catIdMap.map((item) => {
          item.outputCatIds.map((opt) => {
            if (opt === selectedCatId) {
              whichCatId = item;
              return;
            }
          });
        });

        if (!_.isEmpty(whichCatId)) {
          var cfg = measurmentConfig.config.categories.find(
            (c) => c.catId == whichCatId.inputCatId
          );

          const found_cat = !_.isEmpty(getUserMeasurements[0])
            ? getUserMeasurements[0]
            : getUserMeasurements[1];

          calculateCommonMeasurments(variables, cfg, found_cat)
            .then((data) => {
              reset(data);
              variables.selectedData = data;
              return data;
            })
            .then((_data) => {
              calculateInternalFormulas(variables, selectedCatId).then(
                (data) => {
                  console.log("calculateInternalFormulas", data);
                  reset(data);
                }
              );
            });
        }
      }
    }
  }, [dataGSUM]);

  return {
    getFormulaUserMeasurments,
    loadingGSUM,
    formulas,
    internalFormula,
  };
}

function calculateCommonMeasurments(variables, cfg, found_cat) {
  return new Promise((resolutionFunc, rejectionFunc) => {
    if (cfg && found_cat) {
      let selectedData = { ...variables.selectedData };
      let matchedOption = [];
      let matchFormula = [];
      var opts = {};
      variables.measurmentOptions.forEach((opt) => {
        var _found_formula;
        cfg.inputs.forEach((inp) => {
          inp.outputs.forEach((op) => {
            if (op.name == opt.name) {
              const findIndex = _.findIndex(
                variables.measurmentOptions,
                (option) => option.name === op.name
              );
              if (findIndex !== -1) {
                variables.measurmentOptions[findIndex]["isCommonMeasurment"] =
                  "#FFF9C4";
              }
              _found_formula = { ...op, input_name: inp.name };
              return false;
            }
          });
        });

        if (_found_formula && found_cat) {
          var opt_val_obj = found_cat.options.find(
            (c) => c.name == _found_formula.input_name
          );

          if (!_.isEmpty(opt_val_obj)) {
            matchFormula.push(opt_val_obj);
          }

          if (!_.isEmpty(opt_val_obj)) {
            let opValue =
              _found_formula.operation === "ADD"
                ? opt_val_obj.value + _found_formula.value
                : opt_val_obj.value - _found_formula.value;
            if (variables.measurmentType === "inches") {
              var opStr = !_.isNull(opValue)
                ? opValue.toString().split(".")
                : "0.0"; //12.5
              if (
                selectedData[_found_formula.name] === 0 ||
                selectedData[_found_formula.name] === undefined ||
                selectedData[_found_formula.name] === null
              ) {
                selectedData[_found_formula.name] = Number(opStr[0]);
                selectedData["isSelected"] = true;
                selectedData[_found_formula.name + "_size"] =
                  convertToOption(Number(opStr[1])) === undefined
                    ? "0"
                    : convertToOption(Number(opStr[1]));
                matchedOption.push(opts);
              }
            } else {
              let opStr = converInchToCm(opValue);
              selectedData[_found_formula.name] = Number(opStr);
              selectedData[_found_formula.name + "_size"] = 0;
              selectedData["isSelected"] = true;
              matchedOption.push(opts);
            }
          }
          return setTimeout(() => {
            resolutionFunc(selectedData);
          }, 500);
        } else {
          return setTimeout(() => {
            resolutionFunc(selectedData);
          }, 500);
        }
      });
    }
  });
}

function calculateInternalFormulas(variables, selectedCatId) {
  return new Promise((resolutionFunc, rejectionFunc) => {
    let measurmentConfig = JSON.parse(localStorage.getItem("mesurment_config"));
    let selectedData = { ...variables.selectedData };
    var _found_formula_category =
      measurmentConfig.config.internal_measurement.find(
        (x) => x.catId.toString() == selectedCatId
      );

    variables.measurmentOptions.forEach((element) => {
      var foundFormula = _found_formula_category.measurement_formulas.find(
        (x) => x.output_attribute == element.name
      );

      if (!_.isEmpty(foundFormula)) {
        var sum: any = 0;
        var operations = foundFormula.operations;
        operations.sort((a, b) =>
          a.sortOrder > b.sortOrder ? 1 : b.sortOrder > a.sortOrder ? -1 : 0
        );

        operations.forEach((opr) => {
          sum = performOperation(opr, sum, selectedData);
        });

        var index = _.findIndex(
          variables.measurmentOptions,
          (item) => item.name === element.name
        );
        if (index !== -1) {
          variables.measurmentOptions[index]["foundFormula"] = foundFormula;
        }
        const sumVales = extractDecimalValues(variables, sum);
        if (sumVales.length === 2) {
          selectedData[element.name] = Number(sumVales[0]);
          selectedData[element.name + "_size"] = convertToOption(
            Number(sumVales[1])
          );
        } else {
          selectedData[element.name] = Number(sumVales[0]);
          selectedData[element.name + "_size"] = 0;
        }

        return setTimeout(() => {
          resolutionFunc(
            mapUserMeasurments(variables, selectedData, foundFormula, sum)
          );
        }, 500);
      }
    });
  });
}

function internalFormulasCalculation(selectedCatId, opt, variables, reset) {
  let measurmentConfig = JSON.parse(localStorage.getItem("mesurment_config"));
  let selectedData = { ...variables.selectedData };

  var _found_formula_category =
    measurmentConfig.config.internal_measurement.find(
      (x) => x.catId.toString() == selectedCatId
    );

  if (_found_formula_category) {
    var foundFormula = _found_formula_category.measurement_formulas.find(
      (x) => x.output_attribute == opt.name
    );

    if (!_.isEmpty(foundFormula)) {
      var sum: any = 0;
      var operations = foundFormula.operations;
      operations.sort((a, b) =>
        a.sortOrder > b.sortOrder ? 1 : b.sortOrder > a.sortOrder ? -1 : 0
      );

      operations.forEach((opr) => {
        sum = performOperation(opr, sum, selectedData);
      });

      var index = _.findIndex(
        variables.measurmentOptions,
        (item) => item.name === opt.name
      );
      if (index !== -1) {
        variables.measurmentOptions[index]["foundFormula"] = foundFormula;
      }
      const sumVales = extractDecimalValues(variables, sum);
      if (sumVales.length === 2) {
        selectedData[opt.name] = Number(sumVales[0]);
        selectedData[opt.name + "_size"] = convertToOption(Number(sumVales[1]));
      } else {
        selectedData[opt.name] = Number(sumVales[0]);
        selectedData[opt.name + "_size"] = 0;
      }
      //return data;
      reset(mapUserMeasurments(variables, selectedData, foundFormula, sum));
      // setInternalFormula(
      //   mapUserMeasurments(variables, selectedData, foundFormula, sum)
      // );
    } else {
    }
  } else {
  }
}

function performOperation(opr, previousValue, _options) {
  var sum = 0;
  var attrAValue = 0;
  var attrBValue = 0;

  var savedMeasure = {
    options: _options,
  };

  if (opr.attributeA) {
    var attrA = parseFloat(
      savedMeasure.options[opr.attributeA.trim()] +
        optionToDecimal(savedMeasure.options[opr.attributeA.trim() + "_size"])
    );

    if (attrA) {
      attrAValue = attrA ? attrA : 0;
    } else {
    }
  }
  if (opr.attributeB) {
    var attrB = parseFloat(
      savedMeasure.options[opr.attributeB.trim()] +
        optionToDecimal(savedMeasure.options[opr.attributeB.trim() + "_size"])
    );
    if (attrB) {
      attrBValue = attrB ? attrB : 0;
    } else {
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
        } else {
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue - opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue - opr.hasConstant;
          } else {
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
        } else {
          // console.log(
          //   `Invalid Devisor With Pervious Value, SortOrder: ${opr.sortOrder}`
          // );
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue / opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue / opr.hasConstant;
          } else {
            // console.log(
            //   `Invalid Devisor With Constant, SortOrder: ${opr.sortOrder}`
            // );
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
          sum = previousValue / valueToMultiply;
        } else {
          // console.log(
          //   `Invalid Multiplier With Pervious Value, SortOrder: ${opr.sortOrder}`
          // );
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue * opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue * opr.hasConstant;
          } else {
            // console.log(
            //   `Invalid Multiplier With Constant, SortOrder: ${opr.sortOrder}`
            // );
          }
        } else {
          sum = attrAValue * attrBValue;
        }
      }
      break;
    case "ROUND":
      if (opr.hasConstant) {
        sum = Math.ceil(previousValue / opr.hasConstant) * opr.hasConstant;
      } else {
        // console.log(
        //   `Constant Value Not Provided, Round Will not use any constant`
        // );
        sum = Math.round(previousValue);
      }
      break;
    default:
      // console.log(
      //   `Unknown Operation '${opr.operation}, SortOrder: ${opr.sortOrder}`
      // );
      break;
  }
  return sum;
}

function mapUserMeasurments(variables, selectedData, _found_formula, opValue) {
  let _selectedData = { ...selectedData };
  var opStr =
    variables.measurmentType === "inches"
      ? !_.isNull(opValue)
        ? opValue.toString().split(".")
        : "0.0"
      : converInchToCm(opValue); //12.5

  if (
    _selectedData[_found_formula.name] === 0 ||
    _selectedData[_found_formula.name] === undefined ||
    _selectedData[_found_formula.name] === null
  ) {
    _selectedData[_found_formula.name] =
      variables.measurmentType === "inches" ? Number(opStr[0]) : Number(opStr);
    _selectedData["isSelected"] = true;
    _selectedData[_found_formula.name + "_size"] =
      variables.measurmentType === "inches"
        ? !_.isEmpty(convertToOption(Number(opStr[1])))
          ? convertToOption(Number(opStr[1]))
          : "0"
        : "0";
  }
  return _selectedData;
}

function extractDecimalValues(variables, value) {
  var opStr =
    variables.measurmentType === "inches"
      ? !_.isNull(value)
        ? value.toString().split(".")
        : "0.0"
      : converInchToCm(value); //12.5
  return opStr;
}

function optionToDecimal(value) {
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
}

export const changeMeasurmentsWithField = (
  inputValue,
  selectedCatId,
  fieldname,
  measurmentOptions,
  values,
  measurmentType,
  reset,
  formData
) => {
  const measurmentConfig = JSON.parse(localStorage.getItem("mesurment_config"));
  var _found_formula_category =
    measurmentConfig.config.internal_measurement.find(
      (x) => x.catId.toString() == selectedCatId
    );
  if (!_.isEmpty(_found_formula_category)) {
    var shouldExecute = false;
    var shouldExecuteInternally = true;
    var _isToBeExicuted = false;
    for (let x = 0; x < measurmentOptions.length; x++) {
      let item = measurmentOptions[x];
      if (_.has(item, "foundFormula")) {
        if (item.foundFormula.output_attribute === fieldname) {
          if (item.foundFormula.canBeEdited) {
            _isToBeExicuted = true;
            break;
          }
        }
      }
    }
    if (!_isToBeExicuted) {
      shouldExecute = true;
      shouldExecuteInternally = true;
    }

    measurmentOptions.map((item) => {
      if (_.has(item, "foundFormula")) {
        if (!_.isEmpty(item.foundFormula.operations)) {
          const _findField = _.find(
            formData,
            (_itm) => _itm.name === item.name
          );
          if (!_.isEmpty(_findField)) {
            item.isUpdateManually = _findField.isUpdateManually;
          }

          if (shouldExecute) {
            if (item.isUpdateManually) {
              shouldExecuteInternally = false;
            } else {
              shouldExecuteInternally = true;
            }
            if (shouldExecuteInternally) {
              var finalValue: any = 0;
              var operations = item.foundFormula.operations;
              operations.sort((a, b) =>
                a.sortOrder > b.sortOrder
                  ? 1
                  : b.sortOrder > a.sortOrder
                  ? -1
                  : 0
              );

              operations.forEach((opr) => {
                finalValue = calculateOperation(
                  fieldname,
                  opr,
                  Number(inputValue),
                  values,
                  finalValue,
                  operations
                );
              });

              var opStr: any =
                measurmentType === "inches"
                  ? !_.isNull(finalValue)
                    ? finalValue.toString().split(".")
                    : "0.0"
                  : converInchToCm(finalValue); //12.5

              if (opStr.length === 2) {
                values[item.name] = Number(opStr[0]);
                values[item.name + "_size"] = convertToOption(Number(opStr[1]));
              } else {
                values[item.name] = Number(opStr[0]);
                values[item.name + "_size"] = 0;
              }
              reset(values);
            }
          }
          // This code happens agter Execution
          if (item.foundFormula.output_attribute === fieldname) {
            shouldExecute = true;
            if (item.foundFormula.canBeEdited) {
              item.isUpdateManually = true;
            }
          }
        }
      }
    });
  }
};

export const resetMeasurmentFormulas = (
  selectedCatId,
  measurmentOptions,
  values,
  measurmentType,
  reset,
  formData
) => {
  const measurmentConfig = JSON.parse(localStorage.getItem("mesurment_config"));
  var _found_formula_category =
    measurmentConfig.config.internal_measurement.find(
      (x) => x.catId.toString() == selectedCatId
    );
  const fieldname = measurmentOptions[0].name;
  if (!_.isEmpty(_found_formula_category)) {
    var shouldExecute = false;
    var shouldExecuteInternally = true;
    var _isToBeExicuted = false;
    for (let x = 0; x < measurmentOptions.length; x++) {
      let item = measurmentOptions[x];
      if (_.has(item, "foundFormula")) {
        if (item.foundFormula.output_attribute === fieldname) {
          if (item.foundFormula.canBeEdited) {
            _isToBeExicuted = true;
            break;
          }
        }
      }
    }
    if (!_isToBeExicuted) {
      shouldExecute = true;
      shouldExecuteInternally = true;
    }

    measurmentOptions.map((item) => {
      if (_.has(item, "foundFormula")) {
        if (!_.isEmpty(item.foundFormula.operations)) {
          const _findField = _.find(
            formData,
            (_itm) => _itm.name === item.name
          );
          if (!_.isEmpty(_findField)) {
            item.isUpdateManually = _findField.isUpdateManually;
          }

          if (shouldExecute) {
            if (item.isUpdateManually) {
              shouldExecuteInternally = false;
            } else {
              shouldExecuteInternally = true;
            }
            if (shouldExecuteInternally) {
              var finalValue: any = 0;
              var operations = item.foundFormula.operations;
              operations.sort((a, b) =>
                a.sortOrder > b.sortOrder
                  ? 1
                  : b.sortOrder > a.sortOrder
                  ? -1
                  : 0
              );

              operations.forEach((opr) => {
                finalValue = calculateOperation(
                  fieldname,
                  opr,
                  Number(values[fieldname]),
                  values,
                  finalValue,
                  operations
                );
              });

              var opStr: any =
                measurmentType === "inches"
                  ? !_.isNull(finalValue)
                    ? finalValue.toString().split(".")
                    : "0.0"
                  : converInchToCm(finalValue); //12.5

              if (opStr.length === 2) {
                values[item.name] = Number(opStr[0]);
                values[item.name + "_size"] = convertToOption(Number(opStr[1]));
              } else {
                values[item.name] = Number(opStr[0]);
                values[item.name + "_size"] = 0;
              }
              reset(values);
            }
          }
          // This code happens agter Execution
          if (item.foundFormula.output_attribute === fieldname) {
            shouldExecute = true;
            if (item.foundFormula.canBeEdited) {
              item.isUpdateManually = true;
            }
          }
        }
      }
    });
  }
};

function calculateOperation(
  fieldname,
  opr,
  fieldInput,
  _options,
  _perviousOprationValue,
  _formulaOptions
) {
  var sum = 0;
  var attrAValue = 0;
  var attrBValue = 0;
  var savedMeasure = {
    options: _options,
  };
  if (!_.isEmpty(opr)) {
    if (!_.isEmpty(opr.attributeA) && !_.isEmpty(opr.attributeB)) {
      let valueA =
        Number(savedMeasure.options[opr.attributeA.trim()]) +
        optionToDecimal(savedMeasure.options[opr.attributeA.trim() + "_size"]);
      if (valueA) {
        attrAValue = valueA ? valueA : 0;
      }
      let valueB =
        Number(savedMeasure.options[opr.attributeB.trim()]) +
        optionToDecimal(savedMeasure.options[opr.attributeB.trim() + "_size"]);
      if (valueB) {
        attrBValue = valueB ? valueB : 0;
      }
    } else {
      if (opr.attributeA) {
        let valueA =
          Number(savedMeasure.options[opr.attributeA.trim()]) +
          optionToDecimal(
            savedMeasure.options[opr.attributeA.trim() + "_size"]
          );
        if (valueA) {
          attrAValue = valueA ? valueA : 0;
        }
      } else if (!_.isEmpty(opr.attributeB)) {
        let valueB =
          Number(savedMeasure.options[opr.attributeB.trim()]) +
          optionToDecimal(
            savedMeasure.options[opr.attributeB.trim() + "_size"]
          );
        if (valueB) {
          attrBValue = valueB ? valueB : 0;
        }
      }
    }
  }

  switch (opr.operation) {
    case "ADD":
      sum = _perviousOprationValue + attrAValue + attrBValue + opr.hasConstant;
      break;
    case "SUB":
      if (opr.considerPerviousValue) {
        var valueToSubtract = opr.hasConstant
          ? opr.hasConstant
          : attrBValue > 0
          ? attrBValue
          : 0;
        if (valueToSubtract > 0) {
          sum = _perviousOprationValue - valueToSubtract;
        } else {
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue - opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue - opr.hasConstant;
          } else {
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
          sum = _perviousOprationValue / valueToDivide;
        } else {
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue / opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue / opr.hasConstant;
          } else {
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
          sum = _perviousOprationValue / valueToMultiply;
        } else {
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue * opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue * opr.hasConstant;
          } else {
          }
        } else {
          sum = attrAValue * attrBValue;
        }
      }
      break;
    case "ROUND":
      if (opr.hasConstant) {
        sum =
          Math.ceil(_perviousOprationValue / opr.hasConstant) * opr.hasConstant;
      } else {
        sum = Math.round(_perviousOprationValue);
      }
      break;
    default:
      break;
  }
  return sum;
}

export const changeMeasurmentsDrodown = (
  inputValue,
  selectedCatId,
  fieldname,
  measurmentOptions,
  values,
  measurmentType,
  reset
) => {
  const measurmentConfig = JSON.parse(localStorage.getItem("mesurment_config"));
  var _found_formula_category =
    measurmentConfig.config.internal_measurement.find(
      (x) => x.catId.toString() == selectedCatId
    );
  if (!_.isEmpty(_found_formula_category)) {
    measurmentOptions.map((item) => {
      if (_.has(item, "foundFormula")) {
        if (!_.isEmpty(item.foundFormula.operations)) {
          const findMDepMeasurments = _.find(
            item.foundFormula.operations,
            (i) =>
              i.attributeA.trim() === fieldname.trim() ||
              i.attributeB.trim() === fieldname.trim()
          );

          // if (!_.isEmpty(findMDepMeasurments)) {
          var finalValue: any = 0;
          var operations = item.foundFormula.operations;
          operations.sort((a, b) =>
            a.sortOrder > b.sortOrder ? 1 : b.sortOrder > a.sortOrder ? -1 : 0
          );

          operations.forEach((opr) => {
            finalValue = calculateFractionValues(
              fieldname,
              opr,
              inputValue,
              values,
              finalValue
            );
          });

          var opStr: any =
            measurmentType === "inches"
              ? !_.isNull(finalValue)
                ? finalValue.toString().split(".")
                : "0.0"
              : converInchToCm(finalValue); //12.5

          if (opStr.length === 2) {
            values[item.name] = Number(opStr[0]);
            values[item.name + "_size"] = convertToOption(Number(opStr[1]));
          } else {
            values[item.name] = Number(opStr[0]);
            values[item.name + "_size"] = 0;
          }
          reset(values);
        }
        // }
      }
    });
  }
};

export const _changeMeasurmentsDropDown = (
  inputValue,
  selectedCatId,
  fieldname,
  measurmentOptions,
  values,
  measurmentType,
  reset,
  formData
) => {
  const measurmentConfig = JSON.parse(localStorage.getItem("mesurment_config"));
  var _found_formula_category =
    measurmentConfig.config.internal_measurement.find(
      (x) => x.catId.toString() == selectedCatId
    );
  if (!_.isEmpty(_found_formula_category)) {
    var shouldExecute = false;
    var shouldExecuteInternally = true;
    var _isToBeExicuted = false;
    for (let x = 0; x < measurmentOptions.length; x++) {
      let item = measurmentOptions[x];
      if (_.has(item, "foundFormula")) {
        if (item.foundFormula.output_attribute === fieldname) {
          if (item.foundFormula.canBeEdited) {
            _isToBeExicuted = true;
            break;
          }
        }
      }
    }
    if (!_isToBeExicuted) {
      shouldExecute = true;
      shouldExecuteInternally = true;
    }

    measurmentOptions.map((item) => {
      if (_.has(item, "foundFormula")) {
        if (!_.isEmpty(item.foundFormula.operations)) {
          const _findField = _.find(
            formData,
            (_itm) => _itm.name === item.name
          );
          if (!_.isEmpty(_findField)) {
            item.isUpdateManually = _findField.isUpdateManually;
          }

          if (shouldExecute) {
            if (item.isUpdateManually) {
              shouldExecuteInternally = false;
            } else {
              shouldExecuteInternally = true;
            }
            if (shouldExecuteInternally) {
              var finalValue: any = 0;
              var operations = item.foundFormula.operations;
              operations.sort((a, b) =>
                a.sortOrder > b.sortOrder
                  ? 1
                  : b.sortOrder > a.sortOrder
                  ? -1
                  : 0
              );

              operations.forEach((opr) => {
                finalValue = calculateFractionValues(
                  fieldname,
                  opr,
                  inputValue,
                  values,
                  finalValue
                );
              });

              var opStr: any =
                measurmentType === "inches"
                  ? !_.isNull(finalValue)
                    ? finalValue.toString().split(".")
                    : "0.0"
                  : converInchToCm(finalValue); //12.5

              if (opStr.length === 2) {
                values[item.name] = Number(opStr[0]);
                values[item.name + "_size"] = convertToOption(Number(opStr[1]));
              } else {
                values[item.name] = Number(opStr[0]);
                values[item.name + "_size"] = 0;
              }

              var opStr: any =
                measurmentType === "inches"
                  ? !_.isNull(finalValue)
                    ? finalValue.toString().split(".")
                    : "0.0"
                  : converInchToCm(finalValue); //12.5

              if (opStr.length === 2) {
                values[item.name] = Number(opStr[0]);
                values[item.name + "_size"] = convertToOption(Number(opStr[1]));
              } else {
                values[item.name] = Number(opStr[0]);
                values[item.name + "_size"] = 0;
              }
              reset(values);
            }
          }
          // This code happens agter Execution
          if (item.foundFormula.output_attribute === fieldname) {
            shouldExecute = true;
            if (item.foundFormula.canBeEdited) {
              item.isUpdateManually = true;
            }
          }
        }
      }
    });
  }
};

function calculateFractionValues(
  fieldname,
  opr,
  fieldInput,
  _options,
  _perviousOprationValue
) {
  var sum = 0;
  var attrAValue = 0;
  var attrBValue = 0;
  var savedMeasure = {
    options: _options,
  };

  if (!_.isEmpty(opr)) {
    if (!_.isEmpty(opr.attributeA) && !_.isEmpty(opr.attributeB)) {
      let valueA =
        Number(savedMeasure.options[opr.attributeA.trim()]) +
        optionToDecimal(savedMeasure.options[opr.attributeA.trim() + "_size"]);
      if (valueA) {
        attrAValue = valueA ? valueA : 0;
      }
      let valueB =
        Number(savedMeasure.options[opr.attributeB.trim()]) +
        optionToDecimal(savedMeasure.options[opr.attributeB.trim() + "_size"]);
      if (valueB) {
        attrBValue = valueB ? valueB : 0;
      }
    } else {
      if (opr.attributeA) {
        let valueA =
          Number(savedMeasure.options[opr.attributeA.trim()]) +
          optionToDecimal(
            savedMeasure.options[opr.attributeA.trim() + "_size"]
          );
        if (valueA) {
          attrAValue = valueA ? valueA : 0;
        }
      } else if (!_.isEmpty(opr.attributeB)) {
        let valueB =
          Number(savedMeasure.options[opr.attributeB.trim()]) +
          optionToDecimal(
            savedMeasure.options[opr.attributeB.trim() + "_size"]
          );
        if (valueB) {
          attrBValue = valueB ? valueB : 0;
        }
      }
    }
  }

  switch (opr.operation) {
    case "ADD":
      sum = _perviousOprationValue + attrAValue + attrBValue + opr.hasConstant;
      break;
    case "SUB":
      if (opr.considerPerviousValue) {
        var valueToSubtract = opr.hasConstant
          ? opr.hasConstant
          : attrBValue > 0
          ? attrBValue
          : 0;
        if (valueToSubtract > 0) {
          sum = _perviousOprationValue - valueToSubtract;
        } else {
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue - opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue - opr.hasConstant;
          } else {
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
          sum = _perviousOprationValue / valueToDivide;
        } else {
          // console.log(
          //   `Invalid Devisor With Pervious Value, SortOrder: ${opr.sortOrder}`
          // );
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue / opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue / opr.hasConstant;
          } else {
            // console.log(
            //   `Invalid Devisor With Constant, SortOrder: ${opr.sortOrder}`
            // );
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
          sum = _perviousOprationValue / valueToMultiply;
        } else {
          // console.log(
          //   `Invalid Multiplier With Pervious Value, SortOrder: ${opr.sortOrder}`
          // );
        }
      } else {
        if (opr.hasConstant) {
          if (attrAValue) {
            sum = attrAValue * opr.hasConstant;
          } else if (attrBValue) {
            sum = attrBValue * opr.hasConstant;
          } else {
            // console.log(
            //   `Invalid Multiplier With Constant, SortOrder: ${opr.sortOrder}`
            // );
          }
        } else {
          sum = attrAValue * attrBValue;
        }
      }
      break;
    case "ROUND":
      if (opr.hasConstant) {
        sum =
          Math.ceil(_perviousOprationValue / opr.hasConstant) * opr.hasConstant;
      } else {
        // console.log(
        //   `Constant Value Not Provided, Round Will not use any constant`
        // );
        sum = Math.round(_perviousOprationValue);
      }
      break;
    default:
      // console.log(
      //   `Unknown Operation '${opr.operation}, SortOrder: ${opr.sortOrder}`
      // );
      break;
  }
  return sum;
}
