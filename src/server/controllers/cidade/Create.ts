import type { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { ICidade } from '../../database/models'
import { CidadesProvider } from '../../database/providers'


interface IBodyProps extends Omit<ICidade, 'id'> {}

export const createValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2),
  }))
})) 

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await CidadesProvider.create(req.body)

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.CREATED).json(result)
}
