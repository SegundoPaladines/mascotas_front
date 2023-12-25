import React from "react";

const MascotaComponent = ({pk, nombre, edad, tipo_mascota}) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title text-center">{nombre}</h5>
                <p className="card-text text-center">{tipo_mascota}</p>
                <hr />
                <p className="card-text text-center">Edad: {edad} años.</p>
                <button className="btn btn-success w-100"> 
                    Adoptar {pk}
                </button>
            </div>
        </div>
    );
}

export default MascotaComponent;