import { IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';

const imagePathOrUrl = /^(https?:\/\/|\/uploads\/)[^\s]+$/;

export class CreateGalleryImageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  caption!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(300)
  alt!: string;

  @IsString()
  @MaxLength(2048)
  @Matches(imagePathOrUrl)
  image!: string;

  @IsOptional()
  @IsUUID()
  tourPackageId?: string;
}
