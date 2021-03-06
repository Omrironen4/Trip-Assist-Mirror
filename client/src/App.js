// import react dependencies
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import apollo dependencies
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import chakra dependencies
import { ChakraProvider } from '@chakra-ui/react';

// import pages and components
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SearchPOIs from './pages/SearchPOIs';
import SavedPOIs from './pages/SavedPOIs';

// create main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// create request middleware
const authLink = setContext((_, { headers }) => {
  // get the token from local storage
  const token = localStorage.getItem('id_token');

  // return the headers to the context
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// create Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ChakraProvider>
          <Nav />
          <Switch>
            <Route exact path='/' component={SearchPOIs} />
            <Route exact path='/savedPOIs' component={SavedPOIs} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
          <Footer />
        </ChakraProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
