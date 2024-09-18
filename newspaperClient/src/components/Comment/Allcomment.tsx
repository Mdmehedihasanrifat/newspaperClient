import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Allcomment = ({allComment,handleOpenModal,handleDelete}) => {
    return (
        <div>
            <ul className="mt-4">
            {allComment.map((cmt) => (
              <li
                key={cmt.id}
                className="mb-4 p-4 border rounded-lg shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{cmt.user?.firstName}</p>
                  <p>{cmt.comment}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(cmt.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleOpenModal(cmt)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(cmt.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
    );
};

export default Allcomment;