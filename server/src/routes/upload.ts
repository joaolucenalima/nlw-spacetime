import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import { extname, resolve } from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pump = promisify(pipeline);

import { FastifyInstance } from "fastify";

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    try {
      const upload = await request.file({
        limits: {
          fileSize: 5_242_880 // 5mb
        }
      })

      if (!upload) {
        return reply.status(400).send()
      }

      const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
      const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

      if (!isValidFileFormat) {
        return reply.status(400).send('Formato inválido!')
      }

      const fileName = randomUUID().concat(extname(upload.filename))

      const writeStream = createWriteStream(
        resolve(__dirname, '../../uploads/', fileName)
      )

      await pump(upload.file, writeStream)

      const fullUrl = request.protocol.concat('://').concat(request.hostname)
      const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

      return fileUrl
    } catch (error) {
      console.log(error)
    }
  })
} 