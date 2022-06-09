import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({children}) => {

    const user = sessionStorage.getItem("token")

    return user ? children:  <Navigate to='/login' /> 
}
