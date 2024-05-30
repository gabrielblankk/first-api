import { StatusCodes } from 'http-status-codes'
import { accessToken, testServer } from '../jest.setup'

describe('Pessoas - GetById', () => {
  it('Buscar registro', async () => {
    const resCreate = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    const resGetId = await testServer
      .get(`/pessoas/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(resGetId.statusCode).toEqual(StatusCodes.OK)
    expect(resGetId.body).toHaveProperty('nome')
    expect(resGetId.body).toHaveProperty('email')
    expect(resGetId.body).toHaveProperty('cidadeId')
  })

  it('Buscar registro', async () => {
    const resCreate = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    const resGetId = await testServer
      .get(`/pessoas/${resCreate.body}`)
      .send()

    expect(resGetId.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(resGetId.body).toHaveProperty('errors.default')
  })

  it('Buscar registro inexistente', async () => {
    const res1 = await testServer
      .get('/pessoas/9999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(res1.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')

    const res2 = await testServer
      .get('/pessoas/0')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res2.body).toHaveProperty('errors.params')
  })
})