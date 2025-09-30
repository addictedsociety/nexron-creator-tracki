import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { TodoModule } from './todos/todo.module' // optional, falls vorhanden

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../docker/.env.docker',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('POSTGRES_HOST', 'localhost'),
        port: Number(cfg.get('POSTGRES_PORT') ?? 5432),
        username: cfg.get<string>('POSTGRES_USER', 'app'),
        password: cfg.get<string>('POSTGRES_PASSWORD', 'app123'),
        database: cfg.get<string>('POSTGRES_DB', 'appdb'),
        synchronize: true, // DEV only
        autoLoadEntities: true,
      }),
    }),
    // TodoModule,
  ],
})
export class AppModule {}
