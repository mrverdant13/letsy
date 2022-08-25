import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import { db } from "../../../database"
import config from "../../../config"

export default NextAuth({
  adapter: MongoDBAdapter(db.connect()),
  providers: [
    GithubProvider({
      clientId: config.githubOauthApp.clientId,
      clientSecret: config.githubOauthApp.clientSecret,
    }),
  ],
})

