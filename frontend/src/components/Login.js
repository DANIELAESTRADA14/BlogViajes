import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const API = process.env.REACT_APP_API;


export const Login = () => {

    const {store, actions} = useContext(Context)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate()

    
    console.log("This is your token", store.token)

    const handleClick = async (e) => {
        e.preventDefault()
        actions.login(username,password).then(() => {
            navigate('/')
        })
    }


   const handleRegister = () => {
        navigate('/register')
    }


    

    return (

        <div className="row">
            <div>
                <h2 style={{textAlign: "center", marginTop: "40px"}}>Login</h2>
                <br></br>
            </div>
            {(store.token && store.token !== "" && store.token !== undefined) ? (
                "You are logged with this token" + store.token
                ) : (
                    <div className="col-md-6" style={{margin: "auto"}}>
                        <form className="card card-body">
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="form-control"
                                    placeholder="Username"
                                    name='username'
                                    autoFocus
                                />
                            </div>
                            <br></br>
                            <div className="form-group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="Password"
                                    name='password'
                                    autoFocus
                                />
                            </div>

                            <br></br>
                            <button onClick={handleClick} className="btn btn-primary btn-block" style={{ backgroundColor: "black" }}>
                                Login
                            </button>

                        </form>
                    </div>
                )}

            <div style={{justifyContent: "center", display: "flex"}}>
                <button onClick={handleRegister} className="btn btn-primary btn-block" style={{ backgroundColor: "black", marginTop: "20px" }}>
                    Register
                </button>
            </div>
            <br /> 
          
        </div>


    )

}