import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { admin } from '~/modules/firebase-admin'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction) {
    const token = (req.headers as any).authorization
    if (token == null || token === '') next()
    else {
      try {
        const decodedToken = await admin.auth().verifyIdToken(token.replace('Bearer ', ''))
        ;(req as any).user = {
          email: decodedToken.email,
          uid: decodedToken.uid,
        }
      } catch (err) {
        console.error(err)
        throw new HttpException('access denide', HttpStatus.FORBIDDEN)
      }
    }
  }
}
