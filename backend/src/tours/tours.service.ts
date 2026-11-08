import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDestinationDto } from './dto/create-destination.dto.js';
import { CreateGalleryImageDto } from './dto/create-gallery-image.dto.js';
import { CreateTourPackageDto } from './dto/create-tour-package.dto.js';
import { UpdateDestinationDto } from './dto/update-destination.dto.js';
import { UpdateGalleryImageDto } from './dto/update-gallery-image.dto.js';
import { UpdateTourPackageDto } from './dto/update-tour-package.dto.js';

function isPrismaError(error: unknown, code: string): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === code;
}

@Injectable()
export class ToursService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.tourPackage.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const tour = await this.prisma.tourPackage.findUnique({
      where: { id },
      include: { gallery: { orderBy: { createdAt: 'desc' } } },
    });
    if (!tour) {
      throw new NotFoundException('Tour package not found.');
    }
    return tour;
  }

  create(dto: CreateTourPackageDto & { image: string }) {
    return this.prisma.tourPackage.create({ data: dto });
  }

  async update(id: string, dto: UpdateTourPackageDto) {
    await this.ensureTourExists(id);
    try {
      return await this.prisma.tourPackage.update({ where: { id }, data: dto });
    } catch (error) {
      if (isPrismaError(error, 'P2025')) {
        throw new NotFoundException('Tour package not found.');
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.ensureTourExists(id);
    try {
      await this.prisma.tourPackage.delete({ where: { id } });
      return { message: 'Tour package deleted.' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new ConflictException('This tour package has bookings and cannot be deleted.');
      }
      throw error;
    }
  }

  findDestinations() {
    return this.prisma.destination.findMany({ orderBy: { name: 'asc' } });
  }

  async findDestination(id: string) {
    const destination = await this.prisma.destination.findUnique({ where: { id } });
    if (!destination) {
      throw new NotFoundException('Destination not found.');
    }
    return destination;
  }

  createDestination(dto: CreateDestinationDto) {
    return this.prisma.destination.create({ data: dto }).catch((error: unknown) => {
      if (isPrismaError(error, 'P2002')) {
        throw new ConflictException('A destination with this name already exists.');
      }
      throw error;
    });
  }

  async updateDestination(id: string, dto: UpdateDestinationDto) {
    await this.ensureDestinationExists(id);
    try {
      return await this.prisma.destination.update({ where: { id }, data: dto });
    } catch (error) {
      if (isPrismaError(error, 'P2002')) {
        throw new ConflictException('A destination with this name already exists.');
      }
      if (isPrismaError(error, 'P2025')) {
        throw new NotFoundException('Destination not found.');
      }
      throw error;
    }
  }

  async removeDestination(id: string) {
    await this.ensureDestinationExists(id);
    await this.prisma.destination.delete({ where: { id } });
    return { message: 'Destination deleted.' };
  }

  findGallery() {
    return this.prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
      include: { tourPackage: { select: { id: true, name: true } } },
    });
  }

  async findGalleryImage(id: string) {
    const image = await this.prisma.galleryImage.findUnique({
      where: { id },
      include: { tourPackage: { select: { id: true, name: true } } },
    });
    if (!image) {
      throw new NotFoundException('Gallery image not found.');
    }
    return image;
  }

  createGalleryImage(dto: CreateGalleryImageDto) {
    return this.prisma.galleryImage.create({ data: dto }).catch((error: unknown) => {
      if (isPrismaError(error, 'P2003')) {
        throw new NotFoundException('Tour package not found.');
      }
      throw error;
    });
  }

  async updateGalleryImage(id: string, dto: UpdateGalleryImageDto) {
    await this.ensureGalleryImageExists(id);
    try {
      return await this.prisma.galleryImage.update({ where: { id }, data: dto });
    } catch (error) {
      if (isPrismaError(error, 'P2003')) {
        throw new NotFoundException('Tour package not found.');
      }
      if (isPrismaError(error, 'P2025')) {
        throw new NotFoundException('Gallery image not found.');
      }
      throw error;
    }
  }

  async removeGalleryImage(id: string) {
    await this.ensureGalleryImageExists(id);
    await this.prisma.galleryImage.delete({ where: { id } });
    return { message: 'Gallery image deleted.' };
  }

  private async ensureTourExists(id: string) {
    if (!(await this.prisma.tourPackage.findUnique({ where: { id }, select: { id: true } }))) {
      throw new NotFoundException('Tour package not found.');
    }
  }

  private async ensureDestinationExists(id: string) {
    if (!(await this.prisma.destination.findUnique({ where: { id }, select: { id: true } }))) {
      throw new NotFoundException('Destination not found.');
    }
  }

  private async ensureGalleryImageExists(id: string) {
    if (!(await this.prisma.galleryImage.findUnique({ where: { id }, select: { id: true } }))) {
      throw new NotFoundException('Gallery image not found.');
    }
  }
}
