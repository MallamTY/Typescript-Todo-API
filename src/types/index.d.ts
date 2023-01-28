export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        username: string,
        email: string,
        user_id: string
      };
    }
  }
}

declare module "jsonwebtoken" {
  export interface payloadJson extends JwtPayload {
      username: string;
      email: string;
      user_id: string
  }
}



