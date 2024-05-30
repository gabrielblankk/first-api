import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IPessoa } from '../../models'

export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where('id', '=', pessoa.cidadeId)
      .count<[{ count: number }]>('* as count')

    if (count === 0) {
      return new Error('A cidade usada no registro não foi encontrada')
    }

    const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id')

    if (result) return result.id

    return new Error('Erro ao cadastrar o registro')
  } catch (error) {

    return new Error('Erro ao cadastrar o registro')
  }
}