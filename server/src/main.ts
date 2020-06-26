import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const serverConfig: ConfigService = app.get(ConfigService)
  app.enableCors()
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(serverConfig.get<number>('server.port'))
}
bootstrap()
