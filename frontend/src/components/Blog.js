import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Blog.css'
import { useNavigate } from 'react-router-dom';



const API = process.env.REACT_APP_API;

export const Blog = () => {

      let navigate = useNavigate()
     
     const [city, setCity] = useState('');
     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const [username, setUsername] = useState('');

     const [id, setId] = useState('')
     const [editing, setEditing] = useState(false)

     const [busqueda, setBusqueda] = useState('');

     const [registrosList, setRegistrosList] = useState([]);


     const handleSubmit = async (e) => {
          e.preventDefault()
          if (!editing) {
               const res = await fetch(`${API}/registros`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                         {
                              id,
                              city,
                              title,
                              description,
                              username
                         }
                    )
               })
               const data = await res.json();
               console.log(data)
          } else {
               const res = await fetch(`${API}/registro/${id}`, {
                    method: "PUT",
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                         {
                              id,
                              city,
                              title,
                              description,
                              username
                             
                         }
                    )
               })
               const data = await res.json();
               console.log(data)
               setEditing(false)
               setId('')
          }
          await getRegistros();

          setId('');
          setTitle('');
          setDescription('');
          setUsername('');
          setCity('');
     }

     const getRegistros = async () => {
          const res = await fetch(`${API}/registros`)
          const data = await res.json();

          console.log(data.registros);
          setRegistrosList(data.registros)
          
          
     }

     const editRegistro = async (id) => {
          const res = await fetch(`${API}/registro/${id}`)
          const data = await res.json();

          setEditing(true);
          setId(id)

          setTitle(data.title)
          setDescription(data.description)
          setUsername(data.username)
          setCity(data.city)
     }

     const deleteRegistro = async (id) => {
          const userRes = window.confirm('Are you sure you want to delete it?')
          if (userRes) {
               const res = await fetch(`${API}/registro/${id}`, {
                    method: "DELETE"
               })
               await res.json();
               await getRegistros();
          }
     }

     const handleChange = e => {
          setBusqueda(e.target.value)
         
     }

     let results = []
     if (!busqueda){
          results = registrosList
     } else {
         results = registrosList.filter((dato) => 
          dato.title.toLowerCase().includes(busqueda.toLowerCase())
          || dato.city.toLowerCase().includes(busqueda.toLowerCase())
         )}

     
    
     
     const clickTitle = (id) => {
          navigate('/info/' + id)
          
     }
     
     useEffect(() => {
          getRegistros();
     }, [])

     return (

          <div className="row">
               <div>
                    <h2>¡Postea tu experiencia!</h2>
                    <br></br>
               </div>
               <div className="col-md-12">
                    <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                              <input
                                   type="text"
                                   onChange={e => setCity(e.target.value)}
                                   value={city}
                                   className="form-control"
                                   placeholder="City"
                                   autoFocus
                              />
                         </div>
                         <br></br>
                         <div className="form-group">
                              <input
                                   type="text"
                                   onChange={e => setTitle(e.target.value)}
                                   value={title}
                                   className="form-control"
                                   placeholder="Title"
                                   autoFocus
                              />
                         </div>
                         <br></br>
                         <div className="form-group">
                              <textarea
                                   rows={10}
                                   type="text"
                                   onChange={e => setDescription(e.target.value)}
                                   value={description}
                                   className="form-control"
                                   placeholder="Description"
                              />
                         </div>
                         <br></br>
                         <div className="form-group">
                              <input
                                   type="text"
                                   onChange={e => setUsername(e.target.value)}
                                   value={username}
                                   className="form-control"
                                   placeholder="User name"
                              />
                         </div>
                         <br></br>
                         <button className="btn btn-primary btn-block" style={{ backgroundColor: "black" }}>
                              {editing ? 'Update' : 'Create'}
                         </button>
                    </form>
               </div>

               <div style={{ marginTop: "80px" }}>
                    <div className="containerInput">
                         <input
                              className="form-control inputBuscar"
                              value={busqueda}
                              placeholder="Buscar ciudad"
                              onChange={handleChange}
                         />
                         <button className="btn btn-success">
                              <FontAwesomeIcon icon={faSearch} />

                         </button>
                    </div>
                    <div className="col-md-12">
                         <table className="table table-bordered">
                              <thead>
                                   <tr>
                                   <th>Id</th>
                                        <th>City</th>
                                        <th>Title</th>
                                        <th>User name</th>
                                        <th>Operations</th>
                                       
                                   </tr>
                              </thead>
                              <tbody>

                                   {results.map((registro) => (
                                        <tr key={registro.id}>
                                             <td>{registro.id}</td>
                                             <td>{registro.city}</td>
                                             <td onClick={() => clickTitle(registro.id)} style={{textDecoration: "underline", cursor:"pointer"}}>{registro.title}</td>
                                             <td>{registro.username}</td>
                                            
                                             <td>
                                                  <button
                                                       className="btn btn-secondary btn-block"
                                                       onClick={() => editRegistro(registro.id)}
                                                  >
                                                       Edit
                                                  </button>
                                                  <button
                                                       className="btn btn-danger btn-block"
                                                       onClick={() => deleteRegistro(registro.id)}
                                                  >
                                                       Delete
                                                  </button>
                                                
                                             </td>
                                        </tr>
                                   ))
                                   }
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     )
}