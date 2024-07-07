import NextAuth, { User as NextAuthUser } from "next-auth";
import { Account } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import connect from "@/utils/db";
import env from '@/env';

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<NextAuthUser | null> {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email }).lean() as { password: string, _id: unknown, email: string, name: string | null } | null;
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return {
                id: (user._id as unknown as string).toString(),
                email: user.email as string,
                name: user.name as string | null,
              };
            }
          }
          return null;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: env.GITHUB_ID ?? "",
      clientSecret: env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: NextAuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }

      if(account?.provider == "google"){
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }

    },
  },
    secret: env.NEXTAUTH_SECRET,
    session: {
      jwt: true,
    },
    jwt: {
      secret: env.NEXTAUTH_SECRET,
    },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };