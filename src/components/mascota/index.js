import React, { useState } from "react";
import axios from "axios";
import { mostrarAlerta } from "../../functions";

const MascotaComponent = ({pk, nombre, edad, tipo_mascota, estado}) => {

    const url = "http://localhost:9000/solicitudes/crear/";
    const [adoptante, setAdoptante] = useState('');

    const validar = () => {

        if(adoptante === ''){
            mostrarAlerta("Debe escribir su nombre");
        }else{
            console.log(adoptante);
            const hoy = new Date();
            const fecha_inicio = hoy.toISOString().split('T')[0];
            const parametros = {
                mascotaPK:pk,
                adoptante:adoptante,
                estado:"A",
                fecha_inicio:fecha_inicio
            }
            enviarSolicitud('POST', url, parametros);
        }
    }

    const enviarSolicitud = async (metodo, url, parametros) => {
        await axios({method:metodo, url:url, data:parametros}).then((res)=> {
            mostrarAlerta(res.data.mensaje, 'success');
        }).catch((error)=>{
            console.log(parametros);
            mostrarAlerta(`Error en la solicitud ${error}`, 'error');
        });
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title text-center">{nombre}</h5>
                <p className="card-text text-center">{
                    tipo_mascota === "P"?("Perro"):("Gato")
                }</p>
                <hr />
                <p className="card-text text-center">Edad: {edad} años.</p>
                {estado === 1?(
                        <div class="alert alert-success text-center" role="alert">
                            Esta mascota ya fue Adoptada
                        </div>
                    ):(
                        <button 
                            className="btn btn-success w-100"
                            disabled={estado===1}
                            data-bs-toggle = "modal"
                            data-bs-target = {`#mascotasModal${pk}`}
                        >
                            Adoptar
                        </button>
                    )
                }
            </div>
            
            <div className="modal fade" 
                id={`mascotasModal${pk}`} 
                tabIndex="-1" 
                aria-labelledby="modal"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`titulomascotasModal${pk}`}>Proceso de Adopcion de {nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                id={`mascota${pk}adopcion`}
                                className="form-control"
                                placeholder="Ingrese su Nombre"
                                value={adoptante}
                                onChange={(e) => setAdoptante(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                            >Cancelar</button>
                            <button 
                                type="button" 
                                className="btn btn-success"
                                onClick={(e) => validar()}
                            >Adoptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MascotaComponent;