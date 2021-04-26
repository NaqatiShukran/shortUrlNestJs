import { Controller, Logger} from "@nestjs/common";
import { UrlService } from "./msUrl.service";
import { GrpcMethod } from '@nestjs/microservices';

interface IUrlHash {
    urlHash : string;
}

interface IUrlObject{
    urlOb: Object
}

interface IOriginalUrl{
    originalUrl : string
}

@Controller('url')
export class UrlController {
    constructor(private readonly UrlService: UrlService) {}

    private logger = new Logger('AppController');

    @GrpcMethod('UrlController','GetShortUrl')
    async getShortUrl(hash: IUrlHash, metadata: any): Promise<IUrlObject> {
        try{
            const Url= await this.UrlService.getShortUrl(hash.urlHash)        
            return {urlOb: Url};
        }
        catch(error){
        }
        
    }

    @GrpcMethod('UrlController','InsertUrl') 
    async insertUrl (originalUrl: IOriginalUrl, metadata: any): Promise<IUrlObject> {
        try{
            const Url= await this.UrlService.insertUrl(originalUrl.originalUrl)
            console.log("controller ", Url);
                    
            return {urlOb: Url};
        }
        catch(error){
        }
    }

}