import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema({
    timestamps: true,
    collection: 'cats',
})

export class Cat {
    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ min: 0 })
    age: number;

    @Prop()
    breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
