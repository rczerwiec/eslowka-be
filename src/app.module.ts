import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Users/Users.module';
import { PreauthMiddleware } from './auth/preauth.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/eslowka'),
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PreauthMiddleware)
      .exclude({
        path: 'users/signup',
        method: RequestMethod.POST,
      })
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
