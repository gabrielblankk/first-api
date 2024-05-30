import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IPessoa } from '../../models'

export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where('id', '=', pessoa.cidadeId)
      .count<[{ count: number }]>('* as count')

    if (count === 0) {
      return new Error('A cidade usada no registro não foi encontrada')
    }

    const result = await Knex(ETableNames.pessoa)
      .update(pessoa)
      .where('id', '=', id)

    if (result) return

    return new Error('Erro ao atualizar registro')
  } catch (error) {
    
    return new Error('Erro ao atualizar registro')
  }
}