// newsReducer.js
import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    error: null,
    isLoading: false,
  },
  reducers: {
    fetchNewsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchNewsSuccess: (state, action) => {
      state.isLoading = false;
      state.news = action.payload;
    },
    fetchNewsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchNewsRequest, fetchNewsSuccess, fetchNewsFailure } = newsSlice.actions;

export const fetchNews = (page) => {
  return async (dispatch) => {
    dispatch(fetchNewsRequest());

    try {
      let response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=YOUR_API_KEY`
      ); // Replace YOUR_API_KEY with your actual News API key
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

export default newsSlice.reducer;
