import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios'
import { env } from "~/env";


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      accountType: string;
      token: string;
      adminId:string
      adminEmail:string
    } & DefaultSession["user"];
  }

  interface User {
    adminId:string
    adminEmail: string
    accountType: string
    token: string
  }
}

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password"
        },
      },
      async authorize(credentials) {
        try {

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials"); 
          }
          const response = await axios.post<ApiResponse<LoginProps>>(`${env.SERVER_URL}/account/login`, {
            email: credentials.email,
            password: credentials.password
          });
          return {
            adminId: response.data.data.user.id,
            adminEmail: response.data.data.user.email,
            accountType: response.data.data.user.accountType,
            token: response.data.data.token
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          adminId: token.adminId as string,
          adminEmail: token.adminEmail as string,
          accountType: token.accountType as string,
          token: token.token as string
        }
      };
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          adminId:user.adminId,
          adminEmail:user.adminEmail,
          accountType: user.accountType,
          token: user.token
        };
      }
      return token;
    },
  },
  pages: {
    signIn: '/',
    error: '/auth/error',

  },
} satisfies NextAuthConfig;