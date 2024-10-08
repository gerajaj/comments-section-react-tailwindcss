

const ScoreComment = ({ count, id, handlePlus, handleMinus }) => {

    return (
        <div className="flex items-center justify-between pt-1 mx-[12px]">
            <button className="font-bold text-grayish-blue" onClick={() => handlePlus(id)}>+</button>
            <p className="font-medium text-md">{count[id] || 0}</p>
            <button
                className="font-bold text-grayish-blue"
                onClick={() => handleMinus(id)}
                disabled={count === 0}
            >-</button>
        </div>
    )
}
export default ScoreComment;