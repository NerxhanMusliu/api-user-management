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
export class CreateUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    const payload: any = jwtDecode(authHeader);

    const requestedRole = payload.sub;
    const requestedRoleToCreate = request.body.role;

    if (
      requestedRole === UserRoleTypesEnum.ORGANIZATION_ADMIN &&
      ![UserRoleTypesEnum.SUPER_ADMIN].includes(requestedRoleToCreate)
    ) {
      throw new ForbiddenException(
        `The role '${requestedRole}' is not allowed to create or update role '${requestedRoleToCreate}'`,
      );
    }
    if (
      requestedRole === UserRoleTypesEnum.USER &&
      ![
        UserRoleTypesEnum.SUPER_ADMIN,
        UserRoleTypesEnum.ORGANIZATION_ADMIN,
      ].includes(requestedRoleToCreate)
    ) {
      throw new ForbiddenException(
        `The role '${requestedRole}' is not allowed to create or update role '${requestedRoleToCreate}'`,
      );
    }
    return true;
  }
}
