import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { Role } from '@prisma/client';

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: Role;
};

type AuthenticatedRequest = Request & { user: AuthenticatedUser };

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedUser =>
    context.switchToHttp().getRequest<AuthenticatedRequest>().user,
);
