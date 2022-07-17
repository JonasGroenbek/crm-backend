import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Identity } from '../identity/identity.entity';

export interface IdentityRequest extends Request {
  identity: Identity;
}

export const AppendIdentity = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: IdentityRequest = ctx.switchToHttp().getRequest();
    const identity = request.identity;
    return identity;
  },
);
