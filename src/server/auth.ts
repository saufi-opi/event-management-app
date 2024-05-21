import { PrismaAdapter } from '@auth/prisma-adapter'
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import Googleprovider from 'next-auth/providers/google'

import { env } from '@/env'
import { db } from '@/server/db'
import { type User } from '@prisma/client'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token }) {
      let user = await db.user.findFirst({ where: { email: token.email } })
      if (!user) {
        user = await db.user.create({
          data: {
            name: token.name,
            email: token.email,
            image: token.picture
          }
        })
      }

      token.user = user
      return token
    },
    session: ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.user.id
      }

      return session
    }
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Googleprovider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
    // FacebookProvider({
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET
    // })
  ]
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
