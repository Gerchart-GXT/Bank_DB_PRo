import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Router from './content/Router';
import {BrowserRouter, RouterProvider} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <div className="container">
          <Router></Router>
        </div>
      </BrowserRouter>

  </React.StrictMode>
);
