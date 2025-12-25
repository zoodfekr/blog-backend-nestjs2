import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schema/cat.schema';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {

    constructor(
        @InjectModel(Cat.name) private catModel: Model<CatDocument>,
    ) { }



    async create(dto: CreateCatDto) {
        const cat = new this.catModel(dto);
        return cat.save();
    }

    async findAll() {
        return this.catModel.find().lean();
    }

}
