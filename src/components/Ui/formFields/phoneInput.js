import React from "react";
import { TextField } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const CustomPhoneInput = (props, ref) => {
  return (
    <TextField
      {...props}
      InputProps={{
        disableUnderline: true,
      }}
      inputRef={ref}
    />
  );
};

const PhoneInputField = ({ country, onChange, defaultValue }) => {
  return (
    <div className="input-phone-component-V2">
      <PhoneInput
        country={country}
        inputComponent={CustomPhoneInput}
        enableSearch={true}
        countryCodeEditable={false}
        onChange={onChange}
      />
    </div>
  );
};

export default PhoneInputField;
