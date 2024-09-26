
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define the type for the props
interface NewsItem {
  id: number;
  headline: string;
  details: string;
  image: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const fallbackImage = 'src/assets/download.png';

const SingleNews: React.FC<{ news: NewsItem; image: string; featured?: boolean; mediumFeature?: boolean }> = ({ news, image, featured = false, mediumFeature = false }) => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate(`/news/${news.id}`);
  };
  


  return (
    <div className={`  ${featured ? "h-full" : ""} p-4 cursor-pointer`}  onClick={handleReadMoreClick}>
      <div
        className={`relative ${featured ? "h-96" : mediumFeature ? "h-48" : "h-48"}`}
     >
        <img
          
          src={image}
          alt="News"
          className="object-cover w-full h-full rounded"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }} // Fallback for image loading errors
        />
      </div>
      <div className="pt-4">
        <h1 className={`mb-2 ${featured ? "text-4xl" : mediumFeature ? "text-2xl" : "text-xl"} text-indigo-500`}>
          {news.headline}
        </h1>
        <p className="text-xs text-gray-500 mb-2 text-red-700">
          {news.userId} {new Date(news.createdAt).toLocaleDateString()}
        </p>
        <p className={`text-gray-700 mb-4 ${featured ? "line-clamp-4" : mediumFeature ? "line-clamp-3" : "line-clamp-2"}`}>
          {news.details}
        </p>
       
      </div>
    </div>
  );
};

export default SingleNews;
