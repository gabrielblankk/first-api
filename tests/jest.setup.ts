import supertest from 'supertest'
import { server } from '../src/server/Server'
import { Knex } from '../src/server/database/knex'

let accessToken = ''
beforeAll(async () => {
  await Knex.migrate.latest()
  await Knex.seed.run()

  await testServer
    .post('/cadastrar')
    .send({
      nome: 'Default',
      email: 'default@gmail.com',
      senha: 'default123'
    })

  const signInRes = await testServer
    .post('/entrar')
    .send({
      email: 'default@gmail.com',
      senha: 'default123'
    })

  accessToken = signInRes.body.accessToken
})

afterAll(async () => {
  await Knex.destroy()
})

export const testServer = supertest(server)
export { accessToken }
