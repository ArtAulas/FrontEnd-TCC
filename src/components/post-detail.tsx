import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { Heart, HeartCrack } from "lucide-react"
import { Badge } from "./ui/badge"
import { TEMAS_LABEL, TIPOS_LABEL, MAGNITUDES_LABEL, CUSTOS_LABEL, IMPACTOS_LABEL } from "../lib/types"
import { formatDate } from "../lib/formatDates"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Post } from "../lib/types"

export function PostDetailCard({ post }:{ post:Post }) {
  const [localPost, setLocalPost] = useState(post)
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()

  type Reacao = 'LIKE'|'DISLIKE'

  const handleReaction = async (type:Reacao) => {
    try {
      // 🔥 atualização otimista
      setLocalPost(prev => {
        let likes = prev.likes
        let dislikes = prev.dislikes
        let userReaction = prev.userReaction

        // 👉 mesma reação → remove
        if (userReaction === type) {
          if (type === "LIKE") likes--
          if (type === "DISLIKE") dislikes--
          userReaction = null
        } 
        // 👉 troca reação
        else {
          if (type === "LIKE") {
            likes++
            if (userReaction === "DISLIKE") dislikes--
          }

          if (type === "DISLIKE") {
            dislikes++
            if (userReaction === "LIKE") likes--
          }

          userReaction = type
        }

        return {
          ...prev,
          likes,
          dislikes,
          userReaction
        }
      })

      await axios.post("http://localhost:3000/reaction", {
        userId,
        postId: post.id,
        type
      })

    } catch (error) {
      console.error(error)
      toast.error("Erro ao reagir ao post")
    }
  }

  const handleAvatarClick = () =>{
    navigate(`/user/${post.author.id}`)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto rounded-2xl shadow-sm">
      
      {/* Cabeçalho */}
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <Avatar className="cursor-pointer" onClick={handleAvatarClick}>
          <AvatarFallback>
            {localPost.author?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="font-semibold">
            {localPost.author?.name || "Usuário"}
          </span>

          <span className="text-sm text-muted-foreground">
            {localPost.published ? "Publicado" : "Rascunho"}
          </span>
        </div>
      </CardHeader>

      {/* Conteúdo */}
      <CardContent className="space-y-4">

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {localPost.tipo && (
            <Badge variant="default">
              {TIPOS_LABEL[localPost.tipo]}
            </Badge>
          )}

          {localPost.tema && (
            <Badge variant="secondary">
              {TEMAS_LABEL[localPost.tema]}
            </Badge>
          )}

          {localPost.magnitude && (
            <Badge variant="secondary">
              {MAGNITUDES_LABEL[localPost.magnitude]}
            </Badge>
          )}

          {localPost.impacto && (
            <Badge variant="secondary">
              {IMPACTOS_LABEL[localPost.impacto]}
            </Badge>
          )}

          {localPost.custo && (
            <Badge variant="secondary">
              Custo {CUSTOS_LABEL[localPost.custo]}
            </Badge>
          )}
        </div>

        {/* Título */}
        <CardTitle className="text-lg">
          {localPost.title}
        </CardTitle>

        {/* Texto */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {localPost.content}
        </p>

        {/* Ações */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {/* Likes / Dislikes */}
          <div className="flex items-center gap-2">

            {/* Like */}
            <Button
              variant={localPost.userReaction === "LIKE" ? "default" : "ghost"}
              size="sm"
              className="cursor-pointer rounded-full"
              onClick={() => handleReaction("LIKE")}
            >
              <Heart className="w-4 h-4 mr-1" />
              {localPost.likes}
            </Button>

            {/* Dislike */}
            <Button
              variant={localPost.userReaction === "DISLIKE" ? "destructive" : "ghost"}
              size="sm"
              className="cursor-pointer rounded-full"
              onClick={() => handleReaction("DISLIKE")}
            >
              <HeartCrack className="w-4 h-4 mr-1" />
              {localPost.dislikes}
            </Button>

          </div>

            {/* Texto */}
            <p className="text-sm leading-relaxed text-muted-foreground">
            {formatDate(localPost.createdAt)}
            </p>

        </div>
      </CardContent>
    </Card>
  )
}