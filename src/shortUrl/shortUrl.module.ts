import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"

import { UrlController } from "./shortUrl.controller";
import { UrlSchema } from "./shortUrl.model";
import { UrlService } from "./shortUrl.service";


@Module({
    imports: [MongooseModule.forFeature([{name: 'Url' , schema: UrlSchema}])],
    controllers: [UrlController],
    providers: [UrlService],
})

export class UrlModule {}