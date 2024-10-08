import { MiddlewareConsumer, Module } from '@nestjs/common';
import { configuration } from 'config/configuration';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './infra/logs/logger.module';
import { InfraModule } from './infra/infra.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './infra/middleware/loggerInterceptor';
import { TraceIdMiddleware } from './infra/middleware/traceIdMiddleware';
import { UsuarioModule } from './usuario/usuario.module';
import { PontosColetaModule } from './pontos-coleta/pontos-coleta.module';
import { RequestContextModule } from 'nestjs-request-context';

@Module({
  imports: [
    LoggerModule,
    RequestContextModule,
    InfraModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV || 'development'}.env`,
      load: [configuration],
      isGlobal: true,
    }),
    UsuarioModule,
    PontosColetaModule,
  ],
  controllers: [],
  exports: [InfraModule],
  providers: [
    UsuarioModule,
    PontosColetaModule,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceIdMiddleware).forRoutes('*');
  }
}
