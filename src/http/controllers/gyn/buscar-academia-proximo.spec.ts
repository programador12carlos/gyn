import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { AuthAuthorization } from '@/services/utlis/test-auth'
import { randomUUID } from 'crypto'

describe('ACADEMIA PROXIMA', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('BUSCAR ACADEMIA PROXIMA', async () => {
    const { token } = await AuthAuthorization(app, true)

    await request(app.server)
      .post('/gyn')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: randomUUID(),
        title: 'Academia Perto',
        descricption: 'melhor do mundo',
        phone: '956467976',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    await request(app.server)
      .post('/gyn')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: randomUUID(),
        title: 'Academia distante',
        descricption: 'melhor do mundo',
        phone: '956467976',
        latitude: -27.8610928,
        longitude: -49.5229501,
      })

    const response = await request(app.server)
      .get('/gyn/proximas')
      .set('Authorization', `Bearer ${token}`)
      .query({ latitude: -27.2092052, longitude: -49.6401091 })
      .send()

    expect(response.status).toEqual(201) // Alterado para 200
    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toEqual(
      expect.objectContaining({ title: 'Academia Perto' }),
    )
  })
})
