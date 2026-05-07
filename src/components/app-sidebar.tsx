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
  Settings,
  LogOut,
  Pencil,
} from "lucide-react"

import { CreatePostDialog } from "./create-post-dialog"
import { useNavigate } from "react-router-dom"

export function AppSidebar({ onPostCreated }) {
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
                <SidebarMenuButton onClick={handleInicial}>
                  <Home className="mr-2 h-4 w-4" />
                  Tela Inicial
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={handlePerfil}>
                  <User className="mr-2 h-4 w-4" />
                  Meu Perfil
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CreatePostDialog onPostCreated={ onPostCreated }/>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} >
              <LogOut className="mr-2 h-4 w-4" />
              Deslogar
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}