import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/partials/auth.guard';
import { RolesGuard } from './users/partials/roles.guard';
import { DataBaseModule } from './data-base/data-base.module';
import { CatsModule } from './cats/cats.module';
import { ArticlesModule } from './articles/articles.module';
import { LoggerModule } from './logger/logger.module';
import { MathModule } from './math/math.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DataBaseModule,
    CatsModule,
    ArticlesModule,
    LoggerModule,
    MathModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

  ],
})
export class AppModule { }
