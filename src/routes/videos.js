import { z } from 'zod';
import { AppError } from '../errors/app-error.js';

export async function videoRoutes(app, { database }) {

     const videoSchema = z.object ({
        title: z.string().min(3).max(50),
        description: z.string().nullable(),
        duration: z.number().min(1),
        url: z.string().url()
    })


    app.get('/', async (request, reply) => {
        const search = request.query.search
        const videos = await database.list(search)

        return videos;
    })

    app.post('/', async(request, reply) => {

        const parsedData = videoSchema.safeParse(request.body);

        if(!parsedData.success) {
            throw new AppError(
                400,
                'VALIDATION_ERROR',
                'Os dados enviados são inválidos videos',
                parsedData.error.issues
            );
        }

        await database.create(parsedData.data);

        return reply.status(201).send()
    })

    app.put('/:id', async (request, reply) => {
        const idSchema = z.string().uuid();

        const parseId = idSchema.safeParse(request.params.id);
        const bodyParse = videoSchema.safeParse(request.body);

        const validationIssues = [
            ...(parseId.success ? [] : parseId.error.issues),
            ...(bodyParse.success ? [] : bodyParse.error.issues)
        ];

        if (!parseId.success || !bodyParse.success) {

            if (validationIssues.length > 0) {
                throw new AppError(
                    400,
                    'VALIDATION_ERROR',
                    'Os dados enviados são inválidos',
                    validationIssues
                );
            }
        }

        await database.update(parseId.data, bodyParse.data);

        return reply.status(204).send()
    })

    app.delete('/:id', async (request, reply) => {
        const idSchema = z.string().uuid()
        const parseId = idSchema.safeParse(request.params.id);

        if (!parseId.success) {
            throw new AppError(
                400,
                'VALIDATION_ERROR',
                'Os dados enviados são inválidos',
                parseId.error.issues
            );
        }

        await database.delete(parseId.data);
        return reply.status(204).send();
    });
}