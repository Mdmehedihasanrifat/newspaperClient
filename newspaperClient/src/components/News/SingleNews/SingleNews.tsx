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

// Define a fallback image URL
const fallbackImage = 'src/assets/download.png';

const SingleNews: React.FC<{ news: NewsItem ,image:string}> = ({ news,image }) => {
  // Function to determine the correct image URL
  // console.log(news)

  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle button click
  const handleReadMoreClick = () => {
    navigate(`/news/${news.id}`); // Navigate to the news detail page
  };



 
  return (
    <div>
      <div className="card card-compact bg-base-100 w-96 shadow-xl min-h-[450px] flex flex-col justify-between">
        {/* Image with a fixed height */}
        <figure className="h-48 w-full bg-gray-200">
          <img
            src={image} // Use the function to get the correct image URL
            alt="News"
            className="object-cover w-full h-full"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }} // Fallback for image loading errors
          />
        </figure>

        {/* Card body with limited title lines */}
        <div className="card-body flex-grow">
          <h2 className="card-title line-clamp-2"> {news.headline}</h2> {/* Limit title to 2 lines */}
          <p className="text-sm text-gray-500 line-clamp-2">{news.details}</p> {/* Optional short description */}
        </div>

        {/* Button */}
        <div className="card-actions justify-end p-4">
          <button className="btn btn-transparent w-full" onClick={handleReadMoreClick}>Read more</button>
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
