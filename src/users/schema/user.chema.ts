import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    collection: 'users',
})

export class User {
    @Prop({ required: true, unique: true })
    userId: number;

    @Prop({ required: true, trim: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: Role, type: String })
    roles: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);