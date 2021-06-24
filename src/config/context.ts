import { Request, Response } from 'express';
import { User } from '../Models/UserModel/userSchema';

// type Context = {
//   req: Request & { user?: Pick<User, 'id' | 'email'> };
//   res: Response;
// };

export interface Context {
  user?: User;
}
