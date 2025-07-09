import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Users from '../pages/Users'
import FormUser from '../components/formUser'

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/list/users' element={<Users/>}/>
            <Route path='/user/create' element={<FormUser/>}/>
            <Route path='/user/:id' element={<FormUser/>}/>
        </Routes>
    </BrowserRouter>
)

export default AppRoutes