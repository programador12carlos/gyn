import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { AuthAuthorization } from '@/services/utlis/test-auth'
import { randomUUID } from 'crypto'

describe('CADASTRO', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('O USUARIO DEVE CONSEGUIR SE CADASTRAR', async () => {
    const { token } = await AuthAuthorization(app, true)

    const response = await request(app.server)
      .post('/gyn')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: randomUUID(),
        title: 'ginasio maravilha',
        descricption: 'melhor do mundo',
        phone: '956467976',
        latitude: 0,
        longitude: 0,
      })
    expect(response.statusCode).toEqual(200)
  })
})
