import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                uri: config.get<string>('MONGO_URI'),
                dbName: 'blog_backend2',
                autoIndex: true,
                serverSelectionTimeoutMS: 5000,
            }),
        }),

    ],
})
export class DataBaseModule { }
