import { beforeEach, describe, expect, it } from 'vitest'
import { Ginasio } from './gym-create'
import { InMemoryGinRepository } from '@/repositories/inmemory/in-memory-gin-repository'
import { randomUUID } from 'crypto'

let BancoDeDadosGyn: InMemoryGinRepository
let sut: Ginasio

describe('teste a criacao de usuario', () => {
  beforeEach(() => {
    BancoDeDadosGyn = new InMemoryGinRepository()
    sut = new Ginasio(BancoDeDadosGyn)
  })

  it('teste de criacao do ginasio', async () => {
    const { gym } = await sut.Criar({
      id: randomUUID(),
      title: 'ginasio maravilha',
      descricption: 'melhor do mundo',
      phone: '956467976',
      latitude: 0,
      longitude: 0,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
