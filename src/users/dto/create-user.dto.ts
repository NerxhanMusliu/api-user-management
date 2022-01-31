import { IsOptional, IsString } from 'class-validator';

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
  readonly role: string;

  @IsString()
  @IsOptional()
  readonly organizationId: string[];

  @IsString()
  @IsOptional()
  readonly teamId: string[];
}
