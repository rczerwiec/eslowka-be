import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';

// ⬇️ import JSON-a jako moduł (działa tylko po dodaniu resolveJsonModule)
import serviceAccount from './firebaseServiceAccount.json';

let firebase_params;

// Sprawdź czy jesteśmy w Dockerze (NODE_ENV=production w docker-compose.yml)
// if (process.env.NODE_ENV === 'production') {
//   // DOCKER - użyj zmiennych środowiskowych
//   firebase_params = {
//     type: "service_account",
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     clientId: process.env.FIREBASE_CLIENT_ID,
//     authUri: "https://accounts.google.com/o/oauth2/auth",
//     tokenUri: "https://oauth2.googleapis.com/token",
//     authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
//     clientC509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
//   };
// } else {
  // LOKALNIE - użyj importowanego pliku
  firebase_params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url,
  };
// }

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: 'https://fir-auth-bd895.firebaseio.com',
    });
  }

  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;

    if (token && token !== '') {
      this.defaultApp
        .auth()
        .verifyIdToken(token)
        .then(async (decodedToken) => {
          req['user'] = { email: decodedToken.email };
          next();
        })
        .catch((error) => {
          console.error(error);
          this.accessDenied(req.url, res);
        });
    } else {
      this.accessDenied(req.url, res);
    }
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
