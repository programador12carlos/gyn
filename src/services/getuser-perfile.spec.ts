import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../repositories/inmemory/in-memory-users-repositore'
import bcrypt from 'bcryptjs'
import { GetId } from './get-user-perfile'
import { ResouresError } from './erros/resoures-error-user'

let BancoDeDados: InMemoryUserRepository
let sut: GetId

describe('tested get user per id', () => {
  beforeEach(() => {
    BancoDeDados = new InMemoryUserRepository()
    sut = new GetId(BancoDeDados)
  })
  it('the user no exist', async () => {
    await expect(async () => {
      await sut.execute({
        userId: 'usuario nao existe',
      })
    }).rejects.toBeInstanceOf(ResouresError)
  })
  it('shall be able get user id', async () => {
    const users = await BancoDeDados.criar({
      name: 'carlos romao',
      email: 'carlff53@gmail.com',
      password_has: await bcrypt.hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: users.id,
    })

    await expect(user.id).toEqual(expect.any(String))
  })
})
