import { useState } from "react"
import axios from "axios"

import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

type Props = {
  postId : string,
  onCommentCreated : () => void
}

export default function CreateComment({ postId, onCommentCreated }:Props) {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const criarComentario = async () => {
    try {
      const authorId = localStorage.getItem("userId")

      if (!content.trim()) return

      setLoading(true)

      await axios.post("http://localhost:3000/posts", {
        content,
        published: true,
        authorId,
        parentId: postId
      })

      setContent("")
      onCommentCreated()

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background rounded-2xl border p-4 mt-4 max-w-2xl mx-auto">
      <Textarea
        placeholder="Escreva um comentário..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />

      <Button
        className="cursor-pointer mt-3 w-full"
        onClick={criarComentario}
        disabled={loading}
      >
        {loading ? "Enviando..." : "Comentar"}
      </Button>
    </div>
  )
}