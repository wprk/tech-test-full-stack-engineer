import { Module } from '@nestjs/common'

import { CategoryModule } from './category/category.module'
import { HealthcheckModule } from './healthcheck/healthcheck.module'
import { JobModule } from './job/job.module'
import { SuburbModule } from './suburb/suburb.module'

@Module({
  imports: [
    HealthcheckModule,
    CategoryModule,
    JobModule,
    SuburbModule,
  ],
})
export class RoutesModule {}