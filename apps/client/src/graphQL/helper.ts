import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { GRAPHQL_URI } from "../helper/global";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
// import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  // console.log(`graphQLErrors`, graphQLErrors);
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // console.log(`err.extensions.code`, err.extensions.code);
      switch (err.extensions.code) {
        // Apollo Server sets code to UNAUTHENTICATED
        // when an AuthenticationError is thrown in a resolver
        case "TOKEN_EXPIRE_ERROR":
          if (window.location.pathname !== "/") {
            window.location.pathname = "/";
          }
      }
    }
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-and-network",
    },
  },
});
