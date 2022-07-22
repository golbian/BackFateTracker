import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/fateTracker'), CharacterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}