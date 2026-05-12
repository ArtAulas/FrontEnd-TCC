import { useEffect, useState } from "react";
import axios from "axios"
import { PostCard } from "./post"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { Magnitudes, Temas, Tipos, Impactos, Custos } from "../lib/types"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import type { Post } from "../lib/types";

type Props ={
  reload: boolean
}

export default function PostList({ reload }:Props) {
    const [posts, setPosts] = useState<Post[]>([])
    const [magnitude, setMagnitude] = useState("")
    const [tema, setTema] = useState("")
    const [tipo, setTipo] = useState("")
    const [impacto, setImpacto] = useState("")
    const [custo, setCusto] = useState("")

    const buscarPosts = async () => {
        const userId = localStorage.getItem("userId")
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/allposts/`, {
                params: {
                    userId: userId,
                    magnitude,
                    tema,
                    tipo,
                    impacto,
                    custo
                }
            })
            setPosts(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        buscarPosts()
    }, [reload, magnitude, tema, tipo, impacto, custo])

    const resetFilter = () => {
        setMagnitude("")
        setTema("")
        setTipo("")
        setImpacto("")
        setCusto("")
    } 

    return(
    <>
    <div className="sticky top-14 z-10 border rounded-xl p-4 bg-background shadow-sm">
        <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">
                Filtros
            </h2>

            <Button
                variant="ghost"
                size="sm"
                className="cursor-pointer"
                onClick={resetFilter}
            >
                Limpar filtros
            </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">
            Tema
        </Label>
        <Select value={tema} onValueChange={setTema}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Tema"/>
            </SelectTrigger>
            <SelectContent>
            {Temas.map((t)=>(
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
            </SelectContent>
        </Select>
        </div>

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
    </div>
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
    </>
    )
}