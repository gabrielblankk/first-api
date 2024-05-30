import { StatusCodes } from 'http-status-codes'
import { accessToken, testServer } from '../jest.setup'

describe('Pessoas - DeleteById', () => {
  it('Apagar registro', async () => {
    const resCreate = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    const resDelete = await testServer
      .delete(`/pessoas/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(resDelete.statusCode).toEqual(StatusCodes.OK)

    const getDeleted = await testServer
      .get(`/pessoas/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(getDeleted.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(getDeleted.body).toHaveProperty('errors.default')
  })

  it('Apagar registro', async () => {
    const resCreate = await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    const resDelete = await testServer
      .delete(`/pessoas/${resCreate.body}`)
      .send()

    expect(resDelete.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(resDelete.body).toHaveProperty('errors.default')
  })

  it('Apagar registro inexistente', async () => {
    const res1 = await testServer
      .delete('/pessoas/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')
  })
})
