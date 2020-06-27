import { Test, TestingModule } from '@nestjs/testing'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

describe('Category Controller', () => {
  let controller: CategoryController

  const categoryServiceMock = {
    findAll: jest.fn().mockResolvedValue({
      data: [],
      total: 0,
      page: 1,
      limit: 5,
    }),
    findOne: jest.fn().mockResolvedValue({ data: {} }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock },
      ],
    }).compile()

    controller = module.get<CategoryController>(CategoryController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
