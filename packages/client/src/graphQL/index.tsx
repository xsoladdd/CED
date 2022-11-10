import { ApolloProvider } from "@apollo/client";
import React from "react";
import { client } from "./helper";

const ApolloProviderWrapper: React.FC = ({ children }) => {
  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>,
    </>
  );
};
export default ApolloProviderWrapper;
