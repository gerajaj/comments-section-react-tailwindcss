import { useState, useEffect } from "react";
import commentsData from "@/components/CommentSection/data.json";

import IconReply from "@/components/icons/iconReply.jsx"

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [hoverId, setHoverId] = useState();

    useEffect(() => {
        setComments(commentsData.comments);
    }, [])

    return (
        <>
            {comments.map(comment => (
                <div key={comment.id}>
                    <div className="bg-white min-h-[240px] w-[350px] mx-auto rounded-xl">
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
                                        <div className="flex items-center justify-between pt-1 mx-[12px]">
                                            <button className="font-bold text-grayish-blue">+</button>
                                            <p className="font-medium text-md">{comment.score}</p>
                                            <button className="font-bold text-grayish-blue">-</button>
                                        </div>

                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <IconReply className="fill-moderate-blue w-5 cursor-pointer" />
                                        <p className="text-moderate-blue font-bold cursor-pointer">Reply</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {comment.replies.length > 0 && (

                        <div className="">

                            {
                                comment.replies.map(reply => (
                                    <div key={reply.id} className="flex mx-4 items-center justify-between">
                                        {/* <hr className=" bg-gray-300 w-[1px] min-h-[240px] " /> */}
                                        <span className=" bg-gray-300 w-[1px] min-h-[250px]">
                                            <div className="bg-white min-h-[240px] w-[320px] rounded-xl mt-4 mb-1 ml-4">
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
                                                        {reply.content}
                                                    </p>
                                                    <div className="flex justify-between items-center">
                                                        <div className="bg-light-gray h-8 w-[95px] mt-4 rounded-lg">
                                                            <div className="flex items-center justify-between pt-1 mx-[12px]">
                                                                <button className="font-bold text-grayish-blue">+</button>
                                                                <p className="font-medium text-md">{reply.score}</p>
                                                                <button className="font-bold text-grayish-blue">-</button>
                                                            </div>

                                                        </div>
                                                        <div className="mt-4 flex items-center">
                                                            {reply.id == 4 && hoverId === reply.id && (
                                                                <div className="text-red-500 font-medium mr-3 hover:bg-red-100 hover:rounded-lg h-[30px] w-[70px] text-center flex items-center justify-center cursor-pointer">Delete</div>
                                                            )}
                                                            <IconReply className="fill-moderate-blue w-5 cursor-pointer" />
                                                            <p className="text-moderate-blue font-bold cursor-pointer">Reply</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}

export default CommentSection;