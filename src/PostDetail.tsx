import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PostDetailCard } from "./components/post-detail"
import CommentList from "./components/comment-list"
import CreateComment from "./components/create-comment"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function PostDetail() {
    const [reload, setReload] = useState(false)
    const [post, setPost] = useState()
    const [commentList, setCommentList] = useState([])
    const { id } = useParams()

    const buscarPost = async() => {
        try{
            const response = await axios.get(`http://localhost:3000/post/${id}`)
            setPost(response.data)
        }catch(e){
            console.error(e)
        }
    }

    const buscarCommentarios = async() => {
        try{
            const response = await axios.get(`http://localhost:3000/allcomments/${id}`)
            console.log(response.data)
            setCommentList(response.data)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        setPost(null)
        buscarPost()
        buscarCommentarios()
    },[id])

    return (
        <SidebarProvider>
        <AppSidebar onPostCreated={() => setReload(!reload)} />
        <main className="flex-1 h-screen bg-muted/30 flex flex-col overflow-hidden">

            {/* Topbar */}
            <header className="h-14 border-b bg-background flex items-center px-4 shrink-0">
                <SidebarTrigger />
                <h1 className="ml-4 font-semibold text-lg">
                    Post
                </h1>
            </header>

            {/* Área fixa topo */}
            <section className="shrink-0 border-b bg-background">
                <div className="max-w-2xl mx-auto p-4 space-y-4">
                {post ? (
                    <>
                    <PostDetailCard post={post} />

                    <CreateComment
                        postId={post.id}
                        onCommentCreated={buscarCommentarios}
                    />
                    </>
                ) : (
                    <p>Carregando post...</p>
                )}
                </div>
            </section>

            {/* Área scrollável */}
            <section className="flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto p-4">
                <CommentList comments={commentList} />
                </div>
            </section>
        </main>
        </SidebarProvider>
    )
}