import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SuburbService } from './suburb.service'
import { Suburb } from '../../models/suburb.model'

describe('SuburbService', () => {
  let service: SuburbService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuburbService,
        {
          provide: getRepositoryToken(Suburb),
          useClass: Repository,
        },
      ],
    }).compile()

    service = module.get<SuburbService>(SuburbService)
  })
  
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
