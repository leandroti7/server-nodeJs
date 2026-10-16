// src/app.js
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { registerErrorHandlers } from './errors/error-handlers.js';
import { videoRoutes } from './routes/videos.js';
import { PostgresDatabase } from '../databases-postregres.js';

/**
 * Server setup envoirment local
*/
// import { MemoryDatabase } from './databases-memory.js';
// import { sql } from './db.js';

export function buildApp() {
    const app = Fastify({ logger: true });

    /**
     * Server setup envoirment production
     */
    const database = new PostgresDatabase();

     /**
     * Server setup envoirment local
    */
    // const database = new MemoryDatabase();

    app.register(cors, {
        origin: process.env.FRONTEND_URL ?? 'http://localhost:3000'
    });

    registerErrorHandlers(app);
    app.register(videoRoutes, {
        prefix: '/videos',
        database
    });

    return app;
}