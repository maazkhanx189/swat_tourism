import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  tourPackageId!: string;

  @IsDateString()
  bookingDate!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  guests?: number;
}
