// import {createServer} from 'http';

// const server = createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

//     res.write('Servidor rodando agora timem!\n');

//     res.end();
// });

// server.listen(3333, () => {
//     console.log('Servidor rodando na porta 3333');
// })


import {fastify} from 'fastify';
// import { MemoryDatabase } from './databases-memory.js';
// import { sql } from './db.js';

const server = fastify();
// const result = await sql`SELECT NOW()`;
// console.log(result);

// const database = new MemoryDatabase();
const { PostgresDatabase } = await import('./databases-postregres.js');
const database = new PostgresDatabase();



server.post('/videos',  async (request, reply) => {
    const { title, description, duration, url } = request.body;
    await database.create({
        title,
        description,
        duration,
        url
    })

    return reply.status(201).send() 
})

server.get('/videos', async (request, reply) => {
    const search = request.query.search
    const videos = await database.list(search)

    // console.log('search', search)

    return videos;
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration, url } = request.body;

    await database.update(videoId, {
        title,
        description,
        duration, 
        url
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;
    await database.delete(videoId);
    return reply.status(204).send();
})

await server.listen({
    port: Number(process.env.PORT ?? 3333),
    host: '0.0.0.0'
});

