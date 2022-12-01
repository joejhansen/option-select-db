import logo from './logo.svg';
// importing CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'

import { PageProvider } from './utils/PageContext';
import { PreferenceProvider } from './utils/PreferenceContext';



function App() {
  return (
    <div id='App'>
      <PreferenceProvider>
        <PageProvider>
          <Header />
          <Main />
          <Footer />
        </PageProvider>
      </PreferenceProvider>
    </div>
  );
}

export default App;
