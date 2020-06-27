import { Test, TestingModule } from '@nestjs/testing'
import { HealthcheckController } from './healthcheck.controller'
import { HealthcheckService } from './healthcheck.service'

describe('HealthcheckController', () => {
  let controller: HealthcheckController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
      providers: [HealthcheckService],
    }).compile()

    controller = app.get<HealthcheckController>(HealthcheckController)
  })

  describe('root', () => {
    it('should return "success"', () => {
      expect(controller.getHealthcheck()).toMatchObject({ status: 'success' })
    })
  })
})
