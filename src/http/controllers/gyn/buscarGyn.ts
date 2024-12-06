import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeBuscargyn } from '@/services/factories/meke-buscar-gyms-service'

export async function BuscarGyn(request: FastifyRequest, reply: FastifyReply) {
  const gynshema = z.object({
    query: z.string(),
    pagina: z.coerce.number().min(1).default(1),
  })

  const { query, pagina } = gynshema.parse(request.query)

  const registrarservice = makeBuscargyn()
  const { gymList } = await registrarservice.Buscar({
    query,
    pagina,
  })
  return reply.status(201).send(gymList)
}
