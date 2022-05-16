import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API;

export const Blog = () => {

     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const [username, setUsername] = useState('');

     const [id, setId] = useState('')
     const [editing, setEditing] = useState(false)

     const [registrosList, setRegistrosList] = useState([]);


     const handleSubmit = async (e) => {
          e.preventDefault()
          if(!editing){
               const res = await fetch(`${API}/registros`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                         {
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

          setTitle('');
          setDescription('');
          setUsername(''); 
     }

     const getRegistros = async () => {
          const res = await fetch(`${API}/registros`)
          const data = await res.json();
          setRegistrosList(data.registros)
     }

     

     const editRegistro = async (id) => {
         const res = await fetch( `${API}/registro/${id}`)
         const data = await res.json();
          
         setEditing(true);
         setId(id)

         setTitle(data.title)
         setDescription(data.description)
         setUsername(data.username)
     }

     const deleteRegistro = async (id) => {
         const userRes = window.confirm('Are you sure you want to delete it?')
         if(userRes){
               const res = await fetch( `${API}/registro/${id}`, { 
               method: "DELETE"
               })
               await res.json();
               await getRegistros();
         } 
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
               <div className="col-md-12">

                    <table className="table table-bordered">
                         <thead>
                              <tr>
                                   <th>Title</th>
                                   <th>Description</th>
                                   <th>User name</th>
                                   <th>Operations</th>
                              </tr>
                         </thead>
                         <tbody>

                              {registrosList.map((registro) => (
                                   <tr key={registro.id}>
                                        <td>{registro.title}</td>
                                        <td>{registro.description}</td>
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
     )
}