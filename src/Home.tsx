import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import PostList from "./components/post-list"
import { useState } from "react"

export default function Home() {
  const [reload, setReload] = useState(false)

  return (
    <SidebarProvider>
      <AppSidebar onPostCreated={() => setReload(!reload)} />
      <main className="flex-1 min-h-screen bg-muted/30">
        {/* Topbar */}
        <header className="h-14 border-b bg-background flex items-center px-4 sticky top-0 z-10">
          <SidebarTrigger />
          <h1 className="ml-4 font-semibold text-lg">
            Início
          </h1>
        </header>

        {/* Feed */}
        <section className="max-w-2xl mx-auto px-4 py-6">
          <PostList reload={reload}/>
        </section>
      </main>
    </SidebarProvider>
  )
}