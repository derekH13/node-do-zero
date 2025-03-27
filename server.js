import { fastify } from 'fastify'
import { DatabasePostgre } from './database-postgre.js'
import { log } from 'node:console'

const server = fastify()

const database = new DatabasePostgre()


// POST localhost:3333/video
server.post('/videos', async (request, response) => {

    const {title, description, duration} = request.body
    

    await database.create({
        title: title,
        description: description,
        duration: duration
    })


    return response.status(201).send()
})

// GET localhost:3333/video
server.get('/videos', async (request, response) => {

    // vai retornar o valor do query search
    const search = request.query.search

    
    const videos = await database.list(search)

    return videos
})

// PUT localhost:3333/video/34
server.put('/videos/:id', async (request, response) => {
    // pega o id passado no parametro
    const videoId = request.params.id

    const {title, description, duration} = request.body

    const videos = await database.update(videoId, 
        {
            title: title,
            description: description,
            duration: duration
        }
    )

    return response.status(204).send()
})

// DELETE localhost:3333/video/34
server.delete('/videos/:id', async (request, response) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return response.status(204).send()
})


//  vai procurar a variavel de hambiente ese não existir irá usar 3333
server.listen({
    port: process.env.PORT ?? 3333
})

