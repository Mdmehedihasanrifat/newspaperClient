import { useNavigate } from 'react-router-dom';
import { formattedDate, getImageUrl } from '../../utils/helper';

const fallbackImage = "../../assets/download.png";

interface News {
  id: string; // Add an 'id' field for navigation purposes
  headline: string;
  details: string;
  image: string;
  createdAt: Date;
}

interface FeaturedNewsProps {
  news: News;
}

const FeaturedNews = ({ news }: FeaturedNewsProps) => {
  const navigate = useNavigate();  // Use useNavigate inside the component

  return (
    <div 
      className="col-span-6 md:col-span-4 p-8 border-b-4 border-gray-400 bg-white shadow-md rounded-lg cursor-pointer"
      onClick={() => navigate(`/news/${news.id}`)}  // Fix: use arrow function here
    >
      <img
        src={getImageUrl(news.image) || fallbackImage}
        alt={news.headline}
        className="w-full h-96 object-cover mb-6 rounded-md"
      />
      <h2 className="text-3xl font-bold mb-4 font-serif">{news.headline}</h2>
      <p className="text-gray-700 mb-4 line-clamp-4">{news.details}</p>
      <div className="flex justify-between items-center">
        {/* Convert Date to string before passing */}
        <span className="text-sm text-gray-500">{formattedDate(news.createdAt.toString())}</span>
      </div>
    </div>
  );
};

export default FeaturedNews;
