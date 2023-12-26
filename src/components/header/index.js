import React from "react";
import "./index.css";

const HeaderComponent = () => {
    return (
        <div className="sticky-top">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button 
                        className="nav-link navbar-brand"
                    >Mascotas</button>
                    <button 
                        className="navbar-toggler" 
                        type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarTogglerDemo02" 
                        aria-controls="navbarTogglerDemo02" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div 
                        className="collapse navbar-collapse" 
                        id="navbarTogglerDemo02"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button 
                                    className="nav-link"
                                    disabled={window.location.pathname === "/"}
                                    onClick={(e) => {
                                        window.location = "http://localhost:3000/";
                                    }}
                                >Administrar Mascotas</button>
                            </li>
                            <li className="nav-item">
                                <button 
                                className="nav-link"
                                disabled={window.location.pathname === "/mascotas"}
                                onClick={(e) => {
                                    window.location = "http://localhost:3000/mascotas";
                                }}
                            >Adoptar Mascotas</button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="nav-link"
                                    disabled={window.location.pathname === "/solicitudes"}
                                    onClick={(e) => {
                                        window.location = "http://localhost:3000/solicitudes";
                                    }}
                                >Administrar Solicitudes</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default HeaderComponent;