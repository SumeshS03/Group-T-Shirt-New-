import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import {FormProvider} from '../src/ApiFunctions/FormContext';
import ScrollToTop from '../src/ApiFunctions/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/sumesh/grouptshirt/">
      <ScrollToTop /> 
        <App />
    </BrowserRouter>
  </React.StrictMode>

);



reportWebVitals();
