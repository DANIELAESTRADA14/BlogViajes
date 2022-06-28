import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => { 

    const {store, actions} = useContext(Context)

    return ( 
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/blog">Blog viajero</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

                <li className="nav-item">
                    <Link className="nav-link" to="/">About us</Link>
                </li>

                <li className="nav-item" style={{position: "absolute", right: "100px"}}>
                   {!store.token ? 
                    <Link className="nav-link" to="/login">Login</Link>
                    : 
                    <button className="nav-link" onClick={() => actions.logout()}>Logout</button>
                }</li>

                <li className="nav-item" style={{position: "absolute", right: "0px"}}>
                    <Link className="nav-link" to="/register">Sing up</Link>
                </li>


            </ul>
            <ul className="navbar-nav">
            </ul>

        </div>

    </nav>
)
}