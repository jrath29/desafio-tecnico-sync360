import Layout from "../components/Layout"
import './Pages.scss'

const Home = () => {
    return(
        <Layout>
            <div className="d-flex justify-content-center align-items-center gap-5" id="home">
                <iframe id="iframeHome" src="https://lottie.host/embed/f1136c31-fb5f-47ea-b72c-7e59450fa082/B29JgzgviV.lottie"></iframe>
                <div>
                    <h1 className="text-center">Sistema de Usuários</h1>
                    <p className="text-center">Bem vindo! Aqui você pode gerenciar suas informações da melhor forma.</p>
                </div>
            </div>
        </Layout>
    )
}

export default Home