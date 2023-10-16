import React from "react";
import { TextField, FormHelperText, makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { validate } from "../../../utils/validations";
import InputAdornment from '@material-ui/core/InputAdornment';




const useStyles = makeStyles((theme) => ({
  validationText: {
    color: `${theme.palette.error.main} !important`,
    marginTop: 5,
  },
}));

const TextInputField = ({
  inputRef,
  name,
  id,
  className,
  showError,
  errors,
  children,
  placeholder,
  onChange,
  type,
  value,
  multiline,
  rowsMax,
  readOnly,
  defaultValue,
  onBlur,
  endAdornment
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <React.Fragment>
      <TextField
        InputProps={{
          disableUnderline: true,
          readOnly: readOnly,
          endAdornment:endAdornment
          
        }}
        name={name}
        inputRef={inputRef}
        id={id}
        style={{
          border: validate(errors, name)
            ? `1px solid ${theme.palette.error.main}`
            : null,
        }}
        defaultValue={defaultValue}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        value={value}
        multiline={multiline}
        rowsMax={rowsMax}
        onBlur={onBlur}
      ></TextField>
      {showError && (
        <React.Fragment>
          {validate(errors, name) ? (
            <FormHelperText className={classes.validationText}>
              {errors[name].message}
            </FormHelperText>
          ) : (
            <React.Fragment>{children}</React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TextInputField;
