import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeregisterservice } from '@/services/factories/make-register-sevices'
import { ErrorUsuario } from '@/services/erros/usuarioError'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const usershema = z.object({
    name: z.string().min(1, 'O nome é obrigatório.'),
    email: z.string().email('E-mail inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  })

  const { name, email, password } = usershema.parse(request.body)
  try {
    const registrarservice = makeregisterservice()
    await registrarservice.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof ErrorUsuario) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
