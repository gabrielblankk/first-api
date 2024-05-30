import { StatusCodes } from 'http-status-codes'
import { accessToken, testServer } from '../jest.setup'

describe('Cidades - GetAll', () => {
  it('Buscar registros', async () => {
    await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Jaraguá do Sul',
        estado: 'Santa Catarina'
      })

    const res1 = await testServer
      .get('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(res1.statusCode).toEqual(StatusCodes.OK)
    expect(res1.body.length).toBeGreaterThan(0)
    expect(Number(res1.header['x-total-count'])).toBeGreaterThan(0)
    
    const res2 = await testServer
      .get('/cidades?page=1&limit=10&filter= ')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()
    
    expect(res2.statusCode).toEqual(StatusCodes.OK)
    expect(res2.body.length).toBeGreaterThan(0)
    expect(Number(res2.header['x-total-count'])).toBeGreaterThan(0)
  })

  it('Buscar sem autorização', async () => {
    await testServer
      .post('/cidades')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Jaraguá do Sul',
        estado: 'Santa Catarina'
      })

    const res1 = await testServer
      .get('/cidades')
      .send()

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
    expect(res1.body).toHaveProperty('errors.default')
  })

  it('Buscar com query inválida', async () => {
    const res1 = await testServer
      .get('/cidades?page=0&limit=0')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()   
    
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.query.page')
    expect(res1.body).toHaveProperty('errors.query.limit')
    
    const res2 = await testServer
      .get('/cidades?page&limit')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()
    
    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res2.body).toHaveProperty('errors.query.page')
    expect(res2.body).toHaveProperty('errors.query.limit')
  })
})
