import { beforeEach, describe, expect, it } from 'vitest'
import { BuscarGin } from './buscar-gym'
import { InMemoryGinRepository } from '@/repositories/inmemory/in-memory-gin-repository'
import { randomUUID } from 'crypto'

let bancoDeDados: InMemoryGinRepository
let sut: BuscarGin

describe('testes do resumo checkin', () => {
  beforeEach(() => {
    bancoDeDados = new InMemoryGinRepository()
    sut = new BuscarGin(bancoDeDados)
  })

  it('DEVE SER POSSIVEL OBTER LISTA DE BUSCA', async () => {
    await bancoDeDados.CriarGym({
      id: randomUUID(),
      title: 'type',
      descricption: 'melhor do mundo',
      phone: '956467976',
      latitule: 0,
      longitude: 0,
    })

    await bancoDeDados.CriarGym({
      id: randomUUID(),
      title: 'java',
      descricption: 'melhor do mundo',
      phone: '95646356',
      latitule: 0,
      longitude: 0,
    })

    const { gymList } = await sut.Buscar({
      query: 'type',
      pagina: 1,
    })

    expect(gymList).toHaveLength(1)
    expect(gymList).toEqual([expect.objectContaining({ title: 'type' })])
  })

  it('DEVE SER POSSIVEL OBTER RESUMO PAGINADO', async () => {
    for (let i = 1; i <= 22; i++) {
      await bancoDeDados.CriarGym({
        title: `type ${i}`,
        descricption: 'melhor do mundo',
        phone: '95646356',
        latitule: 0,
        longitude: 0,
      })
    }

    const { gymList } = await sut.Buscar({
      query: 'type',
      pagina: 2,
    })

    expect(gymList).toHaveLength(2)
    expect(gymList).toEqual([
      expect.objectContaining({ title: 'type 21' }),
      expect.objectContaining({ title: 'type 22' }),
    ])
  })
})
