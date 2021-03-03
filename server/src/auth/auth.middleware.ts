import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { admin } from '~/modules/firebase-admin'
import { AuthorizedRequest } from './auth.type'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: AuthorizedRequest, _res: Response, next: NextFunction) {
    const token = req.headers.authorization
    if (token == null || token === '') next()
    else {
      try {
        const decodedToken = await admin.auth().verifyIdToken(token.replace('Bearer ', ''))
        req.user = {
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
