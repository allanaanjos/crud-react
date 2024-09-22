import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css';

function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink
                                    to='/'
                                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                                >
                                    Usuários
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to='/criar'
                                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                                >
                                    Cadastrar
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar