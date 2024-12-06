import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { appRouteUser } from './http/controllers/users/routes-user'
import { ZodError } from 'zod'
import { env } from './env'
import { VerificarEmailUsuario } from './services/erros/erro-email'
import { VerificarAuthError } from './services/erros/erroauth'
import { appRouteGyn } from './http/controllers/gyn/routes-gyn'
import { appRouteChecin } from './http/controllers/checkin/route-checkin'

export const app = fastify()

// Configurar JWT
app.register(fastifyJwt, {
  secret: env.CHAVEJWT, // Substitua pelo segredo real
  cookie: {
    cookieName: 'RefreshCookie', // Nome do cookie deve ser igual ao utilizado no setCookie
    signed: false, // Cookies não assinados
  },
  sign: {
    expiresIn: '10m', // Expiração do token
  },
})

// Configurar Cookies
app.register(fastifyCookie)

// Registrar Rotas
app.register(appRouteUser)
app.register(appRouteGyn)
app.register(appRouteChecin)

// Tratador de erros
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Erro ao validar dados.',
      issues: error.format(),
    })
  }

  if (error instanceof VerificarEmailUsuario) {
    return reply.status(409).send({ message: 'E-mail já está em uso.' })
  }

  if (error instanceof VerificarAuthError) {
    return reply.status(400).send({ message: 'Verifique senha ou email.' })
  }

  if (env.NODE_ENV !== 'production') {
    console.error('Erro:', error)
  }

  return reply.status(500).send({ message: 'Erro interno do servidor.' })
})
