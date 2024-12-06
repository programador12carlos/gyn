import { Prisma, User } from '@prisma/client'

// interface com os metodos para aplicaçao no banco de dados
export interface FuncoesDoRepositorio {
  /*
Funçoes do banco 
----------------------------------------------------------------------------
[x] Procurar email do usuario no banco
[x] Procurar id do usuario no banco
[x] Criar usuario no banco
   */
  // procurar o email do usurio e retornar o usuario ou null
  procurarGmailUsuario(email: string): Promise<User | null>

  // procurar o id do usurio e retornar o usuario ou null
  procurarIdUsuario(id: string): Promise<User | null>

  // criar usuario e retornar o usuario
  criar(data: Prisma.UserCreateInput): Promise<User>
}
