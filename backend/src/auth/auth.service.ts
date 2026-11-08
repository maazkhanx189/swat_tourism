import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    this.validatePasswordLength(dto.password);
    const password = await hash(dto.password, 12);

    try {
      const user = await this.prisma.user.create({
        data: { name: dto.name.trim(), email: dto.email, password },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      });

      return { user, accessToken: await this.signToken(user.id, user.email, user.role) };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('An account with this email already exists.');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    this.validatePasswordLength(dto.password);
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user || !(await compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const { password: _password, ...safeUser } = user;
    return {
      user: safeUser,
      accessToken: await this.signToken(user.id, user.email, user.role),
    };
  }

  private signToken(userId: string, email: string, role: string) {
    return this.jwt.signAsync({ sub: userId, email, role });
  }

  private validatePasswordLength(password: string) {
    if (Buffer.byteLength(password, 'utf8') > 72) {
      throw new BadRequestException('Password must be no more than 72 bytes.');
    }
  }
}
