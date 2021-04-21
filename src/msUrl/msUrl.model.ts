import * as mongoose from 'mongoose';

export const UrlSchema = new mongoose.Schema({
    url: { type: String, required: true },
    urlHash: { type: String, required: true },
    shortUrl: { type: String, required: true }
});


export interface Url extends mongoose.Document {
    id: string;
    url: string;
    urlHash: string;
    shortUrl: string;
}