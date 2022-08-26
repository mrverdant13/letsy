import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import { db } from "../../../database"
import config from "../../../config"

const { github, google } = config.oauth;

export default NextAuth({
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
  pages: {
    signIn: '/auth/sign-in',
  },
})

