import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar"

import {
  Home,
  User,
  LogOut,
} from "lucide-react"

import { CreatePostDialog } from "./create-post-dialog"
import { useNavigate } from "react-router-dom"

type Props ={
  onPostCreated: () => void
}

export function AppSidebar({ onPostCreated }:Props) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("userId")
    navigate("/")
  }

  const handleInicial = () => {
    navigate("/home")
  }

  const handlePerfil = () =>{
    const authorId = localStorage.getItem("userId")
    navigate(`/user/${authorId}`)
  }

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <div className="px-4 py-2 text-lg font-semibold">
          TCC
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton className="cursor-pointer" onClick={handleInicial}>
                  <Home className="cursor-pointer mr-2 h-4 w-4" />
                  Tela Inicial
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="cursor-pointer" onClick={handlePerfil}>
                  <User className="cursor-pointer mr-2 h-4 w-4" />
                  Meu Perfil
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <CreatePostDialog onPostCreated={ onPostCreated }/>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="cursor-pointer" onClick={handleLogout} >
              <LogOut className="mr-2 h-4 w-4" />
              Deslogar
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}