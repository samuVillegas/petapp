import { IsString, MaxLength } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  readonly roleName: string;

  @IsString()
  @MaxLength(100)
  readonly email: string;

  @IsString()
  @MaxLength(100)
  readonly password: string;

  @IsString()
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @MaxLength(255)
  readonly address: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email', 'roleName'] as const),
) {}