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
  return valCm; // 55.5 //141 cm
};

export const measurmentFormula = (
  measurmentOptions,
  selectProduct,
  measurmentType,
  convertToOption,
  converInchToCm,
  reset
) => {
  const measurmentConfig = JSON.parse(localStorage.getItem("mesurment_config"));
  let local_measurments = [];

  const selected_shirt_measurments = JSON.parse(
    localStorage.getItem("shirt_measurments")
  );
  const selected_trouser_measurments = JSON.parse(
    localStorage.getItem("trouser_measurments")
  );

  if (
    !_.isEmpty(selected_shirt_measurments) &&
    !_.isEmpty(selected_trouser_measurments)
  ) {
    local_measurments = [
      selected_shirt_measurments,
      selected_trouser_measurments,
    ];
  } else {
    if (
      !_.isEmpty(selected_shirt_measurments) ||
      !_.isEmpty(selected_trouser_measurments)
    ) {
      local_measurments = !_.isEmpty(selected_shirt_measurments)
        ? [selected_shirt_measurments]
        : [selected_trouser_measurments];
    }
  }

  if (!_.isEmpty(measurmentConfig) && !_.isEmpty(local_measurments)) {
    let whichCatId = {};
    measurmentConfig.catIdMap.map((item) => {
      item.outputCatIds.map((opt) => {
        if (opt === selectProduct) {
          whichCatId = item;
          return;
        }
      });
    });

    if (!_.isEmpty(whichCatId)) {
      var opts = {};
      var matchedOption = [];
      var cfg = measurmentConfig.config.categories.find(
        (c) => c.catId == whichCatId.inputCatId
      );
      var found_cat = local_measurments.find((c) => {
        return c.catId == whichCatId.inputCatId;
      });

      if (cfg && found_cat) {
        measurmentOptions.forEach((opt) => {
          var opValue = 0;
          var _found_formula;
          cfg.inputs.forEach((inp) => {
            inp.outputs.forEach((op) => {
              if (op.name == opt.name) {
                const findIndex = _.findIndex(
                  measurmentOptions,
                  (option) => option.name === op.name
                );
                if (findIndex !== -1) {
                  measurmentOptions[findIndex]["isCommonMeasurment"] = true;
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
              var opValue =
                _found_formula.operation === "ADD"
                  ? opt_val_obj.value + _found_formula.value
                  : opt_val_obj.value - _found_formula.value;
              if (measurmentType === "inches") {
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
                var opStr = converInchToCm(opValue);
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
};

export const mapUserMeasurments = (options, measurmentType) => {
  var opts = {};
  options.forEach((op) => {
    var opStr = null;
    if (measurmentType === "inches") {
      var opStr = !_.isNull(op.value) ? op.value.toString().split(".") : "0.0"; //12.5
    } else {
      var opStr = converInchToCm(op.value);
    }
    opts[op.name] =
      measurmentType === "inches" ? Number(opStr[0]) : Number(opStr);
    opts[op.name + "_size"] =
      measurmentType === "inches"
        ? !_.isEmpty(convertToOption(Number(opStr[1])))
          ? convertToOption(Number(opStr[1]))
          : 0
        : 0;
  });
  return opts;
};

export const mapMeasurmentPayload = (options) => {
  var opts = {};
  options.forEach((op) => {
    opts[op.name] = 0;
    opts[op.name + "_size"] = 0;
  });
  return opts;
};
