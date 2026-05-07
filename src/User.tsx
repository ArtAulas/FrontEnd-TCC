import { useParams } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { useState } from "react"
import { User } from "./components/user-page"

export default function UserPage(){
    const [reload, setReload] = useState(false)
    const { id } = useParams()

    return(
        <SidebarProvider>
        <AppSidebar onPostCreated={() => setReload(!reload)} />
            <main className="flex-1 min-h-screen bg-muted/30">
                <header className="h-14 border-b bg-background flex items-center px-4 sticky top-0 z-10">
                    <SidebarTrigger />
                    <h1 className="ml-4 font-semibold text-lg">
                        Post
                    </h1>
                </header>
                { id ? <User id={id} /> : <p>Usuário não identificado.</p> }
            </main>
        </SidebarProvider>
    )
}