import type { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { IPessoa } from '../../database/models'
import { PessoasProvider } from '../../database/providers'

interface IParamProps {
  id?: number
}

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const updateByIdValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    email: yup.string().email().required().min(5),
    cidadeId: yup.number().integer().required().moreThan(0)
  })),
  params: get<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }))
})) 

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Parâmetro "id" deve ser informado'
      }
    })
  }

  const result = await PessoasProvider.updateById(req.params.id, req.body)

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.OK).send()
}
 