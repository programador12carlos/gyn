import { Checkin, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { FuncoesDoRepositorioCheckin } from '../uso-repositorio-checkin'
import dayjs from 'dayjs'

export class PrismaRepositoryCheckin implements FuncoesDoRepositorioCheckin {
  async procurarDataCheckinUser(userId: string, data: Date) {
    const startOfDay = dayjs(data).startOf('day')
    const endOfDay = dayjs(data).endOf('day')
    const checkin = await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        create_time: {
          /* gte => (Greater Than or Equal) O operador gte é usado para encontrar
           registros onde o valor de um campo é maior ou igual a um determinado 
           valor.

          lte => (Less Than or Equal) O que é: O operador lte é usado para encontra
          registros onde o valor de um campo é menor ou igual a um determinado
            valor.
          */
          gte: startOfDay.toDate(),
          lte: endOfDay.toDate(),
        },
      },
    })
    return checkin
  }

  async criar(data: Prisma.CheckinUncheckedCreateInput) {
    const checkin = await prisma.checkin.create({ data })
    return checkin
  }

  async listarCheckin(userId: string, pagina: number) {
    const checkIn = await prisma.checkin.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (pagina - 1) * 20,
    })
    return checkIn
  }

  // contar a quantidade de checkin feito por um user
  async totalCheckin(id: string) {
    const checkIn = await prisma.checkin.count({
      where: {
        id,
      },
    })
    return checkIn
  }

  // buscar o checkin de um user pelo id
  async buscarid(id: string) {
    const checkin = await prisma.checkin.findUnique({
      where: {
        id,
      },
    })
    return checkin
  }

  // salvar alteracoes da validaçao de um user
  async salvar(checkin: Checkin) {
    const checkIn = await prisma.checkin.update({
      where: {
        id: checkin.id,
      },
      data: checkin,
    })
    return checkIn
  }
}
