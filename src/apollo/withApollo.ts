import { session } from "next-auth/client";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  ApolloLink,
  from,
  makeVar,
  concat,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTliNWYzMzJkYWNiMzEyYmM2MzE1YTQiLCJyb2xlIjpbImFkbWluIl0sImZpcnN0TmFtZSI6IkFkbWluIiwibGFzdE5hbWUiOiJTdHlsaXN0IiwiZW1haWwiOiJhZG1pbkBteXBlcmZlY3RmaXQuY28uaW4iLCJwaG9uZSI6Ijg1MjQ2NzkxMzAiLCJsYXN0bm90aWZpZWQiOnsiZGF5IjoyMCwibW9udGgiOjIsInllYXIiOjIwMjAsImhvdXIiOjExLCJtaW51dGUiOjU1fSwiaW1hZ2VzIjp7Im90aGVyIjpbXSwicHJvZmlsZSI6Imh0dHBzOi8vbXBmLXB1YmxpYy1kYXRhLnMzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS9JbWFnZXMvTVBGVXNlckltYWdlcy81ZTE2ZmUyN2M1YzRlNzE3ZDAzYWU2YjQvNWUxNzBkMmFjNWM0ZTcxN2QwM2FlNmJiLmpwZyIsImNvdmVyIjoiaHR0cHM6Ly9tcGYtcHVibGljLWRhdGEuczMuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL0ltYWdlcy9NUEZVc2VySW1hZ2VzLzVlMTZmZTI3YzVjNGU3MTdkMDNhZTZiNC81ZTE3MGQxZmM1YzRlNzE3ZDAzYWU2YmEuanBnIn0sInRhZ3MiOltdLCJwc2dFeGlzdHMiOmZhbHNlLCJpc01vYmlsZVZlcmlmaWVkIjpmYWxzZSwiaXNFbWFpbFZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNjM3NTcyNDczMTE3fQ.-MImNmTJ9f6fEUUhnO_hiTdwBSxdws7CNKAypP67tn8`;

export const authStylist = makeVar({});

// const httpLink: HttpLink = new HttpLink({
//   uri: process.env.APOLLO_API,
// });

const httpLink: HttpLink = createUploadLink({
  fetch,
   uri: process.env.APOLLO_API,
  // url: "https://api3.myperfectfit.in:5679/graphql",
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  },
  mutate: {
    errorPolicy: "all",
  },
};

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: token,
    },
  });

  return forward(operation);
});

// const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     if (typeof window !== "undefined") {
//       graphQLErrors.forEach(({ message }) => {
//         alert(`Error: ${message}`);
//       });
//     }
//   }
//   if (networkError) {
//     if (typeof window !== "undefined") {
//       alert(`[Network error]: ${networkError}`);
//     }
//   }
// });

export const apolloClient: ApolloClient<NormalizedCacheObject> =
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "network-only",
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
    link: from([authMiddleware, httpLink]),
    //link: from([httpLink]),
    cache: new InMemoryCache({
      addTypename: false,
      typePolicies: {
        Query: {
          fields: {
            authStylist: {
              read() {
                if (typeof window !== "undefined") {
                  const authId = window.localStorage.getItem("authId");
                  authStylist(authId);
                }
                return authStylist();
              },
            },
          },
        },
      },
    }),
    resolvers: {},
  });
