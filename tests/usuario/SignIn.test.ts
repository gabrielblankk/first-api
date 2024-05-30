import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Usuario - SingIn', () => {
  it('Logar na conta', async () => {
    await testServer
      .post('/cadastrar')
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        senha: '123456'
      })
      
      const resLogin = await testServer
      .post('/entrar')
      .send({
        email: 'gabriel@gmail.com',
        senha: '123456'  
      })
      
      expect(resLogin.status).toEqual(StatusCodes.OK)
      expect(resLogin.body).toHaveProperty('accessToken')
    })
    
  it('Logar com credenciais erradas', async () => {
    await testServer
      .post('/cadastrar')
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        senha: '123456'
      })
    
    const resLogin1 = await testServer
      .post('/entrar')
      .send({})

    expect(resLogin1.status).toEqual(StatusCodes.BAD_REQUEST)
    expect(resLogin1.body).toHaveProperty('errors.body.email')
    expect(resLogin1.body).toHaveProperty('errors.body.senha')
    
    const resLogin2 = await testServer
      .post('/entrar')
      .send({
        email: 'gabrielgmailcom',
        senha: 12345
      })

    expect(resLogin2.status).toEqual(StatusCodes.BAD_REQUEST)
    expect(resLogin2.body).toHaveProperty('errors.body.email')
    expect(resLogin2.body).toHaveProperty('errors.body.senha')

    const resLogin3 = await testServer
      .post('/entrar')
      .send({
        email: 'gabriel@gmail.com',
        senha: 'shalalala'
      })

    expect(resLogin3.status).toEqual(StatusCodes.UNAUTHORIZED)
    expect(resLogin3.body).toHaveProperty('errors.default', 'E-mail ou senha inválidos')

    const resLogin4 = await testServer
      .post('/entrar')
      .send({
        email: 'gabrielshalala@gmail.com',
        senha: '123456'
      })

    expect(resLogin4.status).toEqual(StatusCodes.UNAUTHORIZED)
    expect(resLogin4.body).toHaveProperty('errors.default', 'E-mail ou senha inválidos')
  })
})
