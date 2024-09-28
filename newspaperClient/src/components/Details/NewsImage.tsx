import React from "react";

interface NewsImageProps {
  imageUrl: string;
}

const NewsImage: React.FC<NewsImageProps> = ({ imageUrl }) => (
  <div
    className="h-96 bg-cover bg-center align-middle my-6 rounded"
    style={{ backgroundImage: `url(${imageUrl})` }}
  />
);

export default NewsImage;
