import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  const cfg = app.get(ConfigService)

  app.enableCors({
    origin: cfg.get('CLIENT_ORIGIN') ?? 'http://localhost:5173',
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  await app.listen(cfg.get('PORT') ?? 3000)
}
bootstrap()
