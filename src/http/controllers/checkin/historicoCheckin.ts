import { MakeHistoryCheckin } from '@/services/factories/makeHistoryCheckinUser'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function HistoricoCheckinUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkinShema = z.object({
    pagina: z.number().min(1).default(1),
  })

  const { pagina } = checkinShema.parse(request.params)
  const registrarservice = MakeHistoryCheckin()
  const { CheckinList } = await registrarservice.listar({
    id: request.user.sub.toString(),
    pagina,
  })
  return reply.status(201).send(CheckinList)
}
