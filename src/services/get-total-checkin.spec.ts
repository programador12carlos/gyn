import { InMemoryCheckInRepository } from '@/repositories/inmemory/in-memory-checkin-repositore'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckinListUser } from './get-total-checkin'

let BancoDeDados: InMemoryCheckInRepository
let sut: CheckinListUser

describe('TESTANDO A OBTENCAO DO VALOR TOTAL DE CHECKIN', async () => {
  beforeEach(() => {
    BancoDeDados = new InMemoryCheckInRepository()
    sut = new CheckinListUser(BancoDeDados)
  })

  it('TESTANDO A CONTAGEM DOS CHECKINS', async () => {
    await BancoDeDados.criar({
      gin_id: 'GIN-1',
      user_id: 'CR-01',
    })
    await BancoDeDados.criar({
      gin_id: 'GIN-2',
      user_id: 'CR-01',
    })
    const { totalCheckin } = await sut.listar({
      id: 'CR-01',
    })
    expect(totalCheckin).toEqual(2)
  })
})
