import request from 'supertest'
import { createConnection, getConnection } from 'typeorm'

import app from '../start/app'

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
    })

    expect(response.status).toBe(201)
  })

  it('Should not be able to create user with exists email', async () => {
    const response = await request(app).post('/users').send({
      name: 'User Example',
      email: 'user@example.com',
    })

    expect(response.status).toBe(400)
  })
})
