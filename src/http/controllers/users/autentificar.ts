import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeregisterservice } from '@/services/factories/meke-auth-service'
import { VerificarAuthError } from '@/services/erros/erroauth'

// Função Principal de Autenticação
/*
  ETAPAS DA IMPLEMENTAÇÃO:
  1. Importar as dependências essenciais, incluindo `FastifyRequest` e `FastifyReply` para manuseio de requisições/respostas.
  2. Utilizar a biblioteca `zod` para validação de dados recebidos no corpo da requisição.
  3. Implementar a lógica de autenticação com base no `makeregisterservice`.
  4. Gerar tokens JWT de acesso e de refresh.
  5. Configurar cookies para armazenar o token de refresh de forma segura.
  6. Lidar com erros de autenticação e erros inesperados com respostas adequadas.
*/

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Etapa 1: Validar os dados do corpo da requisição usando `zod`
  const authUserSchema = z.object({
    email: z.string().email('E-mail inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  })

  const { email, password } = authUserSchema.parse(request.body)

  try {
    // Etapa 2: Chamar o serviço de autenticação para verificar as credenciais
    const { user } = await makeregisterservice().execute({
      email,
      password,
    })

    // Verificar se o serviço retornou um usuário válido
    if (!user || !user.id || !user.email) {
      throw new VerificarAuthError()
    }

    // Etapa 3: Criar o token de acesso (curta duração)
    const token = await reply.jwtSign(
      { email: user.email, role: user.role }, // Payload com email e role
      {
        sub: user.id, // Identificador do usuário (sub)
        expiresIn: '10m', // Expiração do token de acesso
      },
    )

    // Etapa 4: Criar o token de refresh (longa duração)
    const refreshToken = await reply.jwtSign(
      { email: user.email, role: user.role }, // Payload com email e role
      {
        sub: user.id, // Identificador do usuário (sub)
        expiresIn: '7d', // Expiração do token de refresh
      },
    )

    // Etapa 5: Configurar o cookie para armazenar o token de refresh
    reply.setCookie('RefreshCookie', refreshToken, {
      path: '/', // Disponível em toda a aplicação
      secure: process.env.NODE_ENV === 'production', // HTTPS em produção
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Política de segurança para cookies
      httpOnly: true, // Impede acesso via JavaScript
    })

    // Etapa 6: Retornar o token de acesso na resposta
    return reply.status(201).send({ token })
  } catch (err) {
    // Tratamento de erro específico de autenticação
    if (err instanceof VerificarAuthError) {
      return reply.status(401).send({ message: 'E-mail ou senha inválidos.' })
    }

    // Tratamento de erro inesperado
    console.error('Erro inesperado:', err)
    return reply.status(500).send({
      message: 'Erro interno no servidor. Tente novamente mais tarde.',
    })
  }
}
