import type { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { ICidade } from '../../database/models'
import { CidadesProvider } from '../../database/providers'

interface IParamProps {
  id?: number
}

interface IBodyProps extends Omit<ICidade, 'id'> {}

export const updateByIdValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2),
  })),
  params: get<IParamProps>(yup.object().shape({
    id: yup.number().integer().optional().moreThan(0),
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

  const result = await CidadesProvider.updateById(req.params.id, req.body)

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.OK).send()
}
 