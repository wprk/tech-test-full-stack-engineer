import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'

import { Job, JobStatus } from '../../../src/models/job.model'
import { JobModule } from '../../../src/modules/job/job.module'

describe('JobController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [JobModule],
    })
      .overrideProvider(getRepositoryToken(Job))
      .useFactory({
        factory: () => ({
          count: jest.fn().mockResolvedValue(0),
          find: jest.fn().mockResolvedValue([]),
        }),
      })
      .compile()

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    await app.init()
  })

  it('/jobs (GET)', () => {
    return request(app.getHttpServer())
      .get('/jobs')
      .expect(200)
      .expect({ data: [], total: 0, page: 1, limit: 5 })
  })

  it('/jobs (GET) with valid pagination query', () => {
    return request(app.getHttpServer())
      .get('/jobs?page=2&limit=1')
      .expect(200)
      .expect({ data: [], total: 0, page: 2, limit: 1 })
  })

  it('/jobs (GET) fails when page in not an integer', () => {
    return request(app.getHttpServer())
      .get('/jobs?page=bob&limit=1')
      .expect(400)
      .expect({ statusCode: 400, message: [ 'page must not be less than 1', 'page must be an integer number' ], error: 'Bad Request' })
  })

  it('/jobs (GET) fails when page is less than 1', () => {
    return request(app.getHttpServer())
      .get('/jobs?page=0&limit=1')
      .expect(400)
      .expect({ statusCode: 400, message: [ 'page must not be less than 1' ], error: 'Bad Request' })
  })

  it('/jobs (GET) fails when limit is less than 0', () => {
    return request(app.getHttpServer())
      .get('/jobs?page=1&limit=-1')
      .expect(400)
      .expect({ statusCode: 400, message: [ 'limit must not be less than 0' ], error: 'Bad Request' })
  })

  it('/jobs (GET) with valid filter query', () => {
    return request(app.getHttpServer())
      .get(`/jobs?status=${JobStatus.NEW}`)
      .expect(200)
      .expect({ data: [], total: 0, page: 1, limit: 5 })
  })

  it('/jobs (GET) with invalid filter query', () => {
    return request(app.getHttpServer())
      .get('/jobs?status=invalid')
      .expect(400)
      .expect({ statusCode: 400, message: [ 'status must be a valid enum value' ], error: 'Bad Request' })
  })

  it('/jobs (GET) with invalid filter (extra fields) query', () => {
    return request(app.getHttpServer())
      .get(`/jobs?status=${JobStatus.NEW}&strips=thisfield`)
      .expect(200)
      .expect({ data: [], total: 0, page: 1, limit: 5 })
  })
})