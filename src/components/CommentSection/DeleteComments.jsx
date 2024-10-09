const DeleteComments = ({ onDelete }) => {
    return (

        <div className="text-red-500 font-medium mr-3 hover:bg-red-100 hover:rounded-lg h-[30px] w-[70px] text-center flex items-center justify-center cursor-pointer"
            onClick={onDelete}>Delete</div>


    )
}

export default DeleteComments;