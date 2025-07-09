import './Components.scss'
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import api from '../services/api';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {

    const[users, setUsers] = useState([])

    const getUsers = async () => {
        const res = await api.get('/users')
        setUsers(res.data)
    }

    useEffect(() => {
        getUsers()
    }, [])
    
    return(
        <div id="layout">
            <nav className="navbar navbar-expand-lg bg-body-tertiary p-3" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Sistema de Usuários</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/list/users">Listar Usuários</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/user/create">Adicionar Usuário</a>
                            </li>
                        </ul>

                        {users.length > 0 ? (
                            <>
                                <a href="/profile" className="btn btn-primary px-4">
                                    <FaUserCircle/>&nbsp;
                                    Perfil
                                </a>
                            </>
                        ) : (
                            <></>
                        )
                        }
                    </div>
                </div>
            </nav>

            <div className="container py-5" id="container">
                { children }
                <ToastContainer
                hideProgressBar={true}
                theme= "colored"/>
            </div>
        </div>
    )
}

export default Layout