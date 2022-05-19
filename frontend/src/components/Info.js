import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = process.env.REACT_APP_API;


export const Info = () => {

    const { blog_id } = useParams();

    const [item, setItem] = useState([])
    const [name, setName] = useState('')
    const [coment, setComent] = useState('')

    const [comentList, setComentList] = useState([]);
    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!editing) {
             const res = await fetch(`${API}/comentarios`, {
                  method: 'POST',
                  headers: {
                       'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(
                       {
                           id,
                           name,
                           coment,
                           blog_id
                       }
                  )
             })
             const data = await res.json();
        } else {
             const res = await fetch(`${API}/comentario/${id}`, {
                  method: "PUT",
                  headers: {
                       'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(
                       {
                            id,
                            name,
                            coment,
                            blog_id
                       }
                  )
             })
             const data = await res.json();
             setEditing(false)
             setId('')
        }
        await getComents();

        setId('');
        setName('');
        setComent('');

}

const getComents = async() => {
    const res =  await fetch(`${API}/comentarios/${blog_id}`)
    const data = await res.json()
    setComentList(data.comentarios)
  }


  const editComent= async (id) => {
    const res = await fetch(`${API}/comentario/${id}`)
    const data = await res.json();

    setEditing(true)
    setId(data.id)
    setName(data.name)
    setComent(data.coment)
}

  const deleteComent = async (id) => {
    const userRes = window.confirm('Are you sure you want to delete it?')
    if (userRes) {
         const res = await fetch(`${API}/comentario/${id}`, {
              method: "DELETE"
         })
         await res.json();
         await getComents();
    }
}

useEffect(() => {
    getRegistroId();
    getComents();
  
}, [])

const getRegistroId = async () => {
    const res = await fetch(`${API}/registro/${blog_id}`)
    const data = await res.json()
    setItem(data)
}



return (
    <>

        <div className="container">
            <br />
            <h1>{item.title}</h1>
            <br></br>
            <h3> City: {item.city}</h3>
            <p>By: {item.username}</p>
            <br></br>
            <p>{item.description}</p>
            

        </div>

<hr></hr>
<br/><br/><br/><br/><br/><br/><br/><br/><br/>

        <div className="row">
            <div>
                <h2>¡Deja tu comentario!</h2>
                <br></br>
            </div>
            <div className="col-md-12">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Name"
                            autoFocus
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={e => setComent(e.target.value)}
                            value={coment}
                            className="form-control"
                            placeholder="Coment"
                            autoFocus
                        />
                    </div>
                    <br></br>
                         <button className="btn btn-primary btn-block" style={{ backgroundColor: "black" }}>
                         {editing ? 'Update' : 'Create'}
                         </button>
                </form>
            </div>

            <div style={{ marginTop: "80px" }}>
                
                <div className="col-md-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Coment</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {comentList.map((coment) => (
                                <tr key={coment.id}>
                                    <td>{coment.id}</td>
                                    <td>{coment.name}</td>
                                    <td>{coment.coment}</td>
                                   <td>
                                        
                                    <button
                                                       className="btn btn-secondary btn-block"
                                                       onClick={() => editComent(coment.id)}
                                                  >
                                                       Edit
                                                  </button>
                                                  <button
                                                       className="btn btn-danger btn-block"
                                                       onClick={() => deleteComent(coment.id)}
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
    </>
)
}


export default Info;