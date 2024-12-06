import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGinRepository } from '@/repositories/inmemory/in-memory-gin-repository'
import { randomUUID } from 'crypto'
import { BuscarGin } from '@/services/getList-gyn-proximo'
import { Ginasio } from './gym-create'

let BancoDeDadosGyn: InMemoryGinRepository
let sut: BuscarGin
let sut1: Ginasio

describe('TESTES DE BUSCAR ACADEMIAS PROXIMAS', () => {
  beforeEach(() => {
    BancoDeDadosGyn = new InMemoryGinRepository()
    sut = new BuscarGin(BancoDeDadosGyn)
    sut1 = new Ginasio(BancoDeDadosGyn)
  })

  it('DEVE SER POSSIVEL BUSCAR ACADEMIAS PROXIMAS', async () => {
    // Academia 1 a 3 km do usuário
    await sut1.Criar({
      id: randomUUID(),
      title: 'Academia Perto',
      descricption: 'melhor do mundo',
      phone: '956467976',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await sut1.Criar({
      id: randomUUID(),
      title: 'Academia distante',
      descricption: 'melhor do mundo',
      phone: '956467976',
      latitude: -27.8610928,
      longitude: -49.5229501,
    })

    const ListGym = await sut.BuscarGymProximo({
      latitude: -27.2092052,
      longitude: -49.6401091,
    })
    expect(ListGym.gymList).toHaveLength(1)
    expect(ListGym.gymList).toEqual([
      expect.objectContaining({ title: 'Academia Perto' }),
    ])
  })
})
