import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SuburbController } from './suburb.controller'
import { SuburbService } from './suburb.service'
import { Suburb } from 'src/models/suburb.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Suburb,
    ])
  ],
  controllers: [SuburbController],
  providers: [SuburbService],
})
export class SuburbModule {}
