import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface NewsActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const NewsActions: React.FC<NewsActionsProps> = ({ onEdit, onDelete }) => (
  <div className="w-full flex gap-2">
    <button
      onClick={onDelete}
      className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
    >
      <FaTrashAlt />
      Delete News
    </button>
    <button
      onClick={onEdit}
      className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
    >
      <FaEdit />
      Edit News
    </button>
  </div>
);

export default NewsActions;
