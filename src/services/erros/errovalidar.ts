export class ErroValidar extends Error {
  constructor() {
    super('erro ao validar')
    this.name = 'verificar os itms a validar'
  }
}
