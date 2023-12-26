import React, { useEffect, useState } from "react";
import MascotaComponent from "../mascota";
import axios from "axios";

const ListaMascotasComponent = () => {

    const url = 'http://localhost:9000/mascotas';

    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        getMascotas();
    },[]);

    const getMascotas = async () => {
        const res = await axios.get(`${url}`);
        setMascotas(res.data);
    }

    return (
        <div className="container mt-2">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3" >
                {
                    mascotas.map((mascota, index)=>{
                        const data = {
                            pk:mascota.pk, 
                            nombre: mascota.nombre, 
                            edad: mascota.edad,
                            estado:mascota.estado,
                            tipo_mascota: mascota.tipo_mascota
                        }
                        return (
                            <div className="col mb-5" key={index +1}>
                                <MascotaComponent {...data} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ListaMascotasComponent;