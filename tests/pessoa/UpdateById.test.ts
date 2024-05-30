import { StatusCodes } from 'http-status-codes'
import { accessToken, testServer } from '../jest.setup'

describe('Pessoas - UpdateById', () => {
  it('Atualizar registro', async () => {
    const resCreate = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    const resUpdateId = await testServer
      .put(`/pessoas/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Douglas',
        email: 'douglas@gmail.com',
        cidadeId: 2
      })

    expect(resUpdateId.statusCode).toEqual(StatusCodes.OK)
  })

  it('Atualizar registro sem autorização', async () => {
    const resCreate = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    const resUpdateId = await testServer
      .put(`/pessoas/${resCreate.body}`)
      .send({
        nome: 'Douglas',
        email: 'douglas@gmail.com',
        cidadeId: 2
      })

    expect(resUpdateId.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(resUpdateId.body).toHaveProperty('errors.default')
  })

  it('Atualizar registro inexistente', async () => {
    const res1 = await testServer
      .put('/pessoas/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Douglas',
        email: 'douglas@gmail.com',
        cidadeId: 2
      })

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')

    const res2 = await testServer
      .put('/pessoas/0')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Douglas',
        email: 'douglas@gmail.com',
        cidadeId: 2
      })

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res2.body).toHaveProperty('errors.params')
  })

  it('Atualizar registro com dados inválidos', async () => {
    const resCreate = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'update@gmail.com',
        cidadeId: 1
      })

    const res1 = await testServer
      .put(`/pessoas/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Do',
        email: 'douglasgmailcom',
        cidadeId: 0
      })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.body.nome')
    expect(res1.body).toHaveProperty('errors.body.email')
    expect(res1.body).toHaveProperty('errors.body.cidadeId')
    
    const res2 = await testServer
      .put(`/pessoas/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({})
    
    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res2.body).toHaveProperty('errors.body.nome')
    expect(res2.body).toHaveProperty('errors.body.email')
    expect(res2.body).toHaveProperty('errors.body.cidadeId')

    const res3 = await testServer
      .put(`/pessoas/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Douglas',
        email: 'douglas@gmail.com',
        cidadeId: 999
      })

    expect(res3.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res3.body).toHaveProperty('errors.default')
  })
})
