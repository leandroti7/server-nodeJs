import { buildApp } from './src/app.js';

const app = buildApp();

// const server = fastify();
// await server.register(cors, {
//     origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
// });
// const result = await sql`SELECT NOW()`;
// console.log(result);


await app.listen({
    port: Number(process.env.PORT ?? 3333),
    host: '0.0.0.0'
});

