import { FastifyRequest, FastifyReply } from 'fastify'
import { makeTotalCheckin } from '@/services/factories/meke-get-totl-checkin-service'

export async function CheckinUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registrarservice = makeTotalCheckin()
  const { totalCheckin } = await registrarservice.listar({
    id: request.user.sub.toString(),
  })
  return reply.status(201).send(totalCheckin)
}
