import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card"

import { Badge } from "./ui/badge"

import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"

import {
  Heart,
  MessageCircle
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import { TEMAS_LABEL, TIPOS_LABEL } from "../lib/types"

import { formatRelativeDate } from "../lib/formatDates"

export function PostCard({ post }) {
  const navigate = useNavigate()

  const handleOpenComments = () =>{
    navigate(`/post/${post.id}`)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto rounded-2xl shadow-sm">
      
      {/* Cabeçalho */}
      <CardHeader className="flex items-center justify-between pb-2">
        
        {/* Lado esquerdo */}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {post.author?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-semibold">
              {post.author?.name || "Usuário"}
            </span>

            <span className="text-sm text-muted-foreground">
              {post.published ? "Publicado" : "Rascunho"}
            </span>
          </div>
        </div>

        {/* Lado direito (data) */}
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formatRelativeDate(post.createdAt)}
        </span>

      </CardHeader>

      {/* Conteúdo */}
      <CardContent className="space-y-4">

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tipo && (
            <Badge variant="default">
              {TIPOS_LABEL[post.tipo]}
            </Badge>
          )}

          {post.tema && (
            <Badge variant="secondary">
              {TEMAS_LABEL[post.tema]}
            </Badge>
          )}
        </div>

        {/* Título */}
        <CardTitle className="text-lg">
          {post.title}
        </CardTitle>

        {/* Texto */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {post.content}
        </p>

        {/* Ações */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <Button variant="ghost" size="sm" className="rounded-full">
            <Heart className="w-4 h-4 mr-2" />
            Curtir
          </Button>

          <Button variant="ghost" size="sm" className="rounded-full" onClick={handleOpenComments}>
            <MessageCircle className="w-4 h-4 mr-2"/>
            Comentar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}