import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'

export const count = async (filter: string): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.pessoa)
      .where('nome', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count')

    if (Number.isInteger(count)) return count

    return new Error('Erro ao calcular a quantidade de registros')
  } catch (error) {
    
    return new Error('Erro ao calcular a quantidade de registros')
  }
}