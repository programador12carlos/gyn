import { FastifyInstance } from 'fastify'
import { VerificarJwt } from '../../middlewares/verificar-jwt'
import { checkinCreate } from './create'
import { CheckinValidar } from './validarCheckin'
import { HistoricoCheckinUser } from './historicoCheckin'
import { CheckinUser } from './checkinUser'

export async function appRouteChecin(app: FastifyInstance) {
  app.addHook('onRequest', VerificarJwt) // executar a verificacao de jwt
  app.post('/checkin/:ginID/checkin', checkinCreate)
  app.get('/checkin/checkinuser', CheckinUser)
  app.get('/checkin/historico', HistoricoCheckinUser)
  app.patch('/checkin/:checkinId/validar', CheckinValidar)
}
