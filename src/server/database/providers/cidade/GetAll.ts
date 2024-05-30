import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ICidade } from '../../models'

export const getAll = async (page: number, limit: number, filter: string): Promise<ICidade[] | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select('*')
      .where('nome', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit)

    if (result) return result

    return new Error('Erro ao consultar os registros')
  } catch (error) {

    return new Error('Erro ao consultar os registros')
  }
}
