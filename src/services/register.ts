import { FuncoesDoRepositorio } from '@/repositories/uso-repositorio'
import bcrypt from 'bcryptjs'
import { VerificarEmailUsuario } from './erros/erro-email'
import { User } from '@prisma/client'

// [x] criaçao das interfaces de entrada e saida da funcao
interface UserRequest {
  name: string
  email: string
  password: string
}
interface UserResponse {
  usuario: User
}

// [x] criacao da funçao principal Register use case

export class RegistarUserCase {
  constructor(private funcoesdorepositorio: FuncoesDoRepositorio) {}
  /*
    condiçoes para a criacao do usuario
-------------------------------------------------------------------------------
  [x] verificar se o email existe
  [x] criar senha e criptografar senha com bcrypt
  [x] verificar a existencia de email 
    */
  async execute({ name, email, password }: UserRequest): Promise<UserResponse> {
    // [x] criar senha e criptografar senha com bcrypt
    const password_hash = await bcrypt.hash(password, 6)

    // [x] verificar a existencia de email
    const userEmail =
      await this.funcoesdorepositorio.procurarGmailUsuario(email)
    if (userEmail) {
      throw new VerificarEmailUsuario()
    }
    // [x] criaçao de usuario
    const usuario = await this.funcoesdorepositorio.criar({
      name,
      email,
      password_has: password_hash,
    })
    return {
      usuario,
    }
  }
}
