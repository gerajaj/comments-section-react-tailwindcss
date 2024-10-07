import { useState, useEffect } from "react";
import commentsData from "@/components/CommentSection/data.json";

import IconReply from "@/components/icons/iconReply.jsx"
import ScoreComment from "@/components/CommentSection/ScoreComment.jsx";
import { comment } from "postcss";
import CommentReply from "./CommentReply";

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [hoverId, setHoverId] = useState();
    const [count, setCount] = useState({});
    const [replyTo, setReplyTo] = useState(null);

    useEffect(() => {
        setComments(commentsData.comments);
        const initialCounts = {};
        commentsData.comments.forEach(comment => {
            initialCounts[comment.id] = comment.score;
            comment.replies.forEach(reply => {
                initialCounts[reply.id] = reply.score;
            })
        });
        setCount(initialCounts);
    }, [])

    const handlePlus = (id) => {
        setCount((prev) => ({
            ...prev, [id]: (prev[id] || 0) + 1
        }));
    }
    const handleMinus = (id) => {
        setCount((prev) => ({
            ...prev, [id]: Math.max((prev[id] || 0) - 1, 0)
        }))

    }
    const mainAvatar = comments.flatMap(comment => comment.replies).find(reply => reply.id === 4)
    const replyAvatar = mainAvatar ? mainAvatar.user.image.png : " rounder-full border"

    return (
        <>
            {comments.map(comment => (
                <div key={comment.id}>
                    <div className="bg-white min-h-[240px] w-[350px] md:w-[700px] mx-auto rounded-xl">
                        <div className="mx-4 mt-4">
                            <div className="pt-4 pb-4">
                                <div className="flex items-center justify-between  gap-x-4">
                                    <img src={comment.user.image.png} alt="user" className="w-8 h-8" />
                                    <p className="text-moderate-blue font-bold">{comment.user.username}</p>
                                    <p className="text-grayish-blue text-sm mr-auto mt-[1px]">{comment.createdAt}</p>
                                </div>
                                <p className="text-grayish-blue mt-2">
                                    {comment.content}
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="bg-light-gray h-8 w-[95px] mt-4 rounded-lg">

                                        <ScoreComment
                                            count={count}
                                            id={comment.id}
                                            handleMinus={handleMinus}
                                            handlePlus={handlePlus}
                                        />

                                    </div>
                                    <div className="mt-4 flex items-center" onClick={() => setReplyTo(comment.id)}>
                                        <IconReply className="fill-moderate-blue w-5 cursor-pointer" />
                                        <p className="text-moderate-blue font-bold cursor-pointer">Reply</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {replyTo === comment.id && (
                        <div className="flex flex-col bg-white justify-center rounded-lg h-[160px] mx-auto w-[365px] md:w-[700px] my-3 gap-y-4 ">
                            <form action="" className="flex items-center justify-center w-50">
                                <textarea name="" id="" placeholder="Write here..." className="border border-1 border-gray-400 rounded-md w-[331px] focus:outline-none resize-none"></textarea>
                            </form>
                            <div className="flex items-center justify-between border border-blue-600 mx-4">

                                <img src={replyAvatar} alt="" className="w-10 h-10" />
                                <button className="rounded-md bg-moderate-blue text-white h-[40px] w-[80px]">
                                    <p>Send</p>
                                </button>
                            </div>
                        </div>
                    )

                    }
                    {comment.replies.length > 0 && (

                        <div className="">

                            {
                                comment.replies.map(reply => (
                                    <div>
                                        <div key={reply.id} className="flex mx-4  items-center justify-between ">
                                            {/* <hr className=" bg-gray-300 w-[1px] min-h-[240px] " /> */}
                                            <span className=" bg-gray-300 w-[1px] min-h-[200px] md:-ml-2">
                                                <div className="bg-white min-h-[200px] md:min-h-[200px] w-[320px] md:w-[600px] rounded-xl my-4 mb-1 ml-4 md:ml-[90px]">
                                                    <div className="pt-4 pb-4 mx-4 "
                                                        onMouseEnter={() => setHoverId(reply.id)}
                                                        onMouseLeave={() => setHoverId(null)}>
                                                        <div className="flex items-center justify-between  gap-x-4">
                                                            <img src={reply.user.image.png} alt="user" className="w-8 h-8" />
                                                            <p className="text-moderate-blue font-bold">{reply.user.username}</p>
                                                            {reply.id === 4 &&
                                                                <div className="text-white bg-moderate-blue w-9 rounded-md">
                                                                    <p className="text-center">You</p>
                                                                </div>}
                                                            <p className="text-grayish-blue text-sm mr-auto mt-[1px]">{reply.createdAt}</p>


                                                        </div>
                                                        <p className="text-grayish-blue mt-2">
                                                            <span className="text-moderate-blue font-medium">@{reply.replyingTo}</span> {reply.content}
                                                        </p>
                                                        <div className="flex justify-between items-center">
                                                            <div className="bg-light-gray h-8 w-[95px] mt-4 rounded-lg">
                                                                <ScoreComment
                                                                    count={count}
                                                                    id={reply.id}
                                                                    handleMinus={handleMinus}
                                                                    handlePlus={handlePlus}
                                                                />
                                                            </div>
                                                            <div className="mt-4 flex items-center">
                                                                {reply.id == 4 && hoverId === reply.id && (
                                                                    <div className="text-red-500 font-medium mr-3 hover:bg-red-100 hover:rounded-lg h-[30px] w-[70px] text-center flex items-center justify-center cursor-pointer">Delete</div>
                                                                )}
                                                                <div className="flex items-center" onClick={() => setReplyTo(reply.id)}>

                                                                    <IconReply className="fill-moderate-blue w-5 cursor-pointer" />
                                                                    <p className="text-moderate-blue font-bold cursor-pointer">Reply</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {replyTo === reply.id && (

                                                    <div className="bg-white rounded-lg  mt-4 w-[600px] ml-[90px] mb-4">
                                                        <CommentReply replyAvatar={replyAvatar} />
                                                    </div>
                                                )}
                                            </span>
                                        </div>

                                    </div>

                                ))}
                        </div>
                    )}

                </div >

            ))

            }

            <div className="flex flex-col bg-white justify-center rounded-lg h-[160px] mx-auto w-[365px] md:w-[700px] my-0 z-10">
                <CommentReply replyAvatar={replyAvatar} text="Send" />
            </div>
        </>
    )
}

export default CommentSection;