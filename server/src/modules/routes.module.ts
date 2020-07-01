import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { HealthcheckModule } from './healthcheck/healthcheck.module'
import { JobModule } from './job/job.module'
import { SuburbModule } from './suburb/suburb.module'

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    HealthcheckModule,
    JobModule,
    SuburbModule,
  ],
})
export class RoutesModule {}