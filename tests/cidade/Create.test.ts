import { StatusCodes } from 'http-status-codes'
import { accessToken, testServer } from '../jest.setup'

describe('Cidades - Create', () => {
  it('Criar registro', async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
         nome: 'Jaraguá do Sul',
         estado: 'Santa Catarina'
      })

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    expect(typeof res1.body).toEqual('number')
  })

  it('Criar registro sem autenticação', async () => {
    const res1 = await testServer
      .post('/cidades')
      .send({
         nome: 'Jaraguá do Sul',
         estado: 'Santa Catarina'
      })

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(res1.body).toHaveProperty('errors.default')
  })

  it('Criar registro com dados inválidos', async () => {
    const res1 = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({})
      
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nome')
    expect(res1.body).toHaveProperty('errors.body.estado')
    
    const res2 = await testServer
    .post('/cidades')
    .set({ authorization: `Bearer ${accessToken}` })
    .send({ 
      nome: 'Ja',
      estado: 'S',
    })
    
    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res2.body).toHaveProperty('errors.body.nome')
    expect(res2.body).toHaveProperty('errors.body.estado')
  })
})
