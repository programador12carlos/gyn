import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'

describe('REFRESHTOKEN', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('O REFRESH DEVE SER GERADO', async () => {
    await request(app.server).post('/users').send({
      name: 'carlos romao',
      email: 'grr@gmail.com',
      password: '123456',
    })

    const auth = await request(app.server).post('/auth').send({
      email: 'grr@gmail.com',
      password: '123456',
    })

    const cookies = auth.get('Set-Cookie')
    if (!cookies) {
      throw new Error('O cabeçalho Set-Cookie não foi retornado na resposta.')
    }

    const response = await request(app.server)
      .patch('/refresh/token')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('RefreshCookie='),
    ])
  })
})
