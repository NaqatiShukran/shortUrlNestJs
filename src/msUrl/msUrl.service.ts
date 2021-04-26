import { Injectable, NotFoundException, Inject, Catch } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import * as ShortId from 'short-uuid'

import { Url } from './msUrl.model';

@Injectable()
export class UrlService{

    private Url: Url[] = [];
    
    constructor(@InjectModel('Url') private readonly urlModel: Model<Url>) {}

    async getShortUrl(urlHash: string){
        const Url = await this.findUrl(urlHash);
        if (Url==null){
            console.log("MS exceptiion error");
        }
        
        return Url;
    }

    async insertUrl(originalUrl: string){
        let findUrls = await this.findUrlByName(originalUrl);
        console.log(findUrls);
        
        const BaseUrl = "localhost:4000/";
        const urlHash = ShortId.generate();
        const shortUrl = BaseUrl + urlHash;
        console.log(urlHash);
        
        if (findUrls === null){
            const newUrl = new this.urlModel({
                url: originalUrl,
                urlHash: urlHash,
                shortUrl: shortUrl
            });
            
            const result = await newUrl.save();
            console.log(result);
            return result;
        }
        else{
            throw new Error ("Url already exists")
        }
    }

    private async findUrl(urlHash: string): Promise<Url>{
        let data;
        try{
            data = await this.urlModel.findOne({urlHash: urlHash})
        }
        catch(error){
            throw new NotFoundException('Could not find url');
        }
        return data;
    }

    private async findUrlByName(url: string): Promise<Url>{
        let data;
        try{
            data = await this.urlModel.findOne({url: url})
            console.log(data);     
        }
        catch(error){
            throw new NotFoundException('Could not find url');
        }
        return data;
    }
}