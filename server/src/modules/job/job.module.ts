import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JobController } from './job.controller'
import { JobService } from './job.service'
import { Job } from '../../models/job.model'
import { JobRepository } from 'src/repositories/job.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Job,
      JobRepository
    ])
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
