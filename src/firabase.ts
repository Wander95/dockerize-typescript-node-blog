import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';
import firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

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

export default {
  firebase: firebase.initializeApp(firebaseConfig),
  admin: admin.initializeApp({
    credential: admin.credential.cert(params),
    databaseURL: 'https://crucial-subset-268515.firebaseio.com',
  }),
};
