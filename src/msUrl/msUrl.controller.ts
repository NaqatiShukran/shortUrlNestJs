import { Controller, Get, Logger, Param} from "@nestjs/common";
import { UrlService } from "./msUrl.service";
import { MessagePattern } from '@nestjs/microservices';

@Controller('url')
export class UrlController {
    constructor(private readonly UrlService: UrlService) {}

    private logger = new Logger('AppController');

    //BasePath = 'http://localhost:3000/'

    // @MessagePattern()
    // async getAllShortUrl() {
    //     const Urls = await this.UrlService.getUrls();
    //     return Urls
    // }

    @MessagePattern('url')
    async getShortUrl(urlHash: string) {
        try{
            console.log("MS Controller getShortUrl");
            const Url = await this.UrlService.getSingleUrl(urlHash);
            console.log("This is url in ms" + Url);
            return {
                url: Url.url,
                urlHash: Url.urlHash,
                shortUrl: Url.shortUrl
            };
        }
        catch(error){
            return {
                message: error.message
            }
        }
        
    }

}