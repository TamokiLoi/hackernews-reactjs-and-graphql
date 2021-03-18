import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { ArticlesContainer } from './containers/ArticlesContainer';

export function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:4000',
  });

  return (
    <ApolloProvider client={client}>
      <ArticlesContainer />
    </ApolloProvider>
  )
}