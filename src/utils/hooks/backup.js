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

export function useMeasurmentsFormula(reset) {
  const [selectedCatId, setSelectedCatId] = useState();

  const [
    getSavedUserMeasurments,
    { loading: loadingGSUM, data: dataGSUM, variables },
  ] = useLazyQuery(GET_USER_MEASURMENTS, {
    onCompleted(data) {},
  });

  const measurmentConfig = JSON.parse(localStorage.getItem("mesurment_config"));
  const getUserMeasurments = async (
    depCatId,
    selCatId,
    measurmentOptions,
    measurmentType,
    subcatId,
    userId
  ) => {
    setSelectedCatId(selCatId);

    await getSavedUserMeasurments({
      variables: {
        userId: userId,
        catId: depCatId,
        subCat: subcatId,
        measurmentOptions: measurmentOptions,
        measurmentType: measurmentType,
      },
      fetchPolicy: "network-only",
    });
  };

  useEffect(() => {
    if (!_.isEmpty(measurmentConfig) && !_.isEmpty(dataGSUM)) {
      const { getUserMeasurements } = dataGSUM;
      if (!_.isEmpty(getUserMeasurements)) {
        let whichCatId = null;
        measurmentConfig.catIdMap.map((item) => {
          item.outputCatIds.map((opt) => {
            if (opt === selectedCatId) {
              whichCatId = item;
              return;
            }
          });
        });

        if (!_.isEmpty(whichCatId)) {
          console.log("found whichCatId", whichCatId);
          var opts = {};
          var matchedOption = [];
          var cfg = measurmentConfig.config.categories.find(
            (c) => c.catId == whichCatId.inputCatId
          );

          const found_cat = !_.isEmpty(getUserMeasurements[0])
            ? getUserMeasurements[0]
            : getUserMeasurements[1];

          if (cfg && found_cat) {
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
                      variables.measurmentOptions[findIndex][
                        "isCommonMeasurment"
                      ] = true;
                    }
                    _found_formula = { ...op, input_name: inp.name };
                    return false;
                  }
                });
              });
              if (_found_formula && found_cat) {
                console.log(
                  "_found_formula",
                  _found_formula,
                  "found_cat",
                  found_cat
                );
                var opt_val_obj = found_cat.options.find(
                  (c) => c.name == _found_formula.input_name
                );

                if (!_.isEmpty(opt_val_obj)) {
                  let opValue =
                    _found_formula.operation === "ADD"
                      ? opt_val_obj.value + _found_formula.value
                      : opt_val_obj.value - _found_formula.value;
                  if (variables.measurmentType === "inches") {
                    var opStr = !_.isNull(opValue)
                      ? opValue.toString().split(".")
                      : "0.0"; //12.5
                    opts[_found_formula.name] = Number(opStr[0]);
                    opts["isSelected"] = true;
                    opts[_found_formula.name + "_size"] = convertToOption(
                      Number(opStr[1])
                    );
                    matchedOption.push(opts);
                    reset(opts);
                  } else {
                    let opStr = converInchToCm(opValue);
                    opts[_found_formula.name] = Number(opStr);
                    opts[_found_formula.name + "_size"] = 0;
                    opts["isSelected"] = true;
                    matchedOption.push(opts);
                    reset(opts);
                  }
                }
              } else {
                console.log("did not find anything");
              }
            });
          }
        }
      }
    }
  }, [dataGSUM]);

  return {
    getUserMeasurments,
    loadingGSUM,
  };
}
