import React, { useEffect, useState } from "react";
import Card from "../Card/Card";

const News = () => {
  const [mynews, setMyNews] = useState([]);

  const fetchData = async () => {
    let response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5c262edcf55c438aa6986a27587940e7"
    );
    let data = await response.json();
    setMyNews(data.articles);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {mynews.map((ele) => {
        console.log(ele);
        return (
          <Card
            image={ele.urlToImage}
            title={ele.title}
            description={ele.description}
            url={ele.url}
            source={ele.source.name}
            publishedAt={ele.publishedAt}
          />
        );
      })}
    </>
  );
};

export default News;
