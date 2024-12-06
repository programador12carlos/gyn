import { Gin, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import {
  academiaProximas,
  FuncoesDoRepositorioGym,
} from '../uso-repositories-gyn'

export class PrismaRepositorioGyn implements FuncoesDoRepositorioGym {
  async ProcurarId(id: string) {
    const user = await prisma.gin.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async CriarGym(data: Prisma.GinCreateInput) {
    const gyn = await prisma.gin.create({ data })
    return gyn
  }

  async BuscarGym(query: string, pagina: number) {
    const findgyn = await prisma.gin.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (pagina - 1) * 20,
    })
    return findgyn
  }

  async BuscarGymProximo({ latitude, longitude }: academiaProximas) {
    const gyms = await prisma.$queryRaw<Gin[]>`
      SELECT * FROM gyms
      WHERE (6371 * ACOS(
        COS(RADIANS(${latitude})) 
        * COS(RADIANS(latitude)) 
        * COS(RADIANS(longitude) - RADIANS(${longitude})) 
        + SIN(RADIANS(${latitude})) 
        * SIN(RADIANS(latitude))
      )) <= 10
    `
    return gyms
  }
}
