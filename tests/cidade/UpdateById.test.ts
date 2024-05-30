import { StatusCodes } from 'http-status-codes'
import { accessToken, testServer } from '../jest.setup'

describe('Cidades - UpdateById', () => {
  it('Atualizar registro', async () => {
    const resCreate = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Jaraguá do Sul',
        estado: 'Santa Catarina'
      })

    const resUpdateId = await testServer
      .put(`/cidades/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Curitiba',
        estado: 'Paraná'
      })

    expect(resUpdateId.statusCode).toEqual(StatusCodes.OK)
  })

  it('Atualizar registro sem autorização', async () => {
    const resCreate = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Jaraguá do Sul',
        estado: 'Santa Catarina'
      })

    const resUpdateId = await testServer
      .put(`/cidades/${resCreate.body}`)
      .send({
        nome: 'Curitiba',
        estado: 'Paraná'
      })

    expect(resUpdateId.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(resUpdateId.body).toHaveProperty('errors.default')
  })

  it('Atualizar registro inexistente', async () => {
    const res1 = await testServer
      .put('/cidades/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Curitiba',
        estado: 'Paraná'
      })

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res1.body).toHaveProperty('errors.default')

    const res2 = await testServer
      .put('/pessoas/0')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Curitiba',
        estado: 'Paraná'
      })

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res2.body).toHaveProperty('errors.params')
  })

  it('Atualizar registro com dados inválidos', async () => {
    const resCreate = await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Jaraguá do Sul',
        estado: 'Santa Catarina'
      })

    const res1 = await testServer
      .put(`/cidades/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Ja',
        estado: 'S'
      })

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty(`errors.body.${'nome' || 'estado'}`)

    const res2 = await testServer
      .put(`/cidades/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({})

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res2.body).toHaveProperty(`errors.body.${'nome' || 'estado'}`)
  })
})
