import { PartialType } from '@nestjs/mapped-types';
import { CreateTourPackageDto } from './create-tour-package.dto.js';

export class UpdateTourPackageDto extends PartialType(CreateTourPackageDto) {}
