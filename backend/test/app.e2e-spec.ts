import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { PrismaService } from './../src/prisma/prisma.service.js';

process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.JWT_SECRET = 'test-only-secret-that-is-long-enough-for-the-api';

const { AppModule } = await import('./../src/app.module.js');

describe('AppController (e2e)', () => {
  let app!: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        $connect: vi.fn(),
        $disconnect: vi.fn(),
        tourPackage: { findMany: vi.fn().mockResolvedValue([]) },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/tours (GET) is public', () => {
    return request(app.getHttpServer()).get('/tours').expect(200).expect([]);
  });

  it('/tours (POST) requires an admin token', () => {
    return request(app.getHttpServer()).post('/tours').expect(401);
  });

  afterEach(async () => {
    await app?.close();
  });
});
