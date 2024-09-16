import { useLoaderData } from "react-router-dom";
import CommentButton from "../Buttons/CommentButton";

interface Author {
  id: number;
  name: string;
  profile: string;
}

interface Category {
  id: number;
  name: string;
}

interface NewsDetails {
  id: number;
  headline: string;
  details: string;
  image: string;
  author: Author;
  categories: Category[];
}
const DetailsNews = () => {
  const detailsNews = useLoaderData() as NewsDetails;
  console.log(detailsNews);

  return (
    <div className="w-full">
      <div className="text-center my-6 w-full">
        <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-3xl sm:leading-none md:text-4xl">
          {detailsNews.headline}
        </h2>
      </div>

      <div
        className="w-75 h-96 bg-cover bg-center my-6"
        style={{ backgroundImage: `url(${detailsNews.image})` }}
      >
        {/* Adjust height as needed */}
      </div>

      {/* Full-width Details */}
      <div className="w-full px-4 lg:px-16 text-left">
        <p className="mt-3 text-base text-black-500 sm:mt-5 sm:text-lg sm:max-w-full md:mt-5 md:text-xl lg:mx-0">
          {detailsNews.details}
        </p>
    <CommentButton></CommentButton>
      </div>
    </div>
  );
};

export default DetailsNews;
