import { Controller, Logger} from "@nestjs/common";
import { UrlService } from "./msUrl.service";
import { GrpcMethod } from '@nestjs/microservices';

interface IUrlHash {
    urlHash : string;
}

interface IUrlObject{
    urlOb: Object
}

@Controller('url')
export class UrlController {
    constructor(private readonly UrlService: UrlService) {}

    private logger = new Logger('AppController');

    // @MessagePattern('url')
    @GrpcMethod('UrlController','GetShortUrl')
    // async getShortUrl(urlHash: string)
    async getShortUrl(hash: IUrlHash, metadata: any): Promise<IUrlObject> {
        try{
            // console.log("MS Controller getShortUrl");
            // console.log("This is url in ms" + Url);
            const Url= await this.UrlService.getShortUrl(hash.urlHash) 
            // console.log("This is url in ms" + Url);        
            return {urlOb:Url};
        }
        catch(error){
        }
        
    }

}