import { authOptions } from "@/lib/auth";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };