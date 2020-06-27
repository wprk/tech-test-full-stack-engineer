import { Test, TestingModule } from '@nestjs/testing'

import { SuburbController } from './suburb.controller'
import { SuburbService } from './suburb.service'

describe('Suburb Controller', () => {
  let controller: SuburbController

  const suburbServiceMock = {
    findAll: jest.fn().mockResolvedValue({
      data: [],
      total: 0,
      page: 1,
      limit: 5,
    }),
    findOne: jest.fn().mockResolvedValue({ data: {} }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuburbController],
      providers: [
        { provide: SuburbService, useValue: suburbServiceMock },
      ],
    }).compile()

    controller = module.get<SuburbController>(SuburbController)
  })
  
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
