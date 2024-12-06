import { User, Prisma } from '@prisma/client'
import { FuncoesDoRepositorio } from '../uso-repositorio'

// Criar um banco de dados local para testes
export class InMemoryUserRepository implements FuncoesDoRepositorio {
  // criar um array para armazenar os dados com type user
  public items: User[] = []

  /*
Funçoes do banco 
----------------------------------------------------------------------------
[x] Procurar user pelo id no banco
[x] Procurar user pelo email no banco
[x] Criar user no banco
   */

  // [x] Procurar user pelo id e retorna o user
  async procurarIdUsuario(id: string) {
    const user = this.items.find((item) => item.id === id)
    if (!user) {
      return null
    }
    return user
  }

  // [x] Procurar user pelo email e retorna o user
  async procurarGmailUsuario(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }
    return user
  }

  // [x] Criar user no banco local
  async criar(data: Prisma.UserCreateInput) {
    const user = {
      id: 'carlos -1',
      name: data.name,
      email: data.email,
      password_has: data.password_has,
      create_at: new Date(),
    }
    this.items.push(user)
    return user
  }
}
