import express from 'express'
import cors from 'cors'
import axios from 'axios';
import { upload } from './uploadConfig.js'
import { PrismaClient } from './generated/prisma/index.js'
import FormData from 'form-data';

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())
app.listen(3000)

const IMGBB_API_KEY = '915a5a95a8b584b20959b383094682ee';

app.get('/users', async (req, res) => {
    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name
            }
        })
    }
    else{
        users = await prisma.user.findMany()
    }

    res.status(200).json(users) //200 - requisição deu certo
})

app.get('/users/:id', async (req, res) => {

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id),
            }
        })

        res.status(200).json(user) //200 - requisição deu certo
    }
    catch{
        return res.status(404).json({ message: 'Usuário não encontrado' })
    }

})

app.post('/users/create', upload.single('image'), async (req, res) => {

    let imageUrl = '';

    if (req.file) {
        const base64Image = req.file.buffer.toString('base64');

        const formData = new FormData();
        formData.append('key', IMGBB_API_KEY);
        formData.append('image', base64Image);

       const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: formData.getHeaders(),
        });

        imageUrl = response.data.data.url;
    }

    await prisma.user.create({
        data:{
            name: req.body.name,
            age: parseInt(req.body.age),
            street: req.body.street,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            biography: req.body.biography,
            imageUrl: imageUrl,
        }
    })

    res.status(201).json(req.body) //201 - criou
})

app.put('/users/:id', upload.single('image'), async (req, res) => {

    let imageUrl = req.body.imageUrl || '';

    if (req.file) {
        const base64Image = req.file.buffer.toString('base64');

        const formData = new FormData();
        formData.append('key', IMGBB_API_KEY);
        formData.append('image', base64Image);

       const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: formData.getHeaders(),
        });

        imageUrl = response.data.data.url;


        await prisma.user.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                name: req.body.name,
                age: parseInt(req.body.age),
                street: req.body.street,
                neighborhood: req.body.neighborhood,
                city: req.body.city,
                biography: req.body.biography,
                imageUrl: imageUrl,
            }
        })
    }
    else{
        await prisma.user.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:{
                name: req.body.name,
                age: parseInt(req.body.age),
                street: req.body.street,
                neighborhood: req.body.neighborhood,
                city: req.body.city,
                biography: req.body.biography,
            }
        })
    }

    res.status(201).json(req.body) //201 - criou
})

app.delete('/user/:id', async (req, res) => {
    await prisma.user.delete({
        where:{
            id: parseInt(req.params.id),
        }
    })

    res.status(200).json({ message: "Usuário deletado com sucesso!"})   
})