import { randomUUID } from "node:crypto"

// criando um banco de dados em memoria

export class DatabaseMemory {
    #videos = new Map

    // retorna os videos
    list(search){
        // array.from para retornar um array
        return Array.from(this.#videos.entries())
        .map((videosArray) => {
            const id = videosArray[0]
            const data = videosArray[1]

            return {
                id,
                ...data,
            }
        })
        .filter(video => {
            if(search){
                return video.title.includes(search)
            }

            return video
        })

    }
    
    // recebe um video e adiciona no array #videos
    create(video){
        // randomUUID gera um id unico
        const videoId = randomUUID()

        this.#videos.set(videoId, video)
    }

    // o Map não permite keys iguais, então caso vc adicione outra com um valor que ja existe será substituida a antiga
    update(id, video){
        this.#videos.set(id, video)
    }

    delete(id){
        this.#videos.delete(id)
    }
}