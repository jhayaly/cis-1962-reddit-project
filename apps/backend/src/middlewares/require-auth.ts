import { Request, Response, NextFunction } from 'express';

export default function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.session || !req.session.user) {
    next(new Error('Unauthenticated User'));
  } else {
    next();
  }
}
