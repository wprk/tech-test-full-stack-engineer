import { Test, TestingModule } from '@nestjs/testing'

import { JobFindAllInput } from './dto/job.find-all.input'
import { JobController } from './job.controller'
import { JobService } from './job.service'
import { JobStatus } from '../../models/job.model'
import { HttpException } from '@nestjs/common'

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
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        { provide: JobService, useValue: jobServiceMock },
      ],
    }).compile()

    controller = module.get<JobController>(JobController)
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('it is able to fetch a list of jobs', () => {
    it('should call findAll on jobsService with any criteria', async () => {
      const criteria = {} as JobFindAllInput
      await controller.findAll(criteria)

      expect(jobServiceMock.findAll).toBeCalledWith(criteria)
    })

    it('should call findAll on jobsService only pagination criteria', async () => {
      const criteria = { page: 1, limit: 2 } as JobFindAllInput
      await controller.findAll(criteria)

      expect(jobServiceMock.findAll).toBeCalledWith(criteria)
    })

    it('should call findAll on jobsService with only query criteria', async () => {
      const criteria = { status: JobStatus.NEW } as JobFindAllInput
      await controller.findAll(criteria)

      expect(jobServiceMock.findAll).toBeCalledWith(criteria)
    })

    it('should call findAll on jobsService with pagination and query criteria', async () => {
      const criteria = { page: 1, limit: 2, status: JobStatus.NEW } as JobFindAllInput
      await controller.findAll(criteria)

      expect(jobServiceMock.findAll).toBeCalledWith(criteria)
    })
  })
})
