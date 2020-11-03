import _admin from 'firebase-admin';
import _firebase from 'firebase';
import firebaseConfig from './firebaseCredentials';
import firebase_env from './config/index';

const { FIREBASE_ADMIN } = firebase_env;

export const params = {
  type: FIREBASE_ADMIN.TYPE,
  projectId: FIREBASE_ADMIN.PROJECT_ID,
  privateKeyId: FIREBASE_ADMIN.PRIVATE_KEY_ID,
  privateKey: FIREBASE_ADMIN.PRIVATE_KEY,
  clientEmail: FIREBASE_ADMIN.CLIENT_EMAIL,
  clientId: FIREBASE_ADMIN.CLIENT_ID,
  authUri: FIREBASE_ADMIN.AUTH_URI,
  tokenUri: FIREBASE_ADMIN.TOKEN_URI,
  authProviderX509CertUrl: FIREBASE_ADMIN.AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: FIREBASE_ADMIN.CLIENT_X509_CERT_URL,
};

export const firebase = _firebase.initializeApp(firebaseConfig);

export const firebase_admin = _admin.initializeApp({
  credential: _admin.credential.cert(params),
  databaseURL: 'https://crucial-subset-268515.firebaseio.com',
});
