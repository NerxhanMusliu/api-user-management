import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Team extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
