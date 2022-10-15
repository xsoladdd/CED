import React from 'react';
import { ApolloProvider as ApolloBuiltProvider } from '@apollo/client';
import { apolloClient } from './ApolloClient';

export const ApolloProvider: React.FC = ({ children }) => {
  return (
    <ApolloBuiltProvider client={apolloClient}>{children}</ApolloBuiltProvider>
  );
};
