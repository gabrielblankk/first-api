import { StatusCodes } from 'http-status-codes'
import { accessToken, testServer } from '../jest.setup'

describe('Pessoas - GetAll', () => {
  it('Buscar registros', async () => {
    await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    const res1 = await testServer
      .get('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(res1.status).toEqual(StatusCodes.OK)
    expect(res1.body.length).toBeGreaterThan(0)
    expect(Number(res1.header['x-total-count'])).toBeGreaterThan(0)

    const res2 = await testServer 
      .get('/pessoas?page=1&limit=10&filter=')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()

    expect(res1.status).toEqual(StatusCodes.OK)      
  })

  it('Buscar registros', async () => {
    await testServer
      .post('/pessoas')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Gabriel',
        email: 'gabriel@gmail.com',
        cidadeId: 1
      })

    const res1 = await testServer
      .get('/pessoas')
      .send()

    expect(res1.status).toEqual(StatusCodes.UNAUTHORIZED)
    expect(res1.body).toHaveProperty('errors.default')
  })

  it('Buscar registros com query inválida', async () => {
    const res1 = await testServer
      .get('/pessoas?page=0&limit=0')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()   
    
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res1.body).toHaveProperty('errors.query.page')
    expect(res1.body).toHaveProperty('errors.query.limit')
    
    const res2 = await testServer
      .get('/pessoas?page&limit')
      .set({ authorization: `Bearer ${accessToken}` })
      .send()
    
    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res2.body).toHaveProperty('errors.query.page')
    expect(res2.body).toHaveProperty('errors.query.limit')
  })
})