import Layout from "./Layout"
import api from "../services/api"
import { toast } from 'react-toastify';
import { useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

const formUser = () => {
    const inputName = useRef()
    const inputAge = useRef()
    const inputStreet = useRef()
    const inputNeighborhood = useRef()
    const inputCity = useRef()
    const inputBiography = useRef()
    const inputImage = useRef()
    
    const navigate = useNavigate()
    const { id } = useParams()

    const [update, setUpdate] = useState(false);

    useEffect(() => {
      if(id){
        setUpdate(true)
        api.get(`/users/${id}/`)
        .then((response) => {
          const user = response.data
          inputName.current.value = user.name
          inputAge.current.value = user.age
          inputStreet.current.value = user.street
          inputNeighborhood.current.value = user.neighborhood
          inputCity.current.value = user.city
          inputBiography.current.value = user.biography
        })
        .catch((error) => {
            console.log(error)
            toast.error("Erro ao carregar dados do cliente.")
        })
      }
    }, [id])
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("name", inputName.current.value);
        formData.append("age", inputAge.current.value);
        formData.append("street", inputStreet.current.value);
        formData.append("neighborhood", inputNeighborhood.current.value);
        formData.append("city", inputCity.current.value);
        formData.append("biography", inputBiography.current.value);

        if(inputImage.current.files[0]){
            formData.append("image", inputImage.current.files[0]);
        }

        try {
            if(id){
                await api.put(`/users/${id}/`, formData, {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Usuário atualizado com sucesso!");
                setTimeout(() => navigate("/list/users"), 2500);
            }
            else{
                await api.post("/users/create", formData, {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                });
    
                toast.success("Usuário cadastrado com sucesso!");
                setTimeout(() => navigate("/list/users"), 2500);
            }
        } catch (error) {
            toast.error("Não foi possível concluir a ação.");
            console.error(error);
        }
    };

    return(
        <Layout>
            <h1 className="text-center">{update ? 'Editar Usuário' : 'Adicionar Usuário'}</h1>
            <p className="text-center">
                {update ? 
                'Preencha o formulário com as informações para atualizar o usuário.' : 
                'Preencha o formulário com as informações para adicionar um usuário.'}
            </p> 

            <p className="text-center"><strong>{update ? '(Não é necessário escolher um arquivo novamente)' : ''}</strong></p>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Nome</span>
                    <input type="text" ref={inputName} className="form-control"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Idade</span>
                    <input type="number" ref={inputAge} className="form-control"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Rua</span>
                    <input type="text" ref={inputStreet} className="form-control"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Bairro</span>
                    <input type="text" ref={inputNeighborhood} className="form-control"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Cidade</span>
                    <input type="text" ref={inputCity} className="form-control" placeholder="Cidade/UF"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Biografia</span>
                    <textarea type="textarea" ref={inputBiography} className="form-control"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Imagem de Perfil</span>
                    <input type="file" ref={inputImage} accept="image/jpeg, image/png" className="form-control"/>
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn px-4 btn-primary" type="submit">Salvar</button>
                </div>
            </form>
        </Layout>
    )
}

export default formUser