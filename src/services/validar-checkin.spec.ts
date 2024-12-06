import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/inmemory/in-memory-checkin-repositore'
import { ValidateheckinUser } from './validar-checkIn'

let bancoDeDados: InMemoryCheckInRepository
let sut: ValidateheckinUser

describe('testes de validar checkin', () => {
  beforeEach(() => {
    // Configura o banco de dados e o sistema antes de cada teste
    bancoDeDados = new InMemoryCheckInRepository()
    sut = new ValidateheckinUser(bancoDeDados)

    // Simula os timers para permitir manipulação de tempo
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Limpa os timers após cada teste
    vi.clearAllTimers()
  })

  it('DEVE SER POSSIVEL VALIDAR CHECKIN', async () => {
    const { id } = await bancoDeDados.criar({
      user_id: 'CR-01',
      gin_id: 'GIN-01',
      id: 'GINASIO',
    })

    const { checkin } = await sut.execute({
      checkinId: id,
    })

    expect(checkin?.validade_at).toEqual(expect.any(Date))
    expect(bancoDeDados.items[0].validade_at).toEqual(expect.any(Date))
  })

  it('DEVE SER POSSIVEL FAZER O CHECKIN 20 MN DEPOIS DE CRIADO', async () => {
    // Define o tempo inicial
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const { id } = await bancoDeDados.criar({
      user_id: 'CR-01',
      gin_id: 'GIN-01',
      id: 'GINASIO',
    })

    const twentyOneMinute = 1000 * 60 * 21

    // Avança o tempo em 21 minutos
    vi.advanceTimersByTime(twentyOneMinute)

    // Verifica se a exceção é lançada
    await expect(() =>
      sut.execute({
        checkinId: id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
