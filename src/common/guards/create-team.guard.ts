import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import jwtDecode from 'jwt-decode';
import { UserRoleTypesEnum } from '../../users/enums/users.enum';

@Injectable()
export class CreateTeamGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    const payload: any = jwtDecode(authHeader);

    const requestedRole = payload.sub;

    if (requestedRole === UserRoleTypesEnum.USER) {
      throw new ForbiddenException(
        `The role '${requestedRole}' is not allowed to create or update an team`,
      );
    }
    return true;
  }
}
