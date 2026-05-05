import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card"

import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"

import {
  Heart,
  MessageCircle,
  Share2
} from "lucide-react"

import { Badge } from "./ui/badge"

import { TEMAS_LABEL, TIPOS_LABEL, MAGNITUDES_LABEL, CUSTOS_LABEL, IMPACTOS_LABEL } from "../lib/types"

import { formatDate } from "../lib/formatDates"

export function PostDetailCard({ post }) {

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

          {post.magnitude && (
            <Badge variant="secondary">
              {MAGNITUDES_LABEL[post.magnitude]}
            </Badge>
          )}

          {post.impacto && (
            <Badge variant="secondary">
              {IMPACTOS_LABEL[post.impacto]}
            </Badge>
          )}

          {post.custo && (
            <Badge variant="secondary">
              Custo {CUSTOS_LABEL[post.custo]}
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

            {/* Texto */}
            <p className="text-sm leading-relaxed text-muted-foreground">
            {formatDate(post.createdAt)}
            </p>

        </div>
      </CardContent>
    </Card>
  )
}