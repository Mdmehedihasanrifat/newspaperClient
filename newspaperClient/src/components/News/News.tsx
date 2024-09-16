import { useState, useEffect } from "react";
// import newsData from "../../assets/filteredArticles.json"; // Import the JSON data directly
import SingleNews from "./SingleNews/SingleNews";

// Define the structure of your news data
interface NewsItem {
  id: number;
  headline: string;
  details: string;
  image: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
const fallbackImage = 'placeholder-image-url.jpg';
const News = () => {
  // Define the type of state as NewsItem[]
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {

    fetch("http://localhost:3000/api/news")
    .then(res=>res.json())
    .then(data=>setNews(data.news))
  }, []);
  const getImageUrl = (url: string): string => {
    if (!url) return fallbackImage;

    // Check if URL is a full path or a relative path
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `http://localhost:3000/news/${url}`; // Adjust based on your local setup
  };

  return (
    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-4">
      {news.map((item) => (
        <div key={item.id} className="w-full h-full">
          <SingleNews news={item} image={getImageUrl(item.image)}/>
        </div>
      ))}
    </div>
  );
};

export default News;
