import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { NextFunction, Request, Response } from 'express';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  const port = Number(config.get<string>('PORT') ?? 3001);

  const uploadDirectory = process.env.VERCEL
    ? '/tmp/uploads'
    : join(process.cwd(), 'uploads');

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  mkdirSync(uploadDirectory, { recursive: true });

  app.useStaticAssets(uploadDirectory, {
    prefix: '/uploads/',
  });

  app.enableCors({
    origin: (config.get<string>('CORS_ORIGIN') ?? 'http://localhost:3000')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use((_request: Request, response: Response, next: NextFunction) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

  await app.listen(port, '0.0.0.0');
}

void bootstrap();