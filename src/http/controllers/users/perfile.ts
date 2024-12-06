import { makeGetUser } from '@/services/factories/meke-buscar-user-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function perfile(request: FastifyRequest, reply: FastifyReply) {
  const getPerfile = makeGetUser()

  const { user } = await getPerfile.execute({
    userId: request.user.sub.toString(),
  })
  return reply.status(201).send({
    user: {
      ...user,
      password_has: undefined,
    },
  })
}
