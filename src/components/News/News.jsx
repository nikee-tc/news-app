import React, { useEffect ,useState } from "react";
import Card from "../Card/Card";
// import './News.css'
import { fetchNews } from "../../reducers/newsReducer"
import { useSelector, useDispatch } from "react-redux";

function News() {
  const dispatch = useDispatch();
  const { news, isLoading, error } = useSelector((state) => state.news);

  const [page,setPage] = useState(1);
  const[articles,setArticles] = useState([]);

  useEffect(() => {
    dispatch(fetchNews(page));  //fetch the news data when page state changes
  }, [dispatch , page]);

  //update the articles when news data changes
  useEffect(() =>{
    if(news){
      setArticles((prevArticles) => [...prevArticles , ...news])
    }
  },[news])
  useEffect(() => {

const handleScroll = () =>{
  if(
    window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
  ){
    setPage((prevPage) => prevPage + 1);
  }

};


window.addEventListener("scroll", handleScroll);
return() =>{
  window.removeEventListener("scroll",handleScroll);
}
},[]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div div className="news-item">
    <h1>Top News </h1>
      {articles.map((ele) => {
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
    </div>
  );
}

export default News;
