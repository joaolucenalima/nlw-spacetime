import fastify from 'fastify';
import cors from '@fastify/cors';

import { MemoriesRoutes } from './routes/memories';

const app = fastify();

app.register(cors, {
  origin: true
});
app.register(MemoriesRoutes);

app.listen({
  port: 3333,
}).then(() => {
  console.log("Servidor HTTP rodando em http://localhost:3333");
});

