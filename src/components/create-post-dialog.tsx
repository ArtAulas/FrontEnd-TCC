import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

import { Pencil } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

export function CreatePostDialog({ onPostCreated }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const authorId = localStorage.getItem("userId")

  const [open, setOpen] = useState(false)

  const criarPost = async () => {
    if (!authorId) {
        alert("Usuário não autenticado")
        return
    }

    try {
      await axios.post("http://localhost:3000/posts", {
        title:title,
        content:content,
        published: true,
        authorId:authorId
      })

      setTitle("")
      setContent("")
      setOpen(false)

      toast.success("Post criado com sucesso!")
      onPostCreated()

    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar post")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Pencil className="mr-2 h-4 w-4" />
          Post
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Criar publicação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Título do post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="No que você está pensando?"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button className="w-full" onClick={criarPost}>
            Publicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}