import { JWT } from "next-auth/jwt";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string;
    password: string;
    createdAt: Date;
    emailVerified: Date | null;
    image: string | null;
    updatedAt: Date;
    organisationId: string | null;
  }

  interface Session {
    user: {
      id?: string;
      email?: string;
      organisationId?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id?: string;
    organisationId?: string;
  }
}
