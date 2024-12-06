import { FastifyRequest, FastifyReply } from 'fastify'

export async function VerificarJwt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: 'Authentication error' })
  }
}
