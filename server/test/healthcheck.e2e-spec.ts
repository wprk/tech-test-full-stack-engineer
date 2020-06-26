import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { HealthcheckModule } from '../src/modules/healthcheck/healthcheck.module'

describe('HealthcheckController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthcheckModule],
    }).compile()

    app = moduleFixture.createNestApplication();
    await app.init()
  })

  it('/healthcheck (GET)', () => {
    return request(app.getHttpServer())
      .get('/healthcheck')
      .expect(200)
      .expect({ status: 'success' })
  })
})