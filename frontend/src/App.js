import React from "react";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import { Login } from "./components/Login";
import injectContext from "./store/appContext";
import { PublicRoutes } from "./Routes/PublicRoute";
import { PrivateRoutes } from "./Routes/PrivateRouter";
import { AppRouter } from "./Routes/AppRouter";



function App() {

  const basename = process.env.BASENAME || "";

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/login" element={ 

          <PublicRoutes>
            <Login/>
          </PublicRoutes>
          }
        />
        

        <Route
        path="/*"
        element={
          <PrivateRoutes>
            <AppRouter/>
          </PrivateRoutes>
        }
        />
      </Routes>
   </BrowserRouter>
  );
}

export default injectContext(App);