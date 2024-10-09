import { useState } from "react";


const CommentReply = ({ replyAvatar, onSend, isReply, parentId }) => {

    const [addNewComment, setAddNewComment] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        onSend(addNewComment, parentId);
        setAddNewComment("");
    }

    return (
        <div className="grid pt-4 mt-4 order-2">
            <form action="" className="flex items-center justify-center w-50">
                <textarea
                    name=""
                    id="reply"
                    value={addNewComment}
                    onChange={(e) => setAddNewComment(e.target.value)}
                    placeholder="Write here..."
                    className="border border-1 border-gray-400 rounded-md w-[90%] md:w-[95%] focus:outline-none resize-none px-2 py-1"> </textarea>
            </form>
            <div className="flex items-center justify-between mx-4 mt-4 pb-4">

                <img src={replyAvatar} alt="" className="w-10 h-10" />

                <button
                    type="submit"
                    onClick={handleSend}
                    className="rounded-md bg-moderate-blue text-white h-[40px] w-[80px]">
                    <p>{isReply ? "Reply" : "Send"}</p>
                </button>
            </div>
        </div>
    )
}
export default CommentReply;