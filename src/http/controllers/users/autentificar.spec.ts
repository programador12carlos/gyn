import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'

describe('AUTENTIFICACAO', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('O USUARIO DEVE CONSEGUIR SE AUTENTICAR', async () => {
    await request(app.server).post('/users').send({
      name: 'carlos romao',
      email: 'grr@gmail.com',
      password: '123456',
    })

    const response = await request(app.server).post('/auth').send({
      email: 'grr@gmail.com',
      password: '123456',
    })
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
