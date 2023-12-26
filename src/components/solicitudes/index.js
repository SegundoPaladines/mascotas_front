import React, { useEffect, useState } from "react";
import axios from "axios";
import { mostrarAlerta } from "../../functions";

const SolicitudesComponent = () => {

    const url = 'http://localhost:9000/solicitudes';
    const urlM = 'http://localhost:9000/mascotas';
    const [solicitudes, setSolicitudes] = useState([]);
    const [mascotas, setMascotas] = useState([]);

    useEffect(()=>{
        getSolicitudes();
        getMascotas();
    }, []);

    const getSolicitudes = async () => {
        const res = await axios.get(`${url}`);
        setSolicitudes(res.data);
    }

    const getMascotas = async () => {
        const res = await axios.get(`${urlM}`);
        setMascotas(res.data);
    }

    const getMascota = (pk) => {
        const mascota = mascotas.find((m) => m.pk === pk);
        if(mascota !== null){
            return mascota;
        }

        return null;
    }

    const limpiarSolicitudes = (mascotaPK) => {
        solicitudes.map(async (sol)=> {
            if(sol.mascotaPK === mascotaPK){
                const urlExtS = `${url}/actualizar/${sol.pk}`;
                const hoy = new Date();
                const fecha_fin = hoy.toISOString().split('T')[0];
                const params = {
                    estado:"R",
                    fecha_fin:fecha_fin
                }

                //rechazar todas las demás solicitudes
                await axios({method:'PUT', url:urlExtS, data:params});
            }
        });
    } 

    const acpetarSolicitud = async (mascotaPK, solicitudPK) =>{
        if(mascotaPK !== '' && solicitudPK !== ''){
            const urlExt = `${urlM}/actualizar/${mascotaPK}`;
            const parametros = {
                estado:1
            }

            //cambiar el estado de la mascota
            await axios({method:'PUT', url:urlExt, data:parametros}).then(async (res)=>{
                const urlExtS = `${url}/actualizar/${solicitudPK}`;
                const hoy = new Date();
                const fecha_fin = hoy.toISOString().split('T')[0];
                const params = {
                    estado:"A",
                    fecha_fin:fecha_fin
                }

                //primero se rechaza todas
                limpiarSolicitudes(mascotaPK);

                //cambiar el estado de la solicitud para aceptar solo esa
                await axios({method:'PUT', url:urlExtS, data:params}).then((res)=>{
                    mostrarAlerta(`Adopcion Hecha con exito`, 'success');
                    getSolicitudes();
                    getMascotas();
                }).catch((error)=> {
                    mostrarAlerta(`Error en la solicitud ${error}`, 'error');
                });
            }).catch((error)=> {
                mostrarAlerta(`Error en la solicitud ${error}`, 'error');
            });


        }else{
            mostrarAlerta("No se puede encontrar la mascota o al adoptante", "error");
        }
    }

    const rechazarSolicitud = async (pk) => {
        const urlExtS = `${url}/actualizar/${pk}`;
        const hoy = new Date();
        const fecha_fin = hoy.toISOString().split('T')[0];
        const params = {
            estado:"R",
            fecha_fin:fecha_fin
        }

        //actualizar los datos de la solicitud
        await axios({method:'PUT', url:urlExtS, data:params}).then((res)=>{
            mostrarAlerta(`Solicitud Rechazada Exitosamente`, 'success');
            getSolicitudes();
        }).catch((error)=> {
            mostrarAlerta(`Error en la solicitud ${error}`, 'error');
        });
    }

    const eliminarSolicitud = async(pk) => {
        const urlExtS = `${url}/eliminar/${pk}`;

        //actualizar los datos de la solicitud
        await axios({method:'DELETE', url:urlExtS}).then((res)=>{
            mostrarAlerta(`Solicitud Eliminada Exitosamente`, 'success');
            getSolicitudes();
        }).catch((error)=> {
            mostrarAlerta(`Error en la solicitud ${error}`, 'error');
        });
    }

    return (
        <div className="container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th >#</th>
                        <th >Adoptante</th>
                        <th >Mascota</th>
                        <th >Fecha de Solicitud</th>
                        <th colSpan={3}> Acciones </th>
                    </tr>
                </thead>
                    <tbody className="table-group-divider">
                        {
                            solicitudes.map((solicitud, index) => (
                                    <tr key={solicitud.pk}>
                                        <td>{index+1}</td>
                                        <td>{solicitud.adoptante}</td>
                                        <td>{
                                            getMascota(solicitud.mascotaPK)!== null?
                                                getMascota(solicitud.mascotaPK).nombre:
                                                "No Encontrada"
                                        }</td>
                                        <td>{solicitud.fecha_inicio}</td>
                                        {
                                           solicitud.estado==="P"?(
                                                <td>
                                                    <button
                                                        className="btn btn-success w-100"
                                                        onClick={(e) => acpetarSolicitud(solicitud.mascotaPK, solicitud.pk)}
                                                    >
                                                        <i className="fa-solid fa-check"></i>
                                                    </button>
                                                </td>
                                            ):""
                                        }
                                        {
                                            solicitud.estado==="P"?(
                                                <td>
                                                    <button
                                                        className="btn btn-danger w-100"
                                                        onClick={(e) => rechazarSolicitud(solicitud.pk)}
                                                    >
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </td>       
                                            ):""
                                        }
                                        {
                                            solicitud.estado==="A"?(
                                                <td colSpan={2}>
                                                    <div className="alert alert-success text-center" role="alert">
                                                        Mascota Adoptada en {solicitud.fecha_fin}
                                                    </div>
                                                </td>
                                            ):""
                                        }
                                        {
                                            solicitud.estado==="R"?(
                                                <td colSpan={2}>
                                                    <div className="alert alert-danger text-center" role="alert">
                                                        Esta Solicitud fue Rechazada en {solicitud.fecha_fin}
                                                    </div>
                                                </td>
                                            ):""
                                        }
                                        <td>
                                            <button
                                                className="btn btn-danger w-100"
                                                onClick={(e) => eliminarSolicitud(solicitud.pk)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
        </div>
    );
}

export default SolicitudesComponent;