import { passwordCrypto } from '../../../shared/services'
import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { IUsuario } from '../../models'

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
  try {
    const hashedPassword = await passwordCrypto.hashPassword(usuario.senha)

    const [result] = await Knex(ETableNames.usuario).insert({ ...usuario, senha: hashedPassword }).returning('id')

    if (result) return result.id

    return new Error('Erro ao cadastrar o registro')
  } catch (error) {
    return new Error('Erro ao cadastrar o registro')
  }
}
