import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import * as mongoose from 'mongoose';

@Schema()
export class Organization extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  userId: User;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
