import { StatusCodes } from 'http-status-codes'
import { accessToken, testServer } from '../jest.setup'

describe('Cidades - GetById', () => {
  it('Buscar registro', async () => {
    const resCreate = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Jaraguá do Sul',
        estado: 'Santa Catarina'
      })

    const resGetId = await testServer
      .get(`/cidades/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(resGetId.statusCode).toEqual(StatusCodes.OK)
    expect(resGetId.body).toHaveProperty('nome')
    expect(resGetId.body).toHaveProperty('estado')
  })

  it('Buscar registro sem autorização', async () => {
    const resCreate = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Jaraguá do Sul',
        estado: 'Santa Catarina'
      })

    const resGetId = await testServer
      .get(`/cidades/${resCreate.body}`)
      .send()

    expect(resGetId.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(resGetId.body).toHaveProperty('errors.default')
  })

  it('Buscar registro inexistente', async () => {
    const res1 = await testServer
      .get('/cidades/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')
    
    const res2 = await testServer
      .get('/cidades/0')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res2.body).toHaveProperty('errors.params')
  })
})
