import React from 'react';
import { Navigate } from 'react-router-dom';

export const PublicRoutes = ({ children}) => {
    const user = sessionStorage.getItem("token")
    return user ? <Navigate to='/' /> : children
}