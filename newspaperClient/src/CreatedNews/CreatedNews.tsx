/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useNavigate, useLocation, useLoaderData } from "react-router-dom";
import { getImageUrl } from "../utils/helper";
import { useEffect, useState } from "react";
import { FaEye } from 'react-icons/fa';
// import userContext from "../context/UserContext";

const CreatedNews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categoryName, setCategoryName] = useState<string | null>(null);
   const { news } = useLoaderData(); // Destructure news from loader
  // const { setCategories } = useContext(userContext);

  // // Set the categories in context
  // useEffect(() => {
  //   setCategories(categories);
  // }, [categories, setCategories]);


  // Extract category from the URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    setCategoryName(category);
  }, [location.search]);

  const handleClick = (id: number) => {

    navigate(`/news/${id}`);
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-6">
        {categoryName ? `News in ${categoryName}` : "News Articles"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item: any) => (
          <div
            onClick={() => handleClick(item.id)}
            key={item.id}
            className="bg-white shadow-md cursor-pointer rounded-lg overflow-hidden"
          >
            <img
              src={getImageUrl(item.image)}
              alt={item.headline}
              className="w-full h-48 object-cover"
            />
        
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.headline}</h2>
              <div className="flex items-center  mb-2 text-red-700">
            <p className="text-xs text-gray-500">
              {news.userId} {new Date(item.createdAt).toLocaleDateString()}
            </p>
            <span className="flex items-center mx-2"> {/* Add margin here */}
              <FaEye className="text-gray-500" /> {/* Eye icon */}
              <span className="text-xs text-gray-700 ml-1">{item.viewCount}</span> {/* View count */}
            </span>
            </div>
              <p className="text-gray-600 text-sm line-clamp-4">{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedNews;
