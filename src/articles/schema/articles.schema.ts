import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({
    timestamps: true,
    collection: 'articles',
})

export class Article {
    @Prop({ required: true, trim: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ trim: true })
    summary: string;

    @Prop({ trim: true })
    slug: string;

    @Prop({ default: 'draft' })
    status: 'draft' | 'published' | 'archived';

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ type: Types.ObjectId, ref: 'User' })
    author: Types.ObjectId;

    @Prop({ default: 0 })
    views: number;

    @Prop({ type: [String], default: [] })
    categories: string[];

    @Prop({ trim: true })
    featuredImage: string;

    @Prop({ default: false })
    isFeatured: boolean;

    @Prop({ default: false })
    allowComments: boolean;

    @Prop({ type: Date })
    publishedAt: Date;

    @Prop({ type: Date })
    scheduledFor: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);