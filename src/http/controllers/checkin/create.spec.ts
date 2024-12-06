import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { AuthAuthorization } from '@/services/utlis/test-auth'
// import { randomUUID } from 'crypto'

describe.skip('CHECKIN', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('O USUARIO DEVE CONSEGUIR FAZER O CHECKIN', async () => {
    const { token } = await AuthAuthorization(app, true)

    await request(app.server)
      .post('/gyn')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'gym-01',
        title: 'ginasio maravilha',
        descricption: 'melhor do mundo',
        phone: '956467976',
        latitude: 0,
        longitude: 0,
      })

    const response = await request(app.server)
      .post('/checkin/:ginID/checkin')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ginId: 'gym-01',
        latitude: 0,
        longitude: 0,
      })
    expect(response.statusCode).toEqual(201)
  })
})
