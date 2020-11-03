import { IncomingHttpHeaders } from 'http';

declare module 'http' {
  interface IncomingHttpHeaders {
    token: string;
    KEY: string;
  }
}

declare global {
  namespace Express {
    export interface Request {
      userId: string;
      authorization: {
        token: string;
      };
    }
  }
}
