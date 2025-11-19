import NewsItem from "./NewsItem";
import { useEffect, useState } from "react";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const apiKey = "ec699cb6042e43e0b6d30ad9bc9c5e33";

    // GNews categories supported:
    //   general | world | nation | business | technology | entertainment | sports | science | health
    // Your navbar categories match these correctly.

    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&apikey=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles || []))
      .catch((err) => {
        console.error("Error fetching articles", err);
        setArticles([]);
      });
  }, [category]);

  return (
    <div>
      <h2 className="text-center no-select">
        Latest <span className="badge bg-danger">News</span>
      </h2>

      {articles.map((news, index) => (
        <NewsItem
          key={index}
          title={news.title}
          description={news.description}
          src={news.image}
          url={news.url}
        />
      ))}
    </div>
  );
};

export default NewsBoard;
