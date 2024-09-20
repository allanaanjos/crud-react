import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css';

function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                               <Link to='/' className='nav-link'>Usuários</Link>
                            </li>
                            <li className="nav-item">
                               <Link to='/criar' className='nav-link'>Cadastrar</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar