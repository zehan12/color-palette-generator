"use client";

import { FC, ReactNode } from "react"
import { AppDataProvider } from "./app-data-context-provider"

export const RootProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (<>
        <AppDataProvider>
            {children}
        </AppDataProvider>
    </>)
}