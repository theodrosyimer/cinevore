import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import { hashPassword, validateUserPassword } from '@/lib/bcrypt'
import { db } from '@/db'
import UsersModel from '@/models/users'

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'theo@example.com',
        },
        name: {
          label: 'Name',
          type: 'text',
          placeholder: 'Theo',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
        confirmPassword: {
          label: 'Confirm Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        let [dbUser] = await UsersModel.getByEmail(credentials.email)

        if (!dbUser) {
          const hashedPassword = await hashPassword(credentials.password)

          if (!hashedPassword) {
            return null
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
          if ((await validateUserPassword(credentials.password, dbUser.password))) {
            return dbUser
          } else {
            return null
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.image
        session.user.role = token.role
      }

      return session
    },
    async jwt({ token, user }) {
      const [dbUser] = await UsersModel.getByEmail(token.email as string)

      if (!dbUser) {
        if (user) {
          token.id = user?.id
          token.name = user?.name
          token.email = user?.email
          token.image = user?.image
          token.role = user?.role
        }
        return token
      }
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

export function isAdmin(token: any) {
  return token?.role === 'admin' || token?.role === 'superadmin'
}

export function isSuperAdmin(token: any) {
  return token?.role === 'superadmin'
}
