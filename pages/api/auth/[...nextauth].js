/*
정도현
*/


import NextAuth from "next-auth";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";

import prisma from "../../../utilities/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";

const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        id: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // async authorize(credentials, req) {
      //   // You need to provide your own logic here that takes the credentials
      //   // submitted and returns either a object representing a user or value
      //   // that is false/null if the credentials are invalid.
      //   // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      //   // You can also use the `req` object to obtain additional parameters
      //   // (i.e., the request IP address)
      //   const res = await fetch("/your/endpoint", {
      //     method: "POST",
      //     body: JSON.stringify(credentials),
      //     headers: { "Content-Type": "application/json" },
      //   });
      //   const user = await res.json();

      //   // If no error and we have user data, return it
      //   if (res.ok && user) {
      //     return user;
      //   }
      //   // Return null if user data could not be retrieved
      //   return null;
      // },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    jwt: true, // when true session is stored in jwt instead of database
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    secret: process.env.NEXTAUTH_SECRET || "this-should-be-a-secret",
    // custom methods allow overriding of default token encode/decode methods
    // encode: async ({ token, secret }) => await jwt.sign(token, secret),
    // decode: async ({ token, secret }) => await jwt.verify(token, secret),
  },
  // callbacks,
  database: process.env.DATABASE_URL,
  callbacks: {
    async signIn({ user, account, profile, email, credentials, session }) {
      const body = { userId: user.id };
      // session.user.id = token.id;
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      const data = await fetch(
        `${process.env.HOSTNAME}/api/auth/permissionChecker`,
        request
      );
      return true;
    },
    session: async ({ session, user }) => {
      if (session?.user) {
        const request = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const data = await fetch(
          `${process.env.HOSTNAME}/api/auth/getAccesstoken?userID=${user.id}`,
          request
        ).then((response) => {
          return response.json();
        });
        session.user.id = user.id;
        session.user.token = data;
      }
      return session;
    },
  },
};
