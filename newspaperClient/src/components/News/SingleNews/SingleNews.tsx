import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa'; // Import the eye icon from react-icons

// Define the type for the props
interface NewsItem {
  id: number;
  headline: string;
  details: string;
  image: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  viewCount: number; // Ensure viewCount is included in the NewsItem type
}

const fallbackImage = 'src/assets/download.png';

const SingleNews: React.FC<{ news: NewsItem; image: string; featured?: boolean; mediumFeature?: boolean }> = ({ news, image, featured = false, mediumFeature = false }) => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate(`/news/${news.id}`);
  };

  return (
    <div className={` ${featured ? "h-full" : ""} p-4 cursor-pointer`} onClick={handleReadMoreClick}>
      <div className={`relative ${featured ? "h-96" : mediumFeature ? "h-48" : "h-48"}`}>
        <img
          src={image}
          alt="News"
          className="object-cover w-full h-full rounded"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }} // Fallback for image loading errors
        />
      </div>
      <div className="pt-4">
        <h1 className={`mb-2 ${featured ? "text-4xl" : mediumFeature ? "text-2xl" : "text-xl"} text-black`}>
          {news.headline}
        </h1>
        <div className="flex items-center mb-2 text-red-700">
          <p className="text-xs text-gray-500">
            {news.userId} {new Date(news.createdAt).toLocaleDateString()}
          </p>
          <span className="flex items-center mx-2"> {/* Add margin here */}
            <FaEye className="text-gray-500" /> {/* Eye icon */}
            <span className="text-xs text-gray-700 ml-1">{news.viewCount}</span> {/* View count */}
          </span>
        </div>
        <p className={`text-gray-700 mb-4 ${featured ? "line-clamp-10" : mediumFeature ? "line-clamp-3" : "line-clamp-2"}`}>
          {news.details}
        </p>
      </div>
    </div>
  );
};

export default SingleNews;
