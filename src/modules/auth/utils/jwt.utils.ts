import { Request } from 'express';

export function extracToken(req: Request): string | undefined {
  const token = req.headers.authorization?.split(' ')[1];
  return token;
}
