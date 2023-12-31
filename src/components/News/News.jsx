import React, { useEffect ,useState } from "react";
import Card from "../Card/Card";
 import './News.css'
import { fetchNews } from "../../reducers/newsReducer"
import { useSelector, useDispatch } from "react-redux";
import defaultImg from '../../Images/news.jpeg';
import InfiniteScroll from "react-infinite-scroll-component";

//useSelector is used for select specific data from the Redux

function News() {
  const dispatch = useDispatch();
  const { news, isLoading, error } = useSelector((state) => state.news);

  const [page,setPage] = useState(1);
  const[articles,setArticles] = useState([]);


  const showInitialCards = 12;

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage+1);
  };
  useEffect(()=>{
    dispatch(fetchNews(page))
  },[dispatch,page]);

  useEffect(() => {
    if (news) {
      const newArticles = news.slice(
        (page - 1) * showInitialCards,
        page * showInitialCards
      );
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
    }
  }, [news, page]); 


  if (isLoading && articles.length === 0)  {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
   
<InfiniteScroll
 dataLength={articles.length}
 next={fetchMoreData}
 hasMore={true} 
 loader={<h4>Loading...</h4>}
>
  
    <div div className="news-item">
   
      {articles.map((ele) => {
        console.log(ele);
        return (
          <Card
            image={ele.urlToImage || defaultImg}
            title={ele.title}
            description={ele.description  || "The parent of the autonomous vehicle company is pausing manufacturing of the Origin, a self-driving van that does not have a steering wheel, amid safety concerns."}
            url={ele.url}
            source={ele.source.name}
            publishedAt={ele.publishedAt}
          />
        );
      })}
    </div>
    </InfiniteScroll>
  );
}


export default News;
















//   const getRandomNews = useCallback(() => {
//     if(news){
//       const shuffledNews = [...news].sort(()=> 0.5 - Math.random());
//       const initialNews = shuffledNews.slice(0, showInitialCards);
//       setArticles(initialNews);
//     }
//   },[news]);

//   useEffect(() => {
//     dispatch(fetchNews(page));  //fetch the news data when page state changes
//   }, [dispatch , page]);

// useEffect(() => {
//   getRandomNews();
// },[getRandomNews])  
 
 

// const handleScroll = () =>{
//   if(
//     window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
//   ){
//     setPage((prevPage) => prevPage + 1);
//   }

// };

// useEffect(() => {
// window.addEventListener("scroll", handleScroll);
// return() =>{
//   window.removeEventListener("scroll",handleScroll);
// }
// },[]);