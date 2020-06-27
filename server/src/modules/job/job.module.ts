import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JobController } from './job.controller'
import { JobService } from './job.service'
import { Job } from '../../models/job.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Job,
    ])
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
