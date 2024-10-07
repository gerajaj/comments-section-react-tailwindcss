const CommentReply = ({ replyAvatar }) => {
    return (
        <div className="pt-4 mt-4">
            <form action="" className="flex items-center justify-center w-50">
                <textarea name="" id="" placeholder=" Write here..." className="border border-1 border-gray-400 rounded-md w-[331px] md:w-[95%] focus:outline-none resize-none px-3 py-1"></textarea>
            </form>
            <div className="flex items-center justify-between mx-4 mt-4 pb-4">

                <img src={replyAvatar} alt="" className="w-10 h-10" />
                <button className="rounded-md bg-moderate-blue text-white h-[40px] w-[80px]">
                    <p>Send</p>
                </button>
            </div>
        </div>
    )
}
export default CommentReply;