import { Test, TestingModule } from '@nestjs/testing'
import { SuburbController } from './suburb.controller'

describe('Suburb Controller', () => {
  let controller: SuburbController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuburbController],
    }).compile()

    controller = module.get<SuburbController>(SuburbController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
