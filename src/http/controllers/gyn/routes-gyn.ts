import { FastifyInstance } from 'fastify'
import { VerificarJwt } from '../../middlewares/verificar-jwt'
import { BuscarGyn } from './buscarGyn'
import { CreateGyn } from './create-gyn'
import { BuscarGynProxima } from './buscar-academia-proxima'
import { VerificarRole } from '@/http/middlewares/verificarRole'

export async function appRouteGyn(app: FastifyInstance) {
  app.addHook('onRequest', VerificarJwt) // executar a verificacao de jwt
  app.post('/gyn', { onRequest: [VerificarRole('ADMIN')] }, CreateGyn)
  app.get('/gyn/buscar', BuscarGyn)
  app.get('/gyn/proximas', BuscarGynProxima)
}
