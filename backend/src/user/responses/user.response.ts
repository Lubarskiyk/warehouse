import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
  id: string;
  login: string;
  name: string;
  surname: string;
  code: string;
  updatedAt: Date;
  roles: Role[];
  isBlocked: boolean;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
