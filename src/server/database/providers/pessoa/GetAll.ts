import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IPessoa } from '../../models'

export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
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
