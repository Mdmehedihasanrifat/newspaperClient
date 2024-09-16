// CommentButton.tsx
import React from 'react';
import { FaRegComment } from 'react-icons/fa';

interface CommentButtonProps {
  onClick: () => void; // Define the onClick prop
}

const CommentButton: React.FC<CommentButtonProps> = ({ onClick }) => {
  return (
    <button
      className="w-auto flex items-center justify-center px-3 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray transition duration-150 ease-in-out md:py-2 md:text-sm md:px-4"
      onClick={onClick} // Attach the onClick handler
    >
      <FaRegComment className="mr-2 text-white" /> {/* Adjust the icon color */}
      Add Comment
    </button>
  );
};

export default CommentButton;
