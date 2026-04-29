import { CommentCard } from "./comment";

export default function CommentList({ comments }){

    return(
    <div className="flex flex-col gap-5">
      {comments.map((comment) => (
        <CommentCard key={comment.id} post={comment} />
      ))}
    </div>
    )
}