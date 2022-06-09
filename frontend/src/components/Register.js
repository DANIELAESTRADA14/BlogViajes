import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API;


export const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate()

    const token = sessionStorage.getItem("token")
    console.log("This is your token", token)

    const handleRegister = async (e) => {
        e.preventDefault()
        const res = await fetch(`${API}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    username,
                    password
                }
            )
        })
        const data = await res.json();
        console.log(data)
        alert("Usuario registrado")
        navigate('/')
    }

    const handleLogin = () => {
        navigate('/')
    }

    return (

        <div className="row">
            <div>
                <h2>Register</h2>
                <br></br>
            </div>
            <div className="col-md-6">
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
                    <div>
                        <button onClick={handleRegister} className="btn btn-primary btn-block" style={{ backgroundColor: "black", justifyContent: "center", marginRight: "5px" }}>
                            Sing up
                        </button>
                        <button onClick={handleLogin} className="btn btn-primary btn-block" style={{ backgroundColor: "black", justifyContent: "center" }}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>


    )

}