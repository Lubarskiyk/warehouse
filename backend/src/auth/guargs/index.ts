import { JwtAuthGuard } from '@auth/guargs/jwt-auth.guard';
import { RolesGuard } from '@auth/guargs/role.guard';

export const GUARDS = [JwtAuthGuard, RolesGuard];
