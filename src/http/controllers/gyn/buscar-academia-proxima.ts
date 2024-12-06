import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makerAcademiaProxima } from '@/services/factories/meke-get-listgym-proximo'

export async function BuscarGynProxima(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const gynshema = z.object({
      latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
      longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
    })

    const { latitude, longitude } = gynshema.parse(request.query)
    const registrarservice = makerAcademiaProxima()
    const { gymList } = await registrarservice.BuscarGymProximo({
      latitude,
      longitude,
    })

    console.log('Resultado GymList:', gymList) // Log do resultado

    return reply.status(201).send(gymList)
  } catch (error) {
    console.error('Erro no handler:', error) // Log do erro
    return reply.status(500).send({ message: 'Erro interno do servidor.' })
  }
}
