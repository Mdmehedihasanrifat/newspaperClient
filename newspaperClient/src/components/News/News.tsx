import { useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleNews from "./SingleNews/SingleNews";
import { getImageUrl, formattedDate } from "../../utils/helper";
import { PacmanLoader } from "react-spinners";
import userContext from "../../context/UserContext";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";


interface NewsItem {
  id: number;
  headline: string;
  details: string;
  image: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const fallbackImage = "../../assets/download.png";

const News = () => {
  const { Query, deletedId, setDeletedId } = useContext(userContext);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("news", (newsItem: NewsItem) => {
      setNews((prevNews) => [newsItem, ...prevNews]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setNews([]);
    setPage(1);
    fetchNews(1, Query);
  }, [Query]);

  useEffect(() => {
    if (page > 1) fetchNews(page, Query);
  }, [page]);
  
  const fetchNews = async (page: number, query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/news?page=${page}&search=${query}`);
      const data = await response.json();
      if (data.news && data.news.length > 0) {
        setNews((prev) => [...prev, ...data.news].filter(news => news.id !== deletedId));
        setHasMore(data.news.length > 0);
        setDeletedId(null);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = () => setPage((prevPage) => prevPage + 1);

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

  const [featured, secondFeature, thirdFeature, fourthFeature, fifthFeature, ...restNews] = news;

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading more articles...</h4>}
      endMessage={<p>No more articles</p>}
    >
      <div className="grid gap-6 grid-cols-6 auto-rows-auto m-5">
        {/* Featured Article */}
        {featured && (
          <div className="col-span-6 md:col-span-4 p-8 border-b-4 border-gray-400 bg-white shadow-md rounded-lg">
            <SingleNews
              key={featured.id}
              news={featured}
              image={getImageUrl(featured.image) || fallbackImage}
              featured={true}
              className="transition-shadow duration-300"
              style={{ fontFamily: 'Merriweather, serif', fontSize: '1.25rem' }}
            />
          </div>
        )}

        {/* Secondary Feature Articles */}
        <div className="col-span-6 md:col-span-2 p-5 border-l-4 border-gray-300">
          {secondFeature && (
            <div className="mb-5">
              <SingleNews
                key={secondFeature.id}
                news={secondFeature}
                image={getImageUrl(secondFeature.image) || fallbackImage}
                className="transition-transform duration-300"
                style={{ fontFamily: 'Merriweather, serif', fontSize: '1.1rem' }}
              />
            </div>
          )}

          {thirdFeature && (
            <div className="mt-5">
              <SingleNews
                key={thirdFeature.id}
                news={thirdFeature}
                image={getImageUrl(thirdFeature.image) || fallbackImage}
                className="transition-transform duration-300"
                style={{ fontFamily: 'Merriweather, serif', fontSize: '1.1rem' }}
              />
            </div>
          )}
        </div>

        {/* Fourth and Fifth News Articles in Card Style */}
 
        <div className="col-span-6 flex flex-wrap">
  {fourthFeature && (
    <div className="w-full md:w-1/2 p-2">
      <div className="card card-side bg-base-100 shadow-xl h-full" onClick={()=>{navigate(`/news/${fourthFeature.id}`)}}>
        <figure className="w-1/2">
          <img
            src={getImageUrl(fourthFeature.image) || fallbackImage}
            alt={fourthFeature.headline}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body w-1/2">
          <h2 className="card-title">{fourthFeature.headline}</h2>
          <p className="line-clamp-5">{fourthFeature.details}</p>
        </div>
      </div>
    </div>
  )}

  {fifthFeature && (
    <div className="w-full md:w-1/2 p-2" onClick={()=>{navigate(`/news/${fifthFeature.id}`);}}>
      <div className="card card-side bg-base-100 shadow-xl h-full">
        <figure className="w-1/2">
          <img
            src={getImageUrl(fifthFeature.image) || fallbackImage}
            alt={fifthFeature.headline}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body w-1/2">
          <h2 className="card-title">{fifthFeature.headline}</h2>
          <p className="line-clamp-5">{fifthFeature.details}</p>
        </div>
      </div>
    </div>
  )}
</div>
        {/* Remaining Articles */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 col-span-6 mt-5">
          {restNews.map((newsItem) => (
            <div
              key={newsItem.id}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border-b-4 border-gray-300"
              style={{ fontFamily: 'Georgia, serif', lineHeight: '1.5' }}
            >
              <SingleNews
                news={newsItem}
                image={getImageUrl(newsItem.image) || fallbackImage}
              />
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default News;
