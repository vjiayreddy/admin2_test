import { ComponentType, FunctionComponent } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
// Apollo
import { GET_AUTH_STYLIST, GET_SINGLE_USER } from "../queries/user";
import { useQuery } from "@apollo/client";
// UI

interface options {
  Component: ComponentType<any>;
}

export const withSharedAuthData =
  ({ Component }: options) =>
  (props: any) => {
    const AuthWrapper: FunctionComponent | any = (props: any) => {
      const router = useRouter();
      const { data: { authStylist } = {} } = useQuery(GET_AUTH_STYLIST);
      const { data: { user } = {}, loading } = useQuery(GET_SINGLE_USER, {
        variables: { id: router.query.uid },
        skip: _.isEmpty(router.query.uid),
      });

      return (
        <Component
          {...props}
          authData={{
            stylist: authStylist,
            currentUser: user,
            loading: loading,
          }}
        />
      );
    };
    return <AuthWrapper {...props} />;
  };
