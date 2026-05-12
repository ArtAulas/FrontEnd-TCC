import {
  Card,
  CardContent,
  CardHeader,
} from "./ui/card"
import { PostCard } from "./post"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { useEffect, useState } from "react"
import { formatBirthDate } from "../lib/formatDates"
import axios from "axios"
import type { User, Post } from "../lib/types"

type Props = {
    id : string
}

export function User({ id }:Props){
    const [user, setUser] = useState<User>()
    const [posts, setPosts] = useState<Post[]>([])

    const fetchData = async() => {
        try{
            const response = await axios.get(`http://localhost:3000/user/${id}`)
            setUser(response.data)
        } catch(e) {
            console.error(e)
        }
    }

    const fetchPosts = async() =>{
        const userId = localStorage.getItem("userId")
        try{
            const response = await axios.get(`http://localhost:3000/user/posts`,{
                params: {
                    authorId: id,
                    userId: userId
                }
            })
            setPosts(response.data)
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        setUser(undefined)
        setPosts([])
        fetchData()
        fetchPosts()
    },[])

    return(
        <div className="w-full max-w-2xl mx-auto space-y-4 pb-10">
        <Card className="sticky top-12 z-10 rounded-2xl shadow-sm p-2 bg-background/95 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">
                {user?.name?.[0] || "U"}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
                <span className="text-xl font-bold">
                {user?.name || "Usuário"}
                </span>

                <span className="text-sm text-muted-foreground">
                {user?.cidade}, {user?.estado}
                </span>
            </div>
            </CardHeader>
            <CardContent className="space-y-6">

            <div className="grid grid-cols-2 gap-4">
                
                <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                    Email
                </p>
                <p className="font-medium">
                    {user?.email}
                </p>
                </div>

                <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                    Data de nascimento
                </p>
                <p className="font-medium">
                    {formatBirthDate(user?.birthDate)}
                </p>
                </div>
            </div>
            </CardContent>
        </Card>
        {/* Área scrollável dos posts */}
        <section className="space-y-5">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </section>
        </div>
    )
}