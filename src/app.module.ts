import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './shortUrl/shortUrl.module';

//Module
@Module({
  imports: [UrlModule, MongooseModule.forRoot('mongodb+srv://dbUser:Password@urlshortner.pjx1v.mongodb.net/urlShortner?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
