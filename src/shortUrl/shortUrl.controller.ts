import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import * as ShortId from 'short-uuid';
import { UrlService } from "./shortUrl.service";

@Controller('url')
export class UrlController {
    constructor(private readonly UrlService: UrlService) {}

    BasePath = 'http://localhost:3000/'
    @Post()
    async addShortUrl(
        @Body('url') url: string,
        ) { 
            try{
                const urlHash = ShortId.generate();
                const shortUrl = this.BasePath + urlHash;
                const insertedUrl = await this.UrlService.insertUrl(url, urlHash, shortUrl);
                return {
                    url: insertedUrl.url,
                    urlHash: insertedUrl.urlHash,
                    shortUrl: insertedUrl.shortUrl
                };
            }
            catch(error){
                return {
                    message:error.message
                }
            };
    }

    @Get()
    async getAllShortUrl() {
        const Urls = await this.UrlService.getUrls();
        return Urls
    }

    @Get(':id')
    async getShortUrl(@Param('id') id: string) {
        const Url = await this.UrlService.getSingleUrl(id);
        return {
            url: Url.url,
            urlHash: Url.urlHash,
            shortUrl: Url.shortUrl
        };
    }

    @Patch()
    async updateShortUrl(
        @Body('url') url: string, 
        ) {
            const urlHash = ShortId.generate();
            const shortUrl = this.BasePath + urlHash;
            const Url = await this.UrlService.updateUrl(url, urlHash, shortUrl);
            return {
                url: Url.url,
                urlHash: Url.urlHash,
                shortUrl: Url.shortUrl
            };
    }

    @Delete(':id')
    async removeUrl(@Param('id') id: string){
        let message = await this.UrlService.deleteUrl(id);
        return message ;
    }
}