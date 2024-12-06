import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { AuthAuthorization } from '@/services/utlis/test-auth'

describe('PERFIL', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('O USUÁRIO DEVE CONSEGUIR VER O SEU PERFIL', async () => {
    // Criação do usuário
    const { token } = await AuthAuthorization(app)
    // Requisição para obter o perfil
    const perfileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`) // Adiciona o espaço após "Bearer"
      .send()

    // Verifica se o status da resposta é 200 (OK)
    expect(perfileResponse.status).toEqual(201)

    // Verifica se o e-mail do usuário está correto
    expect(perfileResponse.body.user.email).toEqual('grr@gmail.com')
  })
})
