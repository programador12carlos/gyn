import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateCheckin } from '@/services/factories/make-create-checkin-services'

export async function checkinCreate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const gynIdParamtsschima = z.object({
    ginId: z.string(),
  })

  const checkinShema = z.object({
    ginId: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { ginId } = gynIdParamtsschima.parse(request.params)
  const { latitude, longitude } = checkinShema.parse(request.body)
  const registrarservice = makeCreateCheckin()
  const { checkin } = await registrarservice.execute({
    ginId,
    latitude,
    longitude,
    userId: request.user.sub.toString(),
  })
  return reply.status(201).send(checkin)
}
