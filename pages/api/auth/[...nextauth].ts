import service from '@/services'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

interface ILoginResponse {
  id: string
  token: string
  name: string
  email: string
}

const options: NextAuthOptions = {
  secret: process.env.secret,
  providers: [
    CredentialsProvider({
      name: "admin credential",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "ahamed@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        let user: ILoginResponse | undefined

        if (credentials?.email && credentials?.password) {
          user = await service.login(credentials)
        }

        if (user) {
          return {...user, token: user.token}
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string
      }
      return session
    }
  },
}


const aNextAuth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)
export default aNextAuth
