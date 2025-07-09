import Layout from "../components/Layout"
import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"
import { BsFillPencilFill } from "react-icons/bs";
import './Pages.scss'

const Profile = () =>{
    const [user, setUser] = useState(null)

    const getUser = async () => {
        const res = await api.get('/users/1')
        setUser(res.data)
    }

    useEffect(() => {
        getUser()
    }, [])

    return(
        <Layout>
            {user ? (
                <div className="d-flex justify-content-center" id="profile">
                    <iframe src="https://lottie.host/embed/9ee8f1ee-829f-4a67-95be-9ef00627298d/kjmbuFsFzw.lottie"></iframe>
                    <div>
                        <div className="text-center">
                            <img src={user.imageUrl} alt="Foto de perfil" className="img-profile"/>
                            <h2 className="pt-4">{user.name}</h2> <hr/>
                        </div>

                        <div className="text-left">
                            <p><strong>Idade:</strong> {user.age}</p>
                            <p><strong>Endereço:</strong> {user.street}, {user.neighborhood}, {user.city}</p>
                            <p><strong>Biografia:</strong> {user.biography}</p>
                        </div>

                        <Link to={`/user/${user.id}`} className="btn btn-primary w-100 mt-3">
                            <BsFillPencilFill/>&nbsp;
                            Editar
                        </Link>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </Layout>
    )
}

export default Profile