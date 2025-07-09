import { useState, useEffect } from 'react';
import api from '../services/api'
import Layout from "../components/Layout"
import './Pages.scss'
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';

const Users = () => {
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const getUsers = async () => {
        const res = await api.get('/users')
        setUsers(res.data)
    }

    const deleteUser = async (id) => {
        try{
            await api.delete(`/user/${id}`)
            await getUsers()
            toast.success("Usuário deletado com sucesso!")
        } catch(error){
            toast.error("Não foi possível concluir a ação")
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return(
        <Layout>
            <div className="d-flex flex-wrap justify-content-center gap-5" id="cards">
                {users.length < 1 ? (
                    <div className='justify-content-center text-center'>
                        <p className="text-center">Nenhum usuário cadastrado. Comece cadastrando o primeiro para ser o administrador do sistema.</p>
                        <a href="/user/create" className='btn btn-primary'>Cadastrar</a>
                    </div>
                ) : (
                    users.map(user => (
                    <div className="card" key={user.id}>
                        <div className="card-body">
                            <img src={user.imageUrl}/>
                            <h5 className="card-title pt-4">{user.name}</h5>
                            <p className="card-text">{user.biography}</p>
                            <button className="btn btn-primary  mb-2" onClick={() => handleOpenModal(user)}>
                                Detalhes
                            </button>
                            <div className="d-flex justify-content-center gap-3">
                                <Link to={`/user/${user.id}`} className="btn btn-warning">
                                    <BsFillPencilFill/>&nbsp;
                                    Editar
                                </Link>
                                {user.id == 1 ? (
                                    <>
                                        <button className="btn btn-danger" disabled>
                                            <BsFillTrashFill/>&nbsp;
                                            Excluir
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => deleteUser(user.id)} className="btn btn-danger">
                                            <BsFillTrashFill/>&nbsp;
                                            Excluir
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <Modal user={selectedUser}
                        isOpen={open}
                        onClose={handleCloseModal}/>
                    </div>
                    ))
                )}
            </div>
        </Layout>
    )
}

export default Users