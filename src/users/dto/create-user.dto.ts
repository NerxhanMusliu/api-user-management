import { IsIn, IsOptional, IsString } from 'class-validator';
import { UserRoleTypesEnum } from '../enums/users.enum';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  @IsIn(Object.values(UserRoleTypesEnum))
  readonly role: string;

  @IsString()
  @IsOptional()
  readonly organizationId: string[];

  @IsString()
  @IsOptional()
  readonly teamId: string[];
}
