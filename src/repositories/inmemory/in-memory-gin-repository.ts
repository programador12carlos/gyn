import { Gin, Prisma } from '@prisma/client'
import {
  academiaProximas,
  FuncoesDoRepositorioGym,
} from '../uso-repositories-gyn'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/services/utlis/distancia_calc'

// Criar um banco de dados local para testes
export class InMemoryGinRepository implements FuncoesDoRepositorioGym {
  // criar um array para armazenar os dados com type user
  public items: Gin[] = []

  /*
Funçoes do banco 
----------------------------------------------------------------------------
[x] Procurar user pelo id no banco
[x] Criar user no banco
   */

  // [x] Procurar user pelo id e retorna o user
  async ProcurarId(id: string): Promise<Gin | null> {
    const procurarid = this.items.find((item) => item.id === id)

    if (!procurarid) {
      return null
    }
    return procurarid
  }

  async BuscarGymProximo(params: academiaProximas) {
    const academiasProximas = this.items.filter((item) => {
      const distancia = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          longitude: item.longitude.toNumber(),
          latitude: item.latitude.toNumber(),
        },
      )
      console.log(`Distância para a academia ${item.title}: ${distancia} km`)
      return distancia < 10 // Considerando academias a menos de 10 km
    })

    // Retorna o array de academias próximas
    return academiasProximas
  }

  async BuscarGym(query: string, pagina: number) {
    return this.items
      .filter((dados) => dados.title.includes(query)) // Usando includes para busca parcial dentro de uma frase
      .slice((pagina - 1) * 20, pagina * 20)
  }

  /*
A função slice em JavaScript é usada para extrair uma porção de um array sem
 modificar o array original. 
Ela retorna uma nova cópia de um segmento do array especificado por índices de
 início e fim.
*/
  async CriarGym(data: Prisma.GinCreateInput) {
    const gym = {
      id: randomUUID(),
      title: data.title,
      descricption: data.descricption ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }
    this.items.push(gym)
    return gym
  }
}
