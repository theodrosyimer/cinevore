import { NextAuthOptions } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
// import EmailProvider from "next-auth/providers/email"
// import { Client } from "postmark"

import { env } from "@/env.mjs"
import { db } from "@/lib/db"
import UsersModel from "@/models/users"
import { hashPassword, validateUserPassword } from "@/lib/bcrypt"

// const postmarkClient = new Client(env.POSTMARK_API_TOKEN)

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "theo@example.com",
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "Theo",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        let [dbUser] = await UsersModel.getByEmail(credentials.email)

        // console.log("dbUser", dbUser)
        // console.log(await validateUserPassword(credentials.password, dbUser?.password))

        if (!dbUser) {
          const hashedPassword = await hashPassword(credentials.password)

          if (!hashedPassword) {
            throw new Error("Failed to hash password")
            // return null
          }

          await UsersModel.create({
            email: credentials.email,
            password: hashedPassword,
            name: credentials.name,
          })

          const results = await UsersModel.getByEmail(credentials.email)

          dbUser = results[0]
        }

        if (dbUser?.password) {
          if (await validateUserPassword(credentials.password, dbUser.password)) {
            return dbUser
          }
          else {
            return null
          }
        }

        return null
      },
    }),
    // EmailProvider({
    //   from: env.SMTP_FROM,
    //   sendVerificationRequest: async ({ identifier, url, provider }) => {
    //     const user = await db.user.findUnique({
    //       where: {
    //         email: identifier,
    //       },
    //       select: {
    //         emailVerified: true,
    //       },
    //     })

    //     const templateId = user?.emailVerified
    //       ? env.POSTMARK_SIGN_IN_TEMPLATE
    //       : env.POSTMARK_ACTIVATION_TEMPLATE
    //     if (!templateId) {
    //       throw new Error("Missing template id")
    //     }

    //     const result = await postmarkClient.sendEmailWithTemplate({
    //       TemplateId: parseInt(templateId),
    //       To: identifier,
    //       From: provider.from as string,
    //       TemplateModel: {
    //         action_url: url,
    //         product_name: siteConfig.name,
    //       },
    //       Headers: [
    //         {
    //           // Set this to prevent Gmail from threading emails.
    //           // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
    //           Name: "X-Entity-Ref-ID",
    //           Value: new Date().getTime() + "",
    //         },
    //       ],
    //     })

    //     if (result.ErrorCode) {
    //       throw new Error(result.Message)
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async session({ token, session }) {
      // console.log('token.role', token.role)

      // console.log('session.user', session.user)

      if (token && session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.image
        session.user.role = token.role
      }
      // console.log('session.user', session.user)

      return session
    },
    async jwt({ token, user }) {

      const [dbUser] = await UsersModel.getByEmail(token.email as string)

      if (!dbUser) {
        if (user) {
          // console.log('USER:', user)
          token.id = user?.id
          token.name = user?.name
          token.email = user?.email
          token.image = user?.image
          token.role = user?.role
        }
        return token
      }
      // console.log('TOKEN:', {
      //   id: dbUser.id,
      //   name: dbUser.name,
      //   email: dbUser.email,
      //   image: dbUser.image,
      //   role: dbUser.role,
      // })

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
        role: dbUser.role,
      }

    },
  },
}
