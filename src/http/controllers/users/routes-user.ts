import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './autentificar'
import { perfile } from './perfile'
import { VerificarJwt } from '../../middlewares/verificar-jwt'
import { Refresh } from '../refresh'

export async function appRouteUser(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/auth', authenticate)
  app.patch('/refresh/token', Refresh)

  // ROTAS QUE NECESSITAM DE  UM USER AUTENTICADO
  app.get('/me', { onRequest: [VerificarJwt] }, perfile)
}
