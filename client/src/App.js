import logo from './logo.svg';
// importing CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
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
import React from 'react';

const client = new ApolloClient({
  uri: '/graphql',
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
