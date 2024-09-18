import { Lucia, Session, User } from "lucia";
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { cookies } from "next/headers";
import { cache } from "react";

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const luica = new Lucia(adapter,{
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes(databaseUserAttributes){
        return {
            id: databaseUserAttributes.id,
            username: databaseUserAttributes.username,
            displayName: databaseUserAttributes.displayName,
            avatarUrl: databaseUserAttributes.avatarUrl,
            googleId: databaseUserAttributes.googleId,
        }
    }
} )

declare module "lucia" {
    interface Register {
        Lucia: typeof Lucia
        DatabaseUserAttributes: databaseUserAttributes
    }
}

interface databaseUserAttributes {
    id: string,
    username: string,
    displayName: string,
    avatarUrl: string | null,
    googleId: string | null,
}

export const validateRequest = cache(
    async(): Promise<
        { user: User, session: Session } | { user: null, session: null }
    > => {
        const sessionId = cookies().get(luica.sessionCookieName)?.value ?? null

        if (!sessionId) {
            return {
                user: null,
                session: null
            }
        }
        const result = await luica.validateSession(sessionId)

        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = luica.createSessionCookie(result.session.id)
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                )
            }

            if (!result.session) {
                const sessionCookie = luica.createBlankSessionCookie()
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                )
            }

        } catch { }

        return result
    },
)