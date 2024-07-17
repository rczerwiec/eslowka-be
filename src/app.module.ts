import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Users/Users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/eslowka'),
    UserModule,
  ],
})
export class AppModule {}
