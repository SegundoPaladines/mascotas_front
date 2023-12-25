import React, { useEffect, useState } from "react";
import axios from 'axios';
import { mostrarAlerta } from "../../functions";
import Swal from 'sweetalert2';
import  withReactContent from 'sweetalert2-react-content';

const MascotasComponent = () => {

    const url = 'http://localhost:9000/mascotas';

    const [mascotas, setMascotas] = useState([]);

    const [pk, setPk] = useState('');
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [estado, setEstado] = useState('');
    const [tipo, setTipo] = useState('');
    const [operacion, setOperacion] = useState('');
    const [titulo, setTitulo] = useState('');

    useEffect(() => {
        getMascotas();
    }, []);    

    const getMascotas = async () => {
        const res = await axios.get(`${url}`);
        setMascotas(res.data);
    }

    const openModal = (opcion, pk, nombre, edad, estado, tipo) => {
        setPk('');
        setNombre('');
        setEdad('');
        setEstado('');
        setTipo('');
        setOperacion(opcion);

        if(opcion === 1){
            setTitulo("Registrar Mascota");
        }else if(opcion === 2){
            setTitulo("Editar Mascota");
            setPk(pk);
            setNombre(nombre);
            setEdad(edad);
            setEstado(estado);
            setTipo(tipo);
        }
    }

    const validar = () => {
        let parametros;
        let metodo;
        
        if(nombre.trim === ''){
            console.log("debe escribir un nombre");
            mostrarAlerta("debe escribir un nombre");
        }
        else if (edad.trim === ''){
            console.log("debe escribir una edad");
            mostrarAlerta("debe escribir una edad");
        }
        else if (estado.trim === ''){
            console.log("debe escribir un estado");
            mostrarAlerta("debe escribir un estado");
        }
        else if (tipo.trim === ''){
            console.log("debe escribir un tipo");
            mostrarAlerta("debe escribir un tipo");
        }else{
            if(operacion === 1){
                parametros ={
                    urlExt:`${url}/crear`,
                    nombre:nombre.trim(),
                    edad:edad.trim(),
                    tipo_mascota:tipo.trim(),
                    estado:estado.trim()
                }
                metodo = "POST";
            }else {
                parametros ={
                    urlExt:`${url}/actualizar/${pk}`,
                    nombre:nombre.trim(),
                    edad:edad,
                    tipo_mascota:tipo.trim(),
                    estado:estado
                }
                metodo = "PUT";

            }
            enviarSolicitud(metodo, parametros);
        }
    }

    const enviarSolicitud = async (metodo, parametros) => {
        await axios({method:metodo, url: parametros.urlExt, data:parametros})
        .then((respuesta) => {
            let tp = respuesta.data.tipo;
            let mensaje = respuesta.data.mensaje;
            mostrarAlerta(tp, mensaje);
            if(tp === "success"){
                document.getElementById("btnCerrarModal").click();
                getMascotas();
            }
        }).catch((error)=>{
            mostrarAlerta(`Error en la solicitud ${error}`, 'error');
        });
    }

    const eliminarMascota = (pk, nombre) => {
        const MySual = withReactContent(Swal);
        MySual.fire({
            title:`¿Está seguro de eliminar a la mascota ${nombre} ?`,
            icon:'question',
            text:'El registro se eliminará definitivamente',
            showCancelButton: "Cancelar",
            showConfirmButton: "Si, eliminar"
        }).then((result) => {
            if(result.isConfirmed){
                setPk(pk);
                enviarSolicitud("DELETE", {urlExt: `${url}/eliminar/${pk}`});
            }
        });
    }

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <button
                            className="btn btn-dark"
                            data-bs-toggle="modal"
                            data-bs-target="#modalMascotas"
                            onClick={(e) => openModal(1)}
                            >
                                <i className="fa-solid fa-circle-plus"></i>Añadir
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>NOMBRE</th>
                                    <th>EDAD</th>
                                    <th>Tipo de Mascota</th>
                                    <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {
                                        mascotas.map((mascota, index) => (
                                            <tr key={mascota.pk}>
                                                <td>{index+1}</td>
                                                <td>{mascota.nombre}</td>
                                                <td>{mascota.edad}</td>
                                                <td> 
                                                    {mascota.tipo_mascota === "P"?
                                                        (<p>Perro</p>):
                                                        (<p>Gato</p>)
                                                    }
                                                </td>
                                                <td>
                                                    {mascota.estado === 1?
                                                        (<p>Adoptado</p>):
                                                        (<p>Lista para Adoptar</p>)
                                                    }</td>
                                                <td>
                                                    <button
                                                        className="btn btn-info"
                                                        data-bs-toggle = "modal"
                                                        data-bs-target = "#modalMascotas"
                                                        onClick={(e) => openModal(2, mascota.pk, mascota.nombre, mascota.edad, mascota.estado, mascota.tipo_mascota)}
                                                    ><i className="fa-solid fa-edit"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={(e) => eliminarMascota(mascota.pk, mascota.nombre)}
                                                        className="btn btn-danger"
                                                    ><i className="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modalMascotas" className="modal fade" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{titulo}</label>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id="id"></input>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-gift"></i>
                                </span>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="form-control"
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                ></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-gift"></i>
                                </span>
                                <input
                                    type="text"
                                    id="edad"
                                    className="form-control"
                                    placeholder="Edad"
                                    value={edad}
                                    onChange={(e) => setEdad(e.target.value)}
                                ></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-gift"></i>
                                </span>
                                <input
                                    type="text"
                                    id="estado"
                                    className="form-control"
                                    placeholder="Estado"
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                ></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-gift"></i>
                                </span>
                                <input
                                    type="text"
                                    id="tipo"
                                    className="form-control"
                                    placeholder="Tipo"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                ></input>
                            </div>
                            <div className="d-grid col-6 mx-auto">
                                <button 
                                    className="btn btn-success"
                                    onClick={(e) => validar()}
                                >
                                    <i className="fa-solid fa-floppy-disk"></i>Guardar
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                            id="btnCerrarModal"
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            >
                            Cerrar
                            </button>
                        </div>
                    </div>
                </div>
                <button></button>
            </div>
        </div>
    );
}

export default MascotasComponent;