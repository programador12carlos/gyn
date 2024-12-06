import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeregisterservice } from '@/services/factories/meke-validar-checkin-service'

export async function CheckinValidar(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkinShema = z.object({
    checkinId: z.string(),
  })
  const { checkinId } = checkinShema.parse(request.params)
  const registrarservice = makeregisterservice()
  const { checkin } = await registrarservice.execute({
    checkinId,
  })
  return reply.status(201).send(checkin)
}
