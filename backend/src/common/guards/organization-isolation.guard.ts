import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationIsolationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const organizationId = request.params?.organizationId;
    const user = request.user;

    if (!organizationId) {
      return true;
    }

    if (!user) {
      throw new ForbiddenException('User is not authenticated');
    }

    // Verify user belongs to requested organization
    if (user.organizationId && user.organizationId !== organizationId) {
      throw new ForbiddenException(
        `Cross-organization access forbidden: User belongs to ${user.organizationId}, but requested ${organizationId}`,
      );
    }

    // Attach validated organizationId to request for downstream handlers
    request.organizationId = organizationId;
    return true;
  }
}
