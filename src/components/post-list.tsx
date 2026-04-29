import { useEffect, useState } from "react";
import axios from "axios"
import { PostCard } from "./post"

export default function PostList({ reload }){
    const [posts, setPosts] = useState([])

    const buscarPosts = async() => {
        try{
            const response = await axios.get("http://localhost:3000/allposts")
            setPosts(response.data)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        buscarPosts()
    },[reload])

    return(
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
    )
}