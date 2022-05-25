import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft as fasCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { faCaretRight as fasCaretRight } from '@fortawesome/free-solid-svg-icons'
import './Paginacion.css'

/**Este componente sirve para realizar la paginación de los comentarios mostrados en el componente Blog */

export const Paginacion = ({ pagina, setPagina, maximo }) => {

    const [inputP, setInputP] = useState(1)

    const nextPage = () => {
        setInputP(parseInt(inputP) + 1)
        setPagina(parseInt(pagina) + 1)
    }

    const previousPage = () => {
        setInputP(parseInt(inputP) - 1)
        setPagina(parseInt(pagina) - 1)
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setPagina(parseInt(e.target.value))

            if (parseInt(e.target.value < 1) ||
                parseInt(e.target.value) > Math.ceil(maximo) ||
                isNaN(parseInt(e.target.value))) {
                    setPagina(1)
                    setInputP(1)
            } else {
                setPagina(parseInt(e.target.value))
            }
        }
    }

    const onChange = (e) => {
        setInputP(e.target.value)
    }

    return (
        <div className='container-2'>
            <button disabled={pagina === 1 || pagina < 1} className='btn-flecha' style={{ marginRight: "5px" }} onClick={previousPage}><FontAwesomeIcon icon={fasCaretLeft} /></button>
            <input className='numpg'
            onKeyDown={(e)=> onKeyDown(e)}
                value={inputP}
                name='page'
                onChange={(e) => onChange(e)}
            />
            <button disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}  className='btn-flecha' style={{ marginLeft: "5px" }} onClick={nextPage}><FontAwesomeIcon icon={fasCaretRight} /></button>
        </div>
    )
}