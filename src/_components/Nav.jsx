import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.less'
function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark ">
            <div className="navbar-nav">
                <NavLink to="/users" className="nav-item nav-link">Contatos</NavLink>
            </div>
        </nav>
    );
}

export { Nav };