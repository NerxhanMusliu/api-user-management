import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Team } from '../../teams/entities/team.entity';
import * as mongoose from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  teamId: Team;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
