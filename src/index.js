import React from "react";
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext";
import FavoritesContextProvider from "./contexts/FavoritesContext";
import FetchContextProvider from "./contexts/FetchContext";

import "./index.css";

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FetchContextProvider>
        <AuthContextProvider>           {/* envuelvo la app con el AuthContext */}
          <FavoritesContextProvider>
            <App />
          </FavoritesContextProvider>
        </AuthContextProvider>
      </FetchContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


/*
CONFIGURACION VIEJA:

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
); */



/* 
Configuracion nueva segun React: https://es.reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
 */