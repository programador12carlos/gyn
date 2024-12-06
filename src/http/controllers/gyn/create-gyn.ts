import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makecreateservice } from '@/services/factories/make-create-gyn'

export async function CreateGyn(request: FastifyRequest) {
  const gynshema = z.object({
    id: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    phone: z.string(),
    title: z.string(),
    descricption: z.string().nullable(),
  })

  const { id, latitude, longitude, phone, title, descricption } =
    gynshema.parse(request.body)
  const registrarservice = makecreateservice()
  await registrarservice.Criar({
    id,
    latitude,
    longitude,
    phone,
    title,
    descricption,
  })
}
