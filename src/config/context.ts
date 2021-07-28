import { Request, Response } from 'express';
import { User } from '../Models/UserModel/userSchema';

export interface Context {
  user?: User;
}
