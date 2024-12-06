import { beforeEach, describe, expect, it } from 'vitest'
import { RegistarUserCase } from './register'
import { InMemoryUserRepository } from '../repositories/inmemory/in-memory-users-repositore'
import bcrypt from 'bcryptjs'
import { VerificarEmailUsuario } from './erros/erro-email'

let userrepository: InMemoryUserRepository
let sut: RegistarUserCase

describe('testando a criacao de usuario', () => {
  beforeEach(() => {
    userrepository = new InMemoryUserRepository()
    sut = new RegistarUserCase(userrepository)
  })

  it('deve ser possivel converter a senha para hash', async () => {
    const { usuario } = await sut.execute({
      name: 'carlos romao',
      email: 'cadfjv56h@gmail.com',
      password: '277323',
    })
    const itpassword = await bcrypt.compare('277323', usuario.password_has)
    expect(itpassword).toBe(true)
  })

  it('verificar condição de e-mail', async () => {
    const email = 'cadfjv56h@gmail.com'
    await sut.execute({
      name: 'carlos romao',
      email,
      password: '277273',
    })

    expect(async () => {
      await sut.execute({
        name: 'carlos romao',
        email,
        password: '277323',
      })
    }).rejects.toBeInstanceOf(VerificarEmailUsuario)
  })

  it('deve ser possivel criar usuario ', async () => {
    const { usuario } = await sut.execute({
      name: 'carlos romao',
      email: 'cadfjv56h@gmail.com',
      password: '277323',
    })
    await expect(usuario.id).toEqual(expect.any(String))
  })
})
