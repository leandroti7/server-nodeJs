// src/errors/error-handlers.js
import { AppError } from './app-error.js';

export function registerErrorHandlers(app) {
    app.setNotFoundHandler((request, reply) => {
        return reply.code(404).send({
            error: {
                code: 'ROUTE_NOT_FOUND',
                message: 'Rota não encontrada'
            }
        });
    });

    app.setErrorHandler((error, request, reply) => {
        if (error instanceof AppError) {
            return reply.code(error.statusCode).send({
                error: {
                    code: error.code,
                    message: error.message,
                    details: error.details
                }
            });
        }

        // Fastify coloca erros de validação de JSON Schema em error.validation.
        if (error.validation) {
            return reply.code(400).send({
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Os dados enviados são inválidos',
                    details: error.validation
                }
            });
        }

        if (error.code === 'FST_ERR_CTP_INVALID_JSON_BODY') {
            return reply.code(400).send({
                error: {
                    code: 'INVALID_JSON',
                    message: 'O corpo enviado não contém um JSON válido'
                }
            });
        }

        request.log.error({ err: error }, 'Erro inesperado');

        return reply.code(500).send({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Ocorreu um erro interno'
            }
        });
    });
}