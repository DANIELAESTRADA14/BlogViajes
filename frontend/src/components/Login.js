import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API;


export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate()

    const token = sessionStorage.getItem("token")
    console.log("This is your token", token)

    const handleRegister = async(e)=> {
        e.preventDefault()
        const res = await fetch(`${API}/token`, {
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
    }

    const handleClick = async (e) => {
        e.preventDefault()
        const resp = await fetch(`${API}/login`, {
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
        try {
            if (resp.status !== 200) {
                alert("User not found")
                return false
            }

            const data = await resp.json();
            console.log("this came from the backend", data)
            sessionStorage.setItem("token", data.access_token)

            navigate('/blog')


            return true;
        }
        catch (error) {
            console.error("There was an error!!", error)
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem("token")
        console.log("Login out")

    }


    useEffect(() => {
        handleLogout();

    }, [])

    return (

        <div className="row">
            <div>
                <h2>Login</h2>
                <br></br>
            </div>
            {token && token !== "" && token !== undefined ? ("You are logged with this token" + token)
                : (
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
                            <button onClick={handleClick} className="btn btn-primary btn-block" style={{ backgroundColor: "black" }}>
                                Login
                            </button>

                        </form>
                    </div>
                )}

            <div>
                <button onClick={handleLogout} className="btn btn-primary btn-block" style={{ backgroundColor: "black", marginTop: "10px" }}>
                    Logout
                </button>
            </div>
            <br /> <br /> <br /> <br />
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
                            <button onClick={handleRegister} className="btn btn-primary btn-block" style={{ backgroundColor: "black", justifyContent: "center"}}>
                                Register
                            </button>

                        </form>
                    </div>
        </div>


    )

}