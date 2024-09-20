import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Allcomment = ({ allComment, handleEditClick,handleDeleteClick }) => {
  return (
    <div>
      <ul className="mt-4">
        {allComment.map((cmt) => {
         
          
          return (
            <li
              key={cmt.id}
              className="mb-4 p-4 border rounded-lg shadow-sm flex items-center justify-between"
            >
              <div>
                {/* Safeguard comment field and render if it's a string */}
                <p>{ cmt.comment}</p>
                
                {/* Safeguard user field with optional chaining */}
                <p className="font-semibold">{cmt?.user?.firstName}</p>
                
                {/* Safeguard createdAt and handle invalid dates */}
                <p className="text-gray-500 text-sm">
                  {cmt?.createdAt ? new Date(cmt.createdAt).toLocaleDateString() : "Unknown date"}
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditClick(cmt)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteClick(cmt)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Allcomment