import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom';
import { LanguageProvider } from "./context/language/LanguageProvider";
import { ConfigurationProvider } from "./context/configuration/ConfigurationProvider";
import '../node_modules/primeicons/primeicons.css';
import '../node_modules/primeflex/primeflex.css';
import '../node_modules/primereact/resources/themes/vela-blue/theme.css';
import '../node_modules/primereact/resources/primereact.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(
  <ConfigurationProvider>
    <LanguageProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </LanguageProvider>
  </ConfigurationProvider>,
  document.getElementById('root'),
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
