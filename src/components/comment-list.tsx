import { CommentCard } from "./comment";
import type { Post } from "../lib/types";

export default function CommentList({ comments }:{ comments : Post[] }){

    return(
    <div className="flex flex-col gap-5">
      {comments.map((comment) => (
        <CommentCard key={comment.id} post={comment} />
      ))}
    </div>
    )
}