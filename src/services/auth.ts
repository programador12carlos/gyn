import { FuncoesDoRepositorio } from '@/repositories/uso-repositorio'
import { VerificarAuthError } from './erros/erroauth'
import bcrypt from 'bcryptjs'
import { User } from '@prisma/client'

// [x] criar as interfaces de entrada e saida de dados da funçao
interface AuthenticatorRequest {
  email: string
  password: string
}
interface AuthenticatorResponse {
  user: User
}

// criaçao da class principal
export class Auth {
  constructor(private funcosrepositorio: FuncoesDoRepositorio) {}
  /*
  condiçoes para a autentificaçao
-------------------------------------------------------------------------------
  [x] verificar a existencia email e senha do usuario, se existir emitir usuario
    */
  async execute({
    email,
    password,
  }: AuthenticatorRequest): Promise<AuthenticatorResponse> {
    // verificar a existencia do email, caso nao existir emitir erro
    const user = await this.funcosrepositorio.procurarGmailUsuario(email)
    // verificar a existencia da senha, caso nao existir emitir erro
    if (!user) {
      throw new VerificarAuthError()
    }
    const doespasswordhas = await bcrypt.compare(password, user.password_has)
    if (!doespasswordhas) {
      throw new VerificarAuthError()
    }
    // emitir usuario
    return { user }
  }
}
