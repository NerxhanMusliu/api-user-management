import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Organization } from '../../organizations/entities/organization.entity';
import * as mongoose from 'mongoose';
import { Team } from '../../teams/entities/team.entity';
import { UserRoleTypesEnum } from '../enums/users.enum';

@Schema()
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: UserRoleTypesEnum;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }])
  organizationId: Organization;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }])
  teamId: Team;
}

export const UserSchema = SchemaFactory.createForClass(User);
