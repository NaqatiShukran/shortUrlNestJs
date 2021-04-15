import { Injectable, NotFoundException, Inject, Catch } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { Url } from './shortUrl.model';

@Injectable()
export class UrlService{

    private Url: Url[] = [];
    
    constructor(@InjectModel('Url') private readonly urlModel: Model<Url>) {}
    
    async insertUrl(url: string, urlHash: string, shortUrl: string) {
        let findUrls = await this.findUrl(url);
         
        if (findUrls === null){
            const newUrl = new this.urlModel({
                url,
                urlHash,
                shortUrl,
            });
            
            const result = await newUrl.save();
            console.log(result);
            
            return result;
        }
        else{
            throw new Error ("Url already exists")
        }
    };

    async getUrls(){
        const Url = await this.urlModel.find();
        return Url.map(url => ({
            url: url.url,
            urlHash: url.urlHash,
            shortUrl: url.shortUrl
          }));
    }

    async getSingleUrl(urlId: string){
        const url = await this.findUrlById(urlId);
        return url;
    }

    async updateUrl(url:string, urlHash: string, shortUrl: string){
        const updatedUrl = await this.findUrl(url);
        if (urlHash){
            updatedUrl.urlHash = urlHash;
        };
        if (shortUrl){
            updatedUrl.shortUrl = shortUrl;
        };
        updatedUrl.save();
        return updatedUrl;
    }

    async deleteUrl(id:string){
        let deleted;
        try{
            deleted =  await this.urlModel.deleteOne({_id:id}) 
        }
        catch(error){
            throw new Error("Something went wrong");
        }

        if (deleted.deletedCount == 0){
            return {message: "Id not present in DB"};
        }
        else{
            return {message: "Deleted Successfully"}
        }
    }

    private async findUrlById(id: string): Promise<Url>{
        let url;
        try{
            url = await this.urlModel.findById(id);
        }
        catch(error){
            throw new NotFoundException('Could not find url');
        }
        return url;
    }

    private async findUrl(url: string): Promise<Url>{
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