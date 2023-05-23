import 'dotenv/config';
import { resolve } from 'path';

import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';

import { authRoutes } from './routes/auth';
import { uploadRoutes } from './routes/upload';
import { memoriesRoutes } from './routes/memories';

const app = fastify();

app.register(cors, {
  origin: true
});

app.register(multipart);

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
});

app.register(jwt, {
  secret: 'nlwspacetimesecret',
});

app.register(authRoutes);
app.register(uploadRoutes);
app.register(memoriesRoutes);

app.listen({
  port: 3333,
}).then(() => {
  console.log("Servidor HTTP rodando em http://localhost:3333");
});

