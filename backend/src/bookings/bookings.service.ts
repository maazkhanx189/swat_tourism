import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus, Prisma, Role } from '@prisma/client';
import { AuthenticatedUser } from '../auth/decorators/current-user.decorator.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateBookingDto) {
    const bookingDate = new Date(dto.bookingDate);
    if (Number.isNaN(bookingDate.getTime())) {
      throw new BadRequestException('Booking date is invalid.');
    }

    const today = new Date();
    const requestedDay = new Date(bookingDate);
    today.setUTCHours(0, 0, 0, 0);
    requestedDay.setUTCHours(0, 0, 0, 0);
    if (requestedDay < today) {
      throw new BadRequestException('Booking date cannot be in the past.');
    }

    const tour = await this.prisma.tourPackage.findUnique({
      where: { id: dto.tourPackageId },
      select: { id: true, name: true, price: true },
    });
    if (!tour) {
      throw new NotFoundException('Tour package not found.');
    }

    const guests = dto.guests ?? 1;
    const priceMatch = tour.price.match(/^\s*(?:[$€£]\s*)?(\d+(?:\.\d{1,2})?)/);
    if (!priceMatch) {
      throw new BadRequestException(
        `Tour package "${tour.name}" has a price that cannot be used for bookings.`,
      );
    }

    let quantity = 1;
    if (/per\s+person/i.test(tour.price)) {
      quantity = guests;
    } else {
      const familyMatch = tour.price.match(/per\s+family\s+of\s+(\d+)/i);
      if (familyMatch) {
        quantity = Math.ceil(guests / Number(familyMatch[1]));
      }
    }

    const totalAmount = new Prisma.Decimal(priceMatch[1]).mul(quantity);
    return this.prisma.booking.create({
      data: {
        userId,
        tourPackageId: tour.id,
        bookingDate,
        guests,
        totalAmount,
      },
      include: { tourPackage: { select: { id: true, name: true, image: true } } },
    });
  }

  findForUser(user: AuthenticatedUser) {
    return this.prisma.booking.findMany({
      where: user.role === Role.ADMIN ? undefined : { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        tourPackage: { select: { id: true, name: true, image: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async cancel(id: string, user: AuthenticatedUser) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      throw new NotFoundException('Booking not found.');
    }
    if (user.role !== Role.ADMIN && booking.userId !== user.id) {
      throw new ForbiddenException('You can only cancel your own bookings.');
    }
    if (booking.status !== BookingStatus.PENDING && user.role !== Role.ADMIN) {
      throw new BadRequestException('Only pending bookings can be cancelled by the customer.');
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.CANCELLED },
      include: { tourPackage: { select: { id: true, name: true } } },
    });
  }

  async updateStatus(id: string, status: BookingStatus) {
    await this.ensureBookingExists(id);
    return this.prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        tourPackage: { select: { id: true, name: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  private async ensureBookingExists(id: string) {
    if (!(await this.prisma.booking.findUnique({ where: { id }, select: { id: true } }))) {
      throw new NotFoundException('Booking not found.');
    }
  }
}
