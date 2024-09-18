import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component'; // Import the Infinite Scroll component
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

const fallbackImage = '../../assets/download.png';
const News = () => {
  // Define the type of state as NewsItem[]
  const [news, setNews] = useState<NewsItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // Page number for pagination

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const fetchNews = async (page: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/news?page=${page}`);
      const data = await response.json();
      setNews((prev) => [...prev, ...data.news]);
      setHasMore(data.news.length > 0); // Check if there are more items to load
    } catch (error) {
      console.error('Failed to fetch news', error);
      setHasMore(false);
    }
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const getImageUrl = (url: string): string => {
    if (!url) return fallbackImage;

    // Check if URL is a full path or a relative path
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `http://localhost:3000/news/${url}`; // Adjust based on your local setup
  };

  const [secondFeature, featured, thirdFeature, ...restNews] = news;

  if (news.length === 0) {
    return <div className="text-2xl m-4">No articles available.</div>;
  }
   console.log(page)
  return (
    <InfiniteScroll
      dataLength={news.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more articles</p>}
    >
      <div className="grid gap-6 grid-cols-6 auto-rows-auto m-5">
        {/* Featured news - spans 4 columns and 2 rows */}
        <div className="col-span-6 md:col-span-4 row-span-2 border-r-2 border-b-2 p-5">
          <SingleNews news={featured} image={getImageUrl(featured.image)} featured={true} />
        </div>

        {/* Second featured news - spans 2 columns and 1 row */}
        <div className="col-span-6 md:col-span-2 row-span-1 border-b-2 p-5">
          <SingleNews news={secondFeature} image={getImageUrl(secondFeature.image)} mediumFeature={true} />
        </div>

        {/* Third featured news - spans 2 columns and 1 row */}
        <div className="col-span-6 md:col-span-2 row-span-1 border-b-2 p-5">
          <SingleNews news={thirdFeature} image={getImageUrl(thirdFeature.image)} mediumFeature={true} />
        </div>

        {/* Rest of the news - each spans 2 columns */}
        {restNews.map((newsItem) => (
          <div key={newsItem.id} className="col-span-6 md:col-span-2 border p-5">
            <SingleNews news={newsItem} image={getImageUrl(newsItem.image)} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default News;
