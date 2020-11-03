import _admin from 'firebase-admin';
import _firebase from 'firebase';
import firebaseConfig from './firebaseCredentials';
import firebase_env from './config/index';
import serviceAccount from './serviceAccountKey.json';

const { FIREBASE_ADMIN } = firebase_env;

export const params = {
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

export const firebase = _firebase.initializeApp(firebaseConfig);

export const firebase_admin = _admin.initializeApp({
  credential: _admin.credential.cert(params),
  databaseURL: 'https://crucial-subset-268515.firebaseio.com',
});
