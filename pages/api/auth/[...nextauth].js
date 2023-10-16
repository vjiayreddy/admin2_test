import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { apolloClient } from "../../../src/apollo/withApollo";
import {
  LOGIN_USER,
  GET_ACCESS_FILTER,
  GET_ALL_RESOURCES,
} from "../../../src/apollo/queries/user";
import jwt_decode from "jwt-decode";
import _ from "lodash";
import { accessRoutes } from "../../../src/utils/accessRoutes";

const resetSessionData = async (tokenData, session, user) => {
  let accessFilters = [];
  let menuList = [];
  let roles = [];

  const { data, loading, error } = await apolloClient.query({
    query: GET_ACCESS_FILTER,
    variables: {
      roleName: tokenData.role,
    },
  });

  if (data && !loading) {
    data.getAccessFilter.map((item) => {
      item.resource.map((_item) => {
        accessFilters.push({ ..._item });
      });
    });
  }

  if (accessFilters.length > 0) {
    accessFilters.map((resource) => {
      const findRoute = _.find(
        accessRoutes,
        (item) => item.resource === resource.name
      );
      if (findRoute) {
        menuList.push(findRoute);
      }
    });
  }

  if (!_.isEmpty(tokenData.teams) && tokenData.teams.length > 0) {
    tokenData.teams.map((item) => {
      roles.push({
        _id: item._id,
        roleIdentifier: item.roleIdentifier,
      });
    });
  }

  session.user["role"] = tokenData.role;
  session.user["_id"] = tokenData._id;
  session.user["token"] = user.name;
  session.user["name"] = tokenData.firstName + " " + tokenData.lastName;
  session.user["firstName"] = tokenData.firstName;
  session.user["lastName"] = tokenData.lastName;
  session.user["email"] = tokenData.email;
  session.user["phone"] = tokenData.phone;
  session.user["countryCode"] = tokenData.countryCode;
  session.user["images"] = tokenData.images;
  session.user["tags"] = tokenData.tags;
  session.user["isMobileVerified"] = tokenData.isMobileVerified;
  session.user["isEmailVerified"] = tokenData.isEmailVerified;
  session.user["routes"] = menuList.length > 0 ? menuList : [];
  session.user["teams"] = roles;
  return session;
};

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { data, loading } = await apolloClient.query({
          query: LOGIN_USER,
          variables: {
            source: credentials.source,
            password: credentials.password,
          },
        });
        if (data) {
          return {
            name: data.login.token,
          };
        } else {
          throw new Error("Could not log you in!");
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      return Promise.resolve(user);
    },
    async session(session, user) {
      const tokenData = jwt_decode(user.name);
      return Promise.resolve(resetSessionData(tokenData, session, user));
    },
  },
});
