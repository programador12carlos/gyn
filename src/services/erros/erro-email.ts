export class VerificarEmailUsuario extends Error {
  constructor() {
    super('email nao existe')
    this.name = 'verificar email usuario'
  }
}
