import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authHeader = req.headers['auth-user'];
    if (!authHeader) {
      return res.json({ message: 'Unauthorized' });
    }

    const token = authHeader[1];
    if (!token) {
      return res.json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, 'secret');
      if (!decoded || !decoded['userId']) {
        return res.json({ message: 'Unauthorized' });
      }

      req['userId'] = decoded['userId'];
      next();
    } catch (error) {
      return res.json({ message: 'Unauthorized' });
    }
  }
}
