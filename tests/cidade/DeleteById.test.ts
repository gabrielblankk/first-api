import { StatusCodes } from 'http-status-codes'
import { accessToken, testServer } from '../jest.setup'

describe('Cidades - DeleteById', () => {
  it('Apagar registro', async () => {
    const resCreate = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Jaraguá do Sul',
        estado: 'Santa Catarina'
      })

    const resDelete = await testServer
      .delete(`/cidades/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(resDelete.statusCode).toEqual(StatusCodes.OK)

    const getDeleted = await testServer
      .get(`/cidades/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(getDeleted.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(getDeleted.body).toHaveProperty('errors.default')
  })

  it('Apagar registro sem autorização', async () => {
    const resCreate = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Jaraguá do Sul',
        estado: 'Santa Catarina'
      })

    const resDelete = await testServer
      .delete(`/cidades/${resCreate.body}`)
      .send()

    expect(resDelete.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(resDelete.body).toHaveProperty('errors.default')
  })

  it('Apagar registro inexistente', async () => {
    const res1 = await testServer
      .delete('/cidades/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')
  })
})
