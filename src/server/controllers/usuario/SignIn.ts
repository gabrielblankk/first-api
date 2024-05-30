import { Request, Response } from 'express'
import * as yup from 'yup'
import { UsuariosProvider } from '../../database/providers'
import { IUsuario } from '../../database/models'
import { StatusCodes } from 'http-status-codes'
import { validation } from '../../shared/middlewares'
import { JWTService, passwordCrypto } from '../../shared/services'

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> {}

export const signInValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    email: yup.string().email().required().min(5),
    senha: yup.string().required().min(6)
  }))
}))

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, senha } = req.body

  const userResult = await UsuariosProvider.getByEmail(email)

  if (userResult instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'E-mail ou senha inválidos'
      }
    })
  }

  const passwordMatch = await passwordCrypto.verifyPassword(senha, userResult.senha)

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'E-mail ou senha inválidos'
      }
    })
  } else {
    const accessToken = JWTService.sign({ uid: userResult.id })

    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o token de acesso'
        }
      })
    }

    return res.status(StatusCodes.OK).json({ accessToken })
  }
}
