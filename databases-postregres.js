import { sql } from "./db.js";

export class PostgresDatabase {
     async list(search) {
       let videos

       if(search) {
        videos = await sql `SELECT * FROM videos WHERE title LIKE ${`%` + search + `%`}`
       } else {
        videos = await sql `SELECT * FROM videos`
       }

       return videos
    }

    async create(video) {
       await sql`INSERT INTO videos (title, description, duration, url) VALUES (${video.title}, ${video.description}, ${video.duration}, ${video.url})`
    }

    async update(id, video) {
        await sql`UPDATE videos SET title = ${video.title}, description = ${video.description}, duration = ${video.duration}, url = ${video.url} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`DELETE FROM videos WHERE id = ${id}`
    }
}

