import { FastifyInstance } from "fastify"
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {

  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request) => {

    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        date: 'asc',
      }
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        content: memory.content,
      }
    })
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(401).send('Acesso não-autorizado.')
    }

    return memory
  })

  app.post('/memories', async (request) => {
    try {
      const bodySchema = z.object({
        content: z.string(),
        coverUrl: z.string(),
        date: z.string(),
        isPublic: z.coerce.boolean().default(false),
      })

      const { content, coverUrl, isPublic, date } = bodySchema.parse(request.body)

      const memory = await prisma.memory.create({
        data: {
          content,
          coverUrl,
          date,
          isPublic,
          userId: request.user.sub,
        }
      })

      return memory
    } catch (error) {
      console.log(error)
    }
  })

  app.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      date: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, date, isPublic } = bodySchema.parse(request.body)

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send("Você não tem autorização para editar!")
    }

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        isPublic,
        coverUrl,
        content,
        date
      }
    })

    return memory
  })

  app.delete('/memories/:id', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramsSchema.parse(request.params)

      const memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id,
        }
      })

      if (memory.userId !== request.user.sub) {
        return reply.status(401).send()
      }

      await prisma.memory.delete({
        where: {
          id,
        }
      })
    } catch (error) {
      console.log(error)
    }
  })

}