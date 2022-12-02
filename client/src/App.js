import React from 'react';
import logo from './logo.svg';
// importing CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// I know it would look better if I just had the main files as index but i can't stand to navigate that
// Components for...
//    Header
import Header from './components/Header/Header'
import Nav from './components/Header/Nav/Nav';
//    Main
import About from './components/Main/About/About'
import Data from './components/Main/Data/Data';
import Home from './components/Main/Home/Home'
import Overlay from './components/Main/Overlay/Overlay';
import Settings from './components/Main/Settings/Settings';
//    Footer
import Footer from './components/Footer/Footer'
//    Errors
import NotFound from './components/Error/NotFound'

import { PreferenceProvider } from './utils/PreferenceContext';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// context or composition... https://reactjs.org/docs/context.html#before-you-use-context
// this too => https://reactrouter.com/en/main/components/link
function App() {

  const styles = {
    // the app render will fill the entire screen
    app: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      mindWidth: '100vh',
      maxHeight: 'max-content'
    },
    // this fills the empty space for main content
    body: {
      flex: '1 0 auto',
    },
  }
  // pages in lowercase regardless of language
  // see utils/capitalizeLocal
  const pages = [
    'home',
    'about',
    'overlay',
    'data',
    'settings',
  ]



  return (
    <div id='App' style={styles.app}>
      <ApolloProvider client={client}>
        <PreferenceProvider>
          <Router >
            {/* nested composition for the page change because it's simpler than context */}
            <Header >
              <Nav pages={pages} />
            </Header>
            {/* i could either keep this as a container for style and independently change the overlay to fullwidth
            or i could just make the a container-fluid already */}
            <div className='container-fluid' style={styles.body}>
              <Routes>
                <Route
                  // quick hack to handle the nav
                  index
                  element={<Home />}
                />
                <Route
                  // quick hack to handle the nav
                  path="/home"
                  element={<Home />}
                />
                {/* This does not work */}
                {/* {pages.map((page) => {
                return (
                  <Route path={`/${page}`}
                    element={<{page} />}
                  />
                )
              })} */}
                <Route path="/about"
                  element={<About />}
                />
                <Route path="/data"
                  element={<Data />}
                />
                <Route path="/settings"
                  element={<Settings />}
                />
                <Route path="/overlay"
                  element={<Overlay />}
                />
                <Route path='*'
                  element={<NotFound />}
                />
              </Routes>
            </div>
            <Footer />
          </Router>
        </PreferenceProvider>
      </ApolloProvider>
    </div >
  );
}

export default App;
