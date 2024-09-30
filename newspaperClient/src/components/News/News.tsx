// import { useState, useEffect, useContext } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import SingleNews from "./SingleNews/SingleNews";
// import { getImageUrl, formattedDate } from "../../utils/helper";
// import { PacmanLoader } from "react-spinners";
// import userContext from "../../context/UserContext";
// import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";
// import FeaturedNews from "./FeaturedNews";
// import SecondaryFeature from "./SecondaryFeature";

// interface NewsItem {
//   id: number;
//   headline: string;
//   details: string;
//   image: string;
//   userId: number;
//   createdAt: string;
//   updatedAt: string;
// }

// const fallbackImage = "../../assets/download.png";

// const News = () => {
//   const { Query, deletedId, setDeletedId } = useContext(userContext);
//   const [news, setNews] = useState<NewsItem[]>([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const socket = io("http://localhost:3000");

//     socket.on("news", (newsItem: NewsItem) => {
//       setNews((prevNews) => [newsItem, ...prevNews]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     setNews([]);
//     setPage(1);
//     fetchNews(1, Query);
//   }, [Query]);

//   useEffect(() => {
//     if (page > 1) fetchNews(page, Query);
//   }, [page]);

//   const fetchNews = async (page: number, query: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/news?page=${page}&search=${query}`
//       );
//       const data = await response.json();
//       // setNews((prev) => [...prev, ...data.news]);

//       // setHasMore(data.news.length > 0);
//       if (data.news && data.news.length > 0) {
//         setNews((prev) => [...prev, ...data.news]);
//         setNews((prevNews) => prevNews.filter((news) => news.id != deletedId));

//         setHasMore(data.news.length > 0);
//         setDeletedId(null);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Failed to fetch news:", error);
//       setHasMore(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMoreData = () => setPage((prevPage) => prevPage + 1);

//   if (loading && news.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-white">
//         <PacmanLoader color="#232324" size={30} />
//       </div>
//     );
//   }

//   if (!loading && news.length === 0) {
//     return <div className="text-2xl m-4">No articles available.</div>;
//   }

//   const [
//     featured,
//     secondFeature,
//     thirdFeature,
//     fourthFeature,
//     fifthFeature,
//     ...restNews
//   ] = news;

//   return (
//     <InfiniteScroll
//       dataLength={news.length}
//       next={fetchMoreData}
//       hasMore={hasMore}
//       loader={<h4>Loading more articles...</h4>}
//       endMessage={<p>No more articles</p>}
//     >
//       <div className="grid gap-6 grid-cols-6 auto-rows-auto m-5">
//         <FeaturedNews news={featured}></FeaturedNews>

//         {/* Secondary Feature Articles */}
//         <div className="col-span-6 md:col-span-2 p-5 border-l-4 ">
//           <SecondaryFeature
//             secondFeature={secondFeature}
//             thirdFeature={thirdFeature}
//           ></SecondaryFeature>
//         </div>
//         <div className="col-span-6 flex flex-wrap">
//           {fourthFeature && (
//             <div className="w-full md:w-1/2 p-2">
//               <div
//                 className="card card-side bg-base-100 shadow-xl h-80"
//                 onClick={() => navigate(`/news/${fourthFeature.id}`)}
//               >
//                 <figure className="w-full md:w-1/2 flex-shrink-0 h-full">
//                   <img
//                     src={getImageUrl(fourthFeature.image) || fallbackImage}
//                     alt={fourthFeature.headline}
//                     className="w-full h-64 object-cover"
//                     loading="lazy"
//                   />
//                 </figure>
//                 <div className="card-body w-full md:w-1/2">
//                   <h2 className="card-title line-clamp-2">
//                     {fourthFeature.headline}
//                   </h2>
//                   <p className="line-clamp-5">{fourthFeature.details}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {fifthFeature && (
//             <div
//               className="w-full md:w-1/2 p-2"
//               onClick={() => navigate(`/news/${fifthFeature.id}`)}
//             >
//               <div className="card card-side bg-base-100 shadow-xl h-80">
//                 <figure className="w-full md:w-1/2 flex-shrink-0 h-full">
//                   <img
//                     src={getImageUrl(fifthFeature.image) || fallbackImage}
//                     alt={fifthFeature.headline}
//                     className="w-full h-64 object-cover"
//                     loading="lazy"
//                   />
//                 </figure>
//                 <div className="card-body w-full md:w-1/2">
//                   <h2 className="card-title line-clamp-2">
//                     {fifthFeature.headline}
//                   </h2>
//                   <p className="line-clamp-5">{fifthFeature.details}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Remaining Articles */}
//         <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 col-span-6 mt-5">
//           {restNews.map((newsItem) => (
//             <div
//               key={newsItem.id}
//               className="p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border-b-4 border-gray-300"
//               style={{ fontFamily: "Georgia, serif", lineHeight: "1.5" }}
//             >
//               <SingleNews
//                 news={newsItem}
//                 image={getImageUrl(newsItem.image) || fallbackImage}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </InfiniteScroll>
//   );
// };

// export default News;
import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getImageUrl, formattedDate } from "../../utils/helper";
import { PacmanLoader } from "react-spinners";
import { io } from "socket.io-client";
import FeaturedNews from "./FeaturedNews";
import SecondaryFeature from "./SecondaryFeature";
import SingleNews from "./SingleNews/SingleNews";
import { useNavigate } from "react-router-dom";
// import { useRouter } from "next/router";

interface NewsItem {
  id: number;
  headline: string;
  details: string;
  image: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const FALLBACK_IMAGE = "/assets/download.png";
const API_URL = "http://localhost:3000";

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const navigate=useNavigate();

  const fetchNews = useCallback(async (page: number, query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/news?page=${page}&search=${query}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.news && data.news.length > 0) {
        setNews(prevNews => [...prevNews, ...data.news]);
        setHasMore(data.news.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const socket = io(API_URL);
    socket.on("news", (newsItem: NewsItem) => {
      setNews(prevNews => [newsItem, ...prevNews]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setNews([]);
    setPage(1);
    fetchNews(1, query);
  }, [query, fetchNews]);

  useEffect(() => {
    if (page > 1) fetchNews(page, query);
  }, [page, query, fetchNews]);

  const fetchMoreData = () => setPage(prevPage => prevPage + 1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
    setNews([]);
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

  const [featured, secondFeature, thirdFeature, fourthFeature, fifthFeature, ...restNews] = news;

  return (
    
    
      <InfiniteScroll
        dataLength={news.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="text-center my-4">Loading more articles...</h4>}
        endMessage={<p className="text-center my-4">No more articles</p>}
      >
        <main className="mt-8 grid grid-cols-12 gap-6">
          {/* Featured News */}
          <section className="col-span-12 lg:col-span-8 border-r border-gray-300 pr-6">
            {featured && <FeaturedNews news={featured} />}
          </section>

          {/* Secondary Features */}
          <section className="col-span-12 lg:col-span-4">
            <SecondaryFeature secondFeature={secondFeature} thirdFeature={thirdFeature} />
          </section>

          {/* Fourth and Fifth Features */}
          <section className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 border-t border-gray-300 pt-6" >
            {[fourthFeature, fifthFeature].map((feature) => feature && (
              <div key={feature.id} className="border-b border-gray-200 pb-4">
                <img
                  src={getImageUrl(feature.image) || FALLBACK_IMAGE}
                  alt={feature.headline}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-xl font-bold mb-2 font-serif">{feature.headline}</h3>
                <p className="text-gray-700 mb-2 line-clamp-3">{feature.details}</p>
                <button 
                  onClick={() => navigate(`/news/${feature.id}`)}
                  className="text-blue-600 hover:text-blue-800 transition duration-200"
                >
                  Read more
                </button>
              </div>
            ))}
          </section>

          {/* Remaining Articles */}
          <section className="col-span-12 mt-8 border-t border-gray-300 pt-6">
            <h2 className="text-2xl font-bold mb-4 font-serif">More News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {restNews.map((newsItem) => (
                <div
                  key={newsItem.id}
                  className="border-b border-gray-200 pb-4"
                >
                  <SingleNews
                    news={newsItem}
                    image={getImageUrl(newsItem.image) || FALLBACK_IMAGE}
                  />
                </div>
              ))}
            </div>
          </section>
        </main>
      </InfiniteScroll>
   
  );
}