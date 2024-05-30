import { Router } from 'express'
import { CidadesController, PessoasController, UsuariosController } from '../controllers'
import { authenticate } from '../shared/middlewares/Authentication'

const router = Router()

router.get('/cidades', authenticate, CidadesController.getAllValidation, CidadesController.getAll)
router.get('/cidades/:id', authenticate, CidadesController.getByIdValidation, CidadesController.getById)
router.post('/cidades', authenticate, CidadesController.createValidation, CidadesController.create)
router.put('/cidades/:id', authenticate, CidadesController.updateByIdValidation, CidadesController.updateById)
router.delete('/cidades/:id', authenticate, CidadesController.deleteByIdValidation, CidadesController.deleteById)

router.get('/pessoas', authenticate, PessoasController.getAllValidation, PessoasController.getAll)
router.get('/pessoas/:id', authenticate, PessoasController.getByIdValidation, PessoasController.getById)
router.post('/pessoas', authenticate, PessoasController.createValidation, PessoasController.create)
router.put('/pessoas/:id', authenticate, PessoasController.updateByIdValidation, PessoasController.updateById)
router.delete('/pessoas/:id', authenticate, PessoasController.deleteByIdValidation, PessoasController.deleteById)

router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn)
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp)

export { router }
