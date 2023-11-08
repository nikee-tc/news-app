export const FETCH_NEWS_REQUEST = "FETCH_NEWS_REQUEST";
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE";

export const fetchNewsRequest = () => {
  return {
    type: FETCH_NEWS_REQUEST,
  };
};
export const fetchNewsSuccess = (news) => {
  return { type: FETCH_NEWS_SUCCESS, payload: news };
};
export const fetchNewsFailure = (error) => {
  return {
    type: FETCH_NEWS_FAILURE,
    payload: error,
  };
};
export const fetchNews = (page) => {
  return async (dispatch) => {
    dispatch(fetchNewsRequest());

    try {
      let response = await fetch(
       "https://newsapi.org/v2/everything?q=apple&from=2023-11-07&to=2023-11-07&sortBy=popularity&apiKey=5c262edcf55c438aa6986a27587940e7"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await response.json();
      dispatch(fetchNewsSuccess(data.articles));
    } catch (error) {
      dispatch(fetchNewsFailure("Failed to fetch data from the API"));
    }
  };
};

const initialState = {
  news: [],
  error: null,
  isLoading: true,
};
const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default newsReducer;
