import IconSun from "@/components/icons/IconSun.png"
import IconMoon from "@/components/icons/IconMoon.png"

const CommentHeader = ({ handleChangeTheme, theme }) => {
    return (
        <>
            <header className="flex justify-between dark:bg-slate-950 mx-[13px] md:mx-auto w-[350px] md:w-[700px] items-center pt-4 md:pb-2">
                <div className="rounded-md bg-moderate-blue w-[130px] text-center py-1">
                    <p className="text-white font-semibold"><a href="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9" title="Go to the Challenge" target="_blank">SocialLink App</a> </p>
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
        </>
    )
}

export default CommentHeader;