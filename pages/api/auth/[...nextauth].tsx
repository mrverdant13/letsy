import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import { db } from "../../../database"
import config from "../../../config"

const { github, google } = config.oauth;

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(db.connect()),
  providers: [
    GithubProvider({
      clientId: github.clientId,
      clientSecret: github.clientSecret,
    }),
    GoogleProvider({
      clientId: google.clientId,
      clientSecret: google.clientSecret,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session?.user && user.id) {
        session.userId = user.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
  },
};

export default NextAuth(authOptions);

