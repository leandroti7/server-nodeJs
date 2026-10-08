
import { z } from 'zod';
import {fastify} from 'fastify';
import cors from '@fastify/cors';

/**
 * Server setup envoirment local
 */
// import { MemoryDatabase } from './databases-memory.js';
// import { sql } from './db.js';

const server = fastify();
await server.register(cors, {
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
});
// const result = await sql`SELECT NOW()`;
// console.log(result);

/**
 * Server setup envoirment local
 */
// const database = new MemoryDatabase();

/**
 * Server setup envoirment production
 */
const { PostgresDatabase } = await import('./databases-postregres.js');
const database = new PostgresDatabase();


server.get('/videos', async (request, reply) => {
    const search = request.query.search
    const videos = await database.list(search)

    return videos;
})

server.post('/videos',  async (request, reply) => {
    const videoSchema = z.object ({
        title: z.string().min(3).max(50),
        description: z.string().nullable(),
        duration: z.number().min(1),
        url: z.string().url()
    })

    const parsedData = videoSchema.safeParse(request.body);

    if(!parsedData.success) {
        return reply.status(400).send({
            message: 'Dados inválidos',
            error: 'Invalid data',
            issues: parsedData.error.format()
        })
    }

    await database.create(parsedData.data);

    return reply.status(201).send() 
})

server.put('/videos/:id', async (request, reply) => {
    const iudSchema = z.string().uuid();

    const videoSchema = z.object ({
        title: z.string().min(3).max(50),
        description: z.string().nullable(),
        duration: z.number().min(1),
        url: z.string().url()
    })

    const parseId = iudSchema.safeParse(request.params.id);
    const bodyParse = videoSchema.safeParse(request.body);

    if (!parseId.success || !bodyParse.success) {
        return reply.status(400).send({
            errors: [
                ...parseId.success ? [] : parseId.error.issues,
                ...bodyParse.success ? [] : bodyParse.error.issues
            ]
        });
    }

   await database.update(parseId.data, bodyParse.data);

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const iudSchema = z.string().uuid().safeParse(request.params.id);
    
    await database.delete(iudSchema.data);
    return reply.status(204).send();
})

await server.listen({
    port: Number(process.env.PORT ?? 3333),
    host: '0.0.0.0'
});

