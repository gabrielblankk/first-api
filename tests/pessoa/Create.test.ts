import { StatusCodes } from 'http-status-codes'
import { accessToken, testServer } from '../jest.setup'

describe('Pessoas - Create', () => {
  it('Criar Registro', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')
  })

  it('Criar registro sem autorização', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(res1.body).toHaveProperty('errors.default')
  })

  it('Criar registro errado', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({})

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nome')
    expect(res1.body).toHaveProperty('errors.body.email')
    expect(res1.body).toHaveProperty('errors.body.cidadeId')
    
    const res2 = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Ga',
        email: 'Gabrielgmailcom',
        cidadeId: 0
      })
    
    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res2.body).toHaveProperty('errors.body.nome')
    expect(res2.body).toHaveProperty('errors.body.email')
    expect(res2.body).toHaveProperty('errors.body.cidadeId')

    const res3 = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 999
      })

    expect(res3.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res3.body).toHaveProperty('errors.default')
  })

  it('Criar registro duplicado', async () => {
    await testServer 
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    const res1 = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')
  })
})
