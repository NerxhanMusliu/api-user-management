import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entities/user.entity';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Team extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  userId: User;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
