import { Test, TestingModule } from '@nestjs/testing'

import { JobController } from './job.controller'
import { JobService } from './job.service';

describe('JobController', () => {
  let controller: JobController

  const jobServiceMock = {
    findAll: jest.fn().mockResolvedValue({
      data: [],
      total: 0,
      page: 1,
      limit: 5,
    }),
    findOne: jest.fn().mockResolvedValue({ data: {} }),
    update: jest.fn().mockResolvedValue({ data: {} }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        { provide: JobService, useValue: jobServiceMock },
      ],
    }).compile()

    controller = module.get<JobController>(JobController)
  })
  describe('root', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined()
    })
  })
})
