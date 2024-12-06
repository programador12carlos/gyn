export class VerificarAuthError extends Error {
  constructor() {
    super('verifica o email ou senha')
    this.name = 'verifica o email ou senha'
  }
}
