import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/styles/makeStyles";
import { NextPage } from "next";
// Apollo
import { authenticated } from "../../src/apollo/hoc/withAuthRedirect";
//Styles
// UI
import LoginFormComponent from "../../src/components/forms/login/login";
import LogoComponent from "../../src/components/Ui/logo";
import { signIn, useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { LOGIN_USER } from "../../src/apollo/queries/user";
import { GET_ACCESS_FILTER } from "../../src/apollo/queries/user";
import { useLazyQuery } from "@apollo/client";
import jwt_decode from "jwt-decode";
import { accessRoutes } from "../../src/utils/accessRoutes";


import _ from "lodash";

const useStyles = makeStyles((theme: any) => ({
  loginMainBox: {
    width: "100%",
    height: "100vh",
    backgroundColor: theme.palette.common.white,
    display: "flex",
  },
  leftSideImage: {
    flex: 1,
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  loginFormBox: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  return (
    <Box id="admin-login-page" className={classes.loginMainBox} component="div">
      <Box
        id="left-side-image"
        className={classes.leftSideImage}
        style={{
          backgroundImage: "url(/images/men_formal.png)",
        }}
        component="div"
      ></Box>
      <Box
        id="admin-login-form"
        className={classes.loginFormBox}
        component="div"
      >
        <Box pb={3}>
          <LogoComponent darkMode={true} />
        </Box>
        <LoginFormComponent
          disabled={isSubmit}
          onSubmitForm={async (data) => {
            setIsSubmit(true);
            const result = await signIn("credentials", {
              redirect: false,
              source: data.source,
              password: data.password,
            });
            if (result.error) {
              setIsSubmit(false);
              console.log(result.error);
              alert("Please enter valid mobile numer or email");
            } else {
              setIsSubmit(false);
              router.push("/");
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default authenticated({ Component: LoginPage });
