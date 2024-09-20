import React, { useCallback, useState, useContext, useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { NewsDetails, Comment } from "../../utils/interface";
import userContext from "../../context/UserContext";
import {  formattedDate } from "../../utils/helper";
import NewsImage from "./NewsImage";
import CommentsSection from "./CommentSection";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const API_BASE_URL = "http://localhost:3000/api";

const DetailsNews: React.FC = () => {
  const detailsNews = useLoaderData() as NewsDetails;
  const { id } = useParams();
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [allComment, setAllComment] = useState<Comment[]>([]);
 
  

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


  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Author Section */}
      <div className="col-span-2 px-4 mt-16">
        <div className="p-4">
          <h3 className="font-bold text-lg">Author: {detailsNews.author.name}</h3>
          <p className="text-sm text-gray-600">{formattedDate(detailsNews.createdAt)}</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="col-span-8">
        {/* Headline */}
        <div className="text-center my-6">
          <h2 className="text-3xl font-bold text-gray-900">{detailsNews.headline}</h2>
        </div>

        {/* Image */}
        <NewsImage imageUrl={detailsNews.image} />

        {/* News Details */}
        <div className="mt-6 px-4">
          <p className="text-xl text-gray-800">{detailsNews.details}</p>
        </div>

        {/* News Actions (Edit/Delete) */}
        {user?.id  && (
          <div className="flex gap-4 mt-4 justify-start">
            <button
              onClick={() => navigate(`/news/${id}/edit`)}
              className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
            >
              <FaEdit />
              Edit News
            </button>
            <button
              onClick={() => AlertDeleteFunction(() => console.log("Delete confirmed"))}
              className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
            >
              <FaTrashAlt />
              Delete News
            </button>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-8 ">
          <CommentsSection
            comments={allComment}
            newsId={detailsNews.id} 
          />
        </div>
      </div>

      {/* Related News Section */}
      <div className="col-span-2 mx-6">
        <div className="bg-gray-100 p-4 border border-gray-300 rounded shadow">
          <h2 className="text-lg font-bold">Related News</h2>
          {/* Placeholder for related news items */}
        </div>
      </div>
    </div>
  );
};

export default DetailsNews;
