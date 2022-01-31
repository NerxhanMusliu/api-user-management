import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [
    UsersModule,
    OrganizationsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/user-managment'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
