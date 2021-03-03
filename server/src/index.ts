import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import * as express from 'express'
import * as functions from 'firebase-functions'
import * as helmet from 'helmet'

const server = express()

const createNestServer = async (expressInstance: typeof server) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance))

  app.use(helmet())
  app.enableCors()

  console.log('the server is starting @ firebase')
  return app.init()
}

createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err))

export const api = {
  v1: functions.region('asia-northeast-1').runWith({ memory: '2GB' }).https.onRequest(server),
}
