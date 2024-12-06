import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function AuthAuthorization(app: FastifyInstance, isAdmin = false) {
  // Limpa usuários anteriores
  await prisma.user.deleteMany({})

  const email = 'grr@gmail.com'
  const password = '123456'

  await prisma.user.create({
    data: {
      name: 'carlos romao',
      email,
      password_has: await hash(password, 6), // Hash da senha correta
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const auth = await request(app.server).post('/auth').send({
    email,
    password,
  })

  const { token } = auth.body
  return { token }
}
