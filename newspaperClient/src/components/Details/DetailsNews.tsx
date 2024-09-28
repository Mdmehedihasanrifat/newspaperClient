import React, { useCallback, useState, useContext, useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { NewsDetails, Comment, User } from "../../utils/interface";
import userContext from "../../context/UserContext";
import { formattedDate, getImageUrl, handleFetch } from "../../utils/helper";
import NewsImage from "./NewsImage";
import CommentsSection from "./CommentSection";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ConfirmDeleteModal from "../Modal/ConfirmDeleteModal";
import Swal from "sweetalert2";
import { io } from "socket.io-client";

const API_BASE_URL = "http://localhost:3000/api";

const DetailsNews: React.FC = () => {
  const detailsNews = useLoaderData() as NewsDetails;
  const { id } = useParams();
  const context = useContext(userContext);
  const user = context?.user; // Handle potential undefined context
  const { setIsDeleted, setDeletedId } = context;
  const navigate = useNavigate();
  const [allComment, setAllComment] = useState<Comment[]>([]);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [recommendations, setRecommendations] = useState<NewsDetails[]>([]); // State for recommendations

  // Fetch comments
  const fetchComments = useCallback(async () => {
    if (!id) return;
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}/comments`);
      const data = await response.json();
      setAllComment(data.comments);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!id) return;
      try {
        const response = await fetch(`${API_BASE_URL}/news/${id}/recommend`);
        const data = await response.json();
        setRecommendations(data.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [id]);

  const handleDelete = async (detailsNews: NewsDetails) => {
    if (user?.id !== detailsNews.author.id) {
      Swal.fire("Error", "You can only delete your own news!", "error");
      return;
    }

    try {
      const response = await handleFetch(
        `${API_BASE_URL}/news/${detailsNews.id}`,
        "DELETE"
      );

      if (!response.ok) {
        throw new Error("Error deleting the news");
      }

      Swal.fire("Deleted!", "News has been deleted successfully.", "success");
      const socket = io("http://localhost:3000");
      socket.emit("newsDeleted", { newsId: detailsNews.id });

      setIsDeleted(true);
      setDeletedId(detailsNews.id);
      navigate("/");
    } catch (error) {
      Swal.fire("Error", "Failed to delete news.", "error");
    }
  };

  const onConfirmDelete = useCallback(async () => {
    setDeleteModal(false);
    if (detailsNews !== null) {
      await handleDelete(detailsNews);
    }
  }, [detailsNews]);

  const handleReadMoreClick = (id:any) => {
    navigate(`/news/${id}`);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Main Content Section */}
      <div className="col-span-8">
        {/* Headline */}
        <div className="text-left my-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {detailsNews.headline}
          </h2>
        </div>

        <NewsImage imageUrl={detailsNews.image} />

        {/* News Details */}
        <div className="mt-6">
          <div className="flex justify-start items-center mb-4">
            <h3 className="text-lg font-bold italic mx-3">
              Author: {detailsNews.author.name}
            </h3>
            <p className="text-lg text-gray-500">
              {formattedDate(detailsNews.createdAt)}
            </p>
          </div>
          <p className="text-xl text-left text-gray-800">
            {detailsNews.details}
          </p>
        </div>

        {/* News Actions (Edit/Delete) */}
        {user?.id === detailsNews.author.id && (
          <div className="flex gap-4 mt-4 justify-start">
            <button
              onClick={() => navigate(`/news/${id}/edit`)}
              className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
            >
              <FaEdit />
              Edit News
            </button>
            <button
              onClick={() => setDeleteModal(true)}
              className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
            >
              <FaTrashAlt />
              Delete News
            </button>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-8">
          <CommentsSection comments={allComment} newsId={detailsNews.id} />
        </div>
      </div>

      {/* Related News Section */}
      <div className="col-span-4 mx-6">
  <div className="bg-gray-100 p-4 border border-gray-300 rounded shadow">
    <h2 className="text-lg font-bold">Related News</h2>
    <ul className="mt-2">
      {recommendations.length > 0 ? (
        recommendations.map((single) => (
          <li key={single.id} className="flex items-center mb-2 cursor-pointer" onClick={()=>{handleReadMoreClick(single.id)}}>
            <img
              src={getImageUrl(single.image)}
              alt={single.headline}
              className="w-16 h-16 mr-2 object-cover rounded"
            />
            <div>
              <h3 className="text-md font-semibold">{single.headline}</h3>
              {/* Flex container to align date and view icon */}
              <div className="flex items-center text-sm text-gray-500">
                <p>{formattedDate(single.createdAt)}</p>
                {/* View icon and count */}
                <div className="flex items-center ml-4">
                  <svg
                    className="w-4 h-4 mr-1 text-gray-500"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4.5C7.30558 4.5 3.25457 7.19154 1.125 11.25C3.25457 15.3085 7.30558 18 12 18C16.6944 18 20.7454 15.3085 22.875 11.25C20.7454 7.19154 16.6944 4.5 12 4.5ZM12 15.75C9.51472 15.75 7.5 13.7353 7.5 11.25C7.5 8.76472 9.51472 6.75 12 6.75C14.4853 6.75 16.5 8.76472 16.5 11.25C16.5 13.7353 14.4853 15.75 12 15.75ZM12 9C10.7574 9 9.75 10.0074 9.75 11.25C9.75 12.4926 10.7574 13.5 12 13.5C13.2426 13.5 14.25 12.4926 14.25 11.25C14.25 10.0074 13.2426 9 12 9Z" />
                  </svg>
                  <span>{single.viewCount}</span>
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <p className="text-gray-500">No related news available.</p>
      )}
    </ul>
  </div>
</div>


      <ConfirmDeleteModal
        isOpen={isDeleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={onConfirmDelete}
      />
    </div>
  );
};

export default DetailsNews;
