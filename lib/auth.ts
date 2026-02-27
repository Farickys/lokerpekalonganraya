import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

async function findUserByEmail(email: string) {
  try {
    const { query } = await import('./prisma')
    const users = await query<{id:number,email:string,password:string,name:string,role:string}>(
      'SELECT id, email, password, name, role FROM User WHERE email = ? LIMIT 1', [email]
    )
    return users[0] ?? null
  } catch {
    return null
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await findUserByEmail(credentials.email as string)
        if (!user) return null
        const valid = await bcrypt.compare(credentials.password as string, user.password)
        if (!valid) return null
        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = (user as any).id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
})
