import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import {
  Heart,
  MessageCircle,
  HeartCrack
} from "lucide-react"
import { useNavigate } from "react-router-dom"

export function CommentCard({ post }) {
  const navigate = useNavigate()

  const handleOpenComments = () =>{
    navigate(`/post/${post.id}`)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto rounded-2xl shadow-sm">
      
      {/* Cabeçalho */}
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
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
      </CardHeader>

      {/* Conteúdo */}
      <CardContent className="space-y-4">

        {/* Texto */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {post.content}
        </p>

        {/* Ações */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <div className="flex items-center gap-2">

            {/* Like */}
            <Button
              variant={post.userReaction === "LIKE" ? "default" : "ghost"}
              size="sm"
              className="rounded-full"
              onClick={handleOpenComments}
            >
              <Heart className="w-4 h-4 mr-1" />
              {post.likes}
            </Button>

            {/* Dislike */}
            <Button
              variant={post.userReaction === "DISLIKE" ? "destructive" : "ghost"}
              size="sm"
              className="rounded-full"
              onClick={handleOpenComments}
            >
              <HeartCrack className="w-4 h-4 mr-1" />
              {post.dislikes}
            </Button>

          </div>

          <Button variant="ghost" size="sm" className="rounded-full" onClick={handleOpenComments}>
            <MessageCircle className="w-4 h-4 mr-2"/>
            Comentar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}