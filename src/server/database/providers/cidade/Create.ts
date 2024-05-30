import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ICidade } from '../../models'

export const create = async (cidade: Omit<ICidade, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.cidade).insert(cidade).returning('id')

    if (result) return result.id
    
    return new Error('Erro ao cadastrar o registro')
  } catch (error) {
    
    return new Error('Erro ao cadastrar o registro')
  }
}
