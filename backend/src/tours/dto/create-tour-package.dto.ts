import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const imagePathOrUrl = /^(https?:\/\/|\/uploads\/)[^\s]+$/;

export class CreateTourPackageDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  price!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(80)
  duration!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  description!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @MaxLength(120, { each: true })
  destinations!: string[];

  @IsArray()
  @IsString({ each: true })
  @MaxLength(120, { each: true })
  includes!: string[];

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  @Matches(imagePathOrUrl)
  image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  badge?: string;
}
