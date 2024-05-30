import { IPessoa } from '../../database/models'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { PessoasProvider } from '../../database/providers'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'


interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const createValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    email: yup.string().email().required(),
    cidadeId: yup.number().integer().required().moreThan(0),
  }))
})) 

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await PessoasProvider.create(req.body)

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.CREATED).json(result)
}