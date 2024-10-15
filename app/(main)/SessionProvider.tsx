'use client'

import { User, Session } from "lucia";
import React , { createContext } from "react";
import { useContext } from "react";

interface SessionContext {
    user: User;
    session:Session
}

const SessionContext = createContext<SessionContext | null>(null)

export default function SessionProvider({
    children,
    value,
}: React.PropsWithChildren<{ value: SessionContext}>) {
    return (<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
    )
}

export function useSession() {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider")
    }
    return context
}