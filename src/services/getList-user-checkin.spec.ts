import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/inmemory/in-memory-checkin-repositore'
import { CheckinHistoryUser } from './getList-user-checkin'

let bancoDeDados: InMemoryCheckInRepository
let sut: CheckinHistoryUser

describe('testes do resumo checkin', async () => {
  beforeEach(() => {
    bancoDeDados = new InMemoryCheckInRepository()
    sut = new CheckinHistoryUser(bancoDeDados)
  })
  it('DEVE SER POSSIVEL OBTER RESUMO DE CHECKIN FEITO PELO USER', async () => {
    await bancoDeDados.criar({
      user_id: 'CR-01',
      gin_id: 'GIN-01',
    })
    await bancoDeDados.criar({
      user_id: 'CR-01',
      gin_id: 'GIN-02',
    })
    const { CheckinList } = await sut.listar({
      id: 'CR-01',
      pagina: 1,
    })
    expect(CheckinList).toHaveLength(2)
    expect(CheckinList).toEqual([
      expect.objectContaining({ gin_id: 'GIN-01' }),
      expect.objectContaining({ gin_id: 'GIN-02' }),
    ])
  })

  it('DEVE SER POSSIVEL OBTER RESUMO PAGINADO', async () => {
    for (let i = 1; i <= 22; i++) {
      await bancoDeDados.criar({
        gin_id: `GIN-${i}`,
        user_id: 'CR-01',
      })
    }

    const { CheckinList } = await sut.listar({
      id: 'CR-01',
      pagina: 2,
    })
    expect(CheckinList).toHaveLength(2)

    expect(CheckinList).toEqual([
      expect.objectContaining({ gin_id: 'GIN-21' }),
      expect.objectContaining({ gin_id: 'GIN-22' }),
    ])
  })
})
