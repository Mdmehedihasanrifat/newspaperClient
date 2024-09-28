import React from "react";

interface NewsHeaderProps {
  headline: string;
  authorName: string;
  createdAt: string;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ headline, authorName, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString();
  return (
    <div className="text-center my-6 w-full">
      <h2 className="text-2xl font-sans tracking-tight leading-10 font-bold text-gray-900 sm:text-3xl sm:leading-none md:text-4xl">
        {headline}
      </h2>
      <div className="bg-gray-100 p-4 mb-4 border border-gray-300 rounded shadow mt-6">
        <h3 className="font-bold text-lg">Author: {authorName}</h3>
        <h3 className="font-bold text-lg">{formattedDate}</h3>
      </div>
    </div>
  );
};

export default NewsHeader;
