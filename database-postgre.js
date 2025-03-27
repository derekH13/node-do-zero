import { randomUUID } from "node:crypto"

import {sql } from './db.js'

// criando um banco de dados em memoria

export class DatabasePostgre {
    #videos = new Map

    // retorna os videos
    async list(search){

        let videos

        if(search){
            videos = await sql`SELECT * FROM videos WHERE title like ${'%' + search + '%'}`
        }else{
            videos = await sql`SELECT * FROM videos`
        }

        return videos
        
    }
    
    // recebe um video e adiciona no array #videos
    async create(video){
        const videoId = randomUUID()

        const {title, description, duration} = video

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`

    }

    // o Map não permite keys iguais, então caso vc adicione outra com um valor que ja existe será substituida a antiga
    async update(id, video){
        const {title, description, duration} = video

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id){
        await sql`DELETE FROM videos WHERE id = ${id}`
    }
}