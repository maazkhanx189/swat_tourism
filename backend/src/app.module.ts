import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ToursModule } from './tours/tours.module.js';
import { BookingsModule } from './bookings/bookings.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

function validateEnvironment(environment: Record<string, unknown>) {
  const secret = environment.JWT_SECRET;
  const databaseUrl = environment.DATABASE_URL;
  const port = Number(environment.PORT ?? 3001);

  if (typeof secret !== 'string' || Buffer.byteLength(secret, 'utf8') < 32) {
    throw new Error('JWT_SECRET must be set to a random secret of at least 32 bytes.');
  }
  if (typeof databaseUrl !== 'string' || databaseUrl.length === 0) {
    throw new Error('DATABASE_URL must be set.');
  }
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return { ...environment, PORT: String(port) };
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnvironment }),
    PrismaModule,
    AuthModule,
    ToursModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
