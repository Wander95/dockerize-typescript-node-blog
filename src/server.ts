import express, { Application, Router } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import admin from 'firebase-admin';

import serviceAccount from './serviceAccountKey.json';

import UserRoutes from './routes/Users.Route';
import SocialMediaRoutes from './routes/SocialMedia.Route';

// * Making Ts happy again */
const params = {
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

const app: Application = express();

// * Configuration */
app.set('port', 3000 || process.env.PORT);

// * Firebase config */
admin.initializeApp({
  credential: admin.credential.cert(params),
  databaseURL: 'https://crucial-subset-268515.firebaseio.com',
});

// * Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(`dev`));
app.use(helmet());
app.use(cors());

// * Routes */
app.use('/api', UserRoutes);
app.use('/api', SocialMediaRoutes);

export default app;
