import _ from "lodash";
import parsePhoneNumber from "libphonenumber-js";
import moment from "moment";

export const validate = (errors, label) => {
  if (errors) {
    if (!_.isEmpty(errors) && _.has(errors, label)) {
      return true;
    } else {
      return false;
    }
  }
};

export const checkIsMobileOrEmail = (value, countryCode) => {
  if (!_.isEmpty(value)) {
    let mobileNumber = parsePhoneNumber(`+${countryCode}${value}`);
    const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    if (emailRegx === false) {
      if (_.isUndefined(mobileNumber)) {
        return "Enter a valid Mobile Number / Email ID.";
      } else {
        var reg = /^\d+$/;
        if (
          reg.test(value) === false ||
          parsePhoneNumber(mobileNumber.number).isValid() === false
        ) {
          return "Enter a valid Mobile Number / Email ID.";
        }
      }
    }
  }
};

export const getMobileOrEmail = (value, countryCode) => {
  if (!_.isEmpty(value)) {
    let mobileNumber = parsePhoneNumber(`+${countryCode}${value}`);
    const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    if (emailRegx === false) {
      if (_.isUndefined(mobileNumber)) {
        return "Invalid Mobile No/ Email ID";
      } else {
        var reg = /^\d+$/;
        if (
          reg.test(value) === false ||
          parsePhoneNumber(mobileNumber.number).isValid() === false
        ) {
          return "Invalid Mobile No/ Email ID";
        } else {
          return {
            isEmail: false,
            source: mobileNumber.nationalNumber,
          };
        }
      }
    } else {
      return {
        isEmail: true,
        source: value,
      };
    }
  }
};

export const checkMobileValidation = (value) => {
  if (!_.isEmpty(value)) {
    let mobileNumber = parsePhoneNumber(`+${value}`);
    if (_.isUndefined(mobileNumber)) {
      return "Enter a valid Mobile Number";
    } else {
      if (parsePhoneNumber(mobileNumber.number).isValid() === false) {
        return "Enter a valid Mobile Number";
      }
    }
  } else {
    return "Enter a valid Mobile Number";
  }
};

// Validation Schema

export const passwordValidation = {
  required: {
    value: true,
    message: `Please enter a password with at least 8 characters
      including alphabets, numbers and at least 1 special
      character.`,
  },
  minLength: {
    value: 8,
    message: `Please enter a password with at least 8 characters
      including alphabets, numbers and at least 1 special
      character.`,
  },
  pattern: {
    value:
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,100}$/,
    message: `Please enter a password with at least 8 characters
      including alphabets, numbers and at least 1 special
      character.`,
  },
};

export const emailValidation = {
  required: {
    value: true,
    message: "Enter a valid Email address",
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Enter a valid Email address",
  },
};

export const otpValidation = {
  required: {
    value: true,
    message: "Enter a valid OTP",
  },
  minLength: { value: 6, message: "Enter a valid OTP" },
  maxLength: { value: 6, message: "Enter a valid OTP" },
  pattern: {
    value: /^\d+$/,
    message: "Enter a valid OTP",
  },
};

export const extractDateFormate = (date) => {
  var extractDate = moment(date, "YYYY/MM/DD");
  var month = extractDate.format("M");
  var day = extractDate.format("D");
  var year = extractDate.format("YYYY");
  var hour = Number(moment(date).format("h"));
  var minitues = Number(moment(date).format("m"));

  return {
    day: Number(day),
    month: Number(month),
    year: Number(year),
    hour: Number(hour),
    minute: Number(minitues),
    timestamp: date,
    datestamp:
      year -
      2000 +
      "" +
      ((month < 10 ? "0" : "") + month) +
      "" +
      ((day < 10 ? "0" : "") + day) +
      "" +
      ((hour < 10 ? "0" : "") + hour) +
      "" +
      ((minitues < 10 ? "0" : "") + minitues),
  };
};
export const startDateFIlter = (date) => {
  var extractDate = moment(date, "YYYY/MM/DD");
  var month = extractDate.format("M");
  var day = extractDate.format("D");
  var year = extractDate.format("YYYY");
  return {
    day: Number(day),
    month: Number(month),
    year: Number(year),
    hour: 0,
    minute: 0,
    timestamp: date,
    datestamp:
      year -
      2000 +
      "" +
      ((month < 10 ? "0" : "") + month) +
      "" +
      ((day < 10 ? "0" : "") + day) +
      "" +
      "00" +
      "" +
      "00",
  };
};
export const endDateFIlter = (date) => {
  var extractDate = moment(date, "YYYY/MM/DD");
  var month = extractDate.format("M");
  var day = extractDate.format("D");
  var year = extractDate.format("YYYY");

  return {
    day: Number(day),
    month: Number(month),
    year: Number(year),
    hour: 23,
    minute: 59,
    timestamp: date,
    datestamp:
      year -
      2000 +
      "" +
      ((month < 10 ? "0" : "") + month) +
      "" +
      ((day < 10 ? "0" : "") + day) +
      "" +
      "23" +
      "" +
      "59",
  };
};

export const extractAppointDateFormate = (date, selectedTime) => {
  var extractDate = moment(date, "YYYY/MM/DD");
  var month = extractDate.format("M");
  var day = extractDate.format("D");
  var year = extractDate.format("YYYY");
  var hour = moment(selectedTime, "HH:mm:ss").get("hour");
  var minitues = moment(selectedTime, "HH:mm:ss").get("minute");

  return {
    day: Number(day),
    month: Number(month),
    year: Number(year),
    hour: Number(hour),
    minute: Number(minitues),
    timestamp: new Date(date).toISOString(),
    datestamp:
      year -
      2000 +
      "" +
      ((month < 10 ? "0" : "") + month) +
      "" +
      ((day < 10 ? "0" : "") + day) +
      "" +
      ((hour < 10 ? "0" : "") + hour) +
      "" +
      ((minitues < 10 ? "0" : "") + minitues),
  };
};

export const getCountryCode = (mobile) => {
  const _info = parsePhoneNumber(`+${mobile}`);
  if (!_.isEmpty(_info)) {
    return {
      country: _info.country ? _info.country.toLocaleLowerCase() : "in",
      countryCode: _info.countryCallingCode ? _info.countryCallingCode : "91",
    };
  } else {
    return {
      country: "in",
      countryCode: "91",
    };
  }
};

export const extractDateFormateForAnalytics = (date, type) => {
  var extractDate = moment(date, "YYYY/MM/DD");
  var month = extractDate.format("M");
  var day = extractDate.format("D");

  var year = extractDate.format("YYYY");
  var hour = type === "START_DATE" ? 0 : 23;
  var minitues = type === "START_DATE" ? 0 : 59;

  return {
    day: Number(day),
    month: Number(month),
    year: Number(year),
    hour: Number(hour),
    minute: Number(minitues),
    timestamp: date,
    datestamp:
      year -
      2000 +
      "" +
      ((month < 10 ? "0" : "") + month) +
      "" +
      ((day < 10 ? "0" : "") + day) +
      "" +
      ((hour < 10 ? "0" : "") + hour) +
      "" +
      ((minitues < 10 ? "0" : "") + minitues),
  };
};
