import { useState, useEffect, useRef } from "react";
import commentsData from "@/components/CommentSection/data.json";

import IconReply from "@/components/icons/iconReply.jsx"
import IconSun from "@/components/icons/IconSun.png"
import IconMoon from "@/components/icons/IconMoon.png"

import ScoreComment from "@/components/CommentSection/ScoreComment.jsx";
import CommentReply from "./CommentReply";
import DeleteComments from "./DeleteComments";


const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [hoverId, setHoverId] = useState();
    const [count, setCount] = useState({});
    const [replyTo, setReplyTo] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const replyRef = useRef(null);


    const [theme, setTheme] = useState(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark"
        }
        return "light"
    });
    useEffect(() => {
        if (theme === "dark") {
            document.querySelector("html").classList.add("dark")
        } else {
            document.querySelector("html").classList.remove("dark")

        }
    }, [theme]);
    const handleChangeTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    };


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
        setCurrentUser(commentsData.currentUser);
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
    /* const mainAvatar = comments.flatMap(comment => comment.replies).find(reply => reply.id === 4) 
    const replyAvatar = mainAvatar ? mainAvatar.user.image.png : " rounder-full border"*/
    const replyAvatar = currentUser ? currentUser.image.png : " rounder-full border"

    const addComment = (content, parentId) => {

        let replyingToUsername = "";

        if (content.trim()) {
            if (parentId) {

                const parentComment = comments.find(comment => comment.id === parentId)
                if (parentComment) {

                    replyingToUsername = parentComment.user.username;

                    const replyingToReply = parentComment.replies.find(reply => reply.id === replyTo)
                    if (replyingToReply) {
                        replyingToUsername = replyingToReply.user.username
                    }


                    /* const replyingToComment = parentComment.replies.find(reply => reply.id === parentId)

                    if (replyingToComment) {
                        replyingToUsername = replyingToComment.user.username
                    } */

                }
                /* const replyingToUsername = parentId ? comments.find(comment => comment.id === parentId).user.username : null; */

            }

            const newCommentData = {
                id: Date.now(),
                content: content,
                createdAt: "just now",
                score: 0,
                replyingTo: (replyingToUsername !== currentUser.username) ? replyingToUsername : "me",
                user: {
                    image: { png: replyAvatar },
                    username: currentUser.username
                },
                replies: []
            };

            setComments(prev => {
                if (parentId) {
                    return prev.map(comment => {
                        if (comment.id === parentId) {
                            return {
                                ...comment,
                                replies: [
                                    ...comment.replies.filter(reply => reply.id !== parentId), newCommentData
                                ]
                            }
                        }
                        return comment;
                    })
                }
                return [...prev, newCommentData];

            });

            setReplyTo(false)
        }


    }

    const handleDeleteComment = (id) => {
        setComments(prev => prev.filter(comment => comment.id !== id));
    };
    const handleDeleteReply = (commentId, replyId) => {
        setComments(prev => {
            return prev.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: comment.replies.filter(reply => reply.id !== replyId)
                    }
                }
                return comment;
            })
        })
    };

    const handleClickOutside = (e) => {
        if (replyRef.current && !replyRef.current.contains(e.target)) {
            setReplyTo(false);

        }
    };
    useEffect(() => {
        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);


        }
    }, [])

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            <header className="flex justify-between dark:bg-slate-950 mx-[13px] w-[350px] md:w-[700px] items-center pt-4 md:pb-2">
                <div className="rounded-md bg-moderate-blue w-[130px] text-center py-1">
                    <p className="text-white font-semibold"><a href="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9" title="Go to Challenge" target="_blank">SocialLink App</a> </p>
                </div>
                <div className="flex gap-x-4 items-center  justify-between">
                    <div className="flex text-slate-950 dark:text-white font-bold gap-x-4">

                        <p><a href="https://github.com/gerajaj" target="_blank" title="Visit my Github profile">About</a></p>
                        <p className=""><a href="https://github.com/gerajaj/comments-section-react-tailwindcss" target="_blank" title="Go to Repository">Repo</a></p>
                    </div>
                    <button onClick={handleChangeTheme} title="Change theme">
                        {theme === "dark" ? (<img src={IconSun} className="h-6 mx-auto fill-bold rounded-full" />) : (<img src={IconMoon} className="h-6 mx-auto fill-bold" />)}
                    </button>
                </div>
            </header>
            <hr className="hidden md:flex h-[2px] bg-slate-500 opacity-50 md:w-[700px] mt-2 -mb-2 mx-auto" />
            {comments.map(comment => (
                <div key={comment.id} className="dark:bg-slate-950">
                    <div className="bg-white min-h-[160px] w-[350px] md:w-[700px] mx-auto md:mx-auto rounded-xl"
                        onMouseEnter={() => setHoverId(currentUser.username)}
                        onMouseLeave={() => setHoverId(null)}>
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
                                    <div className="flex ">
                                        <div className="mt-4"
                                        >
                                            {comment.user.username === currentUser.username && hoverId === currentUser.username && (

                                                <DeleteComments onDelete={() => handleDeleteComment(comment.id)} />



                                            )}
                                        </div>
                                        <div className="mt-4 flex items-center "
                                            onClick={() => setReplyTo(comment.id)}
                                        >
                                            <IconReply className="fill-moderate-blue w-5 cursor-pointer" />
                                            <p className="text-moderate-blue font-bold cursor-pointer">Reply</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    {replyTo === comment.id && (
                        <span className=" bg-gray-400 w-[1px] min-h-[160px] md:-ml-2">
                            <div className="flex flex-col bg-white justify-center rounded-lg h-[160px] mx-auto w-[350px] md:w-[700px] mt-4"
                                ref={replyRef}>
                                <CommentReply replyAvatar={replyAvatar} id="replyComment" isReply={true} onSend={addComment} parentId={comment.id} className="" />
                            </div>
                        </span>
                    )

                    }
                    {comment.replies.length > 0 && (

                        <div className="">

                            {
                                comment.replies.map(reply => (
                                    <div>
                                        <div key={reply.id} className="flex mx-4  items-center justify-between ">
                                            {/* <hr className=" bg-gray-300 w-[1px] min-h-[240px] " /> */}
                                            <span className=" bg-gray-300 w-[1px] min-h-[160px] md:-ml-2">
                                                <div className="bg-white min-h-[160px] md:min-h-[160px] w-[330px] md:w-[600px] rounded-xl my-4 mb-1 ml-4 md:ml-[90px]">
                                                    <div className="pt-4 pb-4 mx-4 "
                                                        onMouseEnter={() => setHoverId(reply.id)}
                                                        onMouseLeave={() => setHoverId(null)}>
                                                        <div className="flex items-center justify-between  gap-x-4">
                                                            <img src={reply.user.image.png} alt="user" className="w-8 h-8" />
                                                            <p className="text-moderate-blue font-bold">{reply.user.username}</p>
                                                            {reply.user.username === currentUser.username && isVisible &&
                                                                <div className="text-white bg-moderate-blue w-9 rounded-md animate-pulse duration-5000 ease-in-out ">
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
                                                                {reply.user.username === currentUser.username && hoverId === reply.id && (

                                                                    <DeleteComments onDelete={() => handleDeleteReply(comment.id, reply.id)} />



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

                                                    <div className="bg-white rounded-lg  min-h-[160px] mt-4 w-[330px] md:w-[600px] ml-4 md:ml-[90px]"
                                                        ref={replyRef}>
                                                        <CommentReply
                                                            replyAvatar={replyAvatar} id="replyReplies"
                                                            isReply={true}
                                                            onSend={addComment}
                                                            parentId={comment.id}
                                                        />
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

            <div className="flex flex-col bg-white justify-center rounded-lg h-[160px] mx-auto w-[355px] md:w-[700px] my-1">
                <CommentReply
                    replyAvatar={replyAvatar}
                    id="replyComment"
                    isReply={false}
                    onSend={addComment}
                    parentId={null}
                />
            </div>
        </>
    )
}

export default CommentSection;