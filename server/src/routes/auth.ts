import axios from 'axios';
import { FastifyInstance } from "fastify";
import { z } from 'zod';

import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {

  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null, /* corpo da requisição */
      {
        params: { /* parametros da url */
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json', /* formato da resposta */
        }
      }
    )

    const { access_token } = accessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url()
    })


    const userData = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: userData.id,
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userData.id,
          login: userData.login,
          name: userData.name,
          avatarUrl: userData.avatar_url
        }
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '7 days',
      },
    )

    return {
      token
    }
  })

} 