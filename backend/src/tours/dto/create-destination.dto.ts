import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

const imagePathOrUrl = /^(https?:\/\/|\/uploads\/)[^\s]+$/;

export class CreateDestinationDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  description!: string;

  @IsString()
  @MaxLength(2048)
  @Matches(imagePathOrUrl)
  image!: string;
}
