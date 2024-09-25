"use server"

import { luica, validateRequest } from "@/auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function logout() {
    const {session} = await validateRequest()

    if (!session) {
        throw new Error("Unauthorized")
    }

    await luica.invalidateSession(session.id)

    const sessionCookie = luica.createBlankSessionCookie()

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
        
    )
    
    return redirect("/login")
}