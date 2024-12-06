import { FastifyReply, FastifyRequest } from 'fastify'

export function VerificarRole(roleVerificar: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user

    if (!user || user.role !== roleVerificar) {
      return reply.status(403).send({ message: 'Unauthorized access' })
    }
  }
}
