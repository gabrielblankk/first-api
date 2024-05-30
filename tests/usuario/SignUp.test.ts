import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Usuario - SingUp', () => {
  it('Criar conta', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        senha: '123456'
      })
    
    expect(res1.status).toEqual(StatusCodes.CREATED)
    expect(res1.body).toBeGreaterThan(0)
    expect(typeof res1.body).toEqual('number')
  })

  it('Criar conta com dados inválidos', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({})

    expect(res1.status).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nome')
    expect(res1.body).toHaveProperty('errors.body.email')
    expect(res1.body).toHaveProperty('errors.body.senha')
    
    const res2 = await testServer
      .post('/cadastrar')
      .send({
        nome: 'Ga',
        email: 'gabrielgmailcom',
        senha: 12345
      })
      
    expect(res2.status).toEqual(StatusCodes.BAD_REQUEST)
    expect(res2.body).toHaveProperty('errors.body.nome')
    expect(res2.body).toHaveProperty('errors.body.email')
    expect(res2.body).toHaveProperty('errors.body.senha')
  })

  it('Criar conta com email duplicado', async () => {
    const res1 = await testServer
      .post('/cadastrar')
      .send({
        nome: 'Gabriel1',
        email: 'teste@gmail.com',
        senha: '123456'
      })
    
    expect(res1.status).toEqual(StatusCodes.CREATED)

    const res2 = await testServer
      .post('/cadastrar')
      .send({
        nome: 'Gabriel2',
        email: 'teste@gmail.com',
        senha: '654321'
      })

    expect(res2.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res2.body).toHaveProperty('errors.default')
  })
})
