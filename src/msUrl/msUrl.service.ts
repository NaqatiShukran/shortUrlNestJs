import { Injectable, NotFoundException, Inject, Catch } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { Url } from './msUrl.model';

@Injectable()
export class UrlService{

    private Url: Url[] = [];
    
    constructor(@InjectModel('Url') private readonly urlModel: Model<Url>) {}
    

    // async getUrls(){
    //     const Url = await this.urlModel.find();
    //     return Url.map(url => ({
    //         url: url.url,
    //         urlHash: url.urlHash,
    //         shortUrl: url.shortUrl
    //       }));
    // }

    async getSingleUrl(urlHash: string){
        const Url = await this.findUrl(urlHash);
        if (Url==null){
            console.log("MS exceptiion error");
            throw new NotFoundException("Url not found");
        }
        return Url;
    }

    private async findUrl(urlHash: string): Promise<Url>{
        let data;
        try{
            data = await this.urlModel.findOne({urlHash: urlHash})
            console.log(data);
            
        }
        catch(error){
            throw new NotFoundException('Could not find url');
        }
        return data;
    }
}