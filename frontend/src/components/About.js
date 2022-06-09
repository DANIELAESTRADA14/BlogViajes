import blogIMG from '../assets/blog.jpg'
import souvenirIMG from '../assets/souvenir.jpg'
import reservaIMG from '../assets/reserva.jpg'
import { Context } from "../store/appContext";
import React from 'react'
import './About.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';


const API = process.env.REACT_APP_API;

export const About = () => {

    const { store, actions } = useContext(Context);

    return (
        <>
       
            <div className="container">
           
          
                <div className="row">
                    <div className="col-md-6 col-lg-4 col-12">
                       <div className="card-deck">
                       <div className="card mb-4">
                                <img className="card-img-top img-fluid" src={blogIMG} alt="Card image cap" />
                                <div className="card-body">
                                <Link className="navbar-brand" to="/blog"> ¡Postea!</Link>
                                    <p className="card-text">Cuéntanos tu experiencia y ayuda a más viajeros a llegar a muchos lugares.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 col-12">
                        <div className="card-deck">
                            <div className="card mb-4">
                                <img className="card-img-top img-fluid" src={souvenirIMG} alt="Card image cap" />
                                <div className="card-body">
                                    <h4 className="card-title">¡Compra!</h4>
                                    <p className="card-text">Muchos viajeros han traído souvenirs de diferentes lugares del mundo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 col-12">
                        <div className="card-deck">
                            <div className="card mb-4">
                                <img className="card-img-top img-fluid" src={reservaIMG} alt="Card image cap" />
                                <div className="card-body">
                                    <h4 className="card-title">¡Reserva!</h4>
                                    <p className="card-text">Seleccionamos los mejores lugares para tu estadia.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <div>
                <h2 style={{textAlign: "center"}}>Sobre Nostros</h2>
            </div>
            <div>
                <p> Portal Mochilero es el sitio web de viajeros en habla hispana con la mayor cantidad de información referida a viajes, mochileros y aventureros. Este proyecto viajero nació en el año 2011 y desde entonces motivamos a personas a viajar y vivir nuevas experiencias.

                    Recibimos en promedio 60.000 visitas mensuales tan solo en nuestra pagina web. A su vez contamos con grupos de viajeros en facebook con 900.000 miembros. Hoy día Mochileros el grupo más popular de viajeros en habla hispana con 3.100.000 millones de interacciones mensuales y proyección para llegar al millón de miembros en los próximos meses.

                    Contamos con una estructura armada de viajeros que nos envían notas, nos administran los grupos y somos considerados la mayor comunidad de mochileros y viajeros en la actualidad. Damos soporte totalmente gratuito a miles de viajeros cada mes con información y mensajes en tiempo real.</p>
            </div>
           
        </>

    )




}