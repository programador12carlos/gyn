import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../repositories/inmemory/in-memory-users-repositore'
import bcrypt from 'bcryptjs'
import { VerificarAuthError } from './erros/erroauth'
import { Auth } from './auth'

let BancoDeDados: InMemoryUserRepository
let sut: Auth

describe('testes de auth', () => {
  beforeEach(() => {
    BancoDeDados = new InMemoryUserRepository()
    sut = new Auth(BancoDeDados)
  })
  it('O usuario Nao pode se cadastrar com email existente', async () => {
    await expect(async () => {
      await sut.execute({
        email: 'carlo667@gmail.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(VerificarAuthError)
  })

  it('O usuario Nao pode se cadastrar com senha errada', async () => {
    await BancoDeDados.criar({
      name: 'carlos romao',
      email: 'carlos3@gmail.com',
      password_has: await bcrypt.hash('123456', 6),
    })
    await expect(async () => {
      await sut.execute({
        email: 'carlo667@gmail.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(VerificarAuthError)
  })

  it('O usuario deve conseguir se autenticar', async () => {
    await BancoDeDados.criar({
      name: 'carlos romao',
      email: 'carlos3@gmail.com',
      password_has: await bcrypt.hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'carlos3@gmail.com',
      password: '123456',
    })

    await expect(user.id).toEqual(expect.any(String))
  })
})
