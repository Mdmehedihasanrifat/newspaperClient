
import { FaRegComment } from 'react-icons/fa';

const CommentButton = () => {
    return (
        <div>
            <div className="mt-5 sm:mt-8 flex justify-start gap-4">
      <div className="rounded-md shadow">
        <a
          href="#"
          className="w-auto flex items-center justify-center px-4 py-4 border border-black text-base leading-6 font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:border-gray-500 focus:shadow-outline-gray transition duration-150 ease-in-out md:py-2 md:text-sm md:px-4"
        >
          <FaRegComment className="mr-2 text-white" /> {/* White icon */}
          Add Comment
        </a>
      </div>
    </div>
        </div>
    );
};

export default CommentButton;