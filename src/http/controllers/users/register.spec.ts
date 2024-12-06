import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'

describe('CADASTRO', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('O USUARIO DEVE CONSEGUIR SE CADASTRAR', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'carlos romao',
      email: 'gr@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
  })
})
