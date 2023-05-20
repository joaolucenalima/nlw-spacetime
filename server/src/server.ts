import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const app = fastify();
const prisma = new PrismaClient();

app.get('/', async () => {

});

app.listen({
  port: 3333,
}).then(() => {
  console.log("Servidor HTTP rodando em http://localhost:3333");
});

