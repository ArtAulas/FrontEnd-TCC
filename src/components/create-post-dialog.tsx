import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

import { SidebarMenuButton } from "./ui/sidebar"

import { Label } from "./ui/label"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

import { Pencil } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Magnitudes, Temas, Tipos, Impactos, Custos } from "../lib/types"

type Props ={
  onPostCreated: () => void
}

export function CreatePostDialog({ onPostCreated }:Props) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const authorId = localStorage.getItem("userId")

  const [magnitude, setMagnitude] = useState("")
  const [tema, setTema] = useState("")
  const [tipo, setTipo] = useState("")
  const [impacto, setImpacto] = useState("")
  const [custo, setCusto] = useState("")

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
        authorId:authorId,

        magnitude: magnitude || null,
        tema: tema || null,
        tipo: tipo || null,
        impacto : impacto || null,
        custo: custo || null
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

  const resetForm = () => {
    setTitle("")
    setContent("")
    setMagnitude("")
    setTema("")
    setTipo("")
    setImpacto("")
    setCusto("")
  } 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton className="cursor-pointer w-full justify-start">
          <Pencil className="mr-2 h-4 w-4" />
          Post
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Criar publicação</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <Input
            placeholder="Título do post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="No que você está pensando?"
            rows={6}
            value={content}
            className="min-h-[120px]"
            onChange={(e) => setContent(e.target.value)}
          />     

          <div>
            <Label className="text-sm text-muted-foreground">
              Tema
            </Label>
            <Select value={tema} onValueChange={setTema}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o Tema da Ideia"/>
              </SelectTrigger>
              <SelectContent>
                {Temas.map((t)=>(
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">
                Magnitude
              </Label>
              <Select value={magnitude} onValueChange={setMagnitude}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a Magnitude da Ideia"/>
                </SelectTrigger>
                <SelectContent>
                  {Magnitudes.map(m => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">
                Tipo
              </Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o Tipo da Ideia"/>
                </SelectTrigger>
                <SelectContent>
                  {Tipos.map((t)=>(
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">
                Impacto
              </Label>
              <Select value={impacto} onValueChange={setImpacto}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o Impacto da Ideia"/>
                </SelectTrigger>
                <SelectContent>
                  {Impactos.map((i)=>(
                    <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">
                Custo
              </Label>
              <Select value={custo} onValueChange={setCusto}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o Custo da Ideia" />
                </SelectTrigger>

                <SelectContent>
                  {Custos.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="cursor-pointer flex-1" onClick={criarPost}>
              Publicar
            </Button>
            <Button variant="outline" className="cursor-pointer flex-1" onClick={resetForm}>
              Limpar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}