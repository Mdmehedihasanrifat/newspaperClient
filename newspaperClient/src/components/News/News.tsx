import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import SingleNews from "./SingleNews/SingleNews";
import { getImageUrl } from "../../utils/helper";
import {PacmanLoader} from "react-spinners"

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
  const [news, setNews] = useState<NewsItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const fetchNews = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/news?page=${page}`);
      const data = await response.json();
      setNews((prev) => [...prev, ...data.news]);
      setHasMore(data.news.length > 0);
    } catch (error) {
      console.error('Failed to fetch news', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && news.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <PacmanLoader color="#232324" size={30} />
      </div>
    );
  }
  

  if (!loading && news.length === 0) {
    return <div className="text-2xl m-4">No articles available.</div>;
  }

  const [featured, secondFeature, thirdFeature, ...restNews] = news;
  


  return (
    <InfiniteScroll
      dataLength={news.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading more articles...</h4>}
      endMessage={<p>No more articles</p>}
    >
      <div className="grid gap-6 grid-cols-6 auto-rows-auto m-5">
        {/* Featured News */}
        {featured && (
          <div className="col-span-6 md:col-span-4 border-b-2 row-span-2  p-5">
            <SingleNews key={featured.id} news={featured} image={getImageUrl(featured.image) || fallbackImage} featured={true} />
          </div>
        )}

        {/* Secondary Featured Articles */}
        {secondFeature && (
          <div className="col-span-6 md:col-span-2 border-l-2 row-span-1 p-5">
            <SingleNews key={secondFeature.id} news={secondFeature} image={getImageUrl(secondFeature.image) || fallbackImage} mediumFeature={true} />
          </div>
        )}

        {thirdFeature && (
          <div className="col-span-6 md:col-span-2 border-l-2 row-span-1 p-5">
            <SingleNews key={thirdFeature.id} news={thirdFeature} image={getImageUrl(thirdFeature.image) || fallbackImage} mediumFeature={true} />
          </div>
        )}

        {/* Regular Articles - Consistent Grid Layout */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 col-span-6">
          {restNews.map((newsItem,index) => (
            <div key={newsItem.id+index} className="border p-4 rounded-lg flex flex-col">
              <SingleNews news={newsItem} image={getImageUrl(newsItem.image) || fallbackImage} />
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default News;