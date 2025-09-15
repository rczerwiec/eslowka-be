import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';

let firebase_params;

// Sprawdź, czy zmienna środowiskowa istnieje
if (!process.env.FIREBASE_CRED_B64) {
  throw new Error('Missing FIREBASE_CRED_B64 environment variable!');
}

// Dekodowanie JSON z base64
firebase_params = JSON.parse(
  Buffer.from(process.env.FIREBASE_CRED_B64, 'base64').toString('utf8')
);

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  private defaultApp: firebase.app.App;

  constructor() {
    // Inicjalizacja Firebase
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: 'https://fir-auth-bd895.firebaseio.com',
    });
  }

  use(req: Request, res: Response, next: Function) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (!token) {
      return this.accessDenied(req.url, res);
    }

    this.defaultApp
      .auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        req['user'] = { email: decodedToken.email };
        next();
      })
      .catch(error => {
        console.error(error);
        this.accessDenied(req.url, res);
      });
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }
}
