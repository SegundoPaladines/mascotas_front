import React from "react";
import MascotaComponent from "../mascota";

const ListaMascotasComponent = () => {

    const datosMascota = {
        pk:1,
        nombre: "Firulais",
        edad: 3,
        tipo_mascota: "Perro"
    };

    return (
        <div className="container mt-5">
            <div className="row row-cols-3" >
                <div className="col" >
                    <MascotaComponent {...datosMascota} />
                </div>
            </div>
            
        </div>
    );
}

export default ListaMascotasComponent;