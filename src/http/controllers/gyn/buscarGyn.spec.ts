import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { AuthAuthorization } from '@/services/utlis/test-auth'
import { randomUUID } from 'crypto'

describe('GINASIO', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('BUSCAR GINASIO', async () => {
    const { token } = await AuthAuthorization(app, true)

    await request(app.server)
      .post('/gyn')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: randomUUID(),
        title: 'type',
        descricption: 'melhor do mundo',
        phone: '956467976',
        latitude: 0,
        longitude: 0,
      })

    await request(app.server)
      .post('/gyn')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: randomUUID(),
        title: 'typ',
        descricption: 'melhor do mundo',
        phone: '956467976',
        latitude: 0,
        longitude: 0,
      })
    const response = await request(app.server)
      .get('/gyn/buscar')
      .set('Authorization', `Bearer ${token}`)
      .query({
        query: 'type',
      })
      .send()

    expect(response.status).toEqual(201)
    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toEqual(expect.objectContaining({ title: 'type' }))
  })
})
