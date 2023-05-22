import 'dotenv/config';

import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

import { MemoriesRoutes } from './routes/memories';
import { authRoutes } from './routes/auth';

const app = fastify();

app.register(cors, {
  origin: true
});

app.register(jwt, {
  secret: 'nlwspacetimesecret',
});

app.register(MemoriesRoutes);
app.register(authRoutes);

app.listen({
  port: 3333,
}).then(() => {
  console.log("Servidor HTTP rodando em http://localhost:3333");
});

