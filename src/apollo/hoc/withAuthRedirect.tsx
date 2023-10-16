import { Fragment, useEffect } from "react";
import { ComponentType, FunctionComponent } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
// Apollo
import { GET_AUTH_STYLIST, GET_SINGLE_USER } from "../queries/user";
import { useQuery } from "@apollo/client";
import { accessRoutes } from "../../utils/accessRoutes";
// UI
import RedirectComponent from "../../components/Ui/redirect";

interface options {
  Component: ComponentType<any>;
  redirect?: string;
  query?: any;
  baseUrl?: string;
}

export const nonAuthenticated =
  ({ Component, redirect, query, baseUrl }: options) =>
  (props: any) => {
    const AuthWrapper: FunctionComponent | any = (props: any) => {
      const router = useRouter();
      const { session, loading } = props;
      const { data: { user } = {}, loading: userLoading } = useQuery(
        GET_SINGLE_USER,
        {
          variables: { id: router.query.uid },
        }
      );

      if (!session && !loading) {
        return (
          <RedirectComponent
            to={redirect ? redirect : "/login"}
            query={query}
          />
        );
      }

      if (session && !loading) {
        const findRout = _.find(session.user.routes, (route) =>
          route.url.includes(baseUrl)
        );
        if (
          !_.isEmpty(findRout) ||
          router.pathname === "/" ||
          router.pathname === "/user_measurments" ||
          router.pathname === "/trial" ||
          router.pathname === "/qualitycheck" ||
          baseUrl === "/measurements" ||
          baseUrl === "/userInfo" ||
          baseUrl === "/grooming"
        ) {
          return (
            <Component
              {...props}
              user={{ loading: userLoading, data: user ? user : null }}
            />
          );
        } else {
          return <RedirectComponent to={"/accessDenied"} query={query} />;
        }
      }
      return <Fragment />;
    };
    return <AuthWrapper {...props} />;
  };

export const authenticated =
  ({ Component, redirect, query }: options) =>
  (props: any) => {
    const AuthWrapper: FunctionComponent | any = (props: any) => {
      const { session, loading } = props;
      const router = useRouter();
      if (session && !loading) {
        return (
          <RedirectComponent to={redirect ? redirect : "/"} query={query} />
        );
      }
      return (
        <Component
          {...props}
          authData={{
            stylist: null,
            currentUser: { _id: router.query.uid },
          }}
        />
      );
    };
    return <AuthWrapper {...props} />;
  };
