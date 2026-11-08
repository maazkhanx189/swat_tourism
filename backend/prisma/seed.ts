import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME?.trim() || 'Swat Tourism Admin';

if (!email || !password) {
  throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in the environment before seeding.');
}

if (Buffer.byteLength(password, 'utf8') < 8 || Buffer.byteLength(password, 'utf8') > 72) {
  throw new Error('ADMIN_PASSWORD must be between 8 and 72 bytes.');
}

const prisma = new PrismaClient();

try {
  const hashedPassword = await hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { name, password: hashedPassword, role: Role.ADMIN },
    create: { name, email, password: hashedPassword, role: Role.ADMIN },
  });
  console.info(`Admin account ${email} is ready.`);
} finally {
  await prisma.$disconnect();
}
