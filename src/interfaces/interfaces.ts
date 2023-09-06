import { Request } from "express";

export interface decodedToken {
  _id: string;
  ext: number;
  iat: number;
}
export interface CustomRequest extends Request {
  user?: any;
  files: any;
  query: any;
  sessionId: any;
}

// export interface CustomRequestBody extends Request{
//   user?: any;
//   files: any;
//   sessionId: string;
// }

