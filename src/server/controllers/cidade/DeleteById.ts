import type { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { CidadesProvider } from '../../database/providers'

interface IParamProps {
  id?: number, 
}

export const deleteByIdValidation = validation(get => ({
  params: get<IParamProps>(yup.object().shape({
    id: yup.number().integer().optional().moreThan(0),
  }))
})) 

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Parâmetro "id" deve ser informado'
      }
    })
  }

  const result = await CidadesProvider.deleteById(req.params.id)

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    })
  }

  return res.status(StatusCodes.OK).send()
}
 