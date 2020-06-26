import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import database from './config/database.config'
import server from './config/server.config'
import { RoutesModule } from './modules/routes.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, server],
    }),
    RoutesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host', 'localhost'),
        port: configService.get<number>('database.port', 3306),
        username: configService.get('database.username', 'root'),
        password: configService.get('database.password', ''),
        database: configService.get('database.database', ''),
        entities: [__dirname + '/**/*.model{.ts,.js}'],
        autoLoadEntities: true,
        debug: false,
        logging: false,
      }),
    }),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
