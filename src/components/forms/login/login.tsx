import React, { FC, useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";

// Apollo
import { authStylist } from "../../../apollo/withApollo";

// Styles
import useStyles from "./styles";
interface loginFormComponentProps {
  onSubmitForm: (data: any) => void;
  disabled?: boolean;
}

const LoginFormComponent: FC<loginFormComponentProps> = ({
  onSubmitForm,
  disabled,
}) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    onSubmitForm(data);
  };

  return (
    <form>
      <Box className={classes.loginForm} id="admin-login-form" component="div">
        <Box mb={2}>
          <Typography variant="h6" component="h3">
            Admin Login
          </Typography>
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            inputRef={register({
              required: true,
            })}
            name="source"
            placeholder="Email/Mobile"
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            inputRef={register({
              required: true,
            })}
            type="password"
            name="password"
            placeholder="Password"
          />
        </Box>
        <Box mb={2}>
          <Button
            disabled={disabled}
            onClick={handleSubmit(onSubmit)}
            classes={{ root: classes.loginButton }}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Typography
        classes={{ root: classes.copyWriteLbl }}
        variant="body2"
        component="p"
        align="center"
      >
        ©{new Date().getFullYear()} Myperfect fit
      </Typography>
    </form>
  );
};

export default LoginFormComponent;
