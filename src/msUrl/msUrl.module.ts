import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"

import { UrlController } from "./msUrl.controller";
import { UrlSchema } from "./msUrl.model";
import { UrlService } from "./msUrl.service";


@Module({
    imports: [MongooseModule.forFeature([{name: 'Url' , schema: UrlSchema}])],
    controllers: [UrlController],
    providers: [UrlService],
})

export class UrlModule {}